<p align="center">
    <img
      alt="LOUD"
      src="https://elasticbeanstalk-us-east-1-909474674380.s3.amazonaws.com/strapi-uploads//loud_icon_33cc0a4b1c.png"
      width="300"
    />
</p>
<hr>

Loud Prefeitura de São Paulo application is an API to handle with Opinions, comments and upvotes.

The project uses the most advanced software technologies, built with Typescript and SOLID Architecture

# Content

- [Specifications](#specifications)
- [First Steps](#first-steps)
- [Endpoints](#endpoints)
  - [Users](#users)
    - [Create User](#create-user)
    - [Authenticate User](#authenticate-user)
  - [Opinions](#opinions)
    - [Create Opinion](#create-opinion)
    - [Update Opinion](#update-opinion)
    - [Delete Opinion](#delete-opinion)
    - [List Opinions](#list-opinions)
    - [List Opinions By Upvotes](#list-opinions-by-upvotes)
  - [Upvotes](#upvotes)
    - [Create Upvote](#create-upvote)
    - [Delete Upvote](#delete-upvote)
  - [Comments](#comments)
    - [Create Comment](#create-comment)
    - [Update Comment](#update-comment)
    - [Delete Comment](#delete-comment)

## Specifications

- Typescript 4.3.5
- MySQL 5.7
- TypeORM 0.2.34
- Docker 20.10.5

## First Steps

    git clone https://github.com/GGotha/loud-prefeiturasp.git
    yarn install
    yarn typeorm migration:run
    yarn db:seed
    yarn start-dev

## Endpoints

### Users

#### Create User

`POST /user`

    route mode: public

##### Request

```json
{
  "email": "test@gmail.com",
  "name": "Test",
  "password": "password",
  "confirm_password": "password"
}
```

##### Response

```json
{
  "success": true,
  "user": {
    "email": "test@gmail.com",
    "name": "Test",
    "created_at": "2021-07-05T20:06:47.633Z"
  }
}
```

#### Authenticate User

`POST /user/session`

    route mode: public

##### Request

```json
{
  "email": "test@gmail.com",
  "password": "password"
}
```

##### Response

```json
{
  "success": true,
  "user": {
    "id": 3,
    "email": "test@gmail.com",
    "name": "Test",
    "created_at": "2021-07-05T20:06:48.000Z",
    "updated_at": null,
    "roles": {
      "id": 2,
      "name": "User",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjMsInJvbGUiOiJVc2VyIn0sImlhdCI6MTYyNTUxNTkwOCwiZXhwIjoxNjI1NjAyMzA4fQ.KMCraYELdIgxIz9GI8oqbXPEuq0_HxcL9Di8pPj2V1Y"
}
```

### Opinions

#### Create Opinion

`POST /opinion`

    route mode: user private

##### Header

    Authorization: Bearer ${sessionToken}

##### Request

```json
{
  "content": "123"
}
```

##### Response

```json
{
  "success": true,
  "opinion": {
    "id_user": 3,
    "content": "123",
    "created_at": "2021-07-05T20:34:10.515Z"
  }
}
```

#### Update Opinion

`PUT /opinion/:opinionId`

    route mode: admin private

##### Header

    Authorization: Bearer ${sessionToken}

##### Request

```json
{
  "content": "updated"
}
```

##### Response

```json
{
  "success": true,
  "opinion": {
    "id_user": 1,
    "content": "updated",
    "created_at": "2021-07-05T20:36:40.888Z"
  }
}
```

#### Delete Opinion

`DELETE /opinion/:opinionId`

    route mode: admin private

##### Header

    Authorization: Bearer ${sessionToken}

##### Response

```json
{
  "success": true,
  "message": "Opinion has been deleted"
}
```

#### List Opinions

`GET /opinion`

    route mode: public

##### Response

```json
{
  "success": true,
  "opinions": [
    {
      "id": 1,
      "id_user": 1,
      "content": "test opinion 1",
      "upvotes": "5",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 2,
      "id_user": 2,
      "content": "test opinion 2",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 3,
      "id_user": 2,
      "content": "test opinion 3",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 4,
      "id_user": 1,
      "content": "test opinion 4",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    }
  ]
}
```

#### List Opinions By Upvotes

`GET /opinion/:order`

    route mode: public
    NOTE: order can be ASC or DESC

##### Response

```json
{
  "success": true,
  "opinions": [
    {
      "id": 4,
      "id_user": 1,
      "content": "test opinion 4",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 2,
      "id_user": 2,
      "content": "test opinion 2",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 3,
      "id_user": 2,
      "content": "test opinion 3",
      "upvotes": "1",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    },
    {
      "id": 1,
      "id_user": 1,
      "content": "test opinion 1",
      "upvotes": "5",
      "created_at": "2021-07-05T19:55:01.000Z",
      "updated_at": null
    }
  ]
}
```

### Upvotes

#### Create Upvote

`POST /opinion-upvote/:opinionId`

    route mode: user private

##### Header

    Authorization: Bearer ${sessionToken}

##### Response

```json
{
  "success": true,
  "upvote": {
    "id_user": 2,
    "id_opinion": 1,
    "upvote": true,
    "created_at": "2021-07-05T20:16:45.786Z"
  }
}
```

#### Delete Upvote

`DELETE /opinion-upvote/:upvoteId`

    route mode: user private

##### Header

    Authorization: Bearer ${sessionToken}

##### Response

```json
{
  "success": true,
  "message": "Upvote has been deleted"
}
```

### Comments

#### Create Comment

`POST /opinion-comment`

    route mode: user private

##### Header

    Authorization: Bearer ${sessionToken}

##### Request

```json
{
  "id_opinion": 2,
  "comment": "test"
}
```

##### Response

```json
{
  "success": true,
  "opinionComment": {
    "id_user": 3,
    "id_opinion": 2,
    "comment": "test",
    "created_at": "2021-07-05T20:31:21.535Z"
  }
}
```

#### Update Comment

`PUT /opinion-comment/:opinionCommentId`

    route mode: user/admin private

##### Header

    Authorization: Bearer ${sessionToken}

##### Request

```json
{
  "id_opinion": 2,
  "comment": "updated"
}
```

##### Response

```json
{
  "success": true,
  "opinionComment": {
    "id": 6,
    "comment": "updated",
    "created_at": "2021-07-05T23:31:21.000Z",
    "updated_at": null
  }
}
```

#### Delete Comment

`DELETE /opinion-comment/:opinionCommentId`

    route mode: user/admin private

##### Header

    Authorization: Bearer ${sessionToken}

##### Response

```json
{
  "success": true,
  "message": "Comment has been deleted"
}
```
