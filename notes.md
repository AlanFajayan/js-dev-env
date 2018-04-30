Run app in silent mode: 'npm start -s'

# Git
  - create a new repository in GitHub, and add Node to .gitignore
  - clone the repo and copy the url it provides
  - in terminal, type 'git clone 'https://github.com/alanfajayan/js-dev-env.git Development/js-dev-env'
  - useful commands
    * git status                            // to view pending commits
    * git add .                             // to stage changed files
    * git commit -m "description of commit" // to commit changes locally
    * git push                              // to push your project to GitHub
    * git pull
    * git fetch
    * git merge

# VSTS
  * to install TFVC CLI, type 'sudo npm install -g tfx-cli'
  * to push project to VSTS
    - 'git remote add origin https://fajayan.visualstudio.com/_git/js-dev-env'
    - git push -u origin --all
  

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
  Standardized method for sharing code
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
  Checking for security vulnerability in dependencies
  * retire.js
  * Node Security Platform
    - in terminal, type 'npm install -g nsp' to install Node Security Platform
    - type 'nsp check' to scan for vulnerabilities

# Development webservers
  View app during development
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
  Share app in public external site
  * localtunnel
  * ngrok
  * Surge
  * now

  - to share WIP project using localtunnel:
    + in terminal, type 'npm install -g localtunnel' to install globally
    + after starting the app, type 'lt --port 3000 --subdomain hikahos'

# Automation
  Ensure that builds and related tooling are integrated in a consistent manner
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
  Allows modern, standards-based JS by compiling down to ES5
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
  Why bundle?
  - npm packages use the CommonJS pattern, which doesn't work in browsers
  - package project into file(s)
  - improve Node performance

  Bundling platforms
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
  Enforce consistency and avoid mistakes
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

# HTTP Calls
  JS handling of request and respone

  Approaches
  * Node
    - http
    - request
  * Browser
    - XMLHttpRequest (xhr)
    - jQuery
    - Framework-based (e.g. Angular built-in http call)
    - Fetch
  * Node & Browser
    - isomorphic-fetch
    - xhr
    - SuperAgent
    - Axios
  
  - to use Fetch, create an api js file (e.g.'userApi.js')
    ----------- code block ------------
    import "whatwg-fetch";    

    export function getUsers() {
      return get("users");
    }

    function get(url) {
      return fetch(baseUrl + url).then(onSuccess, onError);
    }
    
    function onSuccess(response) {
      return response.json();
    }

    function onError(error) {
      console.log(error); 
    }
    ----------- code block ------------
  
  Mocking HTTP usage
  * unit testing
  * instant response
  * keep working when services are down
  * rapid prototyping
  * avoid inter-team bottlenecks
  * work offline

  Apps for mocking HTTP
  * Nock
  * static JSON
  * Development webserver
    - api-mock
    - JSON server
    - JSON schema faker
    - Browsersync
    - Express
  
  Plan for mocking HTTP
  * declare schema - JSON schema faker
    - create a schema js file (e.g. 'mockDataSchema.js')

      ----------- code block ------------
      export const schema = {
        "type": "object",
        "properties": {
          "users": {
            "type": "array",
            "minItems": 3,
            "maxItems": 5,
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "number",
                  "unique": true,
                  "minimum": 1
                },
                "firstName": {
                  "type": "string",
                  "faker": "name.firstName"
                },
                "lastName": {
                  "type": "string",
                  "faker": "name.lastName"
                },
                "email": {
                  "type": "string",
                  "faker": "internet.email"
                }
              },
              "required": ["id", "firstName", "lastName", "email"]
            }
          }
        },
        "required": ["users"]
      };
      ----------- code block ------------

  * generate random data - faker.js (other options: chance.js, randexp.js)
    - to create mock data with faker, create js file (e.g. 'generateMockData.js')

      ----------- code block ------------
      import jsf from "json-schema-faker";
      import {schema} from "./mockDataSchema";
      import fs from "fs";
      import chalk from "chalk";

      const json = JSON.stringify(jsf(schema));

      fs.writeFile("./src/api/db.json", json, function(err) {
        if (err) {
          return console.log(chalk.red(err));
        } else {
          console.log(chalk.green("Mock data generated."));
        }
      });
      ----------- code block ------------
    - run 'generateMockData' in package.json's scripts section
        "generate-mock-data": "babel-node buildScripts/generateMockData",

  * serve data via API - JSON server
    - add in package.json's scripts section
      "prestart-mockapi": "npm run generate-mock-data",
      "start-mockapi": "json-server --watch src/api/db.json --port 3001",
  
