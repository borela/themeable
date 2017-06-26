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

import type ComponentTheme from './ComponentTheme'
import { Component } from 'react'
import { isPresentable, presentable } from 'presentable'

const SYMBOL = Symbol.for('themeable')

/**
 * Enables theming support for a ReactJS component.
 *
 * @param identifier
 * A unique identifier used to select the “ComponentTheme” inside the “Theme”.
 */
export function themeable(identifier:string) {
  return (targetComponent:Class<Component>) => {
    if (!isPresentable(targetComponent))
      targetComponent = presentable(targetComponent)

    let prototype = targetComponent.prototype

    // Add a marker.
    prototype[SYMBOL] = true

    return targetComponent
  }
}

export default themeable
