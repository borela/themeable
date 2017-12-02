[![Themeable](art/logo.png)][themeable]

[![React](https://img.shields.io/:react-%5E15%7C%5E16-green.svg?style=flat-square)][themeable]
[![License](http://img.shields.io/:license-apache-blue.svg?style=flat-square)][themeable]

Decorator to enable theming on ReactJS smart components.

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
  1. [Imports](#imports)
  2. [Default presenter](#default-presenter)
  3. [Themeable button](#themeable-button)
  4. [First component theme](#first-component-theme)
  4. [First theme](#first-theme)
3. [Definitions](#definitions)
4. [Notes](#notes)

## Installation

```sh
npm install --save themeable
```

## Usage

In this example, we will create a themeable button component.

### Imports

```js
import React, { Component } from 'react'
import { defaultPresenter } from 'presentable'
import { ThemeableContext, themeable } from 'themeable'
```

### Default presenter

Themeables are presentables too, so we will define a default presenter for the
button like so:

```js
// This presenter will be used if the component theme does not have a default
// presenter.
class DefaultPresenter extends Component {
  render() {
    // The button instance, state and props can be accessed here, this is still
    // a normal presentable.
    let { instance, state, props } = this.props.presentable
    // The “flair” loaded from the component theme contains the CSS classes that
    // sets the style for our component, after resolving it, the themeable will
    // add the flair’s value to the property “className”.
    return <div className={props.className}>Default presenter!</div>
  }
}
```

### Themeable button

If the *“ComponentTheme”* lacks a default presenter, the themeable will try to
use its default presenter. Let’s create our themeable button:

```js
// The argument passed is the target component theme identifier used to extract
// the “ComponentTheme” from the “Theme” bundle.
@themeable('myAwesomeButton')
// Here we set the default presenter like we do with presentables.
@defaultPresenter(DefaultPresenter)
// And finally our amazing button, note that the identifier in themeable does not
// match the class name even though it could, this is to allow components to target
// specific themes without being limited by the class name.
class Button extends Component {
  // The render method does not need to be implemented, the component will use
  // presenters to render its structure.
}
```

Our button is defined, and it has a default presenter, if you render it:

```js
<Button/>
// Result: <div>Default presenter!</div>
```

It would just render the default presenter, nothing different from a normal
presentable, the real fun begins now.

### First component theme

Imagine for a second that our button can be animated or static and that it
requires different tag structures for each case:

```js
class StaticPresenter extends Component {
  render() {
    let { props } = this.props.presentable
    return <div className={props.className}>Static presenter set from theme!</div>
  }
}

class AnimatedPresenter extends Component {
  render() {
    let { props } = this.props.presentable
    return <div className={props.className}>Animated presenter set from theme!</div>
  }
}
```

That’s nice but we might need to set different CSS classes for animated vs static
buttons and on top of that, we need a way to pass all this data to our themeable
component.

To achieve that, we’ll create our first *“ComponentTheme”*:

```js
// This is a ”ComponentTheme”.
const BUTTON_THEME = {
  // The “flairs” key is required.
  flairs: {
    // Flairs are just CSS classes that can be specified as a single string or
    // an array of strings.
    blue: ['blue', 'flat', 'thickBorders'],
    red: 'red raised thinBorders',
    hollow: 'hollow specialClassForHollow',
    // The default key must point to one of the flairs defined before. The
    // only options for this example are “red”, “blue” or “hollow”.
    default: 'blue'
  },
  // Component themes may not have any presenters at all.
  presenters: {
    animated: AnimatedPresenter,
    static: StaticPresenter,
    // The default key must point to one of the presenters defined before.
    // In this case, the only options are “animated” or “static”.
    default: 'static'
  }
}
```

We can already use that directly into the button:

```js
<Button theme={BUTTON_THEME}/>
// Result: <div class="blue flat thickBorders">Static presenter set from theme!</div>
```

As you can see, the component used the default flair and presenter. To use a
specific flair/presenter:

```js
// The presenter is omitted, so the default one will be used.
<Button flair="red" theme={BUTTON_THEME}/>
// Result:
// <div class="red raised thinBorders">
//   Static presenter set from theme!
// </div>

// Specific flair and presenter.
<Button flair="red!animated" theme={BUTTON_THEME}/>
// Result:
// <div class="red raised thinBorders">
//   Animated presenter set from theme!
// </div>

// Multiple flairs can be used.
<Button flair="red hollow!animated" theme={BUTTON_THEME}/>
// Result:
// <div class="red raised thinBorders hollow specialClassForHollow">
//   Animated presenter set from theme!
// </div>

// The flair is omitted, so the default one will be used.
<Button flair="!animated" theme={BUTTON_THEME}/>
// Result:
// <div class="blue flat thickBorders">
//   Animated presenter set from theme!
// </div>
```

### First theme

Now it is starting to look like a theming system but setting the theme attribute
for each component would be tedious, to solve that, we need to create a theme that
bundles multiple component themes:

```js
// This is a ”Theme” and it might contain many “ComponentTheme”.
const AWESOME_THEME = {
  // Optional metadata.
  name: 'Awesome Theme',
  version: '1.0.0',
  description: 'Theme designed for maximum awesomeness.',
  author: {
    name: 'Foo Bar',
    email: 'foo@bar.com'
  },
  // Actual themes that can be used by the themeable component.
  componentThemes: {
    // Remember that we typed the decorator like “@themeable('myAwesomeButton')”?
    // That identifier is used here because we can bundle many “ComponentThemes”
    // in a “Theme”.
    myAwesomeButton: BUTTON_THEME
  }
}
```

The theme is created, we just need to make it available for the components:

```js
<ThemeableContext theme={AWESOME_THEME}>
  <div>
    <div>
      {/* Default flair and presenter. */}
      <Button/>
      <div>
        {/* Default presenter. */}
        <Button flair="blue"/>
        {/* Default flair. */}
        <Button flair="!animated"/>
        {/* Specific flair and presenter. */}
        <Button flair="red!animated"/>
        <Button flair="blue!static"/>
      </div>
    </div>
  </div>
</ThemeableContext>
```

Note that it does not matter how deep the component is in the tree, the theme will
be available in the context for all children. That's it, now you could pack your
theme into its own package and reuse it in other projects.

## Definitions

[**Presentable:** A decorated ReactJS component that delegates the rendering to
a presenter.][presentable]

[**Presenter:** A normal ReactJS component used to render the data from the
presentable.][presentable]

**Themeable:** A decorated ReactJS component that supports theming. A themeable
component is also presentable and has all the features presentables has.

**Theme:** An object that has metadata and a collection of *“ComponentThemes”*.

**ComponentTheme:** An object that has *“flairs”* and *“presenters”* that can
be used to change the appearance and structure of a themeable component.

**Flair:** Is a string or array of strings containing the CSS classes that will
be aggregated in the presentable’s *“className”* property passed to the presenter.

**Flair attribute:** Attribute used by the themeable component to select the flair
and the presenter using the format *“flair!presenter”*. Multiple flairs can
be used and the “!presenter” part can be ommitted entirely.

### How the “ComponentTheme” is resolved

1. **Direct attribute “theme”:** This attribute can accept either a *“Theme”*
  or a *“ComponentTheme”*.

2. **Context attribute “theme”:** It only accepts *“Theme”* objects. This
  attribute is set by the *“ThemeableContext”* component.

## Notes

* The *“Theme”* can be passed directly to the component just like the *“ComponentTheme”*.
* You can override the theme available in the context by using nested theme providers:
  ```js
  <ThemeableContext theme={AWESOME_THEME}>
    <div>
      {/* Themeable components here will use “AWESOME_THEME”. */}
      <Button/>
      <Button flair="blue"/>
      <Button flair="!animated"/>
      <ThemeableContext theme={ANOTHER_AWESOME_THEME}>
        {/* Themeable components here will use “ANOTHER_AWESOME_THEME”. */}
        <div>
          <div>
            <Button flair="red!animated"/>
            <Button flair="blue!static"/>
          </div>
        </div>
      </ThemeableContext>
    </div>
  </ThemeableContext>
  ```

[presentable]:https://github.com/borela/presentable
[themeable]: //github.com/borela/themeable
