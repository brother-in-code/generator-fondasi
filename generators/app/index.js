var generators = require('yeoman-generator');
var updateNotifier = require('update-notifier');
var pkg = require('../../package.json');

module.exports = generators.Base.extend({
    initialize: function () {
        updateNotifier({pkg: pkg}).notify();
    },

    write: function () {
        this.fs.copy(
            this.templatePath('boilerplate/**/*'),
            this.destinationPath('./')
        );

        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('./.gitignore')
        );
    },

    install: function () {
        this.installDependencies();
    }
});
