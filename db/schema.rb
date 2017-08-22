# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170822113338) do

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.text "alternative_titles"
    t.string "year"
    t.string "image"
    t.string "color"
    t.string "score"
    t.string "rating"
    t.text "actors"
    t.text "actor_facets"
    t.string "genre"
    t.string "objectID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
