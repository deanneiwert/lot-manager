# lot-manager

Lot Manager is a sample project

Features include:
1. Login as admin or sales agent
2. Logoff
3. Register as sales agent
4. View all registered users (admin login only)

Implemented with Vue, Vue-Router, Axios, Vuex, Php, Laravel (with Eloquent), Element-UI, SASS

## Setup Instructions:

### Prerequisites:
1. Database (i.e. [MySQL](https://www.mysql.com/), [Postgres](https://www.postgresql.org/), [SQL Server](https://www.microsoft.com/en-us/sql-server), or [SQLite](https://www.sqlite.org/index.html))
2. [Php](http://php.net/)
3. [Composer](https://getcomposer.org/download/) (dependency manager for PHP)
4. [Laravel](https://laravel.com/)
5. [NPM](https://www.npmjs.com/get-npm)

### Download/Clone Repository
Either manually download this folder structure onto your system or use git to clone the repository.  Scroll up and click "Clone or download".

### Database Configuration:
For this project to function locally, a database must be created and be accessible with a username and password.  I recommend installing[MySQL Workbench](https://dev.mysql.com/downloads/workbench/), creating a new database, and creating a new user with a "Standard" authentication type and provide the user with a "DBA" administrative role.
Note: you may need to update other 
1. Create database and corresponding user credentials
2. Update the .env file at the root of the project with your database name and credentials:
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
In order for this step to work, the database and credentials you created must be properly configured.
```
php artisan migrate --seed
```

### Set a key for 
Set the APP_KEY value in your .env file.  Laravel uses the key for all encrypted cookies, including the session cookie, before handing them off to the user's browser, and it uses it to decrypt cookies read from the browser. This prevents the client from making changes to their cookies and granting themselves admin privileges or impersonating another user in your application.
```
php artisan key:generate
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
 