import inquirer from 'inquirer';
import colors from 'colors';

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

const MenuOptions = [
    {
        type: 'list',
        name:'opcion',
        message: 'Que deseas hacer',
        pageSize: 10,
        loop: false,
        choices: [
            {
                value :1,
                name:`${'1.'.red} ${'Buscar Ciudad'.verbose}`
            },
            {
                value :2,
                name:`${'2.'.red} ${'Historial'.verbose}`
            },
            
            {
                value :0,
                name:`${'0.'.red} ${'Salir'.verbose}\n`
            },   
        ],
    },
    
];


const pause = [
    {
    type: 'input',
    name: 'pause',
    message: `\n Presione ${'Enter'.red} para continuar`,
    default() {
        return 'Doe';
        }
    }
]


const InquirerMenu = async() =>{
    console.clear();
    console.log('==========================='.green);
    console.log('  Selecciona una opcion'.white);
    console.log('===========================\n'.green);

    const opt = await inquirer.prompt(MenuOptions);
    return opt.opcion;

    
} 

const InquirerPause = async() =>{
    const pausa = await inquirer.prompt(pause)
}

const leerimput = async(message)=>{

    const ciudad = [
    {
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
    if (value.length ===0) {
        return 'Por favor ingrese un valor';
            }
        return true;
        }
    }
]
    const ciudadimput = await inquirer.prompt(ciudad);
    
    // Verificar si el usuario quiere cancelar
    if (ciudadimput.desc === '0') {
        return null;
    }
    
    return ciudadimput.desc;
}

const Listarlugares = async(lugares = []) =>{
    const choices = lugares.map( (lugar, id) => {

        const idx = `${id + 1}.`.green;

        return {
            value: lugar.id,
            name:  `${ idx } ${ lugar.name }`
        }
    });

    choices.push({
        value:0,
        name:`${'0.'.green} ${'Cancelar'.verbose}\n`
    });

    const lugar = [
    {
        type: 'list',
        name:'opciontareas',
        message: 'seleccione el lugar',
        loop: false,
        choices
    },
    
    ];

    const id = await inquirer.prompt(lugar);
    return id['opciontareas'];
}

export {
    InquirerMenu,
    InquirerPause,
    leerimput,
    Listarlugares
};