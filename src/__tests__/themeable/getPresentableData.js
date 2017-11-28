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

import themeable from '../../themeable'
import { Component } from 'react'

describe('method ”getPresentableData', () => {
  it('returns the value from “getThemeableData”', () => {
    @themeable
    class SomeComponentA extends Component {
      getThemeableData() {
        return 123
      }
    }

    @themeable('custom-string')
    class SomeComponentB extends Component {
      getThemeableData() {
        return 456
      }
    }

    const COMP_A = new SomeComponentA
    const COMP_B = new SomeComponentB
    const SPY_A = jest.spyOn(COMP_A, 'getThemeableData')
    const SPY_B = jest.spyOn(COMP_B, 'getThemeableData')

    expect(COMP_A.getPresentableData()).toBe(123)
    expect(COMP_B.getPresentableData()).toBe(456)
    expect(SPY_A).toHaveBeenCalled()
    expect(SPY_B).toHaveBeenCalled()
  })
})
