# Iglesia Digitalizada

Proyecto creado en colaboración con la iglesia "Santo Toribio" para ser evaluado en el ramo "Ingeniería de software 2 (2022)"

## Getting dependencies installed

You will require the next dependencies to run this project:

- Node Js v22.15.x
- Yarn v1.22.22

### Installing yarn

```bash
npm install --global yarn
```

### Installing all project dependencies

for installing the rest of dependencies located in the `package.json` file, you will use the following command:

```bash
yarn
```

## Getting the development server running

To run the development server, you will use the following command:

```bash
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the development server.

## Getting the production server running

To compile the development server, you will use the following command:

```bash
yarn build
```

Once finished compiling, you will use the following command to run the production server:

```bash
yarn start
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the production server.
Keep in mind that everytime you update a file here, you must re-compile the production server to apply changes

## .env.example

- `NODE_ENV` is the type of environment that will be used, can be `development` or `production`
- `JWT_SECRET` is the JWT seed that is used to generate the user token. Must be the same as the Backend.
- `NEXT_PUBLIC_URL` is the URL this app is going to be located.
- `NEXT_PUBLIC_API_URL` is the URL where the Backend is located.

## Learn More

This project uses:

- [Next Js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Tanstack Query](https://tanstack.com/query/latest)
