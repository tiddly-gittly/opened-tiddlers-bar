# Wikitext plugin template for TiddlyWiki5


## !! Features

This plugin provides VSCode style "Opened Tiddlers" top bar



Use the middle mouse button or the X button to close the tab.

Use Shift + mouse wheel to swipe sideways to view.

## !! Credits

This plugin is based on [$:/plugins/bj/storytabs](http://bjtools.tiddlyspot.com/) , which is in MIT license, thank you, Buggyj!

## Development

There are some scripts you can run to boost your development.

After `npm i`:

- `npm run dev` to auto pack the plugin and run a demo site. Your change in the src directory will automatically refresh the site.
- `npm run dev-html` to see demo site with packed plugin after you finish your development, this can be your final check, this runs slower than `npm run dev`

### After the plugin is complete

#### Publish

Enable github action in your repo (in your github repo - setting - action - general) if it is not allowed, and when you tagging a new version `vx.x.x` in a git commit and push, it will automatically publish to the github release.

#### Demo

You will get a Github Pages demo site automatically after publish. If it is 404, you may need to manually enable Github Pages in your github repo:

Settings - Pages (on left side) - Source - choose `gh-pages` branch
