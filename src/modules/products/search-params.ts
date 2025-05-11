import {
  parseAsString,
  parseAsArrayOf,
  createLoader,
  parseAsStringLiteral,
} from "nuqs/server";

export const sortValues = ["curated", "trending", "hot_and_new"] as const;

export const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withDefault(""),
  maxPrice: parseAsString.withDefault(""),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadProductFilters = createLoader(params);
