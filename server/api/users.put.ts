
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async(event) => {
  const body = await readBody(event)
  const id = body.id
  const name = body.name
  const email = body.email

  if (!(id && email && name)) return createError({statusCode: 400, statusMessage: "missing id or email or email "})

  let user
  if (id && email &&name) {
    
  }
   user = await prisma.user.update({
    where: {
      id:id,
    },
    data: {
      name:name,
      email:email,
    },
  })
  return user
})