import {PackagedBundle, Asset, BundleGraph} from "@parcel/types";

export type EntriesMap = {
    [key: string]: Array<string>
}

export type AssetMap = {
    entries: {
        [key: string]: EntriesMap
    },
    assets: {
        [key: string]: string | any
    }
}

export type Options = {
    removeHTML: boolean,
    onlyRootChildren: boolean,
}

export interface BundlePack {
    bundle: PackagedBundle,
    asset: Asset,
    bundleGraph: BundleGraph<PackagedBundle>
    children: Array<PackagedBundle>
}
