import ErrorState from '@/components/error-state'

import LoadingState from '@/components/loading-state'

import MeetingsView from '@/modules/meetings/ui/views/meetings-view'

import { getQueryClient, trpc } from '@/trpc/server'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

import { Suspense } from 'react'

const Page = () => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))

  return (
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
  )
}

export default Page
