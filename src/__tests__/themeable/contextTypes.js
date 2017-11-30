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

import PropTypes from 'prop-types'
import themeable from '../../themeable'
import { Component } from 'react'

describe('.contextTypes', () => {
  const INITIAL_CONTEXT_TYPES = {
    a: PropTypes.string,
    b: PropTypes.number,
    c: PropTypes.object
  }

  class SomeComponentA extends Component {}
  class SomeComponentB extends Component {
    static contextTypes = INITIAL_CONTEXT_TYPES
  }

  it('adds the “theme” property to the expected context types', () => {
    expect(SomeComponentA.contextTypes).toBeFalsy()
    expect(SomeComponentB.contextTypes).toEqual(INITIAL_CONTEXT_TYPES)

    themeable(SomeComponentA)
    themeable(SomeComponentB)

    expect(SomeComponentA.contextTypes)
      .toEqual({ theme: PropTypes.object })

    expect(SomeComponentB.contextTypes)
      .toEqual({ ...INITIAL_CONTEXT_TYPES, theme: PropTypes.object })
  })
})
