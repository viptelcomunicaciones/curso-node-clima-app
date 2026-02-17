import path from 'path';
import axios from 'axios';
import fs    from 'fs';

export class Busqueda {
    historial = [];
    dbPath    = path.join(process.cwd(), 'DB', 'database.json');

    constructor(){
        this.leerDB();
    }

    // ─── Parámetros de APIs ───────────────────────────────────────────────────

    get _nominatimParams() {
        return {
            format:           'json',
            limit:            5,
            'accept-language': 'es',
            addressdetails:   1
        };
    }

    get _weatherParams() {
        return {
            lang:  'es',
            units: 'metric',
            appid: process.env.openweather_key
        };
    }

    // ─── Métodos públicos ─────────────────────────────────────────────────────

    async buscarCiudades( termino = '' ) {
        try {
            const instance = axios.create({
                baseURL: 'https://nominatim.openstreetmap.org',
                timeout: 5000,
                headers: { 'User-Agent': 'ClimaApp-CesarBarrero/1.0' }
            });

            const { data } = await instance.get('/search', {
                params: { q: termino, ...this._nominatimParams }
            });

            return data.map( lugar => ({
                id:   lugar.place_id,
                name: lugar.display_name,
                lng:  parseFloat(lugar.lon),
                lat:  parseFloat(lugar.lat)
            }));

        } catch (error) {
            this._manejarError(error, 'buscarCiudades');
            return [];
        }
    }

    async buscarClima( lat, lng ) {
        try {
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
                timeout: 5000,
                params:  { lat, lon: lng, ...this._weatherParams }
            });

            const { data }      = await instance.get();
            const lista         = data.list;
            const hoy           = new Date().toISOString().split('T')[0];
            const registrosHoy  = lista.filter( i => i.dt_txt.startsWith(hoy) );
            const datos         = registrosHoy.length > 0 ? registrosHoy : lista.slice(0, 8);
            const temps         = datos.map( i => i.main.temp );

            return {
                id:   lista[0].weather[0].id,
                desc: lista[0].weather[0].description,
                temp: lista[0].main.temp,
                min:  Math.min(...temps),
                max:  Math.max(...temps)
            };

        } catch (error) {
            this._manejarError(error, 'buscarClima');
            return null;
        }
    }

    agregarHistorial( lugar = '' ) {
        const lugarNorm = lugar.toLocaleLowerCase();
        if ( this.historial.includes(lugarNorm) ) return;
        this.historial = this.historial.slice(0, 4);
        this.historial.unshift(lugarNorm);
        this._guardarDB();
    }

    // ─── Métodos privados (persistencia) ─────────────────────────────────────

    _guardarDB() {
        fs.writeFileSync( this.dbPath, JSON.stringify({ historial: this.historial }) );
    }

    leerDB() {
        if ( !fs.existsSync(this.dbPath) ) return;
        const raw = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
        if ( raw.length === 0 ) return;
        this.historial = JSON.parse(raw).historial;
    }

    _manejarError( error, origen ) {
        if      ( error.response?.status === 401 ) console.log(`\n ✖ API Key inválida en ${origen}\n`.error);
        else if ( error.code === 'ECONNABORTED'  ) console.log(`\n ⏱ Timeout en ${origen}. Verifica tu conexión.\n`.error);
        else                                        console.log(`\n ✖ Error en ${origen}: ${ error.message }\n`.error);
    }
}