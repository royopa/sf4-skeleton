Symfony 4 Skeleton
==================

The "Symfony Demo Application" is a reference application created to show how
to develop Symfony applications following the recommended best practices.

Requirements
------------

  * YARN;
  * PHP 7.1.3 or higher;
  * PDO-SQLite PHP extension enabled;

Installation
------------

Execute this command to install the project:

```bash
$ git clone /s4-skeleton
$ cd sf4-skeleton/
$ composer install
$ npm instal --verbose
$ yarn newinstall --verbose
$ yarn run encore production --verbose
```

Usage
-----

There's no need to configure anything to run the application. Just execute this
command to run the built-in web server and access the application in your
browser at <http://localhost:8000>:

```bash
$ cd sf4-skeleton/
$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:create
$ php bin/console server:run
```

```bash
$ cd sf4-skeleton/
$ php bin/console server:start 0.0.0.0:8000
```

Generate CRUDS
--------------

To generate CRUDs from entities, type the follow command:

```bash
$ php bin/console list make
$ php bin/console make:crud
```


Adicionar usuários
------------------

```bash
$ php bin/console app:add-user
$ php bin/console app:delete-user
$ php bin/console app:list-users
```

Tests
-----

Execute this command to run tests:

```bash
$ cd sf4-skeleton/
$ ./vendor/bin/simple-phpunit
```
