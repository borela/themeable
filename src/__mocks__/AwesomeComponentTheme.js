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

const FLAIRS = {
  blue: 'blueA blueB blueC',
  // Irregular spaces must be allowed but corrected by the theming system.
  green: [ '  greenA   ', 'greenB', 'greenC' ],
  red: 'redA     redB   redC'
}

const PRESENTERS = {
  bar: BarPresenter,
  foo: FooPresenter
}

export const NORMAL = {
  flairs: {
    ...FLAIRS,
    default: 'blue'
  },
  presenters: {
    ...PRESENTERS,
    default: 'bar'
  }
}

export const CONTEXT = {
  ...NORMAL,
  a: 1, b: 2, c: 3
}

export const WITHOUT_DEFAULT_FLAIR = {
  flairs: { ...FLAIRS },
  presenters: {
    ...PRESENTERS,
    default: 'bar'
  }
}

export const WITHOUT_DEFAULT_PRESENTER = {
  flairs: {
    ...FLAIRS,
    default: 'blue'
  },
  presenters: { ...PRESENTERS }
}

export const NO_DEFAULTS = {
  flairs: { ...FLAIRS },
  presenters: { ...PRESENTERS }
}
