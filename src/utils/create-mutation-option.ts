import { UseMutationOptions } from '@tanstack/react-query'

interface CreateMutationOptionsParams<
  TData,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> {
  mutationFn: (variables: TVariables) => Promise<TData>
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
}

export function createMutationOptions<
  TData,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>({
  mutationFn,
  mutationOptions,
}: CreateMutationOptionsParams<TData, TError, TVariables, TContext>) {
  return {
    mutationOptions: {
      mutationFn,
      ...mutationOptions,
    },
  }
}
