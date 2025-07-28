import { auth } from '@/lib/auth'
import SignUpViewPage from '@/modules/auth/ui/views/views/sign-up-view'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session) {
    redirect('/')
  }

  return <SignUpViewPage />
}
