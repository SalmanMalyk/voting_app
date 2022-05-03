const mix = require('laravel-mix');
const { exec } = require('child_process');
const path = require('path');

console.log('App Envoirment', Mix.inProduction())


mix.extend('ziggy', new class {
    register(config = {}) {
        this.watch = config.watch ?? ['routes/**/*.php'];
        this.path = config.path ?? '';
        this.enabled = config.enabled ?? Mix.inProduction();
        console.log('App Enabled', this.enabled)

    }

    boot() {
        // if (!this.enabled) return;
        const command = () => exec(
            `php artisan ziggy:generate ${this.path} --url=${Mix.inProduction() ? process.env.ZIGGY_APP_URL : process.env.APP_URL}`,
            (error, stdout, stderr) => console.log(stdout)
        );

        command();

        if (Mix.isWatching() && this.watch) {
            ((require('chokidar')).watch(this.watch))
                .on('change', (path) => {
                    console.log(`${path} changed...`);
                    command();
                });
        };
    }
}());

mix.alias({
    ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
});

mix.webpackConfig({
    resolve: {
        alias: {
            ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
        },
    },
});

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .vue()
    .extract()
    .ziggy()
    .disableSuccessNotifications();


mix.combine(['public/assets/js/dashmix.core.min.js', 'public/assets/js/dashmix.app.min.js'], path.resolve('public/assets/js/main-app.js'));


if (mix.inProduction()) {
        mix.sourceMaps()
            .version();
}






// mix.styles([
//     'public/css/vendor/normalize.css',
//     'public/css/styles.css'
//     ], 'public/css/all.css');