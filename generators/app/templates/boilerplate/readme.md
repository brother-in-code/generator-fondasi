# Fondasi

Fondasi is a [suit-baze](https://github.com/ImBobby/suit-baze) forked front-end template that implement [ITCSS](http://itcss.io/) methodology with [gulp](http://gulpjs.com/) build system.

## Folder structure

```
.gitignore
bower.json
gulpfile.js
home.html
package.json
└── dev
    ├── fonts/
    |   ├── fontawesome-webfont.eot
    |   ├── fontawesome-webfont.svg
    |   ├── fontawesome-webfont.ttf
    |   ├── fontawesome-webfont.woff
    |   ├── fontawesome-webfont.woff2
    |   └── FontAwesome.otf
    ├── img/
    |   ├── apple-icon.png
    |   └── favicon.png
    ├── js/
    |   ├── main.js
    |   └── vendor/
    |       ├── fastclick.js
    |       ├── jquery.js
    |       └── modernizr.js
    └── sass/
        ├── main.scss
        ├── base/
        |   ├── _base.scss
        |   ├── _font.face.scss
        |   └── _typography.scss
        ├── components/
        |   ├── _breadcrumb.scss
        |   ├── _browse.happy.scss
        |   ├── _buttons.scss
        |   ├── _forms.scss
        |   ├── _pagination.scss
        |   └── _table.scss
        ├── generics/
        |   ├── _normalize.scss
        |   └── _resets.scss
        ├── objects/
        |   ├── _baze.grid.scss
        |   ├── _font-awesome.scss
        |   ├── _media.scss
        |   └── _wrappers.scss
        ├── settings/
        |   └── _variables.scss
        ├── tools/
        |   ├── _brandscolor.scss
        |   ├── _mq.scss
        |   └── _vertical.rhythm.scss
        └── trumps/
            ├── _helpers.scss
            └── _print.scss
```

## Features

* Vertical rhythm system
* Grid system using [baze-grid](https://github.com/ImBobby/Baze-Grid/)
* Font icons using [Font Awesome](http://fontawesome.io/)
* Includes:
    * [Normalize.css](https://github.com/necolas/normalize.css/) 3.0.3
    * [jQuery](https://github.com/jquery/jquery) 1.11.3
    * Custom build [Modernizr](https://github.com/Modernizr/Modernizr)
* Automate build system. Available gulp command:
    * [`gulp`](https://github.com/brother-in-code/fondasi/blob/master/gulpfile.js#L232) - compile all assets in `dev` directory to `assets` directory.
    * [`gulp watch`](https://github.com/brother-in-code/fondasi/blob/master/gulpfile.js#L240) - Has same functionality as `gulp`, but with watch.
    * [`gulp clean`](https://github.com/brother-in-code/fondasi/blob/master/gulpfile.js#L220) - Delete `assets` directory.
    * [`gulp build`](https://github.com/brother-in-code/fondasi/blob/master/gulpfile.js#L278) - Delete `assets` directory and recompile assets to production ready to `assets` directory.
    * [`gulp livereload`](https://github.com/brother-in-code/fondasi/blob/master/gulpfile.js#L266) - The command says it all. Run this command after `gulp watch`

## Requirement

* Node 0.12.*
* Bower

## Browser support

IE10+ along with [evergreen browsers](http://eisenbergeffect.bluespire.com/evergreen-browsers/).
