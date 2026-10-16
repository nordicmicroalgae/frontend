# Nordic Microalgae: Frontend

![CI/CD status](https://github.com/nordicmicroalgae/frontend/actions/workflows/main.yml/badge.svg)

This repository contains source code for the frontend used in Nordic Microalgae.

The frontend is a pure client-side application written in JavaScript and uses React as UI library for web-based components.
Most of the user-interface pieces are custom, tailor-made, components intended for use in applications such as species portals.

## Install and run locally

Clone frontend into the same `nordicmicroalgae` directory as the backend (see the
[backend instructions](https://github.com/nordicmicroalgae/backend#required-repositories-and-folders) for the full
directory layout):

```
cd nordicmicroalgae
git clone https://github.com/nordicmicroalgae/frontend.git
cd frontend
```

Install dependencies using yarn:

```
yarn install
```

Start the development server:

```
yarn run start
```

The development server runs on http://localhost:8080/ and forwards requests for `/api` and `/media` to the backend at
`127.0.0.1:5000`. Use the environment variables `WDS_PROXY_API_HOST` and `WDS_PROXY_API_PORT` to point it elsewhere.
The administration interface is not forwarded; open it directly on the backend (http://localhost:5000/admin/).

See https://github.com/nordicmicroalgae/backend for instructions on how to setup the backend.

## Deployment

Deployment is done by GitHub Actions (see `.github/workflows/`):

- Push to `next` deploys to staging (https://next.nordicmicroalgae.org/).
- Pushing a tag deploys to production (https://nordicmicroalgae.org/) and creates a GitHub release. By convention, tags
  are only created on `master`.
