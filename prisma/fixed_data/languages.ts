export interface Language {
    languageCode: string;
    flagUrl: string;
    categories: {
        label: string;
        detail: string;
        subCategories: {
            label: string;
            detail: string;
            emissionFactors: {
                label: string;
                type: string;
                unit: string;
                value: number;
                uncertainty: number;
                depreciationPeriod?: number;
            }[]
        }[]
    }[]

}
