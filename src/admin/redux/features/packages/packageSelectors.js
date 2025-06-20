import { createSelector } from "@reduxjs/toolkit"

export const selectSelectedPackage = (state) => state.packages.selectedPackage
export const selectTransformedPackage = createSelector(
    [selectSelectedPackage],
    (selectedPackage) => {
        if(!selectedPackage) return null;

        const includes = selectedPackage.packageIncludes?.map((item) => ({
            icon: `http://localhost:8081${item.iconSrc}`,
            text: item.description
        })) || []

        return {
            ...selectedPackage,
            includes
        }
    }
)