# Static-Starter

## Getting Started

1. Open terminal and navigate to the folder you want your project in.

2. Clone this repo down to your local machine by using the following command in terminal...

```git clone https://github.com/bradstemke/acorn```

3. Navigate into the new folder it cloned down, this is the base of our project.

4. Install Grunt locally for the project by using the following command in terminal...

```npm install grunt --save-dev```

5. Then install the dependencies, by using the following command in terminal...

```npm install --save-dev```

```run 'grunt'```

6. Annnd you are good to go! SCSS and JS are now being compiled into the dist/assets folder for production use.

If you run into any issues getting this running on your machine, ping Brad in Slack.

## Using Grunt

The following is a list of the commands you can use with this starter, inside terminal.

```grunt ```
This is the main command you will have running while you are working on your project. It will watch the SCSS files and scripts.js file for any changes and push them to the /assets-build folder.

```grunt server```
This command starts up a local server to do development on. http://localhost:9001/dist/index.html

```grunt clean```
This command empties out the folder that was made with "grunt copy"

```grunt build```
This command runs SCSS build, Uglify on the JS, cleans out the folder with production ready code, and re-builds it. Use with caution.
