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
import themeable from '../../themeable'

describe('method ”getThemeableIdentifier”', () => {
  const CUSTOM_IDENTIFIERS = [
    0,
    123,
    '',
    '...'
  ]

  for (const CUSTOM_IDENTIFIER of CUSTOM_IDENTIFIERS) {
    @themeable(CUSTOM_IDENTIFIER)
    class SomeComponent extends Component {}
    const COMP = new SomeComponent
    it(`returns the specified identifier “${CUSTOM_IDENTIFIER}”`, () => {
      expect(COMP.getThemeableIdentifier()).toBe(CUSTOM_IDENTIFIER)
    })
  }

  const UNDEFINED_IDENTIFIERS = [
    undefined,
    null
  ]

  for (const UNDEFINED_IDENTIFIER of UNDEFINED_IDENTIFIERS) {
    @themeable(UNDEFINED_IDENTIFIER)
    class SomeComponent extends Component {}
    const COMP = new SomeComponent
    it(`returns the class name for “${UNDEFINED_IDENTIFIER}”`, () => {
      expect(COMP.getThemeableIdentifier()).toBe('SomeComponent')
    })
  }
})