# Production Build
  * Minification and Sourcemaps
    - shortens variable and function names
    - removes comments
    - removes whitespace and new lines
    - dead code elimination (tree-shaking)
    - debug via sourcemap

    + using source-map and minify in prod, create webpack.config file (e.g. 'webpack.config.prod.js')

      ----------- code block ------------
      import path from "path";    
      import webpack from "webpack";  

      export default {
        debug: true,
        devtool: "source-map",
        noInfo: false,
        entry: {
          path.resolve(__dirname, "src/index")
        },
        target: "web",
        output: {
          path: path.resolve(__dirname, "dist"),
          publicPath: "/",
          filename: "bundle.js"
        },
        plugins: [
          // eliminate duplicate packages
          new webpack.optimize.DedupePlugin(),

          // minify js
          new webpack.optimize.UglifyJSPlugin()
        ]
      ----------- code block ------------

    + create a build file to run the webpack.config.prod (e.g. 'build.js')

      ----------- code block ------------
      /* eslint-disable no-console */
      import webpack from "webpack";
      import webpackConfig from "../webpack.config.prod";
      import chalk from "chalk";

      process.env.NODE_ENV = "production";

      console.log(chalk.blue("Generating minified bundle for production. This will take a moment..."));

      webpack(webpackConfig).run((err, stats) => {
        if (err) { // a fatal error occurred; stop here.
          console.log(chalk.red(err));
          return 1;
        }

        const jsonStats = stats.toJson();

        if (jsonStats.hasErrors) {
          return jsonStats.errors.map(error => console.log(chalk.red(error)));
        }

        if (jsonStats.hasWarnings) {
          console.log(chalk.yellow("Webpack generated the following warnings: "));
          jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
        }

        console.log(`Webpack stats:${stats}`);

        // if we got this far, the build succeeded.
        console.log(chalk.green("Your app has been built for production and written to /dist!"))

        return 0;
      });
      ----------- code block ------------
    
    + to automate prod build, add in package.json's scripts section
        "clean-dist": "rimraf ./dist && mkdir dist",
        "prebuild": "npm-run-all clean-dist test lint",
        "build": "babel-node buildScripts/build.js",
        "postbuild": "babel-node buildScripts/distServer.js",
  
  * Dynamic HTML
    - manipulate HTML for prod by using dynamic bundle names and injecting prod-only resources

    - referencing bundled assets in HTML
      + hard coding as inline tag
      + manipulate via Node
      + html-webpack-plugin

    - to use html-webpack-plugin to create dynamic HTML
      + add to 'webpack.config.prod.js'

        ----------- code block ------------
        import HtmlWebpackPlugin from "html-webpack-plugin";

        plugins: [
          // create html file that includes reference to bundled js
          new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            },
            inject: true
          })
        ],
        ----------- code block ------------

  * Bundle splitting
    - users don't have to download entire app when only parts changed
    - to use bundle splitting with webpack, edit webpack.config.prod.js

      ----------- code block ------------
        output: {
          path: path.resolve(__dirname, "dist"),
          publicPath: "/",
          filename: "[name].js"
        },
        entry: {
          vendor: path.resolve(__dirname, "src/vendor"),
          main: path.resolve(__dirname, "src/index")
        },

        plugins: [          
          // use CommonsChunkPlugin to create a separate bundle of vendor libraries so that they're cached separately
          new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
          }),
      ----------- code block ------------

  * Cache busting
    - ensure users receive latest code on deployment
    - plan for busting cache
      + hash bundle filename
      + generate html dynamically
    - to use webpack-md5-hash for cache busting, edit webpack.config.prod.js

        ----------- code block ------------
        import WebpackMd5Hash from "webpack-md5-hash";

        output: {
          path: path.resolve(__dirname, "dist"),
          publicPath: "/",
          filename: "[name].[chunkhash].js"
        },
        plugins: [          
          // hash the files using MD5 so that their names change when content changes
          new WebpackMd5Hash(),          
          }),
        ----------- code block ------------

  * Error logging
    - facilitate debugging
    - error logging apps
      + TrackJS
      + Sentry
      + New Relic
      + Raygun
    
# Production Deploy
  * Separate UI and API
    - simple, low-risk, UI-only deploys
    - separates concerns
      + separate teams
      + less to understand
      + scale back-end separately
    - cheap UI hosting
    - serve UI via a CDN
    - use the API tech you like (JS, C#, Java, etc.)
  * Cloud hosting
    - AWS
    - Azure
    - Heroku
    - Firebase
    - Google Cloud Platform
    - Pubstorm
    - GitHub Pages (static files only)
    - Surge (static files only)

    - to install Heroku cli, type in terminal 'npm install -g heroku'
    - to use Heroku for API deployment, set up an account in https://devcenter.heroku.com
      + in package.json, add in 'dependencies' section
        "dependencies": {
          "cors": "2.8.1",
          "express": "4.13.3"
        }
      + add in index.js
        var express = require("express");
        var cors = require("cors");
      + in app.json 
        {
          "name": "Node API example",
          "description": "A simple API built in Node and Express hosted on Heroku",
          "repository": "https://github.com/alanfajayan/js-dev-env-demo-api",
          "keywords": ["node", "express", "static"]
        }
      + in Procfile
        web: node index.js
    - to deploy to Heroku, type in terminal
      + heroku login (enter email and password credentials)
      + heroku create (returns a url - e.g. 'https://protected-oasis-22659.herokuapp.com')
      + heroku git:remote -a protected-oasis-22659
      + git push heroku master
    - prepare files for production deployment
      + edit baseUrl.js
          export default function getBaseUrl() { 
            return getQueryStringParameterByName("useMockApi") ? "http://localhost:3001/" : "https://protected-oasis-22659.herokuapp.com/";
          }

    - to use Surge for UI deployment, add in package.json's scripts section
        "deploy": "surge ./dist"
    - type in terminal
      + npm run build -s
      + npm run deploy
    - a random url is generated by Surge (e.g. 'first-attempt.surge.sh')
  
  * Update approaches
    - Yeoman
    - GitHub
    - npm
  