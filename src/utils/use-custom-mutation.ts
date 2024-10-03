import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { createMutationOptions } from './create-mutation-option'

interface UseCustomMutationParams<
  TData,
  TError,
  TVariables,
  TContext = unknown
> {
  mutationFn: (variables: TVariables) => Promise<TData>
  mutationOptions?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
  >
}

export function useCustomMutation<
  TData,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>({
  mutationFn,
  mutationOptions,
}: UseCustomMutationParams<TData, TError, TVariables, TContext>) {
  const { mutationOptions: options } = createMutationOptions<
    TData,
    TError,
    TVariables,
    TContext
  >({
    mutationFn,
    mutationOptions,
  })

  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
  })
}
