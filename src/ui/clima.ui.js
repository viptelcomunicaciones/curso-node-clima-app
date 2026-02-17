import '../config/colors.config.js'; // ✅ activa el tema

// ─── Helper interno: color según temperatura ──────────────────────────────────

const _colorTemp = ( temp ) => {
    const valor = temp.toFixed(1);
    if ( temp <= 10 ) return String(valor).blue;
    if ( temp <= 20 ) return String(valor).cyan;
    if ( temp <= 28 ) return String(valor).yellow;
    return String(valor).red;
};

// ─── Vistas públicas ──────────────────────────────────────────────────────────

export const mostrarClima = ( lugar, clima ) => {
    console.clear(); // ✅ Limpiar toda la salida anterior
    console.log( '\n========================================'.green );
    console.log( '   🌤  Información del Clima'.white             );
    console.log( '========================================\n'.green );
    console.log( ` ${'Ciudad:'.cyan}      ${ lugar.name }`        );
    console.log( ` ${'Latitud:'.cyan}     ${ lugar.lat }`         );
    console.log( ` ${'Longitud:'.cyan}    ${ lugar.lng }`         );
    console.log( '\n----------------------------------------'.grey );
    console.log( ` ${'Temperatura:'.cyan} ${ _colorTemp(clima.temp) } ${'°C'.grey}` );
    console.log( ` ${'Mínima:'.cyan}      ${ _colorTemp(clima.min)  } ${'°C'.grey}` );
    console.log( ` ${'Máxima:'.cyan}      ${ _colorTemp(clima.max)  } ${'°C'.grey}` );
    console.log( '\n----------------------------------------'.grey );
    console.log( ` ${'Condición:'.cyan}   ${ clima.desc.verbose }`);
    console.log( '\n========================================\n'.green );
};

export const mostrarHistorial = ( historial = [] ) => {
    // ✅ SIN console.clear() aquí — lo hace mostrarMenu al volver
    console.log( '\n========================================'.green );
    console.log( '   🕘  Historial de búsquedas'.white            );
    console.log( '========================================\n'.green );

    if ( historial.length === 0 ) {
        console.log( ' No hay búsquedas recientes.\n'.warn );
        return;
    }

    historial.forEach( (lugar, idx) => {
        console.log( `  ${ `${idx + 1}.`.green } ${ lugar.verbose }` );
    });
    console.log('');
};

export const mostrarError = ( mensaje ) => {
    console.log(`\n ✖ ${ mensaje }\n`.error);
};