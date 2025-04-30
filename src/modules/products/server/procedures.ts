import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategories = [];

        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategories.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategories],
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // depth 1 for image and category info
        where,
      });

      return data;
    }),
});
