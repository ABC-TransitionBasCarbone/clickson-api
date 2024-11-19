
import { PrismaClient } from '@prisma/client'
import { EMISSIONCATEGORIES } from './fixed_data/emission-categories'
import { LANGUAGES } from './fixed_data/languages'

const prisma = new PrismaClient()

const languages = async () => {
    await prisma.emissionFactors.deleteMany()
    await prisma.emissionSubCategories.deleteMany()
    await prisma.emissionCategories.deleteMany()
    await prisma.languages.deleteMany()

    await prisma.languages.createMany({ data: LANGUAGES })

    // One big file with all the fixed data
    await prisma.emissionCategories.createMany({
        data: EMISSIONCATEGORIES.map(({ emissionSubCategories, ...ecRest }) => ecRest)
    })
    const emissionSubCategoriesReturned = await prisma.emissionSubCategories.createManyAndReturn({
        data: EMISSIONCATEGORIES.flatMap(({ emissionSubCategories, ...ecRest }) =>
        (emissionSubCategories.map(({ emissionFactors, ...escRest }) => (
            {
                ...escRest,
                idLanguage: ecRest.idLanguage,
                idEmissionCategory: ecRest.id
            }
        ))))
    })

    await prisma.emissionFactors.createMany({
        data: EMISSIONCATEGORIES.flatMap(({ emissionSubCategories, ...ecRest }) => (
            (emissionSubCategories.flatMap(({ emissionFactors, ...esc }) => (
                emissionFactors.map((ef) => (
                    {
                        ...ef,
                        idLanguage: ecRest.idLanguage,
                        idEmissionSubCategory: emissionSubCategoriesReturned.find(escr => escr.label === esc.label && escr.detail === esc.detail)?.id
                    }
                ))
            )))
        ))
    })

}

const main = async () => {
    await Promise.all([languages()])
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


