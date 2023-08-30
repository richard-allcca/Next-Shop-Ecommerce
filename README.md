# Getting Started

First, run the development server:

```bash
yarn dev
```

## Configuararciones iniciales

- Reconstruir los modulos con `npm i`

    ***Importante agregar `mongo/` al gitignore***

### DDBB en local

- tener docker desktop corriendo y ejecutar

``` bash
  docker compose up -d
```

### Cadena de conexion con MongoDB local (contenedor)

``` bash
  mongodb://localhost:27017/entriesdb
```

### Llenar la DDDBB con datos de prueba usando

- usa este comando solo una vez o elimina el file /page/api/seed

```bash
  GET - localhost://localhost:3000/api/seed
```

### Font global

- use en el _document

``` html
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
```

- Configuarar variables de entorno

- MongoDB URL Local, para conexion con la base de datos.

``` bash
  mongodb://localhost:27017/entriesdb
```

## Dependecias

``` bash
  yarn add @mui/material @emotion/react @emotion/styled
  yarn add @mui/icons-material
  yarn add uuid
  yarn add notistack
  yarn add date-fns
  yarn add @mui/x-data-grid
  yarn add js-cookies
  yarn add bcryptjs
  yarn add jsonwebtoken
  yarn add react-hook-form
  yarn add axios
```

## Enlaces

- [Material UI](https://mui.com/)
- [Drag & Drop react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)
- [Codigos de respuesta http](https://developer.mozilla.org/es/docs/Web/HTTP/Status)
- [Middleware Next](https://nextjs.org/docs/advanced-features/middleware)
- [Guia de migración Middleware Next](https://nextjs.org/docs/messages/middleware-upgrade-guide#breaking-changes)
- [Snackbar](https://mui.com/material-ui/react-snackbar/)
- [notistack - con Provider](https://github.com/iamhosseindhv/notistack)
- [date-fns](https://date-fns.org/)
- [Mui Grid](https://mui.com/x/react-data-grid/getting-started/#main-content)
- [react-hook-form](https://react-hook-form.com/get-started)

## Vista previa

![Home](assets/home.png)
