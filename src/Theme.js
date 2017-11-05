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
// @flow

import type ComponentTheme from './ComponentTheme'

type Author = {|
  email:string,
  name:string,
  url?:string
|}

/**
 * A theme is an configuration object that holds metadata and the actual
 * component themes.
 */
export type Theme = {|
  // Theme author(s).
  author?:Author|Author[],
  // Location to report bugs.
  bugs?:{|
    email?:string,
    url?:string
  |},
  // A component theme for each component in the library.
  componentThemes:{|
    [string]:ComponentTheme
  |},
  // Theme description.
  description?:string,
  // Official website(s).
  homepage?:string,
  // Theme license.
  license?:string,
  // Theme’s name.
  name?:string,
  // Repository location.
  repository?:{|
    type:string,
    url:string
  |},
  // Theme version.
  version?:string
|}
