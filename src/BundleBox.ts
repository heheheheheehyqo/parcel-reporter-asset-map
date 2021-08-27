import {Asset, BundleGraph, PackagedBundle} from "@parcel/types";
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
