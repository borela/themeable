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

const NO_THEME_RESOLVED = {
  componentTheme: undefined,
  identifier: undefined,
  source: undefined,
  theme: undefined
}

function _resolveTheme(source, data, identifier) {
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

/**
 * Tries to resolve the component theme first from the properties and then from
 * the context if the former failed.
 */
export function resolveTheme(targetComponent) {
  if (!isThemeable(targetComponent))
    return undefined
  const IDENTIFIER = targetComponent.getThemeableIdentifier()
  return _resolveTheme('property', targetComponent.props, IDENTIFIER)
    || _resolveTheme('context', targetComponent.context, IDENTIFIER)
    || NO_THEME_RESOLVED
}

export default resolveTheme
