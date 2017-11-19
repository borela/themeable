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

const NO_FLAIR_RESOLVED = {
  flair: undefined,
  presenter: undefined
}

const EXTRACTOR = /\s*(\w+(?:\s+\w+)*)?(?:\s*!\s*(\w+))?\s*/

export function resolveFlair(resolvedTheme, pattern) {
  if (!resolvedTheme.componentTheme)
    return NO_FLAIR_RESOLVED

  const COMPONENT_THEME = resolvedTheme.componentTheme
  const DEFAULT_FLAIR = COMPONENT_THEME.flairs.default
  const DEFAULT_PRESENTER = COMPONENT_THEME.presenters.default

  let flair = COMPONENT_THEME.flairs[DEFAULT_FLAIR]
  let presenter = COMPONENT_THEME.presenters[DEFAULT_PRESENTER]

  if (!pattern)
    return { flair, presenter }

  const MATCHES = EXTRACTOR.exec(pattern)
  if (!MATCHES)
    return { flair, presenter }

  const TARGET_FLAIRS = MATCHES[1]
  const TARGET_PRESENTER = MATCHES[2]

  if (TARGET_PRESENTER)
    presenter = COMPONENT_THEME.presenters[TARGET_PRESENTER]

  if (!TARGET_FLAIRS)
    return { flair, presenter }

  flair = ''
  for (const TARGET of TARGET_FLAIRS.split(/\s+/)) {
    const EXTRACTED = COMPONENT_THEME.flairs[TARGET]
    if (!EXTRACTED)
      continue
    flair += ` ${Array.isArray(EXTRACTED) ? EXTRACTED.join(' ') : EXTRACTED}`
  }

  // Remove unnecessary spaces.
  flair = flair.replace(/\s+/g, ' ').trim()

  return { flair, presenter }
}

export default resolveFlair
