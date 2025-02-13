import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const tableRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        baseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const base = await ctx.db.base.findUnique({
        where: {
          id: input.baseId,
          userId: ctx.session.user.id,
          deletedAt: null,
        },
      });
      if (!base) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Base not found." });
      }

      const tableName = `Table ${base.tableCount + 1}`;
      const [table] = await ctx.db.$transaction([
        ctx.db.table.create({
          data: {
            name: tableName,
            baseId: input.baseId,
          },
        }),
        ctx.db.base.update({
          where: { id: input.baseId },
          data: { tableCount: { increment: 1 } },
        }),
      ]);

      return table;
    }),

  read: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        baseId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.table.findUnique({
        where: {
          id: input.id,
          baseId: input.baseId,
        },
      });
    }),

  readAll: protectedProcedure
    .input(
      z.object({
        baseId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.table.findMany({
        where: { baseId: input.baseId },
      });
    }),

  update: {},

  delete: {},
});
