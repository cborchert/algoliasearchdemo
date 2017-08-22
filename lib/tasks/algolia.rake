namespace :algolia do

  desc "Populate model from json -- reindex Algolia"
  task populate_from_json: :environment do
    puts "Removing all #{Movie.count()} Movie entries"
    Movie.delete_all()

    puts "Loading movies from ./movies.json"
    movies = JSON.parse(File.read('movies.json'))
    puts "Loaded #{movies.count()}!"

    # Save reindexing for the end (does not save on indexing operations)
    Movie.without_auto_index do
        puts "Populating movie model"
        i = 1
        movies.each do |movie|
          puts "#{i} of #{movies.count()}"
          Movie.create(movie.to_h)
          i += 1
        end
    end
    puts "Reindexing Algolia"
    Movie.reindex

  end

end
