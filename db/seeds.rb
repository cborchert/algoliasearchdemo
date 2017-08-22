# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Loading movies from ./movies.json"
movies = JSON.parse(File.read('movies.json'))
puts "Loaded #{movies.count()}!"

puts "Populating movie model"
i = 1
movies.each do |movie|
  puts "Loading #{i} of #{movies.count()}"
  Movie.create(movie.to_h)
  i += 1
end

puts "Reindexing Algolia"
Movie.reindex
