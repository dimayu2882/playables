let smartgrid = require('smart-grid');

let settings = {
    outputStyle: 'scss',
    columns: 12,
    offset: '32px',
    mobileFirst: false,
    container: {
        maxWidth: '1344px',
        fields: '48px'
    },
    breakPoints: {
        lm: {
            width: '1140px',
            fields: '24px'
        },
        md: {
            width: '980px',
            fields: '24px'
        },
        sm: {
            width: '768px',
            fields: '16px'
        },
        xsm: {
            width: '540px',
            fields: '16px'
        },
        xs: {
            width: '375px',
            fields: '16px'
        }
    }
};

smartgrid('./src/styles/helpers', settings);


/*
 * mobileFirst
 *  false -> max-width
 *  true -> min-width
 */
