import colors from 'colors';

// ✅ Única fuente de verdad para el tema de colores de la app
colors.setTheme({
    silly:   'rainbow',
    input:   'grey',
    verbose: 'cyan',
    prompt:  'grey',
    info:    'green',
    data:    'grey',
    help:    'cyan',
    warn:    'yellow',
    debug:   'blue',
    error:   'red'
});

export default colors;
