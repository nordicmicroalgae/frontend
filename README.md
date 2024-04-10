# Nordic Microalgae: Frontend

![CI/CD status](https://github.com/nordicmicroalgae/frontend/actions/workflows/main.yml/badge.svg)

This repository contains source code for the frontend used in Nordic Microalgae.

The frontend is a pure client-side application written in JavaScript and uses React as UI library for web-based components.
Most of the user-interface pieces are custom, tailor-made, components intended for use in applications such as species portals.

## Install and run locally

Clone frontend repo:

```
mkdir -p ~/code/nordicmicroalgae
cd ~/code/nordicmicroalgae
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

See https://github.com/nordicmicroalgae/backend for instructions on how to setup the backend.