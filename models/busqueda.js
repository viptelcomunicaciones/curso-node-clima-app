import axios from 'axios';
import fs from 'fs';

export class busqueda {
    historial = [];
    dbpath = './DB/database.json';

    constructor(){
        //todo leer db si existe
        this.LeerDB()
    }
    get paramsmapbox() {
        return{
            'language':'es',
            'limit':3,
            'access_token':process.env.mapbox_key
        }
    }

    get paramsweather() {
        return{
            'lang':'es',
            'units':'metric',
            'appid':process.env.openweather_key
        }
    }

    async ciudades( lugar = ''){
    try {
        const instance = axios.create({
        baseURL: `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}`,
        timeout: 1000,
        params:this.paramsmapbox
    });
    const resp = await instance.get();
    return resp.data.features.map(lugar =>({
        id : lugar.id,
        name : lugar.properties.full_address,
        long : lugar.properties.coordinates.longitude,
        lat : lugar.properties.coordinates.latitude
    }));
    } catch (error) {   
        console.error(error);
    }
        return[]; // retornar lugares 
    }

    async climalugar( lat,long){
        console.log(lat,long);
    try {
        // creacion de instancia axios
        const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
        timeout: 1000,
        params:this.paramsweather
    });
        // responder data 
    const respclima = await instance.get();
    return {
        id: respclima.data.weather[0].id,  // weather es un array
        desc: respclima.data.weather[0].description,
        temp: respclima.data.main.temp,
        min: respclima.data.main.temp_min,
        max: respclima.data.main.temp_max
    };
    } catch (error) {   
        console.error(error);
    }
        return[]; // retornar lugares 
    }

    AgrregarHistorial (lugar= ''){
        // prevenir duplicidad
        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0,4);
        this.historial.unshift(lugar.toLocaleLowerCase());
        //Guardar BD
        this.GuardarBN();
    }

    GuardarBN(){
        const payload ={
            historial: this.historial
        };
        fs.writeFileSync( this.dbpath, JSON.stringify(payload));
    }
    
    LeerDB(){
        if ( !fs.existsSync(this.dbpath)){
        return;
        }
        const info = fs.readFileSync(this.dbpath,{encoding:'utf-8'});
        if (info.length === 0) { return; }
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}
