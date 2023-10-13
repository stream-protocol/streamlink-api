
# PostgresSQL database

To integrate a PostgreSQL database into Node.js application, you can use the `pg` library, which is a popular choice for working with PostgreSQL in Node.js. Here's a step-by-step guide on how to set up and integrate PostgreSQL into your application:

**Step 1: Install Dependencies**

First, make sure you have PostgreSQL installed and running on StreamLink system. You can download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).

Next, install the necessary Node.js dependencies for your project:

```bash
npm install express pg
```

**Step 2: Set Up Database Connection**

Create a file (e.g., `db.js`) to handle the database connection:

```javascript
// db.js
const { Pool } = require('pg');
const { DATABASE_URL } = require('./config'); // You should store your database URL in a config file

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

module.exports = pool;
```

In the above code, replace `DATABASE_URL` with the actual URL of your PostgreSQL database, which typically looks like `postgres://username:password@localhost:5432/database_name`.

**Step 3: Create Models**

Create data models for your application. PostgreSQL uses SQL for schema definition, so you can create tables and define relationships using SQL queries. For example, to create a `users` table:

```javascript
// models/User.js
const db = require('./db');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createUserTable)
  .then(() => {
    console.log('User table created');
  })
  .catch((err) => {
    console.error('Error creating user table:', err);
  });
```

**Step 4: CRUD Operations**

Now, you can perform CRUD (Create, Read, Update, Delete) operations using SQL queries. For example, to insert a new user:

```javascript
const createUser = `
  INSERT INTO users (username, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
`;

const values = ['john_doe', 'john@example.com', 'password123'];

db.query(createUser, values)
  .then((result) => {
    const newUser = result.rows[0];
    console.log('User created:', newUser);
  })
  .catch((err) => {
    console.error('Error creating user:', err);
  });
```

To fetch users:

```javascript
const getUsers = 'SELECT * FROM users';

db.query(getUsers)
  .then((result) => {
    const users = result.rows;
    console.log('Users:', users);
  })
  .catch((err) => {
    console.error('Error fetching users:', err);
  });
```

**Step 5: Integration with Express.js**

To integrate your PostgreSQL database into your Express.js application, make sure you import the `db.js` file at the start of your application and define your routes and middleware accordingly. This example demonstrates basic database integration with PostgreSQL and the `pg` library.