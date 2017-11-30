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

import themeable from '../../themeable'
import { Component } from 'react'
import { isPresentable, presentable } from 'presentable'

describe('Decorator “themeable” applied on a', () => {
  describe('presentable component', () => {
    @presentable
    class SomeComponentA extends Component {}

    @presentable
    class SomeComponentB extends Component {}

    let DecoratedSomeComponentA = themeable(SomeComponentA)
    let DecoratedSomeComponentB = themeable('custom-string')(SomeComponentB)

    it('has the same constructor', () => {
      const INSTANCE_A = new DecoratedSomeComponentA
      const INSTANCE_B = new DecoratedSomeComponentB
      expect(INSTANCE_A instanceof SomeComponentA).toBe(true)
      expect(INSTANCE_B instanceof SomeComponentB).toBe(true)
      expect(Object.getPrototypeOf(INSTANCE_A).constructor).toBe(SomeComponentA)
      expect(Object.getPrototypeOf(INSTANCE_B).constructor).toBe(SomeComponentB)
    })

    it('allows the decorator to be applied multiple times', () => {
      expect(() => themeable(SomeComponentA)).not.toThrow()
      expect(() => themeable(SomeComponentB)).not.toThrow()
    })
  })

  describe('non presentable component', () => {
    class SomeComponentA extends Component {}
    class SomeComponentB extends Component {}

    let DecoratedSomeComponentA = themeable(SomeComponentA)
    let DecoratedSomeComponentB = themeable('custom-string')(SomeComponentB)
    let instanceA, instanceB

    beforeEach(() => {
      instanceA = new DecoratedSomeComponentA
      instanceB = new DecoratedSomeComponentB
    })

    it('has the same constructor', () => {
      expect(instanceA instanceof SomeComponentA).toBe(true)
      expect(instanceB instanceof SomeComponentB).toBe(true)
      expect(Object.getPrototypeOf(instanceA).constructor).toBe(SomeComponentA)
      expect(Object.getPrototypeOf(instanceB).constructor).toBe(SomeComponentB)
    })

    it('allows the decorator to be applied multiple times', () => {
      expect(() => themeable(SomeComponentA)).not.toThrow()
      expect(() => themeable(SomeComponentB)).not.toThrow()
    })

    it('becomes presentable too', () => {
      expect(isPresentable(SomeComponentA)).toBe(true)
      expect(isPresentable(SomeComponentB)).toBe(true)
      expect(isPresentable(instanceA)).toBe(true)
      expect(isPresentable(instanceB)).toBe(true)
    })
  })
})
