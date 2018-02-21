# Abstract

Create a re-usable react/node/mongo boilerplate for a matchup tips/vote website, to re-use for multiple games.  Second is stats, waiting on quakes API before I start to flesh that out.

Made mongo on a remote server, please don't spam it, on a free plan with tight-ish limits.

# Installation
To run or modify the app, follow instructions below:

Install [node], and [gulp], then from root:

1. Server
```
$ cd server
$ npm install
$ node app
```
2. Webpack
```
$ cd front 
$ npm install
$ npm run js
```
3. Gulp
```
$ cd front
$ gulp
```

server gonna be @ http://localhost:8080/


[Node]:https://nodejs.org/download/
[Gulp]:https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

# Banner Component
The backgrounds are from the Quake Champion's site. They can be found in the champ pages header. The backgrounds are randomized using Math.random. 
A number is selected between 0 and 4, and the matching image is displayed (e.g bg-banner-1.jpg). The champion image's are PNG's found on the same page as the backgrounds. 
The banner component can be used for both the champion index and matchup index page (to display champ1 VS champ2).
