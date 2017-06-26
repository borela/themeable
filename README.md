Decorator to enable theming for ReactJS components.

## Installation

```sh
npm install --save themeable
```

## Definitions

[**Presentable:** A decorated ReactJS component that delegates the rendering to
a presenter.](presentable)

[**Presenter:** A normal ReactJS component used to render the data from the
presentable.](presentable)

**Themeable:** A decorated ReactJS component that supports theming. A themeable
component is also presentable and has all the features presentables has.

**Theme:** An object that has metadata and a collection of “ComponentThemes”.

**ComponentTheme:** An object that has “flairs” and “presenters” that can be used
to change the appearance and structure of a themeable component.

**Flair:** Is a string or array of strings containing the CSS classes that will
be aggregated in the “className” property of the presentable passed to the
presenter.

**Flair attribute:** Attribute used by the themeable component to select the flair
and, optionally, the presenter using the format “flair::presenter”.

## How the “ComponentTheme” is resolved

1. **Direct attribute “theme”:** This attribute can accept either a “Theme” or a
  “ComponentTheme”.

2. **Context attribute “theme”:** It can only accept “Theme” objects. This attribute
  is set by the “ThemeProvider” component.

## Usage

In this example, we will create a themeable button component. First we need to
import something things:

```js
import React, { Component } from 'react'
import { defaultPresenter } from 'presentable'
import { themeable, ThemeProvider } from 'themeable'
```

Themeables are presentables too, so lets define a default presenter for the
button like so:

```js
// This presenter will be used if the component theme does not have a default
// presenter.
class DefaultPresenter extends Component {
  render() {
    // The button instance, state and props can be accessed here.
    let { instance, state, props } = this.props.presentable
    return <div {props}>Default presenter!</div>
  }
}
```

Now we can create our themeable button:

```js
// The argument passed is the target component theme identifier used to extract
// the “ComponentTheme” from the “Theme”.
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
Our button is defined, and it has a default presenter, if you would render it:

```js
<Button/>
// Result: <div>Default presenter!</div>
```

It would just render the default presenter, nothing different from a normal
presentable, the real run begins now.Imagine for a second that our button can be
animated or static and that it requires different HTML structures for each case,
lets define the presenters:

```js
class StaticPresenter extends Component {
  render() {
    // The button instance, state and props can be accessed here.
    let { instance, state, props } = this.props.presentable
    return <div {props}>Static presenter set from theme!</div>
  }
}

class AnimatedPresenter extends Component {
  render() {
    // The button instance, state and props can be accessed here.
    let { instance, state, props } = this.props.presentable
    return <div {props}>Animated presenter set from theme!</div>
  }
}
```

Now lets imagine we need to set different CSS classes for animated vs static
buttons, that's where component themes will come in:

```js
// This is a ”ComponentTheme”.
const BUTTON_THEME = {
  // The “flairs” key is required.
  flairs: {
    // Flairs are just CSS classes that can be specified as a single string or
    // an array of strings.
    blue: ['blue', 'flat', 'thickBorders'],
    red: 'red raised thinBorders',
    // The default key must point to one of the flairs defined before. The
    // only options for this example are “red” or “blue”.
    default: 'blue'
  },
  // Component themes may not have any presenters.
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

The component used the default flair and presenter and as you can see, flairs are
just normal CSS classes. That's cool and all, but what if we want to use a specific
flair/presenter?

```js
// The presenter is omitted, so the default one will be used.
<Button flair="red" theme={BUTTON_THEME}/>
// Result: <div class="red raised thinBorders">Static presenter set from theme!</div>

// Uses the specified flair and presenter.
<Button flair="red::animated" theme={BUTTON_THEME}/>
// Result: <div class="red raised thinBorders">Animated presenter set from theme!</div>

// The flair is omitted, so the default one will be used.
<Button flair="::animated" theme={BUTTON_THEME}/>
// Result: <div class="blue flat thickBorders">Animated presenter set from theme!</div>
```

Now it is starting to look like a theming system but setting the theme attribute
for each component would be tedious, so, to solve that, we need to create a theme
that bundles multiple component themes:

```js
// This is a ”Theme” and it might contain many “ComponentThemes”.
const AWESOME_THEME = {
  // Optional metadata.
  name: 'Awesome Theme',
  version: '1.0.0',
  description: 'Theme designed for maximum awesomeness.',
  author: {
    name: 'Foo Bar',
    email: 'foo@bar.com'
  },
  // Actual themes.
  componentThemes: {
    // Remember that we typed the decorator like “@themeable('myAwesomeButton')”?
    // That identifier is used here because we can bundle many component themes
    // in a theme.
    myAwesomeButton: BUTTON_THEME
  }
}
```

The theme is created, we just need to make it available for the components:

```js
<ThemeProvider theme={AWESOME_THEME}>
  <div>
    <div>
      <div>
        {/* Default flair and presenter. */}
        <Button/>
        {/* Default presenter. */}
        <Button flair="blue"/>
        {/* Default flair. */}
        <Button flair="::animated"/>
        {/* Specific flair and presenter. */}
        <Button flair="red::animated"/>
        <Button flair="blue::static"/>
      </div>
    </div>
  </div>
</ThemeProvider>
```

Not that it does not matter how deep the component is in the tree, the theme will
be available in the context for all children. That's it, now you could pack your
theme into its own package and reuse it in other projects.

## Notes

* The “Theme” can be passed directly to the component just like the “ComponentTheme”.
* You can override the theme available in the context by using nested theme providers:

[presentable]:https://github.com/borela/presentable
