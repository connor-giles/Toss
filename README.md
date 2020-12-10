## _**PLEASE READ THIS TO COMPLETION BEFORE ASKING ANY QUESTIONS!**_

## Getting Started
T.O.S.S., or This One Study Shows, aims to address a very specific trend in society: stubbornness in beliefs. Often times in an argument or debate, people will bring up a single source (academic or otherwise) that supports their point, and disregard any context or possible other points of view. 

T.O.S.S. aims to change that by exposing users to unique and different viewpoints through an easy to use webapp. 
It does this by allowing users to respond to a number of predetermined or user-submitted controversial and/or thought-provoking topics or prompts, giving their full opinion and beliefs. 
It then shows a user the responses made by other users, and prioritizes showing responses from those whose values differ most radically.

## Running the website

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. 

If attempting to run the web app locally, the user must ensure that the config files are availible in the file structure and also that the correct config.DOMAIN.name is selected. There are two options for these which include the localhost and the heroku url

This app is also deployed to heroku via the url https://toss-cen.herokuapp.com/

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `config` - This folder holds information required to run the app locally
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `databaseconnection` - This folder holds all of the required elements to connect to the mongoDB database
    - #### `pages` - Contains all the pages and their css and js components for the frontend of the website. Includes all route frontends
    - #### `utils` - Contains info about refreshing tokens
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions for each route including users and tosses
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `readFile` - Allows information to be stored into the mongoDB database directly from a json file
- #### `utils` - Contains info about filtering api that was used in this web app
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!
