import axios from 'axios';
import xss from 'xss';

class API {

    deleteMovie(id, callback){
        //Check that id is a number
        const ENDPOINT = '/api/1/movies/'+id;
        //axios.post(API_ENDPOINT, data).then(function(data) {}).catch(function(error){});
        axios.delete(ENDPOINT).then(function(data) {
            console.log(data);
            callback();
        }).catch(function(error){
            console.log(error);
        });
    }

}

const api = new API();
export default api;
