# lot-manager

Lot Manager is a sample project

Features include:
1. Login as admin or sales agent
2. Logoff
3. Register as sales agent
4. Admin functions:
    1. View all registered users
    2. View all communities
    3. View all lots for each community
    4. View the lot status options for each builder
    5. Change the order of the lot status options
5. Sales Agent functions:
    1. View all lots for each assigned community
    2. Edit the lot status for each lot


Implemented with Vue, Vue-Router, Axios, Vuex, Php, Laravel (with Eloquent), Element-UI, SASS

## Setup Instructions:

### Prerequisites:
1. Database (i.e. [MySQL](https://www.mysql.com/), [Postgres](https://www.postgresql.org/), [SQL Server](https://www.microsoft.com/en-us/sql-server), or [SQLite](https://www.sqlite.org/index.html))
2. [Php](http://php.net/)
3. [Composer](https://getcomposer.org/download/) (dependency manager for PHP)
4. [Laravel](https://laravel.com/)
5. [NPM](https://www.npmjs.com/get-npm)

### Download/Clone Repository
Either manually download this folder structure onto your system or use git to clone the repository.

### Database Configuration:
For this project to function locally, a database must be created and be accessible with a username and password.  I recommend installing [MySQL Workbench](https://dev.mysql.com/downloads/workbench/), creating a new database, creating a new user with a "Standard" authentication type, and providing the user with a "DBA" administrative role.
1. Create database and corresponding user credentials
2. Update the .env file with your database name and credentials:
```
DB_DATABASE=lot_manager
DB_USERNAME=admin
DB_PASSWORD=admin
```

### Install Php Libraries
import your packages, create the vendor folder, and geneate the autoload.php script.
```
composer install
```

### Install Project Dependencies:
```
npm install
```

### Database Migrations and Seeding:
In order for this step to work, the database and credentials you created must be properly configured.  This step will take a few minutes.
```
php artisan migrate --seed
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
 