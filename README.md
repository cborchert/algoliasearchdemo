# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

Built on Ruby version 2.4.1 to take advantage of the webpacker gem. See this (Medium post)[https://medium.com/statuscode/introducing-webpacker-7136d66cddfb] or (this one)[https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b] for more information.

* System dependencies

* Configuration

Algolia credentials live in `config/initializers/algoliasearch.rb`

* Rake tasks

If you ever need to repopulate the model/index from movies.json, use `rake algolia:populate_from_json`.

* Database creation


* Database initialization

Make sure to run `rails db:migrate` to initialize the Movie model correctly and then `rails db:seed` to load the default data into the Movie model. This will take a minute since there are almost 6000 movies by default.

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
