# TO-DO App Backend (REST API)

MERN Stack API, aims to communicate a web app made with React and Android/iOS app made with Flutter (soon).

## Features

- User authentication and security (JWT)
- Private notes for every user
- Mood detection using Azure ML
- Language detection using Azure ML

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Name                     | Description                              |
| ------------------------ | ---------------------------------------- |
| `AZURE_ENDPOINT`         | Azure API endpoint for ML text analytics |
| `AZURE_ENDPOINT_API_KEY` | API key for Azure endpoint               |
| `MONGO_URI`              | MongoDB connection string                |
| `JWT_SECRET`             | JWT secret to sign tokens                |
| `PORT`                   | Port where server will run               |

## API Reference

<p align="middle">
<img src="https://i.imgur.com/FgCnvKe.png" alt="Note entity" width="200">
<img src="https://i.imgur.com/vcjCz3x.png" alt="Note entity" width="200">
</p>

#### User enrollment

```http
POST /signup
```

| Body       | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `name`     | `string` | **Required**. User name       |
| `email`    | `string` | **Required**. Email address   |
| `password` | `string` | **Required**. User password   |
| `mood`     | `string` | User mood. Default: `neutral` |
| `bornDate` | `string` | User birth date               |

| Response     | Type         | Description                |
| :----------- | :----------- | :------------------------- |
| `jwt`        | `Cookie`     | User JWT for auth purposes |
| `refreshJwt` | `Cookie`     | Refresh token              |
| `user`       | `JSON: User` | Successfully logged in     |

#### User login

```http
POST /login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Email address |
| `password` | `string` | **Required**. User password |

| Response     | Type         | Description                |
| :----------- | :----------- | :------------------------- |
| `jwt`        | `Cookie`     | User JWT for auth purposes |
| `refreshJwt` | `Cookie`     | Refresh token              |
| `user`       | `JSON: User` | Successfully logged in     |

#### Logout

```http
POST /logout
```

Removes JWT from user cookies

#### Get new access JWT

```http
PATCH /refresh-token
```

| Headers          | Type           | Description                            |
| :--------------- | :------------- | :------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. JWT retrieved from login |

Gives the user a new JWT to access API

#### Get user info

```http
GET /me
```

| Headers          | Type           | Description                            |
| :--------------- | :------------- | :------------------------------------- |
| `Authentication` | `Bearer token` | **Required**. JWT retrieved from login |

| Response | Type         | Description                              |
| :------- | :----------- | :--------------------------------------- |
| `user`   | `JSON: User` | Successfully retrieved current user info |

```http
POST /new
```

| Body     | Type     | Description                     |
| :------- | :------- | :------------------------------ |
| `body`   | `string` | **Required**. ToDo text         |
| `status` | `string` | "pending", "completed", "trash" |

| Response | Type         | Description             |
| :------- | :----------- | :---------------------- |
| `todo`   | `JSON: ToDo` | Successfully saved ToDo |

## Tech Stack

## Tech Stack

| Name                                                                                                  | Description                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Express](https://expressjs.com/)                                                                     | Express is a minimal and flexible Node.js web application framework                                                                   |
| [MongoDB](https://www.mongodb.com/es/what-is-mongodb)                                                 | Document database that offers great scalability and flexibility, and an advanced query and indexing model.                            |
| [JWT](https://jwt.io/)                                                                                | Open, industry standard RFC 7519 method for representing claims securely between two parties.                                         |
| [Azure Text Analytics](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) | A text-mining AI service that uncovers insights such as sentiment analysis, entities, relations, and key phrases in unstructured text |

## Roadmap

- [x] User auth
- [x] ToDo creation
- [ ] ToDo R.U.D (read, update, delete)
- [ ] Testing
- [ ] Dockerize
- [ ] Deploy to Azure/GCP/AWS
- [ ] Kubernetes
- [ ] Monitoring
- [ ] NextJS frontend
- [ ] Hosting, domain, etc
- [ ] CI/CD (Frontend/Backend)
