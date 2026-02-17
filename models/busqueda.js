import axios from 'axios';
import fs from 'fs';

export class busqueda {
    historial = [];
    dbpath = './DB/database.json';

    constructor(){
        //todo leer db si existe
        this.LeerDB()
    }

    // ✅ REEMPLAZADO: paramsmapbox → paramsnominatim (sin token requerido)
    get paramsnominatim() {
        return {
            'format':           'json',
            'limit':            5,
            'accept-language':  'es',
            'addressdetails':   1
        }
    }

    get paramsweather() {
        return{
            'lang':   'es',
            'units':  'metric',
            'appid':  process.env.openweather_key
        }
    }

    // ✅ MÉTODO ACTUALIZADO: ciudades() ahora usa Nominatim (OpenStreetMap)
    async ciudades( lugar = ''){
        try {
            const instance = axios.create({
                baseURL: 'https://nominatim.openstreetmap.org',
                timeout: 5000, // ✅ aumentado: Nominatim puede ser más lento que Mapbox
                headers: {
                    // ✅ REQUERIDO por Nominatim: identificar tu app en User-Agent
                    'User-Agent': 'ClimaApp-CesarBarrero/1.0'
                }
            });

            const resp = await instance.get('/search', {
                params: {
                    q: lugar,          // ✅ la query va aquí, no en la URL
                    ...this.paramsnominatim
                }
            });

            // ✅ Nominatim devuelve un array directo (no .features como Mapbox)
            return resp.data.map( lugar => ({
                id:   lugar.place_id,                   // número entero
                name: lugar.display_name,               // nombre completo del lugar
                long: parseFloat(lugar.lon),            // ✅ Nominatim usa "lon" (no "longitude")
                lat:  parseFloat(lugar.lat)             // parseFloat para asegurar número
            }));

        } catch (error) {
            console.error('Error buscando ciudad:', error.message);
        }
        return []; // retornar lugares vacíos si falla
    }

    // ✅ SIN CAMBIOS: climalugar() sigue usando OpenWeather igual que antes
    async climalugar( lat, long ){
        console.log(lat, long);
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
                timeout: 5000,
                params: this.paramsweather
            });

            const respclima = await instance.get();
            return {
                id:   respclima.data.weather[0].id,
                desc: respclima.data.weather[0].description,
                temp: respclima.data.main.temp,
                min:  respclima.data.main.temp_min,
                max:  respclima.data.main.temp_max
            };

        } catch (error) {
            console.error('Error obteniendo clima:', error.message);
        }
        return [];
    }

    AgrregarHistorial (lugar = ''){
        // prevenir duplicidad
        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0, 4);
        this.historial.unshift(lugar.toLocaleLowerCase());
        // Guardar BD
        this.GuardarBN();
    }

    GuardarBN(){
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync( this.dbpath, JSON.stringify(payload));
    }
    
    LeerDB(){
        if ( !fs.existsSync(this.dbpath)){
            return;
        }
        const info = fs.readFileSync(this.dbpath, { encoding: 'utf-8' });
        if (info.length === 0) { return; }
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}