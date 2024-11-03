import { ComponentType } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const { data, status } = useSession()
    const router = useRouter()

    // loading이 끝난 상태이고 데이터가 비어있다면,,(세션이 만료되었거나 로그인하지 않은 사용자라는 상황)
    if (status !== 'loading' && data == null) {
      router.replace('/auth/signin')
      return null
    }
    return <WrappedComponent {...(props as any)} />
  }
}
