import {Asset, BundleGraph, PackagedBundle, PluginOptions} from "@parcel/types";
import {EntriesMap} from "./types";
import path from "path";

export class BundleBox {
    constructor(
        public bundle: PackagedBundle,
        public asset: Asset,
        public bundleGraph: BundleGraph<PackagedBundle>,
        public children: Array<PackagedBundle>
    ) {
    }

    getTargetPublicPath(): string {
        return path.join(
            this.bundle.target.publicUrl,
            path.relative(this.bundle.target.distDir, this.bundle.filePath)
        );
    }

    getTargetPath(): string {
        return this.bundle.filePath;
    }

    getMainAsset(): Asset | null {
        return BundleBox.getMainAsset(this.bundle)
    }

    static getMainAsset(bundle: PackagedBundle): Asset | null {
        return bundle.getMainEntry() ?? null
    }

    getEntriesMap(options: PluginOptions): EntriesMap {
        const entriesMap: EntriesMap = {};

        this.children.forEach(child => {
            const asset = BundleBox.getMainAsset(child);
            if (!asset)
                return

            const assetName = path.relative(options.projectRoot, asset.filePath);

            if (!entriesMap[asset.type]) {
                entriesMap[asset.type] = [];
            }

            if (!entriesMap[asset.type].includes(assetName))
                entriesMap[asset.type].push(assetName);
        })

        return entriesMap;
    }

    getBrowserType(): string {
        const outputFormat = this.getMainAsset()?.env.outputFormat;

        switch (outputFormat) {
            case 'global':
                return 'nomodule';
            case 'esmodule':
                return 'module';
            default:
                return outputFormat ?? ''
        }
    }

    isExportedMultipleTimes(): boolean {
        return this.getBundlesInGroup()
            .filter(bundle => this.asset.filePath === BundleBox.getMainAsset(bundle)?.filePath).length > 1
    }

    private getBundlesInGroup(): Array<PackagedBundle> {
        const bundleGroups = this.bundleGraph.getBundleGroupsContainingBundle(this.bundle);

        for (const bundleGroup of bundleGroups) {
            const bundles = this.bundleGraph.getBundlesInBundleGroup(bundleGroup);

            for (const bundle of bundles) {
                if (bundle.id === this.bundle.id)
                    return bundles;
            }
        }

        return [];
    };

}
