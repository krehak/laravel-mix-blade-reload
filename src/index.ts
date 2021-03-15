const mix = require('laravel-mix');

import { WebpackOptionsNormalized } from 'webpack';
import { watch as chokidarWatch } from 'chokidar';
import { argv } from 'yargs';

export class BladeReload {
    private enabled: boolean = true;
    private options = {
        path: 'resources/views/**/*.blade.php',
        debug: false
    };
    private webpackOriginalAfterCallback: any = null;
    private serverHandler: any = null;

    /**
     * Get an extension name
     * @returns {string}
     */
    private name(): string {
        return 'blade-reload';
    }

    /**
     * Get a dependencies
     * @returns {array[]}
     */
    public dependencies(): object {
        return ['chokidar'];
    }

    /**
     * Get an extension name
     * @param {object} options
     * @returns {void}
     */
    public register(options: object): void {
        this.enabled = !!argv.hot;
        this.options = Object.assign(this.options, options || {});
    }

    /**
     * Booting up the extension
     * @returns {void}
     */
    public boot(): void {
        if(!this.enabled) return;

        chokidarWatch(this.options.path, {
            ignoreInitial: true
        }).on('all', (event: string, path: string): void => {
            this.log('[' + event + '] ' + path);
            this.reload();
        });
    }

    /**
     * Register webpack's `after` method through this extension
     * @param {object} webpackConfig
     * @returns {void}
     */
    public webpackConfig(webpackConfig: WebpackOptionsNormalized): void {
        if(!this.enabled) return;

        this.webpackOriginalAfterCallback = webpackConfig.devServer.onAfterSetupMiddleware;

        this.log('webpack config updated');

        webpackConfig.devServer.onAfterSetupMiddleware = (server: any, compiler: any) => {
            this.after(server, compiler);
        };
    }

    /**
     * Webpack's `after` method middleware
     * @param server
     * @param compiler
     * @returns {void}
     */
    private after(server: any, compiler: any): void {
        if(typeof this.webpackOriginalAfterCallback === 'function') {
            this.webpackOriginalAfterCallback(server, compiler);
        }

        this.serverHandler = server;
        this.log('webpack server handler attached');
    }

    /**
     * Send `content-changed` event to reload browser through sockets
     * @returns {void}
     */
    private reload(): void {
        if(typeof this.serverHandler !== 'undefined') {
            this.serverHandler.sockWrite(this.serverHandler.sockets, 'content-changed');
        }
    }

    /**
     * Log a message if debug option is enabled
     * @param {string} message
     * @returns {void}
     */
    private log(message: string): void {
        if(this.options.debug === true) {
            console.log('laravel-mix-' + this.name() + ': ' + message);
        }
    }
}

mix.extend('bladeReload', new BladeReload());
