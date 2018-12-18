# lot-manager

## Prerequisites:
    1. Database (i.e. SQL, MySQL, etc.)
    2. Php
    3. Laravel
    4. NPM

## Database Configuration:
	1. Create database and corresponding user credentials
	2. Update .env with database name and credentials:
    DB_DATABASE=lot_manager
	DB_USERNAME=admin
	DB_PASSWORD=admin

### Database Seeding:
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
