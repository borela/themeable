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

import BarPresenter from './BarPresenter'
import FooPresenter from './FooPresenter'
import pad from 'pad'

function combinedData(flairs, presenters) {
  let result = []
  for (let [ flairPattern, flair ] of flairs) {
    for (let [ presenterPattern, presenter ] of presenters)
      result.push([ `${flairPattern}!${presenterPattern}`, flair, presenter ])
  }
  return result
}

function joinFlairs(data) {
  let result = []
  for (let [ targetStringArray, ...rest ] of data) {
    if (targetStringArray.length < 2) {
      result.push([ targetStringArray, ...rest ])
      continue
    }

    for (let i = 1; i < 3; i++) {
      const SEPARATOR = pad('', i)
      result.push([ targetStringArray.join(SEPARATOR), ...rest ])
    }
  }
  return result
}

function padData(data) {
  let result = []
  for (let [ targetString, ...rest ] of data) {
    for (let i = 1; i < 3; i++) {
      result.push([ pad(targetString, i), ...rest ])
      result.push([ pad(i, targetString), ...rest ])
    }
  }
  return result
}

const NORMALIZED_BLUE_FLAIR = 'blueA blueB blueC'
const NORMALIZED_RED_FLAIR = 'redA redB redC'
const NORMALIZED_GREEN_FLAIR = 'greenA greenB greenC'
const NORMALIZED_RED_GREEN_FLAIRS = 'redA redB redC greenA greenB greenC'
const NORMALIZED_GREEN_RED_FLAIRS = 'greenA greenB greenC redA redB redC'

const RAW_FLAIRS = [
  // Default flair.
  [[ '' ], NORMALIZED_BLUE_FLAIR ],
  // Specific flairs.
  [[ 'red' ], NORMALIZED_RED_FLAIR ],
  [[ 'green' ], NORMALIZED_GREEN_FLAIR ],
  [[ 'red', 'green' ], NORMALIZED_RED_GREEN_FLAIRS ],
  [[ 'green', 'red' ], NORMALIZED_GREEN_RED_FLAIRS ]
]

const PRESENTERS = [
  // Default presenter.
  [ '', BarPresenter ],
  // Specific presenters.
  [ 'bar', BarPresenter ],
  [ 'foo', FooPresenter ]
]

const FLAIRS = joinFlairs(RAW_FLAIRS)
const PADDED_FLAIRS = padData(FLAIRS)
const PADDED_PRESENTERS = padData(PRESENTERS)
const COMBINED_DATA = combinedData(
  [ ...FLAIRS, ...PADDED_FLAIRS ],
  [ ...PRESENTERS, ...PADDED_PRESENTERS ]
)

export const TEST_DATA = [
  // No flair pattern.
  [ undefined, NORMALIZED_BLUE_FLAIR, BarPresenter ],
  // Other combinations.
  ...COMBINED_DATA
]
