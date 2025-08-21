import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Suspense } from 'react'

import { auth } from '@/lib/auth'

import MeetingsListHeader from '@/modules/meetings/ui/components/meetings-list-header'
import MeetingsView from '@/modules/meetings/ui/views/meetings-view'

import { getQueryClient, trpc } from '@/trpc/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import ErrorState from '@/components/error-state'
import LoadingState from '@/components/loading-state'

import { SearchParams } from 'nuqs'

import { loadSearchParams } from '@/modules/meetings/params'

import { ErrorBoundary } from 'react-error-boundary'

interface Props {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams)
  const queryClient = getQueryClient()

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  )

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Meetings"
              description="This may take few seconds..."
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error loading Meetings"
                description="Something went wrong..."
              />
            }
          >
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page
