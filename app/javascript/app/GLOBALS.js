// If you change these values, make sure to update config/application.yml as well
// The following keys allow you to query the specified app and index
//    they will show up in your git repo, and someone smart enough can access
//    them through dev tools. Make sure you're not exposing information you want
//    to keep secret.
export default {
    algolia_application_id : 'L2CRGJPRGJ',
    //NOTE: this is the SEARCH ONLY api key, and will be exposed to the public
    //Make sure not to put in the admin key, which should remain secret
    algolia_search_only_api_key : '209b64c8d4903a619b8b430ec621d398',
    algolia_index : 'technical_test_movies'
}
