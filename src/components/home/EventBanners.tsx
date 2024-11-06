import Link from 'next/link'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import Skeleton from '@shared/Skeleton'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import useEventBanners from './hooks/useEventBanners'
import withSuspense from '@/hooks/withSuspense'
import ErrorBoundary from '@shared/ErrorBoundary'

function EventBanners() {
  const { data } = useEventBanners()

  console.log('data', data)
  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  {/*왼 쪽 */}
                  <Flex direction="column">
                    <Text bold>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  {/* 오른 쪽 */}
                  <Image alt=" " src={banner.iconUrl} width={40} height={40} />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
})

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`
export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width={'100%'} height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

function WrapErrorBoundary() {
  return (
    <ErrorBoundary
      fallbackComponent={
        <div style={{ padding: 24 }}>이벤트 배너에 문제가 생겼어요</div>
      }
    >
      <EventBanners />
    </ErrorBoundary>
  )
}
