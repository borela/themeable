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

import Adapter from 'enzyme-adapter-react-16'
import React, { Component } from 'react'
import { configure, shallow } from 'enzyme'
import { CONTEXT_WITH_COMPONENT_THEME, CONTEXT_WITH_THEME } from 'data'
import { resolveTheme, themeable } from '..'

import {
  CONTEXT as CONTEXT_COMPONENT_THEME,
  NORMAL as NORMAL_COMPONENT_THEME
} from 'AwesomeComponentTheme'

import {
  CONTEXT as CONTEXT_THEME,
  NORMAL as NORMAL_THEME
} from 'AwesomeTheme'

configure({ adapter: new Adapter() })

describe('Function “resolveTheme”', () => {
  class NonThemeable {}

  @themeable
  class SomeComponentA extends Component {}

  @themeable('custom-string')
  class SomeComponentB extends Component {}

  it('returns “undefined” when an non themeable is passed', () => {
    expect(resolveTheme(undefined)).toBeUndefined()
    expect(resolveTheme(null)).toBeUndefined()
    expect(resolveTheme(0)).toBeUndefined()
    expect(resolveTheme('')).toBeUndefined()
    expect(resolveTheme(NonThemeable)).toBeUndefined()
  })

  describe('when there’s', () => {
    describe('a “ComponentTheme” in the context', () => {
      it('returns the “ComponentTheme” from the context if the component has no identifier', () => {
        const COMP_A1 = shallow(
          <SomeComponentA/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const COMP_A2 = shallow(
          <SomeComponentA theme={NORMAL_THEME}/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const RESOLVED = {
          componentTheme: CONTEXT_COMPONENT_THEME,
          identifier: undefined,
          source: 'context',
          theme: undefined
        }

        expect(resolveTheme(COMP_A1)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_A2)).toEqual(RESOLVED)
      })

      it('returns the “ComponentTheme” from the context if no theme is specified', () => {
        const COMP = shallow(
          <SomeComponentB/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const RESOLVED = {
          componentTheme: CONTEXT_COMPONENT_THEME,
          identifier: undefined,
          source: 'context',
          theme: undefined
        }

        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })

      it('returns the specified “ComponentTheme”', () => {
        const COMP_A = shallow(
          <SomeComponentA theme={NORMAL_COMPONENT_THEME}/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const COMP_B = shallow(
          <SomeComponentB theme={NORMAL_COMPONENT_THEME}/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: undefined,
          source: 'property',
          theme: undefined
        }

        expect(resolveTheme(COMP_A)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_B)).toEqual(RESOLVED)
      })

      it('returns the used “ComponentTheme” from the “Theme” specified', () => {
        const COMP = shallow(
          <SomeComponentB theme={NORMAL_THEME}/>,
          CONTEXT_WITH_COMPONENT_THEME
        ).instance()

        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: 'custom-string',
          source: 'property',
          theme: NORMAL_THEME
        }

        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })
    })

    describe('a “Theme” in the context', () => {
      it('returns “undefined” if the component has no identifier', () => {
        const COMP_A1 = shallow(<SomeComponentA/>, CONTEXT_WITH_THEME).instance()
        const COMP_A2 = shallow(<SomeComponentA theme={NORMAL_THEME}/>, CONTEXT_WITH_THEME).instance()
        const RESOLVED = {
          componentTheme: undefined,
          identifier: undefined,
          source: undefined,
          theme: undefined
        }
        expect(resolveTheme(COMP_A1)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_A2)).toEqual(RESOLVED)
      })

      it('returns the used “ComponentTheme” from the “Theme” loaded from the context', () => {
        const COMP = shallow(<SomeComponentB/>, CONTEXT_WITH_THEME).instance()
        const RESOLVED = {
          componentTheme: CONTEXT_COMPONENT_THEME,
          identifier: 'custom-string',
          source: 'context',
          theme: CONTEXT_THEME
        }
        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })

      it('returns the “ComponentTheme” specified', () => {
        const COMP_A = shallow(
          <SomeComponentA theme={NORMAL_COMPONENT_THEME}/>,
          CONTEXT_WITH_THEME
        ).instance()

        const COMP_B = shallow(
          <SomeComponentB theme={NORMAL_COMPONENT_THEME}/>,
          CONTEXT_WITH_THEME
        ).instance()

        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: undefined,
          source: 'property',
          theme: undefined
        }

        expect(resolveTheme(COMP_A)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_B)).toEqual(RESOLVED)
      })

      it('returns the used “ComponentTheme” from the “Theme” specified', () => {
        const COMP = shallow(<SomeComponentB theme={NORMAL_THEME}/>, CONTEXT_WITH_THEME).instance()
        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: 'custom-string',
          source: 'property',
          theme: NORMAL_THEME
        }
        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })
    })

    describe('nothing in the context', () => {
      it('returns “undefined” if the component has no identifier', () => {
        const COMP_A1 = shallow(<SomeComponentA/>).instance()
        const COMP_A2 = shallow(<SomeComponentA theme={NORMAL_THEME}/>).instance()
        const RESOLVED = {
          componentTheme: undefined,
          identifier: undefined,
          source: undefined,
          theme: undefined
        }
        expect(resolveTheme(COMP_A1)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_A2)).toEqual(RESOLVED)
      })

      it('returns the “ComponentTheme” specified', () => {
        const COMP_A = shallow(<SomeComponentA theme={NORMAL_COMPONENT_THEME}/>).instance()
        const COMP_B = shallow(<SomeComponentB theme={NORMAL_COMPONENT_THEME}/>).instance()
        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: undefined,
          source: 'property',
          theme: undefined
        }
        expect(resolveTheme(COMP_A)).toEqual(RESOLVED)
        expect(resolveTheme(COMP_B)).toEqual(RESOLVED)
      })

      it('returns the used “ComponentTheme” from the “Theme” specified', () => {
        const COMP = shallow(<SomeComponentB theme={NORMAL_THEME}/>).instance()
        const RESOLVED = {
          componentTheme: NORMAL_COMPONENT_THEME,
          identifier: 'custom-string',
          source: 'property',
          theme: NORMAL_THEME
        }
        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })
    })
  })
})
