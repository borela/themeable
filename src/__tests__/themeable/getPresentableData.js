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

import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import themeable from '../../themeable'
import { Component } from 'react'

describe('method ”getPresentableData', () => {
  const CONTEXT = { contextA: 1, contextB: 2, contextC: 3 }
  const PROPS = { propA: 1, propB: 2, propC: 3 }
  const STATE = { stateA: 1, stateB: 2, stateC: 3 }

  @themeable('custom-string')
  class SomeComponent extends Component {
    state = STATE
  }

  it('returns the expected data without presentable and themeable meta properties', () => {
    const COMP_A_PROPS = {
      flair: 'red',
      presenter: null,
      theme: NORMAL_THEME,
      ...PROPS
    }

    const COMP_A = new SomeComponent(COMP_A_PROPS, CONTEXT)

    expect(COMP_A.getPresentableData()).toEqual({
      context: CONTEXT,
      props: {
        className: 'redA redB redC',
        ...PROPS
      },
      state: STATE
    })

    const COMP_B_PROPS = {
      className: 'foo bar baz',
      flair: 'red',
      presenter: null,
      theme: NORMAL_THEME,
      ...PROPS
    }

    const COMP_B = new SomeComponent(COMP_B_PROPS, CONTEXT)

    expect(COMP_B.getPresentableData()).toEqual({
      context: CONTEXT,
      props: {
        className: 'foo bar baz redA redB redC',
        ...PROPS
      },
      state: STATE
    })
  })
})
