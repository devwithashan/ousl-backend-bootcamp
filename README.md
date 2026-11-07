# OUSL Backend Bootcamp

A step-by-step Node.js backend project built during the OUSL Backend Bootcamp. It starts from a plain Node.js server and grows into a REST API for managing books, using **Express**, **MongoDB** and **Mongoose**.

Each stage of the bootcamp lives on its own branch, so you can check out any branch to see the code exactly as it was at that step.

## Workshop slides

The slides from the workshop are in the root of the `main` branch, in two formats:

- **PDF**: [`Back-End-Engineering-Workshop-Ashan-Dimantha.pdf`](Back-End-Engineering-Workshop-Ashan-Dimantha.pdf). Opens in any PDF viewer and is the easiest to print or share.
- **HTML**: [`Back-End Engineering for Software Engineers Updates & Hands-On Foundations.html`](Back-End%20Engineering%20for%20Software%20Engineers%20Updates%20%26%20Hands-On%20Foundations.html). Download it and open it in a web browser to view the slides. GitHub shows the HTML source rather than rendering it.

## Tech stack

- [Node.js](https://nodejs.org/): JavaScript runtime
- [Express 5](https://expressjs.com/): web framework and routing
- [MongoDB Atlas](https://www.mongodb.com/atlas) + [Mongoose](https://mongoosejs.com/): database and ODM
- [dotenv](https://github.com/motdotla/dotenv): loads environment variables from `.env`
- [nodemon](https://nodemon.io/): restarts the server automatically when files change

## Branches

Every branch starts from the initial commit and is a standalone snapshot of one stage. They are meant to be read in this order:

| # | Branch | What it covers |
|---|---|---|
| 1 | [`node-setup`](../../tree/node-setup) | Plain Node.js HTTP server, reading `PORT` from `.env` |
| 2 | [`express-setup`](../../tree/express-setup) | Express server with an in-memory books array |
| 3 | [`express-setup-refactor`](../../tree/express-setup-refactor) | Express app split into routes and data modules |
| 4 | [`mongodb-setup`](../../tree/mongodb-setup) | Full CRUD API backed by MongoDB using Mongoose |

### 1. `node-setup`

The starting point: a basic server built with Node's built-in `http` module, with no framework.

- `index.js`: creates the server and listens on `process.env.PORT`
- Introduces `.env` and `process.env` for configuration
- Run with `node --env-file=.env index.js` (no `dotenv` yet)

### 2. `express-setup`

Replaces the raw Node server with Express.

- Adds `express`, `dotenv` and `nodemon` (`npm run dev`)
- `post.js` keeps books in an in-memory array:
  - `GET /books`: list all books
  - `POST /books`: add a book (`{ "title": "..." }`)
- Uses `express.json()` to parse JSON request bodies
- Returns proper status codes (`201 Created`, `400 Bad Request`)

> The data is held in memory, so it resets every time the server restarts.

### 3. `express-setup-refactor`

Restructures the Express app so the code is no longer all in one file.

```
index.js          # app setup, middleware, mounts the router
routes/books.js   # all book routes, using express.Router()
data/books.js     # the in-memory books array
```

- Introduces `express.Router()` and `app.use()` to mount routes
- Adds `GET /health` and `GET /books/:id` with a `404` when the book doesn't exist

### 4. `mongodb-setup`

Moves storage from memory to MongoDB, so data persists between restarts.

```
index.js                         # connects to MongoDB, starts Express
models/book.js                   # Mongoose schema: title (required), author
repositories/bookRepository.js   # all database calls in one place
routes/books.js                  # HTTP routes that call the repository
```

- Connects with `mongoose.connect(process.env.MONGO_URL)`
- Adds a **repository layer**, so routes never talk to Mongoose directly
- Full CRUD with `async`/`await` (see [API](#api-mongodb-setup) below)
- Books are identified by MongoDB's `_id` (for example `6aeda4ea69122780eed68bc4`), not a number

## Getting started

```bash
git clone https://github.com/devwithashan/ousl-backend-bootcamp.git
cd ousl-backend-bootcamp
git checkout mongodb-setup     # or any branch from the table above
npm install
```

Create a `.env` file in the project root:

```env
PORT=3001
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

`MONGO_URL` is only needed on `mongodb-setup`. Never commit `.env`. It holds your database credentials.

Run the server:

```bash
npm run dev     # with nodemon, restarts on file changes
```

You should see:

```
Server running at 3001
MongoDB connected!
```

> Stop the server with **Ctrl+C**. Ctrl+Z only *pauses* it. The port stays taken and requests hang without a response.

## API (`mongodb-setup`)

Base URL: `http://localhost:3001`

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `GET` | `/health` | | Health check, returns `{ "status": "ok" }` |
| `GET` | `/books` | | List all books |
| `GET` | `/books/:id` | | Get one book, `404` if not found |
| `POST` | `/books` | `{ "title": "...", "author": "..." }` | Create a book, returns `201` |
| `PATCH` | `/update/:id` | any fields to change | Update a book |
| `DELETE` | `/delete/:id` | | Delete a book, `404` if not found |

### Examples

Create a book:

```bash
curl -X POST http://localhost:3001/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Atomic Habits", "author": "James Clear"}'
```

```json
{ "title": "Atomic Habits", "author": "James Clear", "_id": "6aeda4ea69122780eed68bc4", "__v": 0 }
```

Get, update and delete it using the returned `_id`:

```bash
curl http://localhost:3001/books/6aeda4ea69122780eed68bc4

curl -X PATCH http://localhost:3001/update/6aeda4ea69122780eed68bc4 \
  -H "Content-Type: application/json" \
  -d '{"title": "New Book"}'

curl -X DELETE http://localhost:3001/delete/6aeda4ea69122780eed68bc4
```

In a URL, use the id itself: `/books/6aeda4...`, not `/books/:6aeda4...`. The `:id` form is only used when defining the route in code.
