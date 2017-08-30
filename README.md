# README

A simple rails/react app to demonstrate working with Algolia search on a database of around 6000 movies. Rails is used to implement a simple CRUD API and store on the backend (which automatically syncs with a defined Algolia index), and React is implemented on the frontend to search movies in milliseconds from the same Algolia index, display the results, and provide an interface to add or remove movies.

## Demo

The app has been deployed to heroku. Check out the [demo](https://algoliasearchdemo.herokuapp.com).

## Dependencies

### Ruby 2.4.1

Built on Ruby version 2.4.1 to take advantage of the webpacker gem. See this [Medium post](https://medium.com/statuscode/introducing-webpacker-7136d66cddfb) or [this one](https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b) for more information about using the webpacker gem in rails.

### npm / yarn

We're using yarn for this project just because it seems to be a bit more reliable and a bit quicker, too.

## Installation

  - Run `git clone https://github.com/cborchert/algoliasearchdemo.git`
  - Change to the package directory
  - Run `yarn install` to install all Javascript dependencies
  - Run `bundle install` to install all Ruby dependencies
  - Run `rails db:migrate` to initialize the Movie model
  - Run `rails db:seed` to populate the database (and Algolia app!) with the starter data set (this will take a minute... be patient, stretch your legs :) )

Once the above is done, you'll be able to play with the app locally by running `bin/server` and visiting [localhost:5000](http://localhost:5000).

## Configuration

### Backend

Algolia credentials live in `config/initializers/algoliasearch.rb`. Index name and settings are set in `app/models/movie.rb`. If these are changed or updated, make sure to update the frontend as well.

### Frontend

Algolia search-only credentials live in `constructor` method of `app/javascript/app/APP.js`. Ensure that the frontend and the backend are talking to the same index and application!

Algolia search settings are set up in the `constructor` and `runAlgoliaQuery` methods of `app/javascript/app/APP.js`

## Database initialization

Make sure to run `rails db:migrate` to initialize the Movie model correctly and then `rails db:seed` to load the default data into the Movie model. This will take a minute since there are almost 6000 movies by default.

If you ever need to repopulate the model/index from movies.json, use `rake algolia:populate_from_json`.


## Endpoints/Routing

The following endpoints are set up on the backend using `config/routes.rb`:

  -  `api/1/movies` accepts POST requests to create a new movie. A successful request will return a json response with a status of 200 and a data object which contains as properties the id of the new movie, along with all of its other attributes.
  -  `api/1/movies/:id` accepts:
     -  GET requests to return a json response representing the movie record whose id is `:id`
     -  DELETE requests to remove the the movie record whose id is `:id`
  - `/` and all other requests are passed directly to the frontend page `app/views/pages/index.html.erb` which uses `app/javascript/packs/application.js` as an entry point for the React Application

Since all other requests are sent in tact to the React app, it can handle routing itself. Currently the app makes use of the path `/new` to display the new movie form. All other requests (except those handled by the backend) simply pass the user to the React Application. This behavior is handled in `app/javascript/app/index.js` and in the `render` method of `app/javascript/app/APP.js`


## Front end files

All front end files can be found in `./app/javascript/`. Webpacker uses `./app/javascript/packs/application.js` as an entry point. The actual React App is in `./app/javascript/app`. Aside from the *real* entry point `index.js`, the app container `App.js`, and the front end API `API.js`, all React components are found in `./app/javascript/app/components` all styles are found in `./app/javascript/app/styles`.

In general, a component named "Component" will have the following associated files:
  - The component `./app/javascript/app/components/Component.js`
  - Its styles `./app/javascript/app/styles/Component.scss`
  - Its tests `./app/javascript/app/__test__/Component.spec.js`


## How to run the test suite

To test the frontend you can run `npm test` or `npm  tdd`. The tdd command runs a the test command, with the watch flag. We're using Mocha/Chai with Enzyme and Sinon.

All React tests live in `./app/javascript/app/__test__/` and tests for a component named COMPONENT can be found in `COMPONENT.spec.js`. In the same folder, globals and the dom are set up in `helpers.js` and `dom.js` respectively.

For more information on the format of our tests, look at the [inspiration](http://blog.ricardofilipe.com/post/react-enzyme-tdd-tutorial).

## Local development

Run `./bin/server` to deploy a hot-reloading webserver locally. If nothing else is running on localhost port 5000, you can visit [http://localhost:5000](http://localhost:5000) to play with the app.

## Deployment instructions

If you want to deploy to heroku, you'll need to change the settings in `./config/database.yml` to use postgres since sqlite3 is not available on heroku.

In `./config/database.yml` you'll see:

```
default: &default
  adapter: sqlite3
  # adapter: postgresql
```

Uncomment `# adapter: postgresql` and comment out `adapter: sqlite3`. Commit your changes and you're ready to set up your heroku app using the following commands:

```
heroku create
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/ruby
git push heroku master
```

Or, you could save yourself the stress and use the [demo](https://algoliasearchdemo.herokuapp.com) ;-)
