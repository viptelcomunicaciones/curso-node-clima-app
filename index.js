import { 
    InquirerMenu,
    InquirerPause, 
    leerimput,
    Listarlugares} from "./helpers/inquierer.js"
import { busqueda } from "./models/busqueda.js";
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

const   main = async()=> {
    const busquedas = new busqueda()
    let opt;

    do{
        opt = await InquirerMenu();
        switch (opt) {
            case 1:
                // mostrar mensaje
                const termino = await leerimput(`Ciudad (0 para cancelar): `);
                
                // Verificar si el usuario canceló
                if (termino === null) continue;

                // mostrar lugares
                const lugares = await busquedas.ciudades(termino);

                // seleccionar el lugar     
                const id = await Listarlugares(lugares);
                console.log({id});
                if (id === 0) continue;

                const LugarSelect = lugares.find(l => l.id === id );
                // Guardar datos
                busquedas.AgrregarHistorial(LugarSelect.name);
                
                
                // mostrar clima
                const clima = await busquedas.climalugar(LugarSelect.lat, LugarSelect.long);

                // mostrar resultados
                console.clear();
                console.log(`\n informacion de la ciudad\n`.info);
                console.log(`ciudad:`, LugarSelect.name.info);
                console.log(`Lat:`, String(LugarSelect.lat).info);
                console.log(`Log:`, String(LugarSelect.long).info);
                console.log(`Temperatura:`,String(clima.temp).info);
                console.log(`Minimo:`,String(clima.min).info);
                console.log(`Maximo:`,String(clima.max).info);
                console.log(`¿como esta el clima hoy? : `, clima.desc.info);
            break;
            case 2 :
                busquedas.historial.forEach((lugar,id) => {
                    const idx = `${id+1}.`.green;
                    console.log(`${idx}${lugar}`);
                });
            break;
        }
        if ( opt !==0)  await InquirerPause();
    } while(opt !== 0);
}

main();
