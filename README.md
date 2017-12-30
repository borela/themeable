[![Themeable](art/logo.png)][themeable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][themeable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][themeable]

Decorator to enable theming on ReactJS presentable components.

## Table of contents

1. [Installation](#installation)
2. [Creating a theme](#creating-a-theme)
3. [Rendering the component](#rendering-the-component)
4. [Context theming](#context-theming)
5. [Theme kit](#theme-kit)
   1. [Creating a theme kit](#creating-a-theme-kit)
   2. [Using the theme kit](#using-the-theme-kit)
   3. [Reusing themes on different components](#reusing-themes-on-different-components)
6. [Default view](#default-view)
7. [View resolution](#view-resolution)

## Installation

```sh
npm install --save themeable
```

## Basic usage

```js
import React, { Component } from 'react'
import { themeable } from 'themeable'

// The themeable is also a presentable (view model).
@themeable
class MyButton extends Component {
  // Write your button logic here.
}

class RedButtonView extends Component {
  render() {
    // You can access the context, state and props from the themeable.
    let { context, state, props } = this.props.themeable
    // ...
    return <button>Red Button</button>
  }
}

// Because a themeable is also a presentable, you can pass the view directly
// to it when rendering:
<MyButton view={RedButtonView}/>
// Result: <button>Red Button</button>
```

## Creating a theme

```js
class GreenButtonView extends Component {
  render() {
    // You can access the context, state and props from the themeable.
    let { context, state, props } = this.props.themeable
    // ...
    return <button>Green Button</button>
  }
}

class BlueButtonView extends Component {
  render() {
    // You can access the context, state and props from the themeable.
    let { context, state, props } = this.props.themeable
    // ...
    return <button>Blue Button</button>
  }
}

// A theme is a simple object containing metadata and a collection of views that
// can be used to render your themeable component.
const BUTTON_THEME = {
  name: 'Rainbow Button', // Required.
  version: '1.0.0', // Required.
  description: 'Button theme with many colors.', // Optional.
  license: 'Apache-2.0', // Required.
  // The theme must have at least 1 author, and like NPM, he can be specified as
  // a simple string:
  author: 'Foo Bar <foo@bar.com> (www.foobar.com)',
  // Or an object:
  author: {
    name: 'Foo Bar',
    email: 'foo@bar.com',
    url: 'www.foobar.com'
  },
  // If there are multiple authors, use the authors key, where each item can either
  // be a string or an object like the author key.
  authors: [
    'Foo Bar <foo@bar.com> (www.foobar.com)',
    'Baz Qux <bar@qux.com> (www.barqux.com)'
  ],
  homepage: 'www.foobar.com', // Optional.
  // The theme must have at least 1 view.
  views: {
    // The default view is not required but it is recommended to set it as in
    // most cases users will just use the default view.
    default: BlueButtonView,
    blue: BlueButtonView,
    green: GreenButtonView,
    red: RedButtonView
  }
}
```

## Rendering the component

```js
// If no specific view is selected, the default view from the theme will be used.
<MyButton theme={BUTTON_THEME}/>
// Result: <button>Blue Button</button>

// This time we select the red view to render the button. The view property can
// either accept a component or a string to select a view from the theme.
<MyButton view="red" theme={BUTTON_THEME}/>
// Result: <button>Red Button</button>
```

## Context theming

```js
import { ContexTheme } from 'themeable'

// To prevent passing the theme to each component, you can set the context theme
// where each component inside it will be able to access it if no theme is specified
// directly on the component.
<ContextTheme theme={BUTTON_THEME}>
  <MyButton/>
  {/* Result: <button>Blue Button</button> */}
  <MyButton view="red"/>
  {/* Result: <button>Red Button</button> */}
</ContextTheme>
```

## Theme kit

### Creating a theme kit

```js
// A theme kit is a simple object that contains a collection of themes indexed
// by the component class name.
const THEME_KIT = {
  name: 'Rainbow UI Kit', // Required.
  version: '1.0.0', // Required.
  description: 'UI kit with many colors.', // Optional.
  license: 'Apache-2.0', // Required.
  author: 'Foo Bar <foo@bar.com> (www.foobar.com)', // Must have at least 1 author.
  homepage: 'www.foobar.com', // Optional.
  // A theme kit must have at least 1 theme.
  themes: {
    MyButton: BUTTON_THEME,
    // Other component themes here.
  }
}
```

### Using the theme kit

```js
// The theme will be selected from the kit by the class name, in this case
// MyButton.

<MyButton theme={THEME_KIT}/>
// Result: <button>Blue Button</button>

<MyButton view="red" theme={THEME_KIT}/>
// Result: <button>Red Button</button>

// You can pass theme kits to contexts too.
<ContextTheme theme={THEME_KIT}>
  <MyButton/>
  {/* Result: <button>Blue Button</button> */}
  <MyButton view="red"/>
  {/* Result: <button>Red Button</button> */}
</ContextTheme>
```

### Reusing themes on different components

If you may want to extend a base component’s functionality but still use the same
theme from a theme kit it was using to render the base component, you can specify
the identifier in the themeable decorator:

```js
// You can apply the themeable decorator as many times as you want, the fact
@themeable('MyButton')
class ExtendedButton extends MyButton {
  // Other extended functionality.
}

// It’ll use the theme for MyButton in the theme kit to render our extended button.
<ExtendedBUtton view="red" theme={THEME_KIT}/>
```

## Default view

Because themeables are also presentables, you can set a default view to render
the component in case no theme or view is available to it:

```js
import { defaultView } from 'presentable'

class SomeView extends Component {
  render() {
    return <button>Rendered using the default view!</button>
  }
}

@themeable
@defaultView(MyDefaultView)
class YetAnotherButton extends Component {
  // Some logic here.
}

// Notice that no theme or view is passed to it, it’ll render using the default
// view set in the class.
<YetAnotherButton/>
// <button>Rendered using the default view!</button>
```

## View resolution

The view used to render the component will be selected in the following order:

1. A component passed directly to the view property.
2. Selected view from theme/theme kit specified in the theme property.
3. Selected view from theme/theme kit in the context.
4. Default view setted with the `defaultView` decorator from the presentable module.

[themeable]: //github.com/borela/themeable
