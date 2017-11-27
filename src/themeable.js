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

// import resolveFlair from './resolveFlair'
// import resolveTheme from './resolveTheme'
import isThemeable from './isThemeable'
import PropTypes from 'prop-types'
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
      return identifier
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

    // prototype.getFlair = function() {
    //   // No theme was specified, it is impossible to resolve the flair.
    //   const COMPONENT_THEME = {} // this.getComponentTheme()
    //   if (!COMPONENT_THEME)
    //     return undefined

    //   // Default or specific flair(s).
    //   const { flair: FLAIR_PROP } = this.props
    //   let flairs = COMPONENT_THEME.flairs.default
    //   if (FLAIR_PROP) {
    //     const MATCHES = FLAIR_PATTERN.exec(FLAIR_PROP)
    //     if (MATCHES !== null)
    //       flairs = MATCHES[1]
    //   }
    //   flairs = flairs.trim()

    //   // Resolve the flair(s).
    //   let result = ''
    //   for (const TARGET of flairs.split(/\s+/)) {
    //     let extracted = COMPONENT_THEME.flairs[TARGET]

    //     if (extracted !== undefined) {
    //       result += ` ${Array.isArray(extracted) ? extracted.join(' ') : extracted}`
    //       continue
    //     }

    //     const THEME = this.getTheme()
    //     const IDENTIFIER = this.getThemeableIdentifier()
    //     const CLASS = prototype.constructor.name

    //     // Component without an identifier.
    //     if (!IDENTIFIER)
    //       throw new Error(`Flair “${TARGET}” is not defined for the component without identifier “${CLASS}”.`)

    //     // Has an identifier but using a component theme.
    //     if (!THEME)
    //       throw new Error(`Flair “${TARGET}” is not defined for “${IDENTIFIER}” on the component theme.`)

    //     // Has an identifier and it is using a theme.
    //     throw new Error(`Flair “${TARGET}” is not defined for “${IDENTIFIER}” on theme “${THEME.name}”.`)
    //   }

    //   // Remove unnecessary spaces.
    //   return result.replace(/\s+/g, ' ').trim()
    // }

    // Allows the presenter to be extracted from the “ComponentTheme” or “Theme”.
    // prototype.getPresenter = function() {
    //   const COMPONENT_THEME = this.getComponentTheme()
    //   if (!COMPONENT_THEME)
    //     return this.props.presenter || this.defaultPresenter

    //   // Specific presenter from the theme.
    //   const { flair: FLAIR_PROP } = this.props
    //   let presenter = COMPONENT_THEME.presenters.default
    //   if (FLAIR_PROP) {
    //     const MATCHES = PRESENTER_PATTERN.exec(FLAIR_PROP)
    //     if (MATCHES !== null)
    //       presenter = MATCHES[1]
    //   }

    //   let result = COMPONENT_THEME.presenters[presenter]
    //   if (result !== undefined)
    //     return result

    //   const THEME = this.getTheme()
    //   const IDENTIFIER = this.getThemeableIdentifier()

    //   // Using a component theme.
    //   if (!THEME)
    //     throw new Error(`Presenter “${presenter}” is not defined for “${IDENTIFIER}” on component theme.`)

    //   // Using a theme.
    //   const { name: THEME_NAME = '' } = this.getTheme()
    //   throw new Error(`Presenter “${presenter}” is not defined for “${IDENTIFIER}” on theme “${THEME_NAME}”.`)
    // }

    // prototype.getTheme = function() {
    //   const { theme: THEME } = this.props
    //   if (!THEME)
    //     return this.context.theme
    //   return isTheme(THEME) ? THEME : undefined
    // }

    // Used to combine the presentable’s data with the new attributes from the
    // themeable logic.
    // let oldGetPresentableData = prototype.getPresentableData

    // The actual logic that combines the data.
    // prototype.getDefaultThemeableData = function() {
    //   let result = oldGetPresentableData.call(this)

      // const IDENTIFIER = this.getThemeableIdentifier()
      // const RESOLVED_THEME = resolveTheme({
      //   context: result.context,
      //   identifier: IDENTIFIER,
      //   props: result.props

      // })

      // if (!RESOLVED_THEME.componentTheme) {
      //   delete result.context.theme
      //   delete result.props.flair
      //   delete result.props.theme
      //   return
      // }

      // const RESOLVED_FLAIR = resolveFlair(RESOLVED_THEME, result.props.flair)
    //   if (RESOLVED_FLAIR) {
    //     if (result.props.className)
    //       result.props.className += ` ${RESOLVED_FLAIR}`
    //     else
    //       result.props.className = RESOLVED_FLAIR
    //   }

    //   resolveFlair()
    //   delete result.context.theme
    //   delete result.props.flair
    //   delete result.props.theme
    //   return result
    // }

    // Add themeable hook if it doesn’t exist.
    // if (!prototype.getThemeableData) {
    //   prototype.getThemeableData = function() {
    //     return getDefaultThemeableData()
    //   }
    // }

    // Implement the presentable data hook.
    // prototype.getPresentableData = prototype.getThemeableData

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
  // It’s an identifier.
  if (typeof identifierOrComponent === 'string')
    return decorateComponent(identifierOrComponent)
  // It’s a component.
  return decorateComponent()(identifierOrComponent)
}

export default themeable
