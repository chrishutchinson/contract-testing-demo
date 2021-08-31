# Contract Testing demo app

## Client app

The client app is a simple script that fetches data from the service API.

Set up and run with:

```bash
cd client-app
yarn
yarn start
```

> Note: This is analogous to any client facing application that calls back end APIs, for example a website

## Service API

The service API exposes two endpoints:

- `GET /api/v1/users` – get all users
- `GET /api/v1/users/:id` – get a user by ID

Set up and run with:

```bash
cd service-api
yarn
yarn start
```

> Note: This is analogous to any server-side application that provides HTTP APIs, for example a platform API

## Pact Broker

This is where the magic happens. The Pact Broker stores the contracts provided by the client app, and allows the service API to test against them.

Run with:

```
cd pact-broker
docker-compose up
```
