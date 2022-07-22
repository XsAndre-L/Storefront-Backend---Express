# Storefront-Backend---Express

## Build Instructions

### Step 1

Make you have all needed software installed.

-   Docker Desktop (https://www.docker.com/get-started/)
-   NodeJS
-   git

### Step 2

Clone the repository
`git clone https://github.com/XsAndre-L/Storefront-Backend---Express.git`

### Step 3

In the directory where you cloned the repo execute `npm install`

### Step 4

setup .env file

### Step 5

setup database
`docker-compose up`

### Step 6

run up migrations to create all tables
first - `npx db-migrate reset`
second - `npx db-migrate up`

### Step 7

run the project  
`npm run start`

## Tests

To run tests you would first have too create the testing database by following these steps

### Step 1

in vscode terminal run  
`psql -h 127.0.0.1 -p 54320 -U postgres`  
password : "root"

### Step 2

run the sql statement  
`CREATE DATABASE storefront_db_test;`

### Step 3

in the vscode terminal run  
`npm run test`

## Info

### Ports:

Database: 54320
Backend API: 3000

---

## Endpoints

### User Endpoints

-   Create New Account ( `/user/signup` )
-   Authenticate User ( `/user/login` )
-   Show User Details ( `/user` )

### Product Endpoints

#### All Products

-   Get all products ( `/product` )
-   Get products by category ( `/product/?category=fruit` )
-   Sort products by popularity ( `/product/?sort=popularity` )
-   Get products by category and sort by popularity ( `/product/?category=fruit&&sort=popularity` )

#### Single Product

-   Get product details ( `/product/:id` )

### Order Endpoints

-   Get all user orders ( `/order` )
-   Get order details ( `/order/:id` )

### Admin Endpoints

-   Get all user accounts ( `/admin/users` )

---

## Scripts

`npm run test`  
`npm run start`  
`npm run build`

To run prettier and eslint together  
`npm run check`  
To run eslint and prettier individualy  
`npm run lint`  
`npm run prettier`

---

## Environment Variables

> POSTGRES_HOST=127.0.0.1  
> POSTGRES_PORT=54320  
> POSTGRES_DB=storefront_db  
> POSTGRES_DB_TEST=storefront_db_test  
> POSTGRES_USER=postgres  
> POSTGRES_PASSWORD=root  
> ENV=dev  
> BCRYPT_PASSWORD=extra_string  
> HASH_ROUNDS=10  
> JWT_SIGN_TOKEN=secret_token

---

## The Admin User

Creating a user with the @orginization.com email extention will automatically give the user the administrator role.
