# Polling Application Client

Create simple and dynamic polls with real-time results using this polling application.

## Table of Contents
* **[About](#about)**
  * [Installation](#installation)  
  * [Live Deployment](#live-deployment) 
  * [How To Use](#how-to-use) 
  * [Development Features](#development-features)
* **[Project Code](#project-code)**  
  * [File Structure](#file-structure)
  * [App Components](#app-components)
    * [App](#app)
    * [Auth](#auth)
    * [Header](#header)
  * [Routes](#routes)
    * [Home](#home)
    * [Create](#create)
    * [Poll](#poll)
  * [Actions](#actions)
    * [Authentication](#authentication)
    * [Poll Actions](#poll-actions)
  * [Reducers](#reducers)
    * [Authentication Reducer](#authentication-reducer)
    * [Poll Reducer)(#poll-reducer)
* **[About Me](#about-me)**

## About
This polling application is a full stack project I made which aims to allow authenticated users to create polls with an unlimited amount of options to vote for. Once the poll is created, they may share the unique link to the poll with others to vote. Users do not need to be registered to place a vote. Polls are automatically refreshed so that users can see real-time results as votes come in.

This repository contains the front-end code for the website, including all redux state actions & reducers, routes, components, containers, and middleware functions. The starting point for the URI is at http://localhost:3000/ if running locally.

### Installation
To install, run:

`npm install`

To run the tests:

`npm run test`

To run the development server (default port 3000):

`npm start`

To run the production server:

`npm run build`

and then serve the build files using the server of your choice. A back-end server will need to be running to use this client. You may use the one that is live deployed, or you may create your own server. See the repository polls_server for further details.

### Live Deployment
The website is live on [https://puljak.ca/polling_app](#https://puljak.ca/polling_app).

### How To Use
This polling application is lightweight and simple to use. The home page displays the most recently created polls, and are freely accessible to view and use for any visiter. To create a poll, you must first be registered to the website. Feel free to create an account as it's simple and easy, and once you are logged in, you may begin. 

Once on the home page, you click the "Create Poll+" button, and this will take you to a standard creation form. You can then enter your poll title, and two default text boxes for options appear. A poll must have at least two options to pick from, so these are mandatory. If you would like to enter more options for your poll, you may click the "Add Option" button. Any unfilled text boxes will not count as an option. Once finished, hit "Submit" to enter the form, or if unsatisfied, you may click "Clear" to delete everything and start fresh.

It will then take you to your newly created poll page, and here you may vote or send the unique for others to vote. As it stands, a user does not have to be registered to vote, and they may vote an unlimited amount of times, but I might look into further unique user validation in the future. The colors for the poll options are generated completely randomly, but I will probably change this to use defined colors if it looks too ugly.

### Development Features
The following are some of the various development features used to create this application:
* Written using ES6
* The React framework for the front-end
* React-router to handle the routing
* Redux to store the state
* Redux-thunk middleware for asynchronous action calls
* Redux-form to handle user submitted forms
* AJAX calls to the API through axios
* Semantic UI for the CSS framework and grid system
* node.js back-end server served by the Express framework
* MySQL database to save all of the data
* Sequelize for the object relational modeling tool
* NGINX for the web server

## Project Code

### File Structure
```
├── build/
|   ├── Production build files for the application
├── config/ [You will need to EJECT (`npm run eject`) if you wish to configure babel/webpack files]
|   ├── Jest & webpack config files
├── node_modules/
|   ├── Module dependencies
├── public/
|   ├── Public files served - index, favicon, images, google analytics, etc.
├── scripts/ [You will need to EJECT (`npm run eject`) if you wish to configure scripts]
|   ├── Scripts for running build, start, and test
├── src/
│   ├── actions/
|   |   ├── Redux actions and types contants definition
│   ├── core/
│   │   ├── Core application components -> app entry point, auth, header
│   ├── middleware/
│   │   ├── localStorage handling middleware
│   ├── reducers/
│   │   ├── Redux reducers for authentication and street view actions
│   ├── routes/
│   │   ├── create/
|   |   |   ├── Displays all the poll creation components
│   │   ├── home/
│   │   │   ├── Displays the home page
│   │   ├── poll/
|   |   |   ├── Displays the individual unique poll components
|   ├── index.js
|   |   ├── Main index file, all definitions & reactDOM render
├── test/
|   ├── Directory for test suites (currently unfinished)
├── package.json
|   ├── package.json file
├── README.md
|   ├── README.md file
```

### App Components
The following are the core application components that compose the polling application:

#### App
This is the main entry point which serves as a higher order component which wraps the rest of the application as its children.

#### Auth
This contains the authentication components which act as Redux-form containers. They allow users to register and log in to the website by dispatching actions which connect to the back-end.

##### Login
The Login component can be accessed through the /login route. It is a modal which pops up on any page, and allows the user to enter their username and password credentials. The form validates for various errors, such as missing parameters.

##### Register
The Register component can be accessed through the /register route. It is a modal which pops up on any page, and allows the user to register to the website by providing a username and password. The form validates for various errors including unique usernames, and matching passwords.

#### Header
The Header component displays the navigation bar on the top of every page. It allows easy access to the home page, as well authentication functions including signing in, signing up, and signing out.

### Routes
The following are the different routes that are accessible through react-router:

#### Home
`/`

The Home component is a container which serves as the home page for the website. It renders a title and slogan, as well as access to any recently created polls. If the user is authenticated, it allows them to create polls as well.

#### Create
`/create`

The Create class component allows the creation of a new poll by an authenticated user. The user can fill out a form that contains a poll title, and any number of options greater than one.

#### Poll
`/poll/[ID]`

The Poll class component displays the poll contents for an individual unique poll identified by ID. ID numbers are assigned chronologically starting from 1 (the first poll created) and onwards. The contents include the poll's title, the username of who created it, a pie chart displaying the current results, and dropdown options to select and cast your own vote. The pie chart is refreshed periodically, as well as each time a vote is cast.

### Actions
The following are the various actions that can be dispatched throughout the application structure:

#### Authentication

##### authError
Sets the state to indicate if an error occured during an authentication API call. Dispatches AUTH_ERROR.

##### signinUser
Authenticates and signs in a user given a username and password. Makes an API call to:  

`http://localhost:3010/api/auth/login`  

Dispatches AUTH_USER and AUTH_NAME.

##### signupUser
Registers a user given a unique username and password. Makes an API call to:  

`http://localhost:3010/api/auth/register`

Dispatches AUTH_USER and AUTH_NAME.

##### signoutUser
Signs the user out. Dispatches UNAUTH_USER.

#### Poll Actions

##### fetchError
Sets the state to FETCH_ERROR to indicate an error occured during some fetch call. Dispatches FETCH_ERROR.

##### fetchHomePolls
TO-DO: Later change this to a weekly/monthly basis to limit page load or paginate.  
Fetches all polls in the database. Makes an API call to:

`http://localhost:3010/api/polls/fetch_all`

Dispatches FETCH_POLLS.

##### fetchSinglePoll
Fetches a single poll to be viewed in it's own page. Makes an API call to: 

`http://localhost:3010/api/polls/[ID]/read`

where ID is the desired poll id. Dispatches FETCH_SINGLE_POLL.

##### createError
Sets the state to CREATE_ERROR if there was a problem creating the poll.

### Reducers
The following are the reducers that are used to form the Redux state throughout the application:

#### Authentication Reducer
Cases: 

##### AUTH_USER
If the user has been authorized, flags authenticated to true.

##### AUTH_NAME
If the user has been authorized, adds their username to the state.

##### UNAUTH_USER
If the user has been unauthorized, flags authenticated to false.

##### AUTH_ERROR
If there is an error with the authentication, sets an error message.

#### Polls Reducer
Cases:

##### FETCH_ERROR
If there is an error during a fetching API call, it sets an error message.

##### FETCH_POLLS
Saves the recently made polls in the state.

##### FETCH_SINGLE_POLL
Saves a single poll to be viewed in the state.

##### CREATE_ERROR
If there is an error with creating a poll, sets an error message.

## About Me  
I'm a computer science graduate looking to break into the world of professional software and web development. For more information about me, visit my website at [puljak.ca](https://puljak.ca)!