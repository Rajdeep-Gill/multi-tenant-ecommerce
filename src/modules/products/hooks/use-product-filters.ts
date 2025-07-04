import {
  useQueryStates,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["curated", "trending", "hot_and_new"] as const;

export const params = {
  sort: parseAsStringLiteral(sortValues).withDefault("curated"),
  minPrice: parseAsString.withDefault(""),
  maxPrice: parseAsString.withDefault(""),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
};

export const useProductFilters = () => {
  return useQueryStates(params);
};
