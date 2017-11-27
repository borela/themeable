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

import each from 'jest-each'
import resolveThemeableData from '../resolveThemeableData'
import themeable from '../themeable'
import { Component } from 'react'

describe('Function “resolveThemeableData”', () => {
  const CONTEXT = { contextA: 1, contextB: 2, contextC: 3 }
  const PROPS = { propA: 1, propB: 2, propC: 3 }
  const STATE = { stateA: 1, stateB: 2, stateC: 3 }
  const RESOLVED_FLAIR = { flair: 'qux corge grault' }

  @themeable
  class SomeComponent extends Component {
    state = STATE
  }

  it('returns the expected data without themeable meta properties', () => {
    const COMP_A = new SomeComponent(
      {
        flair: null,
        presenter: null,
        theme: null,
        ...PROPS
      },
      CONTEXT
    )

    expect(resolveThemeableData(COMP_A, RESOLVED_FLAIR)).toEqual({
      context: CONTEXT,
      props: { className: 'qux corge grault', ...PROPS },
      state: STATE
    })

    const COMP_B = new SomeComponent(
      {
        className: 'foo bar baz',
        flair: null,
        presenter: null,
        theme: null,
        ...PROPS
      },
      CONTEXT
    )

    expect(resolveThemeableData(COMP_B, RESOLVED_FLAIR)).toEqual({
      context: CONTEXT,
      props: { className: 'foo bar baz qux corge grault', ...PROPS },
      state: STATE
    })
  })

  class SomeClass {}
  const BOGUS_THEMEABLES = [
    [ undefined ],
    [ null ],
    [ '' ],
    [ '123' ],
    [ 0 ],
    [ 42 ],
    [ () => SomeClass ]
  ]

  each(BOGUS_THEMEABLES)
    .it('returns undefined for “%s” passed as target', themeable => {
      expect(resolveThemeableData(themeable)).toBeUndefined()
    })

  const BOGUS_RESOLVED_FLAIR = [
    [ undefined ],
    [ null ],
    [{}],
    [ '' ],
    [ '123' ],
    [ 0 ],
    [ 42 ],
    [ () => SomeComponent ],
    [ () => SomeClass ]
  ]

  each(BOGUS_RESOLVED_FLAIR)
    .it('returns basic data for flair “%s”', resolvedFlair => {
      const COMP_A = new SomeComponent(
        {
          flair: null,
          presenter: null,
          theme: null,
          ...PROPS
        },
        CONTEXT
      )

      expect(resolveThemeableData(COMP_A, resolvedFlair)).toEqual({
        context: CONTEXT,
        props: PROPS,
        state: STATE
      })

      const COMP_B = new SomeComponent(
        {
          className: 'foo bar baz',
          flair: null,
          presenter: null,
          theme: null,
          ...PROPS
        },
        CONTEXT
      )

      expect(resolveThemeableData(COMP_B, resolvedFlair)).toEqual({
        context: CONTEXT,
        props: { className: 'foo bar baz', ...PROPS },
        state: STATE
      })
    })
})
