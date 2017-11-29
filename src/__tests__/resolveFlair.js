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

import resolveFlair from '../resolveFlair'
import { NORMAL as NORMAL_COMPONENT_THEME } from 'AwesomeComponentTheme'
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import { TEST_DATA } from 'data'

const RESOLVED_THEME = {
  componentTheme: NORMAL_COMPONENT_THEME,
  identifier: undefined,
  source: 'test-data',
  theme: NORMAL_THEME
}

describe.skip('Function “resolveFlair”', () => {
  for (const [ PATTERN, EXPECTED_FLAIR, EXPECTED_PRESENTER ] of TEST_DATA) {
    test(`using the pattern “${PATTERN}”`, () => {
      const RESOLVED_FLAIR = resolveFlair(RESOLVED_THEME, PATTERN)
      expect(RESOLVED_FLAIR.flair).toBe(EXPECTED_FLAIR)
      expect(RESOLVED_FLAIR.presenter).toBe(EXPECTED_PRESENTER)
    })
  }

  const BOGUS_THEMES = [
    undefined,
    null,
    0,
    123,
    '',
    '...',
    {},
    { componentTheme: {}},
    { componentTheme: { flairs: null }},
    { componentTheme: { presenters: null }},
    { componentTheme: { flairs: null, presenters: null }}
  ]

  for (const BOGUS_THEME of BOGUS_THEMES) {
    it(`returns undefined for “${BOGUS_THEME}”`, () => {
      expect(resolveFlair(BOGUS_THEME, 'some!pattern')).toBeUndefined()
    })
  }
})
