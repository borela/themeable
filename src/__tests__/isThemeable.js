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

import isThemeable from '../isThemeable'
import themeable from '../themeable'
import { Component } from 'react'

describe('Function “isThemeable”', () => {
  class NonThemeable extends Component {}

  @themeable
  class ThemeableComponentA extends Component {}

  @themeable('custom-string')
  class ThemeableComponentB extends Component {}

  const THEMEABLES = [
    ThemeableComponentA,
    ThemeableComponentB,
    new ThemeableComponentA,
    new ThemeableComponentB
  ]

  const NON_THEMEABLES = [
    NonThemeable,
    new NonThemeable,
    undefined,
    null,
    0,
    42,
    '',
    '...'
  ]

  for (const THEMEABLE of THEMEABLES) {
    it(`returns “true” for “${THEMEABLE}”`, () => {
      expect(isThemeable(THEMEABLE)).toBe(true)
    })
  }

  for (const NON_THEMEABLE of NON_THEMEABLES) {
    it(`returns “false” for “${NON_THEMEABLE}”`, () => {
      expect(isThemeable(NON_THEMEABLE)).toBe(false)
    })
  }
})
