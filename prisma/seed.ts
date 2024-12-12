
import { PrismaClient } from '@prisma/client'
import { LANGUAGES } from './fixed_data/languages-data'

const prisma = new PrismaClient()

const languages = async () => {
    LANGUAGES.forEach(async ({ categories, ...language }, idLang) => {
        await prisma.languages.upsert({
            where: { id: idLang + 1 },
            update: language,
            create: { ...language, id: idLang + 1 }
        })
    })
}

const categories = async () => {
    const languages = LANGUAGES.map((language, idLang) => ({ ...language, id: idLang + 1 }))
    let countIdCat = 0
    let countIdSubCat = 0
    let countIdFE = 0

    for (const language of languages) {
        for (const { subCategories, ...category } of language.categories) {
            countIdCat++
            await prisma.emissionCategories.upsert({
                where: { id: countIdCat },
                update: category,
                create: { ...category, idLanguage: language.id, id: countIdCat }
            })
            for (const { emissionFactors, ...subCategory } of subCategories) {
                countIdSubCat++
                await prisma.emissionSubCategories.upsert({
                    where: { id: countIdSubCat },
                    update: subCategory,
                    create: { ...subCategory, idLanguage: language.id, idEmissionCategory: countIdCat, id: countIdSubCat }
                })
                for (const emissionFactor of emissionFactors) {
                    countIdFE++
                    await prisma.emissionFactors.upsert({
                        where: { id: countIdFE },
                        update: emissionFactor,
                        create: { ...emissionFactor, id: countIdFE, idLanguage: language.id, idEmissionSubCategory: countIdSubCat }
                    })
                }
            }
        }
    }
}

const main = async () => {
    await Promise.all([languages(), categories()])
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


