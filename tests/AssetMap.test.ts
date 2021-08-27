import path from "path";
import {execSync} from "child_process";
import fs from "fs";
import {MAP_FILENAME} from "../src/AssetMap";

jest.setTimeout(120000);

beforeAll(() => {
    execSync("npm run build")
})

test("valid map", async () => {
    process.chdir(path.join(__dirname, "./fixtures"))
    execSync("rm -rf package-lock.json .parcel-cache dist node_modules && npm install && npm run build")

    const generatedMap = normalize(loadMap(`dist/${MAP_FILENAME}`));
    const goldMap = loadMap(`gold-map.json`);

    expect(generatedMap).toEqual(goldMap);
})

function loadMap(mapPath: string) {
    return JSON.parse(
        fs.readFileSync(
            path.join(__dirname, `./fixtures/${mapPath}`)
        ).toString()
    );
}

function normalize(object: object): object {
    for (const [key, value] of Object.entries(object)) {

        if (!(value instanceof Array) && (typeof value === 'object')) {
            object[key] = normalize(value);
        }

        if (typeof value === 'string') {
            object[key] = value.replace(/\.([0-9a-z]{8})\./, '.[hash].');
        }

    }

    return object;
}
