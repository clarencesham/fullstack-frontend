
### fullstack-frontend 


React client that consumes the API: `https://github.com/clarence/fullstack`

## Getting Started

> [[Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations)


## Technologies Used

- JavaScript
- [React](https://reactjs.org)
- [Redux](https://redux.js.org)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html).


## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing Node automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/clarencesham/Forum-App-React-Frontend.git`

#### Setup

- Use Node.js 26 and npm 12 or later. With [nvm](https://github.com/nvm-sh/nvm), run:
  ```shell
  nvm install 26
  nvm use 26
  npm install -g npm@latest
  ```
- Install dependencies and start the frontend:
  ```shell
  npm install
  npm start
  ```
- Visit `http://localhost:3000`.

The development API URL defaults to `http://172.22.29.4:8080`. To use another backend, set `REACT_APP_API_URL` to its API base URL before starting or building, for example:
  ```shell
  REACT_APP_API_URL=http://172.22.29.4:8080 npm start
  ```

Production builds keep the existing hosted API URL unless `REACT_APP_API_URL` is set during the build:
  ```shell
  REACT_APP_API_URL=http://172.22.29.4:8080 npm run build
  ```

The Go backend must be reachable from the browser on port `8080` and allow requests from the frontend's origin via CORS. If the frontend is served over HTTPS, the backend must also be available over HTTPS to avoid browser mixed-content blocking.

The frontend uses the backend's root routes and raw JSON responses. Features without backend routes—likes, comments, avatar upload, and password reset—are not exposed.

The frontend requires login and filters the posts it displays to the signed-in user. This is only a UI restriction: the backend currently serves `GET /posts` and `GET /posts/{id}` without authentication, so it must also authenticate and enforce post ownership to prevent direct API access to other users' posts.


