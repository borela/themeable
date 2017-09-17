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

  @themeable('custom-string')
  class SomeComponent extends Component {}

  describe('Used on themeable', () => {
    it('returns “true” on class', () => {
      expect(isThemeable(SomeComponent))
        .toBe(true)
    })

    it('returns “true” on instance', () => {
      const INSTANCE = new SomeComponent
      expect(isThemeable(INSTANCE))
        .toBe(true)
    })
  })

  describe('Used on non themeable', () => {
    it('returns “false” on class', () => {
      expect(isThemeable(NonThemeable))
        .toBe(false)
    })

    it('returns “false” on instance', () => {
      const INSTANCE = new NonThemeable
      expect(isThemeable(INSTANCE))
        .toBe(false)
    })
  })
})
