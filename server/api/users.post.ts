
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let user = null
    
    if (body.name) {

        await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
            },
        }).then((response)=>{
            user = response
        })
    }

    return {
        user: user
    }
})