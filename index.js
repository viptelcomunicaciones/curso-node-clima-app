import dotenv from 'dotenv';
dotenv.config();

import { Busqueda }                            from './src/models/busqueda.js';
import { mostrarMenu, pausar, leerInput, listarLugares } from './src/helpers/inquierer.js';
import { mostrarClima, mostrarHistorial, mostrarError }  from './src/ui/clima.ui.js';

// ─── App principal ────────────────────────────────────────────────────────────

const main = async () => {
    const busqueda = new Busqueda();
    let opcion;

    do {
        opcion = await mostrarMenu();

        switch ( opcion ) {

            case 1: {
                const termino = await leerInput('Ciudad (0 para cancelar): ');
                if ( !termino ) break;

                const lugares = await busqueda.buscarCiudades(termino);
                if ( lugares.length === 0 ) {
                    mostrarError('No se encontraron resultados.');
                    await pausar();
                    break;
                }

                const idSeleccionado = await listarLugares(lugares);
                if ( idSeleccionado === 0 ) break;

                const lugarSeleccionado = lugares.find( l => l.id === idSeleccionado );
                busqueda.agregarHistorial(lugarSeleccionado.name);

                const clima = await busqueda.buscarClima(lugarSeleccionado.lat, lugarSeleccionado.lng);
                if ( !clima ) {
                    mostrarError('No se pudo obtener el clima. Intenta de nuevo.');
                    await pausar();
                    break;
                }

                mostrarClima(lugarSeleccionado, clima);
                break;
            }

            case 2: {
                mostrarHistorial(busqueda.historial);
                break;
            }
        }

        if ( opcion !== 0 ) await pausar();

    } while ( opcion !== 0 );
    console.clear();
    console.log('\n 👋 ¡Hasta luego!\n'.green);
};

main();