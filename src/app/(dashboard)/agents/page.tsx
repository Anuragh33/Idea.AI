import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'

import { SearchParams } from 'nuqs'

import { Suspense } from 'react'

import { ErrorBoundary } from 'react-error-boundary'

import { getQueryClient, trpc } from '@/trpc/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import ErrorState from '@/components/error-state'
import LoadingState from '@/components/loading-state'

import AgentsView from '@/modules/agents/ui/views/agents-view'
import AgentsListHeader from '@/modules/agents/ui/components/agents-list-header'

import { loadSearchParams } from '@/modules/agents/params'

interface Props {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  )

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description=" This may take few seconds..."
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Loading Agents"
                description=" This may take few seconds..."
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page
