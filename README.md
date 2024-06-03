# Lexnetic Interview Project

This project is built using Node.js and Express.js, with PostgreSQL as the database, Sequelize as the ORM, and express-validator for validation.

## Tools

- Node.js (v18.6.0)
- npm (8.13.2)
- Express.js
- PostgreSQL
- Sequelize
- express-validator
- jsonwebtoken
- bcryptjs

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- PostgreSQL installed on your machine

### Installation

1. **Clone the repository**
2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a PostgreSQL database**

   - Connect to your PostgreSQL server.
   - Create a new database that have to be named `lexnetic-interview`

4. **Run migrations**

   - Use Sequelize CLI to run migrations and set up your database schema:
     ```bash
     npx sequelize-cli db:migrate
     ```

5. **Set up environment variables**

   - Create a `.env` file in the root of your project directory and add the following variables:
     ```env
     JWT_SECRET=your_jwt_secret
     ```
     you can generate your jwt secret that will use for secret when we do authentication.

### Running the Project

1. **Start the server**

   ```bash
   npm start
   ```

2. **Access the application**
   - Open your browser and try to go to `http://localhost:3001`

## Useful Commands

- **Run migrations**

  ```bash
  npx sequelize-cli db:migrate
  ```

- **Undo last migration**

  ```bash
  npx sequelize-cli db:migrate:undo
  ```

- **Undo all migrations**
  ```bash
  npx sequelize-cli db:migrate:undo:all
  ```
