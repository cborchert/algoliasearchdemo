import axios from 'axios';
import xss from 'xss';

class API {

    addMovie(movieObject, callback) {
        //Validation done in form and on server side
        if (movieObject.alwaysUpdate) {
            delete movieObject.alwaysUpdate;
        }
        movieObject.objectID = '';
        const ENDPOINT = '/api/1/movies';
        axios.post(ENDPOINT, {movie: movieObject}).then(function(data) {
            console.log(data);
            callback();
        }).catch(function(error) {
            console.log(error);
        });

    }

    deleteMovie(id, callback) {
        const ENDPOINT = '/api/1/movies/' + Number(id);
        axios.delete(ENDPOINT).then(function(data) {
            console.log(data);
            callback();
        }).catch(function(error) {
            console.log(error);
        });
    }

}

const api = new API();
export default api;
