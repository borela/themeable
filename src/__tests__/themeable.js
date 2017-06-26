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
import { isPresentable, presentable } from 'presentable'
import { shallow } from 'enzyme'
import { themeable } from '..'

describe('Decorator themeable applied on “SomeComponent”', () => {
  describe('“SomeComponent” is presentable', () => {
    @themeable('library:component')
    @presentable
    class SomeComponent extends Component {}

    it('has the same constructor', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })
  })

  // The presentable decorator will be applied on if necessary.
  describe('“SomeComponent” is not presentable', () => {
    @themeable('www.library.com::component')
    class SomeComponent extends Component {}

    it('has the same constructor', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(INSTANCE instanceof SomeComponent)
        .toBe(true)
      expect(Object.getPrototypeOf(INSTANCE).constructor)
        .toBe(SomeComponent)
    })

    it('becomes presentable too', () => {
      const WRAPPER = shallow(<SomeComponent/>)
      const INSTANCE = WRAPPER.instance()
      expect(isPresentable(SomeComponent))
        .toBe(true)
      expect(isPresentable(INSTANCE))
        .toBe(true)
    })
  })
})
