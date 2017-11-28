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

function _resolveTheme(source, data, identifier) {
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

type ExpectedData = {
  context?:Object,
  identifier?:string,
  props?:Object
}

/**
 * Tries to resolve the component theme from the properties and context.
 */
export function resolveTheme(data:ExpectedData) {
  if (!data)
    return undefined
  let { context, identifier, props } = data
  return _resolveTheme('property', props, identifier)
    || _resolveTheme('context', context, identifier)
    || undefined
}

export default resolveTheme
