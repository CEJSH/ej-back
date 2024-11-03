import { User } from '@models/user'
import { useSession } from 'next-auth/react'

export default function useUser() {
  const { data } = useSession()

  return data == null ? null : (data.user as User)
}
