
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let user = null
  let error = null
  if (body.id)
    user = await prisma.user.delete({
      where: {
        id: body.id,
      },
    }).then((response) => {
      user = response
    }).catch(async (e) => {
      error = e
    })
  if (error) return createError({statusCode: 500, statusMessage: "server error  dato no encontrado"})
  return user
})