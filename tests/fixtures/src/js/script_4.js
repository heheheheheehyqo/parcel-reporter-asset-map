"use strict"

setTimeout(() => {
    import('./class/classBar').then((script) => {
        (new script.Bar).log('40');
    })
}, 10000);
