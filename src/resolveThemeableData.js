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
import type { ResolvedFlair } from './resolveFlair'
import { Component } from 'react'
import { resolvePresentableData } from 'presentable'

export function resolveThemeableData(target:Component<*>, resolvedFlair:ResolvedFlair) {
  if (!isThemeable(target))
    return undefined

  let result = resolvePresentableData(target)

  if (!resolvedFlair) {
    delete result.props.flair
    delete result.props.theme
    return result
  }

  let { flair } = resolvedFlair
  let { className } = result.props

  if (flair) {
    if (className)
      flair = `${className} ${flair}`
    result.props.className = flair
  }

  delete result.props.flair
  delete result.props.theme
  return result
}

export default resolveThemeableData
