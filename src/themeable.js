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

import isThemeable from './isThemeable'
import PropTypes from 'prop-types'
import resolveFlair from './resolveFlair'
import resolveTheme from './resolveTheme'
import { Component } from 'react'
import { isPresentable, presentable } from 'presentable'

export const SYMBOL = Symbol.for('themeable')

function decorateComponent(identifier) {
  return targetComponent => {
    // Modify the target component to enable support for presenters if necessary.
    if (!isPresentable(targetComponent))
      presentable(targetComponent)

    let prototype = targetComponent.prototype

    // Allow the identifier to be modified without affecting an already themeable
    // component.
    prototype.getThemeableIdentifier = function() {
      return identifier ?? prototype.constructor.name
    }

    if (isThemeable(targetComponent))
      return targetComponent

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

    // Used to combine the presentable’s data with the new attributes from the
    // themeable logic.
    let oldGetPresentableData = prototype.getPresentableData

    // Combine presentable data with themeable data.
    prototype.getPresentableData = function() {
      let result = oldGetPresentableData.call(this)

      const RESOLVED_THEME = resolveTheme(this)
      const RESOLVED_FLAIR = resolveFlair(this, RESOLVED_THEME)

      if (RESOLVED_FLAIR) {
        let { flair } = RESOLVED_FLAIR
        let { className } = result.props

        if (flair) {
          result.props.className = className
            ? `${className} ${flair}`
            : flair
        }
      }

      delete result.props.flair
      delete result.props.theme
      return result
    }

    // The final component with theming support.
    return targetComponent
  }
}

/**
 * Enables theming support for a ReactJS component.
 *
 * @param identifierOrComponent
 * A unique identifier used to select the “ComponentTheme” inside the “Theme” or
 * the component to enable theming. If the component has no identifier, it’ll
 * only support themes passed directly to it.
 */
export function themeable(identifierOrComponent:string|Class<Component<*>>) {
  // It’s a component.
  if (identifierOrComponent && identifierOrComponent.prototype instanceof Component)
    return decorateComponent()(identifierOrComponent)
  // It’s an identifier or bogus identifier.
  return decorateComponent(identifierOrComponent)
}

export default themeable
