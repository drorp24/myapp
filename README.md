## Improve

### Hot reloading

Based on [this](https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o), it will only auto refresh browser when app.render is used, not app.send. In other words, for an API returning json, a manual refresh of browser is required.

Worse yet, it will not detect CSS changes unless --ext css' is added to nodemon args. However, when that css is added, it will stop no detecting any change even after refresh, as if nodemon wasn't installed in the first place.

### persistence

Important! To keep functioning as API while using local variables instead of proper DB, the page/json returned should always be 200 not 304.

For some reason or another (perhaps the hot reloading), it sends 304 for any page already sent, though these are dynamic pages not static ones. The fix to always return 200 was the `app.disable('etag');` statement in app.js.

This enables for instance to add records to a local variable as a result of a post request and have it not go away upon the next call to the server.

### express server

Installed with `express generator`, its web server (in www/bin) is strange and not express-like, as odd as it may sound.

### UI

At the very minimum the `Jade` engine should be replaced by `Pug`. It's worthwhile to learn it.

As soon as time permits, I should also connect this to React, making the two a full-stack package.

### ES6 modules

Replace all CommonJS `const x = require...` imports and `module.export` with ES6 modules. Add type: modules to package.json and it should support that.

### GitHub

Push it to GitHub so it would be available everywhere. Rename it to something more my-home-project like.
