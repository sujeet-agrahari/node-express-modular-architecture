
# Node Express Clean Architecture
A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and sequelize.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/sujeet-agrahari/node-express-clean-architecture.git
cd node-express-clean-architecture
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

- **Postgresql**: [Sequelize](https://sequelize.org/) 
- **Authentication and authorization**: using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) 
- **Testing**: unit and integration tests using [ava](https://jestjs.io)
- **Error handling**: centralized error handling mechanism [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Process management**: advanced production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [node-config](https://www.npmjs.com/package/config)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Graceful Shutdown**:  with [stoppable](https://www.npmjs.com/package/stoppable) releases database connection and other resource before closing the server also _listens_ for signals like `SIGINT` and `SIGTERM`


## Commands

Running locally:

```bash
npm start 
```

Running in production:

```bash
# set NODE_ENV=production in .env 
npm start 
```
Docker:

```bash
# development
docker build ---target dev -t sujeet-agrahari/your-project:latest 

#production
docker build --target prod -t sujeet-agrahari/your-project:latest  
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
NODE_ENV=development

# node-config directory path
NODE_CONFIG_DIR=./src/config
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--components\     # Each entity is wrapped inside its own component
   |--component.module.js      # Component entry file
   |--component.controller.js  # Component controller
   |--component.service.js     # Component service
   |--component.routes.js      # Component routes
   |--component.validator.js   # Component validators
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--db\             # Sequelize ORM files (data layer)
   |--models                  # Sequelize models
   |--seeders                 # Sequelize seeders
   |--migrations              # Sequelize migrations
 |--utils\          # Utility classes and functions
 |--loaders\.       # Lodas routes and configs; also validates configs
 |--support\        # Wrapper around used packages so that it can be replaced if package is changed
 |--app.js          # Express app
 |--server.js       # App entry point
```
## CLI Support
node-express-clean-architecture comes with `cli` support. Instead of creating components and files manully you can use command line tool to automate the process.

To create a new component simply run,
```
npm run create:component -- --name="ComponentNameHere"
```

## API Documentation


### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register
`POST /v1/auth/login` - login

## Error Handling

The app has a centralized error handling mechanism, no `try{..} catch() {..}`

All errors are captured, logged and managed through one file: `src/middlewares/error.js`

It will log errors, debugs, and infos on console in `development` mode,  and in production mode it also logs to files: `logs/errors.log` and `logs/combined.log` 




`

The error handling middleware sends an error response, which has the following format:

```
{
error: {
	 "code": 404,
     "message": "Not found"
   }
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere 

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const { NodeFoundError } = require('../utils/api-errors');
const { User } = require('../db/models');

const getUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/components/{eachComponent}/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
router.post(
  '/login',  
  makeValidatorCallback(AuthValidator.validateLogin), 
  makeExpressCallback(AuthController.login)
  );
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
// Routes
const { AuthRoutes } =  require('../components/Auth/auth.module');
module.exports  =  function  getRoutes(app) {
app.use('/api/v1/auth', AuthRoutes);
};
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for one day. You can modify this expiration time by changing the  config variable in the `config/default.yaml` file.
```
JWT_SIGN_OPTIONS:
  issuer:  My Compny Pvt Ltd
  audience:  https://example.in
  expiresIn:  1d
```

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

An access token is valid for one day. You can modify this expiration time by changing the  config variable in the `config/development.yaml` file.


## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/users', auth('manageUsers'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files.

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).


## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## License

[MIT](LICENSE)
