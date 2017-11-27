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

jest.mock('../../resolveFlair')

import themeable from '../../themeable'
import { Component } from 'react'
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'

describe.skip('method ”getThemeableData”', () => {
  it('makes adds the resolved flair to the “className” prop', () => {

  })

  it('returns the context, props and state without flair, theme and presenter in props', () => {
    const CONTEXT = { contextA: 1, contextB: 2, contextC: 3 }
    const PROPS = { propA: 1, propB: 2, propC: 3 }
    const STATE = { stateA: 1, stateB: 2, stateC: 3 }

    @themeable
    class SomeComponent extends Component {
      state = STATE
    }

    const COMP = new SomeComponent(
      { flair: null, presenter: null, theme: null, ...PROPS },
      CONTEXT
    )

    expect(COMP.getThemeableData()).toEqual({
      context: CONTEXT,
      props: PROPS,
      state: STATE
    })
  })

  it('does not replace an existing implementation', () => {
    @themeable
    class SomeComponent extends Component {
      getThemeableData() {
        return 42
      }
    }
    const COMP = new SomeComponent
    expect(COMP.getThemeableData()).toBe(42)
  })
})
