Run app in silent mode: 'npm start -s'

# JavaScript Editors
  * Atom
  * WebStorm
  * Brackets
  * VSCode

# Automated consistency among JS editors via editorconfig
  * create a '.editorconfig' file in root of project

      ----------- code block ------------
      /* editorconfig.org */
      root = true

      [*]
      indent_style = space
      indent_size = 2
      end_of_line = lf
      charset = utf-8
      trim_trailing_whitespace = true
      insert_final_newline = true

      [*.md]
      trim_trailing_whitespace = false
      ----------- code block ------------

  * install the extension 'EditorConfig for VS Code'

# Package Managers
  * Bower
  * npm (Node.js installation comes with npm)
  * JSPM
  * Jam
  * bolo

  - create the file package.json in root of project after npm install
    ----------- code block ------------
    {
      "name": "javascript-development-environment",
      "version": "1.0.0",
      "description": "JavaScript development environment",
      "scripts": {
        "prestart": "babel-node buildScripts/startMessage.js",
        "start": "npm-run-all --parallel security-check share lint:watch test:watch start-mockapi",
        "open:src": "babel-node buildScripts/srcServer.js",
        "lint": "esw webpack.config.*, src, buildScripts --color",
        "lint:watch": "npm run lint --- ---watch",
        "security-check": "nsp check",
        "localtunnel": "lt --port 3000 --subdomain hikahos",
        "share": "npm-run-all --parallel open:src localtunnel",
        "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\"",
        "test:watch": "npm run test --- ---watch",
        "generate-mock-data": "babel-node buildScripts/generateMockData",
        "prestart-mockapi": "npm run generate-mock-data",
        "start-mockapi": "json-server --watch src/api/db.json --port 3001",
        "clean-dist": "rimraf ./dist && mkdir dist",
        "prebuild": "npm-run-all clean-dist test lint",
        "build": "babel-node buildScripts/build.js",
        "postbuild": "babel-node buildScripts/distServer.js",
        "deploy": "surge ./dist"
      },
      "author": "Test Author",
      "license": "MIT",
      "dependencies": {
        "whatwg-fetch": "1.0.0"
      },
      "devDependencies": {
        "babel-cli": "6.16.0",
        "babel-core": "6.17.0",
        "babel-loader": "6.2.5",
        "babel-preset-latest": "6.16.0",
        "babel-register": "6.16.3",
        "chai": "3.5.0",
        "chalk": "1.1.3",
        "cheerio": "0.22.0",
        "compression": "1.6.2",
        "cross-env": "3.1.3",
        "css-loader": "0.25.0",
        "eslint": "3.8.1",
        "eslint-plugin-import": "2.0.1",
        "eslint-watch": "2.1.14",
        "express": "4.14.0",
        "extract-text-webpack-plugin": "1.0.1",
        "html-webpack-plugin": "2.22.0",
        "jsdom": "9.8.0",
        "json-schema-faker": "0.3.6",
        "json-server": "0.8.22",
        "localtunnel": "1.8.1",
        "mocha": "3.1.2",
        "nock": "8.1.0",
        "npm-run-all": "3.1.1",
        "nsp": "^2.8.1",
        "numeral": "1.5.3",
        "open": "0.0.5",
        "rimraf": "2.5.4",
        "style-loadr": "0.13.1",
        "surge": "^0.18.0",
        "webpack": "1.13.2",
        "webpack-dev-middleware": "1.8.4",
        "webpack-hot-middleware": "2.13.0",
        "webpack-md5-hash": "0.0.5"
      }
    }
    ----------- code block ------------

    - in terminal, type 'npm install' to download and install the dependencies

# Security scanning
  * retire.js
  * Node Security Platform
    - in terminal, type 'npm install -g nsp' to install Node Security Platform
    - type 'nsp check' to scan for vulnerabilities

# Development webservers
  * http-server
  * live-server
  * Express
  * budo
  * Webpack dev server
  * Browsersync

  - to use Express as the dev webserver, create a js file (e.g. 'srcServer.js')
    ----------- code block ------------
    /* Use either ES5 syntax */
    var express = require("express");
    var path = require("path");
    var open = require("open");
    var port = 3000;
    var app = express();
    /* or ES6 syntax */
    import express from "express";
    import path from "path";
    import open from "open";
    const port = 3000;
    const app = express();

    /* routing HTTP requests */
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../src/index.html"));
    });
    
    /* port listener */
    app.listen(port, function(err) {
      if (err) {
        console.log(err);
      } else {
        open("http://localhost:" + port);
      }
    });
    ----------- code block ------------

  - in terminal, type 'node folerName/srcServer.js'

# Sharing Work-in-progress
  * localtunnel
  * ngrok
  * Surge
  * now

  - to share WIP project using localtunnel:
    + in terminal, type 'npm install -g localtunnel' to install globally
    + after starting the app, type 'lt --port 3000 --subdomain hikahos'

