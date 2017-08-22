class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :alternative_titles
      t.string :year
      t.string :image
      t.string :color
      t.string :score
      t.string :rating
      t.text :actors
      t.text :actor_facets
      t.string :genre
      t.string :objectID
      t.timestamps
    end
  end
end
