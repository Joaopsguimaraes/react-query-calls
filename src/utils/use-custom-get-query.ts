import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query'

import { createQueryOptions } from './create-query-option'

interface UseCustomQueryParams<TQueryFnData, TError, TVariables> {
  queryKey: QueryKey
  queryFn: (variables?: TVariables) => Promise<TQueryFnData>
  variables?: TVariables
  queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError>,
    'queryKey' | 'queryFn'
  >
}

export function useCustomGetQuery<
  TQueryFnData,
  TError = unknown,
  TVariables = void
>({
  queryKey,
  queryFn,
  variables,
  queryOptions,
}: UseCustomQueryParams<TQueryFnData, TError, TVariables>) {
  const { queryOptions: options } = createQueryOptions<
    TQueryFnData,
    TError,
    TVariables
  >({
    queryKey,
    queryFn,
    variables,
    queryOptions,
  })

  return useQuery<TQueryFnData, TError>({
    ...options,
  })
}
