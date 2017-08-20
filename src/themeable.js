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

import PropTypes from 'prop-types'
import { Component } from 'react'
import { isPresentable, presentable } from 'presentable'

const SYMBOL = Symbol.for('themeable')
const FLAIR_PATTERN = /^(\w+(?:\s+\w+)*)\s*!?/
const PRESENTER_PATTERN = /!\s*(\w+)$/

/**
 * Checks if an object has the format of a “Theme’, not a “ComponentTheme”.
 */
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

    // The theme attribute in the context will be defined by the “ContextTheme”
    // component.
    if (!targetComponent.contextTypes)
      targetComponent.contextTypes = {}
    targetComponent.contextTypes.theme = PropTypes.object

    // Marker used to detect if the component is themeable.
    Object.defineProperty(prototype, SYMBOL, {
      get() {
        return true
      }
    })

    prototype.getComponentTheme = function() {
      let { theme = this.context.theme } = this.props
      return isTheme(theme)
        ? theme.componentThemes[identifier]
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
      flairs = flairs.trim()

      // Resolve the flair(s).
      let result = ''
      for (const TARGET of flairs.split(/\s+/)) {
        let extracted = COMPONENT_THEME.flairs[TARGET]

        if (extracted === undefined) {
          const THEME = this.getTheme()
          throw new Error(`Flair “${TARGET}” is not defined for “${identifier}” on theme “${THEME.name}”.`)
        }

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

      let result = COMPONENT_THEME.presenters[presenter]
      if (result === undefined) {
        const { name: THEME_NAME = '' } = this.getTheme()
        throw new Error(`Presenter “${presenter}” is not defined for “${identifier}” on theme “${THEME_NAME}”.`)
      }
      return result
    }

    prototype.getTheme = function() {
      const { theme: THEME } = this.props
      if (!THEME)
        return this.context.theme
      return isTheme(THEME) ? THEME : undefined
    }

    // Used to combine the presentable’s data with the new attributes from the
    // themeable logic.
    let oldGetPresentableData = prototype.getPresentableData

    // The actual logic that combines the data.
    prototype.getDefaultThemeableData = function() {
      let result = oldGetPresentableData.call(this)

      const RESOLVED_FLAIR = result.className
        ? `${this.getFlair()} ${result.className}`
        : this.getFlair()

      if (RESOLVED_FLAIR) {
        if (result.props.className)
          result.props.className += ` ${RESOLVED_FLAIR}`
        else
          result.props.className = RESOLVED_FLAIR
      }

      delete result.props.flair
      delete result.props.theme
      return result
    }

    // Implement the presentable data hook.
    prototype.getPresentableData = function() {
      return this.getThemeableData()
    }

    // Add themeable hook.
    if (!prototype.getThemeableData) {
      prototype.getThemeableData = function() {
        return this.getDefaultThemeableData()
      }
    }

    return targetComponent
  }
}

export default themeable
