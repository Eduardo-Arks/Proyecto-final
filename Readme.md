## Aqui pongo las indicaciones para que el programa se ejecute en otros dispositivos, tambien describire como hacer ciertas acciones con el programa desde apollo y sobre todo como conectar el programa a un servidor de Mongodb

## Empecemos por utilizar los comandos "npm install" y seguido de eso recomiendo crear un archivo .env que contenga el url de un server de Mongodb y tambien asignar el PORT=3000.
## Una ves hecho lo anterior solo quedaria poner en la terminal "npm run" dev para que el programa se conecte tanto al server de Mongodb e inicie Apollo.

## Iniciemos con el registro de usuario

`MUTATION register`

```graphql
mutation Mutation(
  $name: String!
  $email: String!
  $password: String!
  $role: AllowedRoles!
) {
  register(name: $name, email: $email, password: $password, role: $role) {
    message
  }
}
```

`Variables`

```graphql
name: "La Yuyis",
email: "yuyis7@gmail.com",
password: "prueba",
role: "admin" || "users"
```

## Despues toca verificar al usuario

`MUTATION verify`

```graphql
mutation Mutation($verifyId: String!) {
  verify(id: $verifyId) {
    message
  }
}
```

`Variables`

```graphql
verifyId: "61856a59c261f2738388d088"
```

## Que pasa si se llega a olvidar de la contraseña?

`MUTATION forgetPassword`

```graphql
mutation ForgetPassword($email: String!) {
  forgetPassword(email: $email) {
    resetToken
    message
  }
}
```

`Variables`

```graphql
email: "test@test.com"
```

## Toca actualizar la contraseña

`MUTATION reset`

```graphql
mutation Reset($resetToken: String!, $password: String!) {
  reset(resetToken: $resetToken, password: $password) {
    message
  }
}
```

`Variables`

```graphql
resetToken: "2MzcxMDExfQ.43X3Rxfx-aoUCMdYxrgMGcFUs5inGBK6H1GDiF3PlY4"
password: "test"
```

## Aqui es como se deben llenar los datos

`MUTATION login`

```graphql
mutation MUTATION($email: String!, $password: String!) {
  login(password: $password, email: $email) {
    message
    token
    user {
      _id
      verified
      urlGitHub
      urlTwitter
      name
      email
      role
      phone
      city
      country
      createdAt
      updatedAt
    }
  }
}
```

`Variables`

```graphql
email: "yuyis7@gmail.com",
password: "test"
```

## Token Fetch

`QUERY token`

```graphql
query Token {
  token {
    token
  }
}
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

# CRUD del usuario

Basic User CRUD operation

## Lista del usuario con limites

`QUERY Users`

```graphql
query Users($page: Int, $limit: Int, $sort: String, $order: Int) {
  users(page: $page, limit: $limit, sort: $sort, order: $order) {
    _id
    name
    email
    role
    verified
    phone
    city
    country
    urlTwitter
    urlGitHub
    createdAt
    updatedAt
  }
}
```

`Variables`

```graphql
"page": 1,
"limit": 5,
"sort": "name",
"order": 1
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

## Creacion de usuario

`MUTATION register`

```graphql
mutation CreateUser($input: createUserInput) {
  createUser(input: $input) {
    message
    user {
      _id
      name
      email
      role
      verified
      phone
      city
      country
      urlTwitter
      urlGitHub
      updatedAt
      createdAt
    }
  }
}
```

`Variables`

```graphql
input {
    name: "yatin",
    email: "yatin7@gmail.com",
    password: "test",
    role: "admin" || "users"
    city: "delhi",
    country: "india",
    phone: "13124242323"
}
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

## Eliminar a un usuario

`MUTATION DeleteUser`

```graphql
mutation DeleteUser($id: String!) {
  deleteUser(id: $id) {
    message
  }
}
```

`Variables`

```graphql
id: "618804402d5ee64df0d277d9"
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

## Fetch individual del usuario

`QUERY SingleUser`

```graphql
query SingleUser($id: String!) {
  singleUser(id: $id) {
    user {
      _id
      name
      email
      role
      verified
      phone
      city
      country
      urlTwitter
      urlGitHub
      createdAt
      updatedAt
    }
  }
}
```

`Variables`

```graphql
id: "61856a59c261f2738388d088"
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

## Actualizar el usuario

`MUTATION updateUser`

```graphql
mutation Mutation($id: String!, $userDetails: UserDetailsInput!) {
  updateUser(id: $id, userDetails: $userDetails) {
    message
  }
}
```

`Variables`

```graphql
id: "6182bc91a1be9b300dda0ce1",
userDetails: {
    email: "monika23@gmail.com",
    name: "test",
    role: "user",
    phone: "3242423",
    city: "delhi",
    country: "UK"
}
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

# Profile CRUD

Basic Profile CRUD operation

## Profile Fetch

`QUERY Profile`

```graphql
query Profile {
  profile {
    name
    _id
    email
    role
    verified
    phone
    city
    country
    urlTwitter
    urlGitHub
    createdAt
    updatedAt
  }
}
```

`Headers`

```graphql
Authorization: Bearer eyJhbGciOiJIUzI1NiIs.eyJfaWQiOiI2MTg1NmE1OW
```

