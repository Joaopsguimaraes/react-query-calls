import type { QueryKey } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'

interface InvalidateQueryParams<TKey extends QueryKey> {
  queryKey: TKey
}

interface CacheInvalidator {
  invalidate<TKey extends QueryKey>(
    params: InvalidateQueryParams<TKey>
  ): Promise<void>
}

export function invalidateQuery(): CacheInvalidator {
  return {
    async invalidate<TKey extends QueryKey>({
      queryKey,
    }: InvalidateQueryParams<TKey>) {
      await queryClient.invalidateQueries({ queryKey })
    },
  }
}
