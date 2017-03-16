# react-app-flexbox-grid
[![npm version](https://badge.fury.io/js/react-app-flexbox-grid.svg)](https://badge.fury.io/js/react-app-flexbox-grid)
[![Build Status](https://travis-ci.org/noentiger/react-app-flexbox-grid.svg)](https://travis-ci.org/noentiger/react-app-flexbox-grid)
[![NPM Status](http://img.shields.io/npm/dm/react-app-flexbox-grid.svg?style=flat)](https://www.npmjs.org/package/react-app-flexbox-grid)

Intention
---------

To make [react-flexbox-grid](https://github.com/roylee0704/react-flexbox-grid) work seamless with e.g. [Facebook's create-react-app](https://github.com/facebookincubator/create-react-app)

Info
----

`react-app-flexbox-grid` is a set of React components that implement [flexboxgrid.css](https://goo.gl/imrHBZ). It even has an optional support for [CSS Modules](https://github.com/webpack-contrib/css-loader#css-modules) with some extra configuration.


Setup
-----

### Installation

`react-app-flexbox-grid` can be installed as an [npm package](https://www.npmjs.com/package/react-app-flexbox-grid):

```
npm i -S react-app-flexbox-grid
```

### Minimal configuration

The recommended way to use `react-app-flexbox-grid` is with a tool like [webpack](https://webpack.js.org/) or [Meteor](https://www.meteor.com/), make sure you set it up to support requiring CSS files. For example, the minimum required loader configuration for webpack would look like this:

```js
{
  test: /\.css$/,
  loader: 'style-loader!css-loader',
  include: /flexboxgrid/
}
```

`react-app-flexbox-grid` imports the styles from `flexboxgrid`, that's why we're configuring the loader for it.

### CSS Modules

If you want to use CSS Modules (this is _mandatory_ for versions earlier than v1), webpack's [`css-loader`](https://github.com/webpack-contrib/css-loader) supports this by passing `modules` param in the loader configuration.

First, install `style-loader` and `css-loader` as development dependencies:

```
npm install --save-dev style-loader css-loader
```

Next, add a loader for `flexboxgrid` with CSS Modules enabled:

```js
{
  test: /\.css$/,
  loader: 'style-loader!css-loader?modules',
  include: /flexboxgrid/
}
```

Make sure you don't have another CSS loader which also affects `flexboxgrid`. In case you do, exclude `flexboxgrid`, for example:

```js
{
  test: /\.css$/,
  loader: 'style-loader!css-loader!postcss-loader',
  include: path.join(__dirname, 'node_modules'), // oops, this also includes flexboxgrid
  exclude: /flexboxgrid/ // so we have to exclude it
}
```

Otherwise you would end up with an [obscure error](https://github.com/noentiger/react-app-flexbox-grid/issues/94#issuecomment-282825720) because webpack stacks loaders together, it doesn't override them.

### Isomorphic support

See [this comment](https://github.com/noentiger/react-app-flexbox-grid/issues/28#issuecomment-198758253).


### Not using a bundler?

If you want to use `react-app-flexbox-grid` the old-fashioned way, you must generate a build with all the CSS and JavaScript and include it in your `index.html`. The components will then be exposed in the `window` object.


Usage
-----

Now you can import and use the components:

```jsx
import React from 'react';
import { Grid, Row, Col } from 'react-app-flexbox-grid';

class App extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
            Hello, world!
          </Col>
        </Row>
      </Grid>
    );
  }
}
```

### Gotcha

For the time being always use `fluid` for `<Grid>` to prevent [horizontal overflow issues](https://github.com/kristoferjoseph/flexboxgrid/issues/144).


Example
-------
Looking for a complete example? Head over to [react-app-flexbox-grid-example](https://github.com/noentiger/react-app-flexbox-grid-example).


Advanced composition
-------

We also export functions for generating Row and Column class names for use in other components.

For example, suppose you're using a third party component that accepts `className` and you would like it to be rendered as `Col`.  You could do so by extracting the column sizing props that `MyComponent` uses and then pass the generated className on to `SomeComponent`


```jsx
import React from 'react';
import { Row, Col, getRowProps, getColumnProps } from 'react-app-flexbox-grid';
// a component that accepts a className
import SomeComponent from 'some-package';

export default function MyComponent(props) {
  const colProps = getColumnProps(props);
  const rowProps = getRowProps(props);

  return (
    <form className={rowProps.className}>
      <SomeComponent classname={colProps.className} />
      <input value={props.value} onChange={props.onChange} />
    </form>
  );
}

MyComponent.propTypes = Object.assign({
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
}, Col.propTypes, Row.propTypes);  // Re-use existing Row and Col propType validations

// Can now be rendered as: <MyComponent end="sm" sm={8} value="my input value" onChange={...} />
```

## Credits

- [https://github.com/roylee0704/react-flexbox-grid]() for the original react components

License
-------
MIT
