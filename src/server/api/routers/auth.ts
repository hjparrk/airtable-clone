import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const authRouter = createTRPCRouter({
  /** REGISTER **/
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const existingUser = await ctx.db.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already in use.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.db.user.create({
        data: { email, password: hashedPassword },
      });

      return { id: user.id, email: user.email };
    }),
});
