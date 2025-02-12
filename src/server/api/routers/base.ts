import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const baseRouter = createTRPCRouter({
  /** CREATE **/
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const base = await ctx.db.base.create({
      data: {
        name: "Untitled Base",
        userId: ctx.session.user.id,
      },
    });
    return base;
  }),

  /** READ **/
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.base.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
          deletedAt: null,
        },
      });
    }),

  /** READ ALL **/
  readAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.base.findMany({
      where: { userId: ctx.session.user.id, deletedAt: null },
    });
  }),

  /** UDPDATE **/
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.update({
        where: { id: input.id, deletedAt: null },
        data: { name: input.name },
      });
    }),

  /** SOFT DELETE **/
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.update({
        where: { id: input.id, deletedAt: null },
        data: { deletedAt: new Date() },
      });
    }),

  /** RESTORE **/
  restore: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.base.update({
        where: { id: input.id },
        data: { deletedAt: null },
      });
    }),

  /** DELETE PERMANENTLY **/
  deletePermanently: protectedProcedure.mutation(async ({ ctx }) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return ctx.db.base.deleteMany({
      where: { deletedAt: { lte: sevenDaysAgo } },
    });
  }),
});
