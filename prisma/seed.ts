
import { PrismaClient } from '@prisma/client'
import { EMISSIONFACTORS } from './fixed_data/emission-factors'

const prisma = new PrismaClient()

const emissionFactors = async () => {
    await prisma.emissionFactors.deleteMany()
    await prisma.emissionFactors.createMany({ data: EMISSIONFACTORS })
}

const main = async () => {
    await Promise.all([emissionFactors])
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


