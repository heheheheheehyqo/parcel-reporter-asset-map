import {EntriesMap, Options} from "./types";
import {PackagedBundle, PluginOptions} from "@parcel/types";
import path from "path";
import {BundleBox} from "./BundleBox";

export const DEFAULT_GROUP = 'default';

export class EntryMapBuilder {
    private useGroups: boolean;
    private hasDefaultGroup: boolean;

    constructor(
        private config: Options,
        private options: PluginOptions
    ) {
        this.useGroups = !this.config.groups.every(group => group === DEFAULT_GROUP);
        this.hasDefaultGroup = this.config.groups.includes(DEFAULT_GROUP);
    }

    build(children: Array<PackagedBundle>): EntriesMap {
        let entriesMap: EntriesMap = {};

        children.forEach(child => {
            const asset = BundleBox.getMainAsset(child);
            if (!asset)
                return

            const assetType = asset.type;
            const assetName = path.relative(this.options.projectRoot, asset.filePath);

            let mapRef: object;

            if (this.useGroups) {
                let assetGroup = null;

                for (const group of this.config.groups) {
                    if (new RegExp(`\\.${group}\\.`).test(assetName)) {
                        assetGroup = group;
                        break;
                    }
                }

                if (assetGroup === null) {
                    if (this.hasDefaultGroup)
                        assetGroup = DEFAULT_GROUP;
                    else
                        return;
                }

                if (!entriesMap[assetGroup]) {
                    entriesMap[assetGroup] = {};
                }

                mapRef = entriesMap[assetGroup];
            } else {
                mapRef = entriesMap;
            }

            if (!mapRef[assetType]) {
                mapRef[assetType] = [];
            }

            if (!mapRef[assetType].includes(assetName))
                mapRef[assetType].push(assetName);
        })

        return entriesMap;
    }
}