# Automation
  * Grunt
  * Gulp
  * npm Scripts
  - to use npm scripts for automation, use the package.json file
      and locate the 'scripts' section:

    ----------- code block ------------
    "scripts": {
      "prestart": "babel-node buildScripts/startMessage.js",
      "start": "npm-run-all --parallel security-check share lint:watch test:watch start-mockapi",
      "open:src": "babel-node buildScripts/srcServer.js",
      "lint": "esw webpack.config.*, src, buildScripts --color",
      "lint:watch": "npm run lint --- ---watch",
      "security-check": "nsp check",
      "localtunnel": "lt --port 3000 --subdomain hikahos",
      "share": "npm-run-all --parallel open:src localtunnel",
      "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\"",
      "test:watch": "npm run test --- ---watch",
      "generate-mock-data": "babel-node buildScripts/generateMockData",
      "prestart-mockapi": "npm run generate-mock-data",
      "start-mockapi": "json-server --watch src/api/db.json --port 3001",
      "clean-dist": "rimraf ./dist && mkdir dist",
      "prebuild": "npm-run-all clean-dist test lint",
      "build": "babel-node buildScripts/build.js",
      "postbuild": "babel-node buildScripts/distServer.js",
      "deploy": "surge ./dist"
    }
    ----------- code block ------------

  - in terminal, type 'npm start -s' to run the 'start' script in silent mode

# Transpilers
  * Babel
  * TypeScript
  * Elm

  - to use Babel, create a file '.babelrc' in root of project

    ----------- code block ------------
    {
      "presets": [
        "latest"
      ]
    }
    ----------- code block ------------

  - in package.json, prepend 'babel' to node:
      "prestart": "babel-node buildScripts/startMessage.js"

# Bundlers
  * Require.js
  * Browserify
  * Webpack
  * Rollup
  * JSPM

  - to use Webpack, create a webpack config file (e.g. 'webpack.config.dev.js')
    ----------- code block ------------
    import path from "path";    

    export default {
      debug: true,
      devtool: "inline-source-map",
      noInfo: false,
      entry: [
        path.resolve(__dirname, "src/index")
      ],
      target: "web",
      output: {
        path: path.resolve(__dirname, "src"),
        publicPath: "/",
        filename: "bundle.js"
      },
      plugins: [],
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loaders: ["babel"]},
          {test: /\.css$/,loaders: ["style","css"]}
        ]
      }
    }
    ----------- code block ------------

- import webpack into the srcServer.js
    ----------- code block ------------    
    import express from "express";
    import path from "path";
    import open from "open";
    import webpack from "webpack";
    import config from "../webpack.config.dev"; 
    const port = 3000;
    const app = express();
    const compiler = webpack(config);
    /* let Express know to use webpack */
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));

    /* routing HTTP requests */
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../src/index.html"));
    });
    
    /* port listener */
    app.listen(port, function(err) {
      if (err) {
        console.log(err);
      } else {
        open("http://localhost:" + port);
      }
    });
    ----------- code block ------------

# Debugging via Sourcemaps
  Sourcemaps map transpiled and bundled code to original source
  * eval
  * source-map
  * hidden-source-map
  * inline-source-map
  * eval-source-map
  * cheap-source-map
  * cheap-module-source-map

  - to use inline-source-map, type 'debugger;' before the line of code to put a breakpoint on; this allows the developer to see the original code

# Linters
  * JSLint
  * JSHint
  * ESLint
  - to use ESLint, create file '.eslintrc.json' in project root

    ----------- code block ------------
    {
      "root": true,
      "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
      ],
      "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module"
      },
      "env": {
        "browser": true,
        "node": true,
        "mocha": true
      },
      "rules": {
        "no-console": 1
      }
    }
    ----------- code block ------------

  - in package.json's scripts section, add the lint option
      "lint": "esw webpack.config.*, src, buildScripts --color",

  - add eslint-watch to run lint on any saved changes
      "lint:watch": "npm run lint --- ---watch",

# Testing
  * Types of testing
    - Unit - single function or module
    - Integration - interactions between modules
    - UI - interactions with UI
  * Frameworks
    - Mocha
    - Jasmine
    - Tape
    - QUnit
    - AVA
    - Jest
  * Assertion Libraries
    - Chai
    - Should.js
    - expect
  * Helper libraries
    - JSDOM
    - Cheerio
  * Test Locations
    - Browser - Karma, Testem
    - Headless Browser - PhantomJS
    - In-memory DOM - JSDOM

  - to use Mocha for unit testing, add to package.json's scripts section:
      "test": "mocha --reporter progress buildScripts/testSetup.js \"src/**/*.test.js\"",
  - to run the test automatically on saved changes, add watch
        "test:watch": "npm run test --- ---watch",
  - create a test file (e.g. 'index.test.js') 

      ----------- code block ------------
      import {expect} from "chai";
      import jsdom from "jsdom";
      import fs from "fs";

      describe("Our first test", () => {
        it("should pass", () => {
          expect(true).to.equal(true);
        })
      })

      describe("index.html", () => {
        it("should have h1 that says Users", (done) => {
          const index = fs.readFileSync("./src/index.html", "utf-8");
          jsdom.env(index, function(err, window) {
            const h1 = window.document.getElementsByTagName("h1")[0];
            expect(h1.innerHTML).to.equal("Users");
            done();
            window.close();
          })
        })
      })
      ----------- code block ------------

# Continuous Integration
  CI catches mistakes quickly
  CI server runs automated build, tests, deployments

  * Travis
  * Appveyor
  * Jenkins

  - to use Travis, sign in to 'https://travis-ci.org' using GitHub account
  - create file '.travis.yml' in project root
      ----------- code block ------------
      language: node_js
      node_js:
        - "10"
      ----------- code block ------------

# Git
  * git status                            // to view pending commits
  * git add .                             // to stage changes
  * git commit -m "description of commit" // commits locally
  * git push                              // commits to GitHub
