# Architecture

### Objective

The system should have:

- Upvote System
- User System
- Opinion System

The application should allow:

- Authenticate and create new users ✔️
- List Opinions and your respectives upvotes ✔️
- Order opinions by upvotes number
- Create new opinion (ensure authentication)
- Create and delete upvote (ensure authentication). Upvotes are unique by users and only themselves can remove your upvotes
- Create, edit and delete comments on opinion (ensure authentication)
- Authenticate with admin
  - Edit and delete opinions and comments

### Database Architecture

users Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| id_role    | INTEGER   | NOT NULL | FOREIGN KEY |
| name       | VARCHAR   | NOT NULL |             |
| password   | VARCHAR   | NOT NULL |             |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |

---

roles Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| name       | VARCHAR   | NOT NULL |             |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |

---

opinions Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| id_user    | INTEGER   | NOT NULL | FOREIGN KEY |
| content    | VARCHAR   | NOT NULL |             |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |

---

opinion_comments Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| id_opinion | INTEGER   | NOT NULL | FOREIGN KEY |
| id_user    | INTEGER   | NOT NULL | FOREIGN KEY |
| comment    | VARCHAR   | NOT NULL |             |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |

---

opinion_upvotes Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| id_opinion | INTEGER   | NOT NULL | FOREIGN KEY |
| id_user    | INTEGER   | NOT NULL | FOREIGN KEY |
| upvote     | VARCHAR   | NOT NULL |             |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |
