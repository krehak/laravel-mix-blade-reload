import { WebpackOptionsNormalized } from 'webpack';
export declare class BladeReload {
    private enabled;
    private options;
    private webpackOriginalAfterCallback;
    private serverHandler;
    /**
     * Get an extension name
     * @returns {string}
     */
    private name;
    /**
     * Get a dependencies
     * @returns {array[]}
     */
    dependencies(): object;
    /**
     * Get an extension name
     * @param {object} options
     * @returns {void}
     */
    register(options: object): void;
    /**
     * Booting up the extension
     * @returns {void}
     */
    boot(): void;
    /**
     * Register webpack's `after` method through this extension
     * @param {object} webpackConfig
     * @returns {void}
     */
    webpackConfig(webpackConfig: WebpackOptionsNormalized): void;
    /**
     * Webpack's `after` method middleware
     * @param server
     * @param compiler
     * @returns {void}
     */
    private after;
    /**
     * Send `content-changed` event to reload browser through sockets
     * @returns {void}
     */
    private reload;
    /**
     * Log a message if debug option is enabled
     * @param {string} message
     * @returns {void}
     */
    private log;
}
