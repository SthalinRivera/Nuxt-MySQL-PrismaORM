
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async () => {

       return  await prisma.user.findMany()

})