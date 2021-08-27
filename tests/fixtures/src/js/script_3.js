"use strict"

setTimeout(() => {
    import('./class/classBaz').then((script) => {
        (new script.Baz).log('30');
    })
}, 10000);
