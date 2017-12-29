[![Themeable](art/logo.png)][themeable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][themeable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][themeable]

Decorator to enable theming on ReactJS presentable components.

## Table of contents

1. [Installation](#installation)
2. [Creating a theme](#creating-a-theme)
3. [Rendering the component](#rendering-the-component)
4. [Context theming](#context-theming)
5. [Creating a theme kit](#creating-a-theme-kit)
6. [Using the theme kit](#using-the-theme-kit)
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
    return <Button>Red Button</Button>
  }
}

// Because a themeable is also a presentable, you can pass the view directly
// to it when rendering:
<MyButton view={RedButtonView}/>
// Result: <Button>Red Button</Button>
```

## Creating a theme

```js
class GreenButtonView extends Component {
  render() {
    // You can access the context, state and props from the themeable.
    let { context, state, props } = this.props.themeable
    // ...
    return <Button>Green Button</Button>
  }
}

class BlueButtonView extends Component {
  render() {
    // You can access the context, state and props from the themeable.
    let { context, state, props } = this.props.themeable
    // ...
    return <Button>Blue Button</Button>
  }
}

// A theme is a simple object containing metadata and a collection of views that
// can be used to render your themeable component.
const BUTTON_THEME = {
  name: 'Rainbow Button',
  description: 'Button theme with many colors.',
  author: [{
    name: 'Someone',
    email: 'someone@somedomain.com',
    url: 'www.somedomain.com'
  }],
  repository: 'somerepository.com',
  views: {
    // Notice that a default view is set on the theme,
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
// Result: <Button>Blue Button</Button>

// This time we select the red view to render the button. The view property can
// either accept a view or a string to select a view from the theme.
<MyButton view="red" theme={BUTTON_THEME}/>
// Result: <Button>Red Button</Button>
```

## Context theming

```js
import { ContexTheme } from 'themeable'

// To prevent passing the theme to each component, you can set the context theme
// where each component inside it will be able to access it if no theme is specified
// directly on the component.
<ContextTheme theme={BUTTON_THEME}>
  <MyButton/>
  {/* Result: <Button>Blue Button</Button> */}
  <MyButton view="red"/>
  {/* Result: <Button>Red Button</Button> */}
</ContextTheme>
```

## Creating a theme kit

```js
// A theme kit is a simple object that contains a collection of themes indexed
// by the component class name.
const THEME_KIT = {
  name: 'Rainbow UI',
  description: 'Theme kit for components with many colors.',
  author: [{
    name: 'Someone',
    email: 'someone@somedomain.com',
    url: 'www.somedomain.com'
  }],
  repository: 'somerepository.com',
  themes: {
    MyButton: BUTTON_THEME,
    // Other component themes here.
  }
}
```

## Using the theme kit

```js
// The theme will be selected from the kit by the class name, in this case
// MyButton.

<MyButton theme={THEME_KIT}/>
// Result: <Button>Blue Button</Button>

<MyButton view="red" theme={THEME_KIT}/>
// Result: <Button>Red Button</Button>

// You can pass theme kits to contexts too.
<ContextTheme theme={THEME_KIT}>
  <MyButton/>
  {/* Result: <Button>Blue Button</Button> */}
  <MyButton view="red"/>
  {/* Result: <Button>Red Button</Button> */}
</ContextTheme>
```

## View resolution

The view used to render the component will be selected in the following order:

1. A component passed directly to the view property.
2. Selected view from theme or theme kit passed to the theme property.
3. Selected view from theme or theme kit in the context.
4. Default view setted with the `defaultView` decorator from the presentable module.
