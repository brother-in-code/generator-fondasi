var generators      = require('yeoman-generator');
var updateNotifier  = require('update-notifier');
var pkg             = require('../../package.json');
var fs              = require('fs');
var plugins         = require('./assets.json').data;
var inquirer        = require('inquirer');
var _               = require('lodash');
var helper          = require('./helper.js');
var download        = require('download');
var fileName        = require('file-name');
var chalk           = require('chalk');
var jsonPretty      = require('json-pretty');

var paths = {
    js: 'dev/js/vendor/',
    scss: 'dev/sass/trumps/'
};

module.exports = generators.Base.extend({
    initializing: {
        checkUpdate: function () {
            updateNotifier({pkg: pkg}).notify();
        },

        buildMenuList: function () {
            this.choices = [];
            this.choices.push('boilerplate');

            plugins.forEach( function (plugin, index) {
                this.choices.push(plugin.name);
            }.bind(this));

            this.choices.push(new inquirer.Separator());
            this.choices.push('exit');
            this.choices.push(new inquirer.Separator());
        }
    },

    prompting: function () {
        var done = this.async();

        this.prompt({
            type: 'list',
            name: 'options',
            message: 'What can I do for you',
            choices: this.choices
        }, function (answer) {
            this.answer = answer.options;
            done();
        }.bind(this));
    },

    write: function () {
        var bowerJson = this.destinationPath('./bower.json');

        var choice = _.filter(plugins, function (plugin) {
            return plugin.name === this.answer;
        }.bind(this))[0];

        if (this.answer === 'exit') {
            process.exit(1);
        }

        if (this.answer === 'boilerplate') {
            try {
                fs.openSync(bowerJson, 'r');
                console.log('Boilerplate may have been installed.');
                process.exit(1);
            } catch(e) {
                installBoilerplate.bind(this)();
            }
        } else {
            try {
                fs.openSync(bowerJson, 'r');
            } catch(e) {
                console.log('bower.json is not exist. Install boilerplate first.');
                process.exit(1);
            }

            choice.assets.forEach(function (asset, index) {
                if (helper.isJs(asset)) {
                    new download()
                        .get(asset)
                        .dest(this.destinationPath(paths.js))
                        .run();

                    logDownloadedAsset(paths.js);
                } else if (helper.isCss(asset)) {
                    var filename = fileName(asset);

                    new download()
                        .get(asset)
                        .rename(getScssFileName(filename))
                        .dest(this.destinationPath(paths.scss))
                        .run();

                    logDownloadedAsset(paths.scss);
                }
            }.bind(this));

            updateBower.bind(this)(choice.registryName, choice.version);
        }

        function installBoilerplate() {
            this.fs.copy(
                this.templatePath('boilerplate/**/*'),
                this.destinationPath('./')
            );

            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('./.gitignore')
            );
        }

        function getScssFileName(name) {
            return '_' + name + '.scss';
        }

        function logDownloadedAsset(path) {
            console.log(chalk.green('asset created in') + ' ' + path);
        }

        function updateBower(name, version) {
            fs.readFile(bowerJson, function (err, data) {
                if (err) throw err;

                var json = JSON.parse(data);

                json.dependencies[name] = version;

                fs.writeFile(bowerJson, JSON.stringify(json), function (err) {
                    if (err) throw err;

                    beautifyBowerJson(bowerJson);
                });
            });
        }

        function beautifyBowerJson(bowerJson) {
            fs.readFile(bowerJson, function (err, data) {
                if (err) throw err;

                var output = jsonPretty(JSON.parse(data));

                fs.writeFile(bowerJson, output, function (error) {
                    if (error) throw error;
                });
            });
        }
    }
});
