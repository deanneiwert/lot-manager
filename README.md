# lot-manager

Lot Manager is a sample project

Features include:
1. Ability to 

## Setup Instructions:

### Prerequisites:
    1. Database (i.e. [MySQL](https://www.mysql.com/), [Postgres](https://www.postgresql.org/), [SQL Server](https://www.microsoft.com/en-us/sql-server), or [SQLite](https://www.sqlite.org/index.html))
    2. [Php](http://php.net/)
    3. [Laravel](https://laravel.com/)
    4. [NPM](https://www.npmjs.com/get-npm)

### Database Configuration:
	1. Create database and corresponding user credentials
	2. Update .env file with your database name and credentials:
    ```
    DB_DATABASE=lot_manager
	DB_USERNAME=admin
	DB_PASSWORD=admin
    ```

### Database Migrations and Seeding:
```
php artisan migrate --seed
```

### Install Project Dependencies:
```
npm install
```

### Compile JS and CSS:
```
npm run dev
```
OR
```
npm run watch
```

### Run Local Server:
```
php artisan serve
```

### Logging in

#### Login as Admin
1. Navigate to http://locahost:8000/
2. Click Login
3. Enter "admin@test.com" as E-mail
4. Enter "admin" as password

#### Login as Sales Agent
1. Navigate to http://locahost:8000/
2. Click Login
3. Enter "sales@test.com" as E-mail
4. Enter "sales" as password
 