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

import Adapter from 'enzyme-adapter-react-16'
import React, { Component } from 'react'
import { configure, shallow } from 'enzyme'
import { isPresentable, presentable } from 'presentable'
import { themeable } from '../..'

configure({ adapter: new Adapter() })

describe('Decorator “themeable” applied on a', () => {
  describe('presentable component', () => {
    @themeable
    @presentable
    class SomeComponentA extends Component {}

    @themeable('custom-string')
    @presentable
    class SomeComponentB extends Component {}

    let instanceA, instanceB

    beforeEach(() => {
      instanceA = shallow(<SomeComponentA/>).instance()
      instanceB = shallow(<SomeComponentB/>).instance()
    })

    it('has the same constructor', () => {
      expect(instanceA instanceof SomeComponentA).toBe(true)
      expect(instanceB instanceof SomeComponentB).toBe(true)
      expect(Object.getPrototypeOf(instanceA).constructor).toBe(SomeComponentA)
      expect(Object.getPrototypeOf(instanceB).constructor).toBe(SomeComponentB)
    })
  })

  describe('non presentable component', () => {
    @themeable
    class SomeComponentA extends Component {}

    @themeable('custom-string')
    class SomeComponentB extends Component {}

    let instanceA, instanceB

    beforeEach(() => {
      instanceA = shallow(<SomeComponentA/>).instance()
      instanceB = shallow(<SomeComponentB/>).instance()
    })

    it('has the same constructor', () => {
      expect(instanceA instanceof SomeComponentA).toBe(true)
      expect(instanceB instanceof SomeComponentB).toBe(true)
      expect(Object.getPrototypeOf(instanceA).constructor).toBe(SomeComponentA)
      expect(Object.getPrototypeOf(instanceB).constructor).toBe(SomeComponentB)
    })

    it('becomes presentable too', () => {
      expect(isPresentable(SomeComponentA)).toBe(true)
      expect(isPresentable(SomeComponentB)).toBe(true)
      expect(isPresentable(instanceA)).toBe(true)
      expect(isPresentable(instanceB)).toBe(true)
    })
  })
})
