import { woofs } from "@/server/db/schema";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const woofRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        level: z.number(),
        lat: z.string(),
        lng: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db
        .insert(woofs)
        .values({
          level: input.level,
          lat: input.lat,
          lng: input.lng,
        })
        .execute();
    }),
  getAllWoofs: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.woofs.findMany();
  }),
});
