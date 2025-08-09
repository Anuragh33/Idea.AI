import { db } from '@/db'
import { agents } from '@/db/schema'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const agentsRouter = createTRPCRouter({
  getMan: baseProcedure.query(async () => {
    const data = await db.select().from(agents)

    //await new Promise((resolve) => setTimeout(resolve, 2000))

    //throw new TRPCError({ code: 'BAD_REQUEST' })

    return data
  }),
})
