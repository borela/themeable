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
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import themeable from '../../themeable'

describe.skip('method ”getDefaultThemeableData”', () => {
  @themeable('custom-string')
  class SomeComponent extends Component {}

  const OTHER_PROPS = {
    a: 1, b: 2, c: 3
  }

  const COMP = new SomeComponent({
    ...OTHER_PROPS,
    flair: 'red!foo',
    theme: NORMAL_THEME
  })

  it('returns the props without “flair” and “theme”', () => {
    expect(COMP.getDefaultThemeableData()).toEqual({
      context: {},
      props: OTHER_PROPS,
      state: {}
    })
  })
})
