# We're using figaro to hide our keys in environment variables in a gitignored file
# You can change the application_id and api_key in config/application.yml (follow example in application.example.yml)
# If you prefer to live dangerously, you can change these values directly here. It's your life ;)
#
AlgoliaSearch.configuration = { application_id: ENV["algolia_application_id"], api_key: ENV["algolia_api_key"] }
