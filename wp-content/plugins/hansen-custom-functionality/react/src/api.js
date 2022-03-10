import axios from "axios";
import Cookies from 'js-cookie';

export default class Api{
    constructor(){
        this.apiendpoint = hansenapi;
        
        this.client = null;        
        var token = Cookies.get('hansentoken');
        if(token !== undefined && token != ""){
            this.client = axios.create({
                baseURL: this.apiendpoint + '/api/v1/',
                headers: {"Authorization": "Bearer " + token}
            });
        }else{
            this.client = axios.create({
                baseURL: this.apiendpoint + '/api/v1/'
            });
        }           

        this.get = this.get.bind(this);

    }

    get(endpoint){
        return this.client.get(endpoint).then((response) => {
            let data = response.data;
            return data;
        });
    }

    post(endpoint, data){
        return this.client.post(endpoint, data).then((response) => {
            let data = response.data;
            return data;
        });
    }

    put(endpoint, data){
        return this.client.put(endpoint, data).then((response) => {
            let data = response.data;
            return data;
        });
    }

    delete(endpoint, data){
        return this.client.delete(endpoint).then((response) => {
            let data = response.data;
            return data;
        });
    }
    
}