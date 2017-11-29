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

import type { ResolvedTheme } from '../resolveTheme'
import { Component } from 'react'

export type ResolvedFlair = {|
  flair?:string,
  presenter?:Component<*>
|}

/**
 * Remove unnecessary spaces in resolved flairs.
 */
function normalizeFlair(resolvedFlair:ResolvedFlair):ResolvedFlair {
  let { flair, presenter } = resolvedFlair
  return {
    flair: flair.replace(/\s+/g, ' ').trim(),
    presenter
  }
}

const EXTRACTOR = /\s*(\w+(?:\s+\w+)*)?(?:\s*!\s*(\w+))?\s*/

/**
 * Returns the resulting flair and presenter from the resolved theme using the
 * specified pattern.
 *
 * @param pattern
 * A pattern
 */
export function resolveFlair(resolvedTheme:ResolvedTheme, pattern:string):ResolvedFlair {
  const COMPONENT_THEME = resolvedTheme?.componentTheme
  if (!COMPONENT_THEME)
    return undefined

  const FLAIRS = COMPONENT_THEME.flairs
  const PRESENTERS = COMPONENT_THEME.presenters

  if (!FLAIRS && !PRESENTERS)
    return undefined

  const DEFAULT_FLAIR = FLAIRS[FLAIRS.default] || {}
  const DEFAULT_PRESENTER = PRESENTERS[PRESENTERS.default] || {}

  let flair = DEFAULT_FLAIR
  let presenter = DEFAULT_PRESENTER

  if (!pattern)
    return normalizeFlair({ flair, presenter })

  // Extract the flair and presenter portion from the pattern passed.
  const MATCHES = EXTRACTOR.exec(pattern)
  if (!MATCHES)
    return normalizeFlair({ flair, presenter })

  const TARGET_FLAIRS = MATCHES[1]
  const TARGET_PRESENTER = MATCHES[2]

  // If there's a custom presenter, try to extract it.
  if (TARGET_PRESENTER)
    presenter = PRESENTERS[TARGET_PRESENTER] || DEFAULT_PRESENTER

  // There are no custom flairs.
  if (!TARGET_FLAIRS)
    return normalizeFlair({ flair, presenter })

  // Extract each flair from the component theme and concatenate into a string.
  flair = ''
  for (const TARGET of TARGET_FLAIRS.split(/\s+/)) {
    const EXTRACTED = FLAIRS[TARGET]
    if (!EXTRACTED)
      continue
    flair += ` ${Array.isArray(EXTRACTED) ? EXTRACTED.join(' ') : EXTRACTED}`
  }

  return normalizeFlair({ flair, presenter })
}

export default resolveFlair
