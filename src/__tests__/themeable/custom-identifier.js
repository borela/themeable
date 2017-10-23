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

import React, { Component } from 'react'
import { defaultPresenter, isPresentable, presentable } from 'presentable'
import { NORMAL as NORMAL_COMPONENT_THEME } from 'AwesomeComponentTheme'
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import { shallow } from 'enzyme'
import { TEST_DATA } from 'data'
import { themeable } from '../..'

const CONTEXT_THEME = {
  ...NORMAL_THEME,
  a: 1, b: 2, c: 3
}

const OPTIONS = {
  context: {
    theme: CONTEXT_THEME
  }
}

describe('Decorator themeable applied on “SomeComponent” with a custom identifier', () => {
  describe('Presentable already', () => {
    @themeable('custom-string')
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

  describe('Not presentable yet', () => {
    @themeable('custom-string')
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

  describe('Method “getComponentTheme”', () => {
    @themeable('custom-string')
    class SomeComponent extends Component {}

    describe('No theme in the context', () => {
      it('returns undefined when no “ComponentTheme” or “Theme” is available', () => {
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

    describe('There’s a theme in the context', () => {
      it('returns the used “ComponentTheme” from the “Theme” in the context', () => {
        const INSTANCE = shallow(
          <SomeComponent/>,
          OPTIONS
        ).instance()
        expect(INSTANCE.getComponentTheme())
          .toEqual(NORMAL_COMPONENT_THEME)
      })

      it('returns the “ComponentTheme” specified', () => {
        const INSTANCE = shallow(
          <SomeComponent theme={NORMAL_COMPONENT_THEME}/>,
          OPTIONS
        )
          .instance()
        expect(INSTANCE.getComponentTheme())
          .toEqual(NORMAL_COMPONENT_THEME)
      })

      it('returns the used “ComponentTheme” when a “Theme” is specified', () => {
        const INSTANCE = shallow(
          <SomeComponent theme={NORMAL_THEME}/>,
          OPTIONS
        )
          .instance()
        expect(INSTANCE.getComponentTheme())
          .toEqual(NORMAL_COMPONENT_THEME)
      })
    })
  })

  describe('Method “getFlair”', () => {
    @themeable('custom-string')
    class SomeComponent extends Component {}

    describe('No theme in the context', () => {
      it('returns undefined when no “ComponentTheme” or “Theme” is available', () => {
        const INSTANCE = shallow(<SomeComponent/>).instance()
        expect(INSTANCE.getFlair())
          .toBeUndefined()
      })

      it('returns the expected flairs', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flairPattern}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flairPattern}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getFlair()).toEqual(expected)
          expect(COMP2.getFlair()).toEqual(expected)
        }
      })

      it('Throws when the specified flair is not found', () => {
        expect(() => {
          const INSTANCE = shallow(
            <SomeComponent
              flair="unknownFlair"
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()
          INSTANCE.getFlair()
        }).toThrowError('Flair “unknownFlair” is not defined for “custom-string” on the component theme.')

        expect(() => {
          const INSTANCE = shallow(
            <SomeComponent
              flair="unknownFlair"
              theme={NORMAL_THEME}
            />
          ).instance()
          INSTANCE.getFlair()
        }).toThrowError('Flair “unknownFlair” is not defined for “custom-string” on theme “Awesome”.')
      })
    })

    describe('There’s a theme in the context', () => {
      it('returns the expected flairs', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const INSTANCE = shallow(
            <SomeComponent flair={flairPattern}/>,
            OPTIONS
          ).instance()
          expect(INSTANCE.getFlair()).toEqual(expected)
        }
      })

      it('Throws when the specified flair is not found', () => {
        expect(() => {
          const INSTANCE = shallow(
            <SomeComponent flair="unknownFlair"/>,
            OPTIONS
          ).instance()
          INSTANCE.getFlair()
        }).toThrowError('Flair “unknownFlair” is not defined for “custom-string” on theme “Awesome”.')
      })
    })
  })

  describe('Method “getTheme”', () => {
    @themeable('custom-string')
    class SomeComponent extends Component {}

    describe('No theme in the context', () => {
      it('returns undefined when no “Theme” is available', () => {
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

    describe('There’s a theme in the context', () => {
      it('returns the “Theme” from the context', () => {
        const INSTANCE = shallow(
          <SomeComponent/>,
          OPTIONS
        )
          .instance()
        expect(INSTANCE.getTheme())
          .toEqual(CONTEXT_THEME)
      })

      it('returns undefined when a “ComponentTheme” is specified', () => {
        const INSTANCE = shallow(
          <SomeComponent theme={NORMAL_COMPONENT_THEME}/>,
          OPTIONS
        )
          .instance()
        expect(INSTANCE.getTheme())
          .toBeUndefined()
      })

      it('returns the “Theme” specified', () => {
        const INSTANCE = shallow(
          <SomeComponent theme={NORMAL_THEME}/>,
          OPTIONS
        )
          .instance()
        expect(INSTANCE.getTheme())
          .not.toEqual(CONTEXT_THEME)
      })
    })
  })

  describe('Method “getPresentableData”', () => {
    @themeable('custom-string')
    class SomeComponent extends Component {}

    describe('No theme in the context', () => {
      it('adds the flairs to “className”', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              flair={flairPattern}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              flair={flairPattern}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresentableData().props.className).toBe(expected)
          expect(COMP2.getPresentableData().props.className).toBe(expected)
        }
      })

      it('adds the flairs to existing “className”', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const COMP1 = shallow(
            <SomeComponent
              className="foo bar"
              flair={flairPattern}
              theme={NORMAL_COMPONENT_THEME}
            />
          ).instance()

          const COMP2 = shallow(
            <SomeComponent
              className="foo bar"
              flair={flairPattern}
              theme={NORMAL_THEME}
            />
          ).instance()

          expect(COMP1.getPresentableData().props.className)
            .toBe(`foo bar ${expected}`)
          expect(COMP2.getPresentableData().props.className)
            .toBe(`foo bar ${expected}`)
        }
      })
    })

    describe('There’s a theme in the context', () => {
      it('adds the flairs to “className”', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const INSTANCE = shallow(
            <SomeComponent flair={flairPattern}/>,
            OPTIONS
          ).instance()
          expect(INSTANCE.getPresentableData().props.className).toBe(expected)
        }
      })

      it('adds the flairs to existing “className”', () => {
        for (let [ flairPattern, expected ] of TEST_DATA) {
          const INSTANCE = shallow(
            <SomeComponent
              className="foo bar"
              flair={flairPattern}
            />,
            OPTIONS
          ).instance()
          expect(INSTANCE.getPresentableData().props.className)
            .toBe(`foo bar ${expected}`)
        }
      })
    })
  })

  describe('Method “getPresenter”', () => {
    describe('No theme in the context', () => {
      describe('It has a default presenter', () => {
        class SomePresenter extends Component {
          render() {
            return <div>Default presenter!</div>
          }
        }

        @themeable('custom-string')
        @defaultPresenter(SomePresenter)
        class SomeComponent extends Component {}

        it('returns the default presenter', () => {
          const INSTANCE = shallow(<SomeComponent/>).instance()
          expect(INSTANCE.getPresenter())
            .toBe(SomePresenter)
        })

        it('returns the expected presenter', () => {
          for (let [ flairPattern, , presenter ] of TEST_DATA) {
            const COMP1 = shallow(
              <SomeComponent
                flair={flairPattern}
                theme={NORMAL_COMPONENT_THEME}
              />
            ).instance()

            const COMP2 = shallow(
              <SomeComponent
                flair={flairPattern}
                theme={NORMAL_THEME}
              />
            ).instance()

            expect(COMP1.getPresenter()).toBe(presenter)
            expect(COMP2.getPresenter()).toBe(presenter)
          }
        })

        it('Throws when the specified presenter is not found', () => {
          expect(() => {
            const INSTANCE = shallow(
              <SomeComponent
                flair="!unknownPresenter"
                theme={NORMAL_COMPONENT_THEME}
              />
            ).instance()
            INSTANCE.getPresenter()
          }).toThrowError('Presenter “unknownPresenter” is not defined for “custom-string” on component theme.')

          expect(() => {
            const INSTANCE = shallow(
              <SomeComponent
                flair="!unknownPresenter"
                theme={NORMAL_THEME}
              />
            ).instance()
            INSTANCE.getPresenter()
          }).toThrowError('Presenter “unknownPresenter” is not defined for “custom-string” on theme “Awesome”.')
        })
      })

      describe('It does not have a default presenter', () => {
        @themeable('custom-string')
        class SomeComponent extends Component {}

        it('returns undefined when no “ComponentTheme” or “Theme” is available', () => {
          const INSTANCE = shallow(<SomeComponent/>).instance()
          expect(INSTANCE.getPresenter())
            .toBeUndefined()
        })

        it('returns the expected presenter', () => {
          for (let [ flairPattern, , presenter ] of TEST_DATA) {
            const COMP1 = shallow(
              <SomeComponent
                flair={flairPattern}
                theme={NORMAL_COMPONENT_THEME}
              />
            ).instance()

            const COMP2 = shallow(
              <SomeComponent
                flair={flairPattern}
                theme={NORMAL_THEME}
              />
            ).instance()

            expect(COMP1.getPresenter()).toBe(presenter)
            expect(COMP2.getPresenter()).toBe(presenter)
          }
        })

        it('Throws when the specified presenter is not found', () => {
          expect(() => {
            const INSTANCE = shallow(
              <SomeComponent
                flair="!unknownPresenter"
                theme={NORMAL_THEME}
              />
            ).instance()
            INSTANCE.getPresenter()
          }).toThrowError('Presenter “unknownPresenter” is not defined for “custom-string” on theme “Awesome”.')
        })
      })
    })

    describe('There’s a theme in the context', () => {
      describe('It has a default presenter', () => {
        class SomePresenter extends Component {
          render() {
            return <div>Default presenter!</div>
          }
        }

        @themeable('custom-string')
        @defaultPresenter(SomePresenter)
        class SomeComponent extends Component {}

        it('returns the expected presenter', () => {
          for (let [ flairPattern, , presenter ] of TEST_DATA) {
            const INSTANCE = shallow(
              <SomeComponent flair={flairPattern}/>,
              OPTIONS
            ).instance()
            expect(INSTANCE.getPresenter()).toBe(presenter)
          }
        })

        it('Throws when the specified presenter is not found', () => {
          expect(() => {
            const INSTANCE = shallow(
              <SomeComponent flair="!unknownPresenter"/>,
              OPTIONS
            ).instance()
            INSTANCE.getPresenter()
          }).toThrowError('Presenter “unknownPresenter” is not defined for “custom-string” on theme “Awesome”.')
        })
      })

      describe('It does not have a default presenter', () => {
        @themeable('custom-string')
        class SomeComponent extends Component {}

        it('returns the expected presenter', () => {
          for (let [ flairPattern, , presenter ] of TEST_DATA) {
            const INSTANCE = shallow(
              <SomeComponent flair={flairPattern}/>,
              OPTIONS
            ).instance()
            expect(INSTANCE.getPresenter()).toBe(presenter)
          }
        })

        it('Throws when the specified presenter is not found', () => {
          expect(() => {
            const INSTANCE = shallow(
              <SomeComponent flair="!unknownPresenter"/>,
              OPTIONS
            ).instance()
            INSTANCE.getPresenter()
          }).toThrowError('Presenter “unknownPresenter” is not defined for “custom-string” on theme “Awesome”.')
        })
      })
    })
  })
})