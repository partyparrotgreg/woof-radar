import { woofs } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { or } from "drizzle-orm";

export const woofRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        level: z.number(),
        lat: z.number(),
        lng: z.number(),
        ownerId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await ctx.db
        .insert(woofs)
        .values({ ...input })
        .execute();
    }),
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.woofs.findMany();
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
  }),
});
