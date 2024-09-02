<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for building a scalable and efficient e-commerce API.

## Project Setup

1. **Install Dependencies**

    ```bash
    $ npm install
    ```

2. **Create a `.env` File**

    Create a file named `.env` in the root of your project with the following content:

    ```env
    JWT_SECRET=wb5B07U8bIKtfg4PWBcNUoxnbGFk92QY
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=P@ssw0rd
    DB_NAME=ecommerce
    ```

3. **Compile and Run the Project**

    ```bash
    # Development mode
    $ npm run start

    # Watch mode (auto-reload)
    $ npm run start:dev

    # Production mode
    $ npm run start:prod
    ```

4. **Run Tests**

    ```bash
    # Unit tests
    $ npm run test

    # End-to-end tests
    $ npm run test:e2e

    # Test coverage
    $ npm run test:cov
    ```

## API Documentation

Swagger documentation is available at the following endpoint:

- **Swagger UI**: [http://localhost:3000/api/v1/api-docs](http://localhost:3000/api/v1/api-docs)

### Authentication

- **Login and Register**: No token is required.
- **All other endpoints**: Requires a valid JWT token in the `Authorization` header.

### Endpoints

#### Authentication Endpoints

- **Login**: `POST /auth/login`
  - **Description**: Authenticate a user and receive a JWT token.
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **Register**: `POST /auth/register`
  - **Description**: Register a new user.
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password",
      "name": "User Name"
    }
    ```

#### User Management Endpoints

- **Ban User**: `PUT /users/ban/:id`
  - **Description**: Ban a user. Requires `admin` role.
  - **Headers**:
    - `Authorization: <token>`
  - **Parameters**:
    - `id`: User ID to be banned.

- **Unban User**: `PUT /users/unban/:id`
  - **Description**: Unban a user. Requires `admin` role.
  - **Headers**:
    - `Authorization: <token>`
  - **Parameters**:
    - `id`: User ID to be unbanned.

## Resources

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open-source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- **Author** - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- **Website** - [https://nestjs.com](https://nestjs.com/)
- **Twitter** - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
