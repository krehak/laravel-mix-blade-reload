"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mix = require('laravel-mix');
var chokidar_1 = require("chokidar");
var yargs_1 = require("yargs");
var BladeReload = /** @class */ (function () {
    function BladeReload() {
        this.enabled = true;
        this.options = {
            path: 'resources/views/**/*.blade.php',
            debug: false
        };
        this.webpackOriginalAfterCallback = null;
        this.serverHandler = null;
    }
    /**
     * Get an extension name
     * @returns {string}
     */
    BladeReload.prototype.name = function () {
        return 'blade-reload';
    };
    /**
     * Get a dependencies
     * @returns {array[]}
     */
    BladeReload.prototype.dependencies = function () {
        return ['chokidar'];
    };
    /**
     * Get an extension name
     * @param {object} options
     * @returns {void}
     */
    BladeReload.prototype.register = function (options) {
        this.enabled = !!yargs_1.argv.hot;
        this.options = Object.assign(this.options, options || {});
    };
    /**
     * Booting up the extension
     * @returns {void}
     */
    BladeReload.prototype.boot = function () {
        var _this = this;
        if (!this.enabled)
            return;
        chokidar_1.watch(this.options.path, {
            ignoreInitial: true
        }).on('all', function (event, path) {
            _this.log('[' + event + '] ' + path);
            _this.reload();
        });
    };
    /**
     * Register webpack's `after` method through this extension
     * @param {object} webpackConfig
     * @returns {void}
     */
    BladeReload.prototype.webpackConfig = function (webpackConfig) {
        var _this = this;
        if (!this.enabled)
            return;
        // @ts-ignore
        this.webpackOriginalAfterCallback = webpackConfig.devServer.after;
        this.log('webpack config updated');
        // @ts-ignore
        webpackConfig.devServer.after = function (app, server) {
            _this.after(app, server);
        };
    };
    /**
     * Webpack's `after` method middleware
     * @param app
     * @param server
     * @returns {void}
     */
    BladeReload.prototype.after = function (app, server) {
        if (typeof this.webpackOriginalAfterCallback === 'function') {
            this.webpackOriginalAfterCallback(app, server);
        }
        this.serverHandler = server;
        this.log('webpack server handler attached');
    };
    /**
     * Send `content-changed` event to reload browser through sockets
     * @returns {void}
     */
    BladeReload.prototype.reload = function () {
        if (typeof this.serverHandler !== 'undefined') {
            this.serverHandler.sockWrite(this.serverHandler.sockets, 'content-changed');
        }
    };
    /**
     * Log a message if debug option is enabled
     * @param {string} message
     * @returns {void}
     */
    BladeReload.prototype.log = function (message) {
        if (this.options.debug === true) {
            console.log('laravel-mix-' + this.name() + ': ' + message);
        }
    };
    return BladeReload;
}());
exports.BladeReload = BladeReload;
mix.extend('bladeReload', new BladeReload());
