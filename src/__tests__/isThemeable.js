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

import { Component } from 'react'
import { isThemeable, themeable } from '..'

describe('Function “isThemeable”', () => {
  class NonThemeable extends Component {}

  @themeable
  class ThemeableComponentA extends Component {}

  @themeable('custom-string')
  class ThemeableComponentB extends Component {}

  it('returns “true” for a themeable class', () => {
    expect(isThemeable(ThemeableComponentA)).toBe(true)
    expect(isThemeable(ThemeableComponentB)).toBe(true)
  })

  it('returns “true” for a themeable instance', () => {
    expect(isThemeable(new ThemeableComponentA)).toBe(true)
    expect(isThemeable(new ThemeableComponentB)).toBe(true)
  })

  it('returns “false” for a non themeable class', () => {
    expect(isThemeable(NonThemeable)).toBe(false)
  })

  it('returns “false” for a non themeable instance', () => {
    expect(isThemeable(new NonThemeable)).toBe(false)
  })

  it('returns “false” for any other value', () => {
    expect(isThemeable(undefined)).toBe(false)
    expect(isThemeable(null)).toBe(false)
    expect(isThemeable(0)).toBe(false)
    expect(isThemeable('')).toBe(false)
  })
})
