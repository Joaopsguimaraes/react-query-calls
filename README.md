# React query calls

## Essa é uma aplicação Next com o intuito de mostrar exemplo de chamadas feitas com React query https://tanstack.com/query/latest

React query é uma das bibliotecas mais utilizadas para aplicações React para gestão assíncrona do estado. Com o uso dela conseguimos reduzir e abstrair chamadas a API, controlar estado da chamada, como Loading, Success, Errors entre outros.

A proposta desse exemplo é demonstrar como costumo utilizar o react query em minhas aplicações React.

1. Realizo a configuração, criando o provider em uma pasta um arquivo separado, caso esteja utilizando a feature App router do next js.

```ts
'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'

interface TanstackQueryProviderProps {
  children: ReactNode
}

export function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

```

1.1 Logo também deixo a instancia do query client criada de forma separada caso haja configurações especificas.

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
```

2. Criar abstração - De acordo com a demanda da aplicação, seu intuito do produto e etc,  é recomendado realizar essa abstração das bibliotecas utilizadas principalmente uma como o react query, que realiza essa gestão assíncrona do estado, pois existem varias no mercado e podem vim varias futuramente também e assim deixando a complexidade menor caso haja necessidade de troca de biblioteca para outra de gestão do estado. Logo foi criado os seguintes arquivos:

2.1. `create-query-option.ts` que será responsável por retornar um objeto importante para minha configuração da chamada assíncrona, como a queryKey para a chave do cache, variáveis caso essa chamada necessite entre outras configurações:

```ts
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

```

2.2. `create-mutation-option.ts` assim como o `create-query-option.ts` uma abstração porem agora para as mutations, pois possuem leve alterações de parâmetros, retornos e tipos

```ts
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

```

2.3. `use-custom-get-query.ts` Aqui está o hook personalizado para abstração em si, pois ele será responsável para geração de um novo hook com a logica da chamada a API, casos de sucesso, erro e etc. Ele utiliza o `createQueryOptions()` pois assim como citado, este método retorna configurações essenciais para as chamadas assíncronas

```ts
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

```

2.4. `use-custom-mutation.ts` assim como o `use-custom-get-query.ts` tem a mesma proposta, porem com alterações necessárias para sucesso de uma mutation, mas com este hook que vai ser criado outros com a logica das mutations necessárias para métodos `POST`, `PUT`, `DELETE`

```ts
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

```

3. Com as abstrações criadas, assim que eles são utilizados, crio um novo hook porem não é necessário a importação da biblioteca `react query` em si, somente o hook customizado e método criado com a abstração dos recursos.

3.1 Exemplo utilizado para uma chamada como verbo HTTP `GET` como arquivo: `use-get-products-list.ts`

```ts
import type { ProductsInputType } from '@/@types/products'
import { createQueryOptions } from '@/utils/create-query-option'
import { useCustomGetQuery } from '@/utils/use-custom-get-query'
import { invalidateQuery } from '@/utils/use-invalidate-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export const getProductsList = () => {
  const queryKey = ['products-list']

  return createQueryOptions<ProductsInputType[], AxiosError>({
    queryKey,
    queryFn: async () => {
      const response = await api.get<ProductsInputType[]>('/products')

      return response.data
    },
  })
}

export function useGetProductsList() {
  const { queryKey, queryOptions } = getProductsList()

  return useCustomGetQuery<ProductsInputType[], AxiosError>({
    queryKey,
    queryFn: queryOptions.queryFn,
    queryOptions,
  })
}

export async function invalidateProductsList() {
  const { invalidate } = invalidateQuery()
  const { queryKey } = getProductsList()

  try {
    await invalidate({ queryKey })
  } catch (error) {
    console.error('Erro ao invalidar a query:', error)
  }
}

```

E com isso foi separada os tipos e chamada a API neste outro hook customizado e chamo ele no component da seguinte forma:

```tsx
'use client'

