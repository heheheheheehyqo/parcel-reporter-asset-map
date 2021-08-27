import {PackagedBundle, Asset, BundleGraph} from "@parcel/types";

export type EntriesMap = {
    [key: string]: any | EntriesMap
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
    groups: Array<string>,
}

export interface BundlePack {
    bundle: PackagedBundle,
    asset: Asset,
    bundleGraph: BundleGraph<PackagedBundle>
    children: Array<PackagedBundle>
}
