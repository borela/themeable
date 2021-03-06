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

import {
  CONTEXT as CONTEXT_COMPONENT_THEME,
  NORMAL as NORMAL_COMPONENT_THEME
} from './AwesomeComponentTheme'

const METADATA = {
  author: {
    email: 'foo@bar.com',
    name: 'Foo Bar',
    url: 'www.bar.com'
  },
  description: 'Theme designed for maximum awesomeness.',
  name: 'Awesome'
}

export const NORMAL = {
  ...METADATA,
  componentThemes: {
    'custom-string': NORMAL_COMPONENT_THEME
  }
}

export const CONTEXT = {
  ...METADATA,
  a: 1, b: 2, c: 3,
  componentThemes: {
    'custom-string': CONTEXT_COMPONENT_THEME
  }
}

export const NO_COMPONENT_THEMES = METADATA