import { useMemo, useRef } from 'react'
import { DataTable } from '@/shared/data-table'
import { productsSchema } from '@/validations/products-schema'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { useGetProductsList } from '../hooks/use-get-products-list'
import { useProductsTableColumns } from '../hooks/use-products-table-columns'
import {
  NewProductDialog,
  type NewProductDialogRef,
} from '../new-product-dialog'
import { ProductDetail, type ProductDetailRefProps } from '../product-detail'

export function ProductsTable() {
  const { data, isLoading, isFetching } = useGetProductsList()

  const dataMapped = useMemo(() => {
    if (data) {
      return data.map((item) => {
        return productsSchema.parse(item)
      })
    }
    return []
  }, [data])

  const showProductDetail = useRef<ProductDetailRefProps>(null)

  const registerNewProduct = useRef<NewProductDialogRef>(null)

  const handleOpenShowProductDetail = showProductDetail.current?.open

  const handleOpenRegisterNewProduct = registerNewProduct.current?.open

  const { tableColumns } = useProductsTableColumns({
    handleOpenDetails: handleOpenShowProductDetail,
  })

  return (
    <DataTable.Root limit={10} columns={tableColumns} data={dataMapped}>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full">
          <CardTitle>Lista de Produtos</CardTitle>
          <Button onClick={handleOpenRegisterNewProduct}>
            Cadastrar produto
          </Button>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-8 p-5">
          {isLoading || isFetching ? (
            <Skeleton className="h-56 mt-6 w-full" />
          ) : (
            <DataTable.Main />
          )}
        </CardContent>
      </Card>
      <ProductDetail ref={showProductDetail} />
      <NewProductDialog ref={registerNewProduct} />
    </DataTable.Root>
  )
}

```

Com isso percebe-se que não houve a necessidade de utilizar a biblioteca direta no component ou hook, facilitando a manutenção caso haja necessidade de alteração. Abaixo um exemplo de uma mutation:

`use-delete-product.tsx`
```ts
import type { RemoveProductParamsAction } from '@/@types/remove-product-params-action'
import { createMutationOptions } from '@/utils/create-mutation-option'
import { useCustomMutation } from '@/utils/use-custom-mutation'
import { useQueryClient, type UseMutationOptions } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'

import { getProductsList } from './use-get-products-list'

type OptionsUpdateUserStatus = UseMutationOptions<
  void,
  AxiosError,
  RemoveProductParamsAction
>

export function deleteProduct(options?: OptionsUpdateUserStatus) {
  const mutationFn = async ({ productId }: RemoveProductParamsAction) => {
    await api.put<void>(`/products/${productId}`)
  }

  return createMutationOptions<void, AxiosError, RemoveProductParamsAction>({
    mutationFn,
    ...options,
  })
}

export function useDeleteProduct(options?: OptionsUpdateUserStatus) {
  const { mutationOptions } = deleteProduct(options)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  return useCustomMutation<void, AxiosError, RemoveProductParamsAction>({
    mutationFn: mutationOptions.mutationFn,
    mutationOptions: {
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: getProductsList().queryKey,
        })
      },
      onError: (error: AxiosError) => {
        const description =
          'message' in error ? error.message : 'Erro ao remove produto'

        toast({
          title: 'Erro ao remove produto',
          description,
          variant: 'destructive',
        })
      },
    },
  })
}
```

forma de utilização do hook:

```tsx
  const { mutate, isPending } = useDeleteProduct({
    onSuccess: () => {
      toast({
        title: 'Produto excluído com sucesso!',
        variant: 'default',
      })

      onSuccessCallback?.()
    },
  })
```

Esse é um simples e breve exemplo de utilização do react query. Vários desenvolvedores usam de formas diferentes e funcionam perfeitamente, porem em algumas pesquisas foi raro encontrar uma forma de utiliza-lo aonde é realizado a abstração dessa forma, lembrando que essa forma que utilizo nao significa que é certo ou errado, mas é uma forma agradável de leitura que criei e de escrita que facilita a manutenção, em caso de refatoração ou erros.
