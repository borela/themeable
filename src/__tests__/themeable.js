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

import BarPresenter from 'BarPresenter'
import FooPresenter from 'FooPresenter'
import React, { Component } from 'react'
import { defaultPresenter, isPresentable, presentable } from 'presentable'
import { NORMAL as NORMAL_COMPONENT_THEME } from 'AwesomeComponentTheme'
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import { shallow } from 'enzyme'
import { themeable } from '..'

describe('Decorator themeable applied on “SomeComponent”', () => {
  describe('It is presentable already', () => {
    @themeable('SomeComponent')
    @presentable
    class SomeComponent extends Component {}

    it('has the same constructor', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })
  })

  describe('It is not presentable yet', () => {
    @themeable('SomeComponent')
    class SomeComponent extends Component {}

    it('has the same constructor', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('becomes presentable too', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(isPresentable(SomeComponent))
        .toBe(true)
      expect(isPresentable(INSTANCE))
        .toBe(true)
    })
  })

  describe('Add a method “getComponentTheme”', () => {
    @themeable('SomeComponent')
    class SomeComponent extends Component {}

    it('returns undefined when no “ComponentTheme” or “Theme” is specified', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(INSTANCE.getComponentTheme())
        .toBeUndefined()
    })

    it('returns the “ComponentTheme” specified', () => {
      const INSTANCE = shallow(<SomeComponent theme={NORMAL_COMPONENT_THEME}/>)
        .instance()
      expect(INSTANCE.getComponentTheme())
        .toEqual(NORMAL_COMPONENT_THEME)
    })

    it('returns the used “ComponentTheme” when a “Theme” is specified', () => {
      const INSTANCE = shallow(<SomeComponent theme={NORMAL_THEME}/>)
        .instance()
      expect(INSTANCE.getComponentTheme())
        .toEqual(NORMAL_COMPONENT_THEME)
    })
  })

  describe('Add method “getFlair”', () => {
    @themeable('SomeComponent')
    class SomeComponent extends Component {}

    it('returns undefined when no “ComponentTheme” or “Theme” is specified', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(INSTANCE.getFlair())
        .toBeUndefined()
    })

    it('returns the default flair from the “ComponentTheme”', () => {
      const DEFAULT_FLAIR = 'blueA blueB blueC'
      const COMP1 = shallow(<SomeComponent theme={NORMAL_COMPONENT_THEME}/>).instance()
      const COMP2 = shallow(<SomeComponent theme={NORMAL_THEME}/>).instance()
      expect(COMP1.getFlair()).toEqual(DEFAULT_FLAIR)
      expect(COMP2.getFlair()).toEqual(DEFAULT_FLAIR)
    })

    it('returns the specified flair(s) from the “ComponentTheme”', () => {
      // The red and green flair has irregular spaces. In this test we’ll make
      // sure that the theming system is normalizing the value.
      const ORIGINAL_RED_FLAIR = NORMAL_COMPONENT_THEME.flairs.red
      const ORIGINAL_GREEN_FLAIR = NORMAL_COMPONENT_THEME.flairs.green

      expect(ORIGINAL_RED_FLAIR).toBe('redA     redB   redC')
      expect(ORIGINAL_GREEN_FLAIR).toEqual([ '  greenA   ', 'greenB', 'greenC' ])

      const NORMALIZED_RED_FLAIR = 'redA redB redC'
      const NORMALIZED_GREEN_FLAIR = 'greenA greenB greenC'
      const NORMALIZED_RED_GREEN_FLAIRS = 'redA redB redC greenA greenB greenC'
      const NORMALIZED_GREEN_RED_FLAIRS = 'greenA greenB greenC redA redB redC'

      let TEST_DATA = [
        [ 'green', NORMALIZED_GREEN_FLAIR ],
        [ 'green!', NORMALIZED_GREEN_FLAIR ],
        [ 'red!', NORMALIZED_RED_FLAIR ],
        [ 'red!', NORMALIZED_RED_FLAIR ],
        [ 'red green', NORMALIZED_RED_GREEN_FLAIRS ],
        [ 'red green!', NORMALIZED_RED_GREEN_FLAIRS ],
        [ 'green red!', NORMALIZED_GREEN_RED_FLAIRS ],
        [ 'green red!', NORMALIZED_GREEN_RED_FLAIRS ],
        // Irregular spaces must be accepted too.
        [ 'red green', NORMALIZED_RED_GREEN_FLAIRS ],
        [ 'red  green!', NORMALIZED_RED_GREEN_FLAIRS ],
        [ 'green   red!', NORMALIZED_GREEN_RED_FLAIRS ],
        [ 'green    red!', NORMALIZED_GREEN_RED_FLAIRS ]
      ]

      for (let [ flair, expected ] of TEST_DATA) {
        const COMP1 = shallow(
          <SomeComponent
            flair={flair}
            theme={NORMAL_COMPONENT_THEME}
          />
        ).instance()

        const COMP2 = shallow(
          <SomeComponent
            flair={flair}
            theme={NORMAL_THEME}
          />
        ).instance()

        expect(COMP1.getFlair()).toEqual(expected)
        expect(COMP2.getFlair()).toEqual(expected)
      }
    })
  })

  describe('Add a method “getTheme”', () => {
    @themeable('SomeComponent')
    class SomeComponent extends Component {}

    it('returns undefined when no “Theme” is specified', () => {
      const INSTANCE = shallow(<SomeComponent/>).instance()
      expect(INSTANCE.getTheme())
        .toBeUndefined()
    })

    it('returns undefined when a “ComponentTheme” is specified', () => {
      const INSTANCE = shallow(<SomeComponent theme={NORMAL_COMPONENT_THEME}/>)
        .instance()
      expect(INSTANCE.getTheme())
        .toBeUndefined()
    })

    it('returns the “Theme” specified', () => {
      const INSTANCE = shallow(<SomeComponent theme={NORMAL_THEME}/>)
        .instance()
      expect(INSTANCE.getTheme())
        .toEqual(NORMAL_THEME)
    })
  })

  describe('Modifies the “getPresenter” method', () => {
    describe('It has a default presenter', () => {
      class SomePresenter extends Component {
        render() {
          return <div>Default presenter!</div>
        }
      }

      @themeable('SomeComponent')
      @defaultPresenter(SomePresenter)
      class SomeComponent extends Component {}

      it('returns the default presenter', () => {
        const INSTANCE = shallow(<SomeComponent/>).instance()
        expect(INSTANCE.getPresenter())
          .toBe(SomePresenter)
      })

      it('returns the default presenter from a “ComponentTheme” or “Theme”', () => {
        const TEST_DATA = [
          undefined,
          'red',
          'green ',
          ' green ',
          'red green',
          'red  green',
          'red   green'
        ]

        for (let flair of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresenter()).toBe(BarPresenter)
          expect(COMP2.getPresenter()).toBe(BarPresenter)
        }
      })

      it('returns the specified presenter', () => {
        const TEST_DATA = [
          '!foo',
          '! foo',
          '!  foo',
          'red!foo',
          'red! foo',
          'red!  foo',
          'green red!foo',
          'green red! foo',
          'green red!  foo'
        ]

        for (let flair of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresenter()).toBe(FooPresenter)
          expect(COMP2.getPresenter()).toBe(FooPresenter)
        }
      })
    })

    describe('It does not have a default presenter', () => {
      @themeable('SomeComponent')
      class SomeComponent extends Component {}

      it('returns undefined', () => {
        const INSTANCE = shallow(<SomeComponent/>).instance()
        expect(INSTANCE.getPresenter())
          .toBeUndefined()
      })

      it('returns the default presenter from a “ComponentTheme” or “Theme”', () => {
        const TEST_DATA = [
          undefined,
          'red',
          'green ',
          ' green ',
          'red green',
          'red  green',
          'red   green'
        ]

        for (let flair of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresenter()).toBe(BarPresenter)
          expect(COMP2.getPresenter()).toBe(BarPresenter)
        }
      })

      it('returns the specified presenter', () => {
        const TEST_DATA = [
          '!foo',
          '! foo',
          '!  foo',
          'red!foo',
          'red! foo',
          'red!  foo',
          'green red!foo',
          'green red! foo',
          'green red!  foo'
        ]

        for (let flair of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flair}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresenter()).toBe(FooPresenter)
          expect(COMP2.getPresenter()).toBe(FooPresenter)
        }
      })
    })
  })
})
