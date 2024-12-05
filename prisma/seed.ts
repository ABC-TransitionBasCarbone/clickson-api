
import { PrismaClient } from '@prisma/client'
import { EMISSIONCATEGORIES } from './fixed_data/emission-categories'
import { LANGUAGES } from './fixed_data/languages'

const prisma = new PrismaClient()

const languages = async () => {
    await prisma.emissionFactors.deleteMany()

    LANGUAGES.forEach(async (language) => {
        await prisma.languages.upsert({
            where: { id: language.id },
            update: language,
            create: language
        })

        EMISSIONCATEGORIES.filter(ec => ec.idLanguage === language.id).forEach(async ({ emissionSubCategories, ...ecRest }) => {
            await prisma.emissionCategories.upsert({
                where: { id: ecRest.id },
                update: ecRest,
                create: ecRest
            })
            emissionSubCategories.forEach(async ({ emissionFactors, ...esc }) => {
                await prisma.emissionSubCategories.upsert({
                    where: { id: esc.id },
                    update: esc,
                    create: {
                        ...esc,
                        idEmissionCategory: ecRest.id,
                        idLanguage: language.id
                    }
                })
                await prisma.emissionFactors.createMany({
                    data: emissionFactors.map(ef => ({
                        ...ef,
                        idLanguage: language.id,
                        idEmissionSubCategory: esc.id
                    }))
                })
            })
        })
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


