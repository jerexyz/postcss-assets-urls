# PLUGIN_TITLE [![Build Status][ci-img]][ci]

[PostCSS] plugin postcss-assets-urls.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME.svg
[ci]:      https://travis-ci.org/GITHUB_NAME/PLUGIN_NAME

```css
.foo {
    /* Input example */
    { background: url('/assets/opo9828c.jpg') }
}
```

```css
.foo {
  /* Output example */
  { background: url('http://example.com/wp-content/themes78d01ea36bc481d6e154c691347243e5') }
}
```

## Usage

```js
postcss([ require('postcss-assets-urls') ])
```

See [PostCSS] docs for examples for your environment.
