<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="LOUD"
      src="https://elasticbeanstalk-us-east-1-909474674380.s3.amazonaws.com/strapi-uploads//loud_icon_33cc0a4b1c.png"
      width="300"
    />
  </a>
</p>
<hr>

Loud Prefeitura de São Paulo application is an API to handle with Opinions, comments and upvotes.

The project uses the most advanced software technologies, built with Typescript and SOLID Architecture

# Content

- [Specifications](#specifications)
- [First Steps](#first-steps)
- [Usage](#release-types)
  - [Insomnia Schema]()
  - [Database Connection]()
- [Endpoints](#release-types)
  - [Users](#download)
    - [Authenticate User](#list)
    - [Create User](#)
  - [Opinions](#download)
    - [List Opinions](#list)
    - [List Opinions By Upvotes](#)
  - [Upvotes](#download)
    - [Create Upvote](#list)
    - [List Upvotes](#)

## Specifications

- Typescript 4.3.5
- MySQL 5.7
- TypeORM 0.2.34
- Docker 20.10.5

## First Steps

    git clone https://github.com/GGotha/loud-prefeiturasp.git
    yarn install
    yarn typeorm migration:run

## Endpoints

### Search Opinions

#### URL

`GET /opinion/`

#### Response

```json
{
  "success": true,
  "opinions": [
    {
      "id": 3,
      "id_user": 1,
      "content": "123",
      "upvotes": "5",
      "created_at": "2021-07-05T04:02:29.000Z",
      "updated_at": null
    }
  ]
}
```
