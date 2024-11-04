import dynamic from 'next/dynamic'
import Account from '@components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import Spacing from '@shared/Spacing'
import { CardListSkeleton } from '@components/home/CardList'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { User } from 'next-auth'
import { getAccount } from '@remote/account'

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  const { data } = useSession()

  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </>
  )
}

// account컴포넌트가 가장 중요하게 고려되므로 서버사이드 단계에서 미리 계좌정보 호출을 하면 좋겠다고 판단 됨
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['account', (session.user as User)?.id], () =>
      getAccount((session.user as User)?.id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
