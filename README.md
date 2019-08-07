# Laravel Mix Blade Reload

**Extension to reload browser through webpack when blade views update.**

## Installation

Install the extension:

```sh
npm install laravel-mix-blade-reload
```

Or if you prefer yarn:

```sh
yarn add laravel-mix-blade-reload
```

Next require the extension inside your Laravel Mix config and call `bladeReload()` in your pipeline:

```js
// webpack.mix.js
const mix = require('laravel-mix');
require('laravel-mix-blade-reload');

mix.js('resources/js/app.js', 'public/js')
    .bladeReload();
```

## Options

#### Default options

If nothing is passed to the extension inside your Laravel Mix config, the following options will be used:

```js
{
    paths: 'resources/views/**/*.blade.php',
    debug: false
}
```

#### Option details

* `paths` (string or array of strings). Paths to files, dirs to be watched
recursively, or glob patterns.
* `debug` (boolean). Whenever to log extension events messages to the console.