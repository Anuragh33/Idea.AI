import { db } from '@/db'

import { agents } from '@/db/schema'

import { createTRPCRouter, protectedProcedure } from '@/trpc/init'

import { agentsInsertSchema } from '../schema'

import z from 'zod'

import { eq, getTableColumns, sql } from 'drizzle-orm'

export const agentsRouter = createTRPCRouter({
  //Returns only one value
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({ meetingCount: sql<number>`5`, ...getTableColumns(agents) })
        .from(agents)
        .where(eq(agents.id, input.id))

      return existingAgent
    }),

  getMany: protectedProcedure.query(async () => {
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
            userId: ctx.auth.user.id,
          },
        ])
        .returning()

      return createdAgent
    }),
})
