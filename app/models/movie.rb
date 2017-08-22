class Movie < ApplicationRecord
    # Certain fields are arrays
    serialize :alternative_titles, JSON
    serialize :actors, JSON
    serialize :actor_facets, JSON
    serialize :genre, JSON

    # Connect with Algolia
    include AlgoliaSearch
    algoliasearch index_name: "technical_test_movies" do
    end
end
