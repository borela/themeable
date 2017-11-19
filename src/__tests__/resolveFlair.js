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
import { NORMAL as NORMAL_COMPONENT_THEME } from 'AwesomeComponentTheme'
import { NORMAL as NORMAL_THEME } from 'AwesomeTheme'
import { resolveFlair } from '..'
import { TEST_DATA } from 'data'

const RESOLVED_THEME = {
  componentTheme: NORMAL_COMPONENT_THEME,
  identifier: undefined,
  source: 'test-data',
  theme: NORMAL_THEME
}

describe('Function “resolveFlair”', () => {
  each(TEST_DATA)
    .describe('using the pattern “%s”', (pattern, expectedFlair, expectedPresenter) => {
      it('returns the expected flair and presenter', () => {
        const RESOLVED_FLAIR = resolveFlair(RESOLVED_THEME, pattern)
        expect(RESOLVED_FLAIR.flair).toBe(expectedFlair)
        expect(RESOLVED_FLAIR.presenter).toBe(expectedPresenter)
      })
    })
})
