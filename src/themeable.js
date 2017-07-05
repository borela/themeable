// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
// @flow

import type { Theme } from './Theme'
import { Component } from 'react'
import { isPresentable, presentable } from 'presentable'

const SYMBOL = Symbol.for('themeable')
const FLAIR_PATTERN = /^(\w+(?:\s+\w+)*)!?/
const PRESENTER_PATTERN = /!(\w+)$/

function extractComponentTheme(theme:Theme, identifier) {
  return theme.componentThemes[identifier]
}

function isTheme(target) {
  return target && target.componentThemes !== undefined
}

/**
 * Enables theming support for a ReactJS component.
 *
 * @param identifier
 * A unique identifier used to select the “ComponentTheme” inside the “Theme”.
 */
export function themeable(identifier:string) {
  return (targetComponent:Class<Component>) => {
    // Modify the target component to enable support for presenters if necessary.
    if (!isPresentable(targetComponent))
      presentable(targetComponent)

    let prototype = targetComponent.prototype

    // Add a marker used to detect if the component is themeable.
    Object.defineProperty(prototype, SYMBOL, {
      get() {
        return true
      }
    })

    prototype.getComponentTheme = function() {
      let { theme } = this.props
      return isTheme(theme)
        ? extractComponentTheme(theme, identifier)
        : theme
    }

    prototype.getFlair = function() {
      // No theme was specified, it is impossible to resolve the flair.
      const COMPONENT_THEME = this.getComponentTheme()
      if (!COMPONENT_THEME)
        return undefined

      // Default or specific flair(s).
      const { flair: FLAIR_PROP } = this.props
      let flairs = COMPONENT_THEME.flairs.default
      if (FLAIR_PROP) {
        const MATCHES = FLAIR_PATTERN.exec(FLAIR_PROP)
        if (MATCHES !== null)
          flairs = MATCHES[1]
      }

      // Resolve the flair(s).
      let result = ''
      for (const TARGET of flairs.split(/\s+/)) {
        let extracted = COMPONENT_THEME.flairs[TARGET]
        if (Array.isArray(extracted))
          extracted = extracted.join(' ')
        result += ` ${extracted}`
      }

      // Remove unnecessary spaces.
      return result.replace(/\s+/g, ' ').trim()
    }

    // Allows the presenter to be extracted from the “ComponentTheme” or “Theme”.
    prototype.getPresenter = function() {
      const COMPONENT_THEME = this.getComponentTheme()
      if (!COMPONENT_THEME)
        return this.props.presenter || this.defaultPresenter
      // Specific presenter from the theme.
      const { flair: FLAIR_PROP } = this.props
      let presenter = COMPONENT_THEME.presenters.default
      if (FLAIR_PROP) {
        const MATCHES = PRESENTER_PATTERN.exec(FLAIR_PROP)
        if (MATCHES !== null)
          presenter = MATCHES[1]
      }
      return COMPONENT_THEME.presenters[presenter]
    }

    // Used to filter the “theme” and “flair” attributes.
    prototype.getPresentableData = function() {
      let result = {
        props: { ...this.props },
        state: { ...this.state }
      }

      const RESOLVED_FLAIR = result.className
        ? `${this.getFlair()} ${result.className}`
        : this.getFlair()

      if (RESOLVED_FLAIR)
        result.props.className = RESOLVED_FLAIR

      delete result.props.flair
      delete result.props.presenter
      delete result.props.theme
      return result
    }

    prototype.getTheme = function() {
      let { theme } = this.props
      return isTheme(theme) ? theme : undefined
    }

    return targetComponent
  }
}

export default themeable
