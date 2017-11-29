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

import isTheme from './isTheme'
import isThemeable from './isThemeable'

function _resolveTheme(source:string, data:Object, identifier:string) {
  if (!data)
    return undefined

  let { theme } = data
  if (!theme)
    return undefined

  if (isTheme(theme)) {
    return !identifier
      ? undefined
      : {
        componentTheme: theme.componentThemes[identifier],
        identifier,
        source,
        theme
      }
  }

  return {
    componentTheme: theme,
    identifier: undefined,
    source,
    theme: undefined
  }
}

export type ResolvedTheme = {
  componentTheme:ComponentTheme,
  identifier?:string,
  source:string,
  theme?:Theme
}

/**
 * Tries to resolve the component theme from the properties and context.
 */
export function resolveTheme(target:Component<*>):ResolvedTheme {
  debugger;
  if (!isThemeable(target))
    return undefined
  let { context, props } = target
  const IDENTIFIER = target.getThemeableIdentifier()
  return _resolveTheme('property', props, IDENTIFIER)
    || _resolveTheme('context', context, IDENTIFIER)
    || undefined
}

export default resolveTheme
