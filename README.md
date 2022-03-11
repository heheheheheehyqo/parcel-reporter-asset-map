# parcel-reporter-asset-map

![npm](https://img.shields.io/npm/v/@hyqo/parcel-reporter-asset-map)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@hyqo/parcel-reporter-asset-map/peer/parcel)

This will add `asset-map.json` to the target dir. Example:

```json
{
    "assets": {
        "src/page1.js": "index.be4a6159.js",
        "src/page2.js": "index.20fcbe4a.js",
        "src/styles1.css": "index.1417f4ce.css",
        "src/styles2.css": "index.ef415fe0.css"
    },
    "entries": {
        "index": {
            "css": [
                "src/styles1.css",
                "src/styles2.css"
            ],
            "js": [
                "src/page1.js",
                "src/page2.js"
            ]
        }
    }
}
```

## Support differential bundling

More info: https://v2.parceljs.org/features/targets/#differential-bundling

```json
{
    "assets": {
        "src/page.js": {
            "nomodule": "page.1b313ef4.js",
            "module": "page.cc6e2cca.js"
        },
        "src/styles1.css": "index.1417f4ce.css",
        "src/styles2.css": "index.ef415fe0.css"
    },
    "entries": {
        "index": {
            "css": [
                "src/styles1.css",
                "src/styles2.css"
            ],
            "js": [
                "src/page.js"
            ]
        }
    }
}
```

## Installation

```sh
npm install --save-dev @hyqo/parcel-reporter-asset-map
```

## Usage

Add `@hyqo/parcel-reporter-asset-map` to `.parcelrc` in `reporters`.

```json
{
    "extends": "@parcel/config-default",
    "reporters": [
        "...",
        "@hyqo/parcel-reporter-asset-map"
    ]
}
```
