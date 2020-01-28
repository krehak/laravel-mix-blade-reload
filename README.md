# Laravel Mix Blade Reload

**Laravel Mix extension to auto-reload browser when you change the blade views.**

* [Installation](https://github.com/krehak/laravel-mix-blade-reload#installation)
* [Options](https://github.com/krehak/laravel-mix-blade-reload#options)
* [Changelog](https://github.com/krehak/laravel-mix-blade-reload#changelog)

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

#### Note

Works only when running HMR - Hot Module Replacement script (`npm run hot`).

## Options

#### Default options

If nothing is passed to the extension inside your Laravel Mix config, the following options will be used:

```js
{
    path: 'resources/views/**/*.blade.php',
    debug: false
}
```

#### Option details

* `path` (string or array of strings). Path to files, directories to be watched
recursively, or glob patterns.
* `debug` (boolean). Whenever to log extension event messages to the console.

## Changelog

#### New in version 1.x

* Rewrited into TypeScript
* Option `paths` was renamed to `path`