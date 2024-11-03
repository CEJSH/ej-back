import { useSession } from 'next-auth/react'

function AuthGard({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession()

  if (status === 'loading') {
    return null
  }
  // authGard를 추가해 줌으로써 인증이 완료된 상태로 페이지를 그려준다.
  // 위와같은 처리를 하지 않으면 인증이 되지 않을 때도 화면이 그려진다.
  return <>{children}</>
}

export default AuthGard
