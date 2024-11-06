
import { PrismaClient } from '@prisma/client'
import { EMISSIONCATEGORIES } from './fixed_data/emission-categories'
import { EMISSIONFACTORS } from './fixed_data/emission-factors'
import { EMISSIONSUBCATEGORIES } from './fixed_data/emission-sub-categories'
import { EMISSIONTYPES } from './fixed_data/emission-types'
import { EMISSIONUNITS } from './fixed_data/emission-units'
import { LANGUAGES } from './fixed_data/languages'

const prisma = new PrismaClient()

const languages = async () => {
    await prisma.emissionFactors.deleteMany()
    await prisma.emissionUnits.deleteMany()
    await prisma.emissionTypes.deleteMany()
    await prisma.emissionSubCategories.deleteMany()
    await prisma.emissionCategories.deleteMany()
    await prisma.languages.deleteMany()

    await prisma.languages.createMany({ data: LANGUAGES })
    await prisma.emissionCategories.createMany({ data: EMISSIONCATEGORIES })
    await prisma.emissionSubCategories.createMany({ data: EMISSIONSUBCATEGORIES })
    await prisma.emissionTypes.createMany({ data: EMISSIONTYPES })
    await prisma.emissionUnits.createMany({ data: EMISSIONUNITS })
    await prisma.emissionFactors.createMany({ data: EMISSIONFACTORS })
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


