'use client'

import { Button } from '@/components/ui/button'

import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function HomeViewPage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (!session) return <p>Loading...</p>

  return (
    <div className="flex flex-col p-5 gap-y-5">
      <p className="text-center p-5">Logged in as {session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('sign-in')
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  )
}
