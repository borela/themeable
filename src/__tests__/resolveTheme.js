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

import resolveTheme from '../resolveTheme'
import { CONTEXT_WITH_COMPONENT_THEME, CONTEXT_WITH_THEME } from 'data'

import {
  CONTEXT as CONTEXT_COMPONENT_THEME,
  NORMAL as NORMAL_COMPONENT_THEME
} from 'AwesomeComponentTheme'

import {
  CONTEXT as CONTEXT_THEME,
  NORMAL as NORMAL_THEME
} from 'AwesomeTheme'

describe('Function “resolveTheme”', () => {
  const NON_THEMEABLES = [
    undefined,
    null,
    0,
    123,
    '',
    '...'
  ]

  for (const NON_THEMEABLE of NON_THEMEABLES) {
    it(`returns “undefined” for “${NON_THEMEABLE}”`, () => {
      expect(resolveTheme(NON_THEMEABLE)).toBeUndefined()
    })
  }

  describe('when there’s', () => {
    describe('a “ComponentTheme” in the context', () => {
      it('returns the “ComponentTheme” from the context if the component has no identifier', () => {
        const COMP_A1 = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: undefined,
          props: undefined
        }

        const COMP_A2 = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: undefined,
          props: { theme: NORMAL_THEME }
        }

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
        const COMP = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: 'custom-string',
          props: undefined
        }

        const RESOLVED = {
          componentTheme: CONTEXT_COMPONENT_THEME,
          identifier: undefined,
          source: 'context',
          theme: undefined
        }

        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })

      it('returns the specified “ComponentTheme”', () => {
        const COMP_A = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: undefined,
          props: { theme: NORMAL_COMPONENT_THEME }
        }

        const COMP_B = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: undefined,
          props: { theme: NORMAL_COMPONENT_THEME }
        }

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
        const COMP = {
          ...CONTEXT_WITH_COMPONENT_THEME,
          identifier: 'custom-string',
          props: { theme: NORMAL_THEME }
        }

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
        const COMP_A1 = {
          ...CONTEXT_WITH_THEME,
          identifier: undefined,
          props: undefined
        }

        const COMP_A2 = {
          ...CONTEXT_WITH_THEME,
          identifier: undefined,
          props: { theme: NORMAL_THEME }
        }

        expect(resolveTheme(COMP_A1)).toBeUndefined()
        expect(resolveTheme(COMP_A2)).toBeUndefined()
      })

      it('returns the used “ComponentTheme” from the “Theme” loaded from the context', () => {
        const COMP = {
          ...CONTEXT_WITH_THEME,
          identifier: 'custom-string',
          props: undefined
        }

        const RESOLVED = {
          componentTheme: CONTEXT_COMPONENT_THEME,
          identifier: 'custom-string',
          source: 'context',
          theme: CONTEXT_THEME
        }
        expect(resolveTheme(COMP)).toEqual(RESOLVED)
      })

      it('returns the “ComponentTheme” specified', () => {
        const COMP_A = {
          ...CONTEXT_WITH_THEME,
          identifier: undefined,
          props: { theme: NORMAL_COMPONENT_THEME }
        }

        const COMP_B = {
          ...CONTEXT_WITH_THEME,
          identifier: 'custom-string',
          props: { theme: NORMAL_COMPONENT_THEME }
        }

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
        const COMP = {
          ...CONTEXT_WITH_THEME,
          identifier: 'custom-string',
          props: { theme: NORMAL_THEME }
        }

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
        const COMP_A1 = {
          context: undefined,
          identifier: undefined,
          props: undefined
        }

        const COMP_A2 = {
          context: undefined,
          identifier: undefined,
          props: { theme: NORMAL_THEME }
        }

        expect(resolveTheme(COMP_A1)).toBeUndefined()
        expect(resolveTheme(COMP_A2)).toBeUndefined()
      })

      it('returns the “ComponentTheme” specified', () => {
        const COMP_A = {
          context: undefined,
          identifier: undefined,
          props: { theme: NORMAL_COMPONENT_THEME }
        }

        const COMP_B = {
          context: undefined,
          identifier: 'custom-string',
          props: { theme: NORMAL_COMPONENT_THEME }
        }

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
        const COMP = {
          context: undefined,
          identifier: 'custom-string',
          props: { theme: NORMAL_THEME }
        }

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
