import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

interface CreateQueryOptionsParams<TQueryFnData, TError, TVariables> {
  queryKey: QueryKey;
  queryFn: (variables?: TVariables) => Promise<TQueryFnData>;
  variables?: TVariables;
  queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError>,
    "queryKey" | "queryFn"
  >;
}

export function createQueryOptions<
  TQueryFnData,
  TError = unknown,
  TVariables = unknown
>({
  queryKey,
  queryFn,
  variables,
  queryOptions,
}: CreateQueryOptionsParams<TQueryFnData, TError, TVariables>) {
  return {
    queryKey,
    queryOptions: {
      queryKey,
      queryFn: variables ? () => queryFn(variables) : () => queryFn(),
      ...queryOptions,
    },
  };
}
