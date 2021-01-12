## Node.js Express Clean Architecture

*A boilerplate for Node.js and express web applications.*

This project is an effort to provide a example of the best practices listed ([here](https://github.com/goldbergyoni/nodebestpractices))

Also, there is some other docker best practices in the project that I added as well.

**Strucutre and Key Points**

The project is strcutured as component based.

Each component contains all the business logic related to one entity.

There is a `module.js ` file in each component which acts as a central point for the module, and injects dependencies to other parts of component like services to controllers.

It is also loaded with logger and production ready Docker configurations.




*Have some idea that you would loike to share?*

Clone and create a pull request, it's always welcomed! :yum:

---

## Tech

- [Node v12.18+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Winston](https://www.npmjs.com/package/winston)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Ava](https://www.npmjs.com/package/ava)
- [Chai](https://www.npmjs.com/package/chai)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Sinon](https://www.npmjs.com/package/eslint)
- [Stoppable](https://www.npmjs.com/package/stoppable)
- [Joi](https://www.npmjs.com/package/joi)
- [Faker](https://www.npmjs.com/package/faker)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Config](https://www.npmjs.com/package/config)

