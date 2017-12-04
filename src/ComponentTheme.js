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

import { Component } from 'react'

// A component theme is the theme used to render component.
export type ComponentTheme = {|
  // A flair is a unique string that maps to a set of CSS classes.
  flairs:{|
    [string]:string|string[],
    default?:string
  |},
  // Presenters bundled with the theme.
  presenters:{|
    [string]:Component,
    default?:string
  |}
|}
