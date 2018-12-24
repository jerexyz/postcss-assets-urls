# postcss-assets-urls

[PostCSS] plugin for uploads local images to the CDN.

[postcss]: https://github.com/postcss/postcss

```css
.foo {
  /* Input example */
   {
    background: url("/assets/opo9828c.jpg");
  }
}
```

```css
.foo {
  /* Output example */
   {
    background: url("http://example.com/wp-content/themes78d01ea36bc481d6e154c691347243e5");
  }
}
```

## Usage

```js
postcss([
  require("postcss-assets-urls")({
    baseUrl: "http://cdn.io"
    // oss: {
    //   accessKeyId: 'accessKeyId',
    //   accessKeySecret: 'accessKeySecret',
    //   bucket: 'xmpt-sit',
    //   endpoint: 'https://oss-cn-shenzhen.aliyuncs.com',
    //   https: true,
    //   delDistImg: false,
    //   region: 'oss-cn-shenzhen'
    // }
  })
]);
```

### Config with tarojs

```js
weapp: {
    module: {
      postcss: {
        // "postcss-flexbugs-fixes": {
        //   enable: true
        // }
        autoprefixer: {
          enable: true
        },
        "postcss-assets-urls": {
          enable: true,
          config: {
            baseUrl: "https://bucket.oss-cn-shenzhen.aliyuncs.com",
            oss: {
              accessKeyId: "accessKeyId",
              accessKeySecret: "accessKeySecret",
              bucket: "bucket",
              endpoint: "https://oss-cn-shenzhen.aliyuncs.com",
              https: true,
              delDistImg: false,
              region: "oss-cn-shenzhen"
            }
          }
        }
      }
    }
  },
```
