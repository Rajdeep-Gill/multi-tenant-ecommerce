import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { Media, Tenant } from "@/payload-types";

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tenantsData = await ctx.db.find({
        collection: "tenants",
        depth: 1,
        where: {
          slug: {
            equals: input.slug,
          },
        },
      });
      console.log("tenantsData", tenantsData);
      const tenant = tenantsData.docs[0];

      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found" + input.slug,
        });
      }

      return tenant as Tenant & {
        image: Media | null;
      };
    }),
});
