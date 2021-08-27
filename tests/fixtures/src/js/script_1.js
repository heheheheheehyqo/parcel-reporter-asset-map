"use strict"

import {Foo} from "./class/classFoo";

(new Foo).log('10');

import('./class/classBar').then((script) => {
    (new script.Bar).log('11');
})

setTimeout(() => {
    import('./class/classBaz').then((script) => {
        (new script.Baz).log('12');
    })
}, 5000);
