class Movie < ApplicationRecord
    # Certain fields are arrays
    serialize :alternative_titles, JSON
    serialize :actors, JSON
    serialize :actor_facets, JSON
    serialize :genre, JSON

    # Connect with Algolia
    # The index name is defined in your config/application.yml file
    include AlgoliaSearch
    algoliasearch index_name: ENV["algolia_index"] do
        searchableAttributes ['title', 'alternative_titles', 'actors', 'genre']
        customRanking ['desc(rating)', 'desc(score)', 'desc(year)']
    end
end
