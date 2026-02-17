import inquirer from 'inquirer';
import '../config/colors.config.js'; // ✅ activa el tema, no necesita exportar nada

// ─── Menú principal ───────────────────────────────────────────────────────────

export const mostrarMenu = async () => {
    console.clear();
    console.log( '==========================='.green  );
    console.log( '   Selecciona una opción'.white     );
    console.log( '===========================\n'.green );

    const { opcion } = await inquirer.prompt([{
        type:     'list',
        name:     'opcion',
        message:  '¿Qué deseas hacer?',
        pageSize: 10,
        loop:     false,
        choices:  [
            { value: 1, name: `${'1.'.red} ${'Buscar Ciudad'.verbose}` },
            { value: 2, name: `${'2.'.red} ${'Historial'.verbose}`     },
            { value: 0, name: `${'0.'.red} ${'Salir'.verbose}\n`       },
        ]
    }]);

    return opcion;
};

// ─── Pausa ────────────────────────────────────────────────────────────────────

export const pausar = async () => {
    await inquirer.prompt([{
        type:    'input',
        name:    'pause',
        message: `\n Presione ${'Enter'.red} para continuar`
    }]);
};

// ─── Leer input de texto ──────────────────────────────────────────────────────

export const leerInput = async ( message ) => {
    const { valor } = await inquirer.prompt([{
        type:    'input',
        name:    'valor',
        message,
        validate( value ) {
            if ( value.length === 0 ) return 'Por favor ingrese un valor';
            return true;
        }
    }]);

    return valor === '0' ? null : valor;
};

// ─── Lista de lugares ─────────────────────────────────────────────────────────

export const listarLugares = async ( lugares = [] ) => {
    const choices = lugares.map( (lugar, idx) => ({
        value: lugar.id,
        name:  `${ `${idx + 1}.`.green } ${ lugar.name }`
    }));

    choices.push({ value: 0, name: `${'0.'.green} ${'Cancelar'.verbose}\n` });

    const { seleccion } = await inquirer.prompt([{
        type:    'list',
        name:    'seleccion',
        message: 'Seleccione el lugar',
        loop:    false,
        choices
    }]);

    return seleccion;
};