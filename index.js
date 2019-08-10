const mix = require('laravel-mix');
const chokidar = require('chokidar');

class BladeReload {

    name() {
        return 'bladeReload';
    }

    dependencies() {
        return ['chokidar'];
    }

    register(options) {
        this.options = Object.assign({
            paths: 'resources/views/**/*.blade.php',
            debug: false
        }, options || {});
    }

    boot() {
        let self = this;

        chokidar.watch(this.options.paths, {
            ignoreInitial: true
        }).on('all', (event, path) => {
            self.reload(event, path);
        });
    }

    webpackConfig(webpackConfig) {
        this.webpackOriginalAfterCallback = webpackConfig.devServer.after;

        let self = this;

        this.log('webpack config updated');
        webpackConfig.devServer.after = (app, server) => {
            self.after(app, server);
        };
    }

    after(app, server) {
        if(typeof this.webpackOriginalAfterCallback === 'function') {
            this.webpackOriginalAfterCallback(app, server);
        }

        this.serverHandler = server;
        this.log('webpack server handler attached');
    }

    reload(event, path) {
        this.log('[' + event + '] ' + path);

        if(typeof this.serverHandler !== 'undefined') {
            this.serverHandler.sockWrite(this.serverHandler.sockets, "content-changed");
        }

        return void(8);
    }

    log(message) {
        if(this.options.debug === true) {
            console.log('laravel-mix-' + this.name() + ': ' + message);
        }
    }

}

mix.extend('bladeReload', new BladeReload());