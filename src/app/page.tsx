'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { authClient } from '@/lib/auth-client'

export default function Home() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert(' Something Went Wrong')
        },
        onSuccess: () => {
          window.alert('Success')
        },
      }
    )
  }

  if (session) {
    return (
      <div className="flex flex-col p-5 gap-y-5">
        <p className="text-center p-5">Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Logout</Button>
      </div>
    )
  }

  return (
    <div className="p-3 flex flex-col gap-y-8">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="secondary"
        className="text-center hover:bg-blue-200 hover:border-blue-300"
        onClick={onSubmit}
      >
        Login
      </Button>
    </div>
  )
}
