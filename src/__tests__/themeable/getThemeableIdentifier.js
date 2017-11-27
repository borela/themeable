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
  @themeable
  class SomeComponentA extends Component {}

  @themeable('custom-string')
  class SomeComponentB extends Component {}

  const COMP_A = new SomeComponentA
  const COMP_B = new SomeComponentB

  it('returns undefined if no identifier is provided', () => {
    expect(COMP_A.getThemeableIdentifier()).toBeUndefined()
  })

  it('returns the identifier if one was provided', () => {
    expect(COMP_B.getThemeableIdentifier()).toBe('custom-string')
  })
})
