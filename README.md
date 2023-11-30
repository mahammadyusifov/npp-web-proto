# Development Environment Setup Document

This document provides a guide for installing and setting up Next.js, FastAPI, PlumberAPI, and MySQL in a local development environment.

<hr/>

## Configuring Environment Variables

For the application to connect to your MySQL database securely, you need to set up the database credentials as environment variables. This is done using a .env file at the root of your project directory.

### Setup

1. Create a '.env' file:

If it doesn't exist, create a .env file in the root directory of your project. This file should not be committed to version control (e.g., git) and should be excluded using a .gitignore file to keep your credentials secure.

2. Define database credentials:

Inside the .env file, you will need to set the following variables with your actual database credentials:

```bash
# .env file
DB_USER=your_database_user
DB_PW=your_database_password
DB_NAME=your_database_name # plc_prototype
```

<hr/>

## Next.js Installation and Setup

### Prerequisites

- Node.js (v18.16.0)
- npm (included with Node.js)

### Installation Steps

1. Install dependencies
   Run the following command to install all the required dependencies as specified in package.json:

```bash
npm install # root directory
# or
npm i
```

2. Development Scripts

```bash
npm run dev # starts the development server on localhost:3000.
npm run build # builds the application for production usage.
npm run start # starts a Next.js production server.
npm run lint # runs Next.js built-in ESLint configuration to check for linting errors.
```

### Dependencies Overview

The following are some of the key dependencies for the project:

- @emotion/react and @svgr/webpack for styling and SVG handling.
- @tanstack/react-query and axios for data fetching and state management.
- react-google-charts for visualizing data with Google Charts.
- react-hook-form for efficient form handling.
- typescript for adding static type checking to the project.

### TypeScript Support

The project is configured to use TypeScript. Ensure you have the TypeScript compiler installed and properly configured:

```bash
npm install typescript --save-dev
```

<hr/>

## FastAPI Installation and Setup

### Prerequisites

- Python (v3.11.6)

### Installation Steps

1. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install Dependencies

```bash
pip install -r requirements.txt
```

3. Run the server

```bash
cd server
uvicorn main:app --reload --host=127.0.0.1 --port=8000 # FastAPI APP will now be running on '127.0.0.1:8000'.
```

### Key Dependencies Overview

- **fastapi**: A modern, fast web framework for building APIs with Python 3.6+ based on standard Python type hints.
- **uvicorn**: An ASGI server for Python, needed to serve FastAPI application.
- **gunicorn**: A WSGI HTTP Server for UNIX, used to run Python web applications.
- **SQLAlchemy**: The Python SQL toolkit and Object-Relational Mapper that gives application developers the full power and flexibility of SQL.
- **mysqlclient**: Provides an interface to the MySQL database, used to interact with MySQL databases from Python.
- **PyMySQL**: A pure-Python MySQL client library, in case you prefer a pure Python implementation.
- **python-jose**: A library that allows for JSON Object Signing and Encryption (JOSE).
- **pydantic**: Data validation and settings management using Python type annotations.

<hr/>

## PlumberAPI Installation and Setup

### Prerequisites

- R (v4.3.1)

### Installation Steps

1. Install Packages

Execute the following command in the R console:

```bash
install.packages("plumber")
install.packages("R2WinBUGS")
```

or using '\_init/init.R'

2. Running the API

Execute the following command in the R console:

```bash
Rscript ./plumber/app.R # PlumberAPI server will now be running on '127.0.0.1:8000'.
```

<hr/>

## MySQL Installation and Setup

### Prerequistites

- MySQL (v8.1.0)

### Creating the Database

1. Connect to MySQL as the root user:

Open terminal or command prompt and run:

```sql
mysql -u root -p
```

2. Create a new database;

Execute the following SQL command to create a new database named plc_prototype:

```sql
CREATE DATABASE plc_prototype;
```

### Creating the Member Table

1. Switch to the new database:

```sql
USE plc_prototype;
```

2. Create the member table:

Run the following SQL command to create the member table with idx as an auto-increment primary key, and user_email, and user_password fields:

```sql
CREATE TABLE member (
    idx           INT auto_increment NOT NULL COMMENT 'index',
    user_email    VARCHAR(100) NOT NULL COMMENT 'email',
    user_password VARCHAR(100) NOT NULL COMMENT 'password',
    PRIMARY KEY (idx, user_email)
)
ENGINE=InnoDB COMMENT='user information';
```

3. Insert dummy data:

Execute the following command to insert a dummy user into the table:

```sql
INSERT INTO member (user_email, user_password) VALUES('user@user.com', 'userpassword');
COMMIT;
```
