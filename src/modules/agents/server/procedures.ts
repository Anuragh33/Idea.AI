import { db } from '@/db'
import { agents } from '@/db/schema'
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '@/trpc/init'
import { agentsInsertSchema } from '../schema'
import z from 'zod'
import { eq } from 'drizzle-orm'

export const agentsRouter = createTRPCRouter({
  //Returns only one value
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))

      return existingAgent
    }),

  getMan: baseProcedure.query(async () => {
    //Returns only all values
    const data = await db.select().from(agents)

    //await new Promise((resolve) => setTimeout(resolve, 2000))

    //throw new TRPCError({ code: 'BAD_REQUEST' })

    return data
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values([
          {
            ...input,
            userId: ctx.auth.session.id,
          },
        ])
        .returning()

      return createdAgent
    }),
})
