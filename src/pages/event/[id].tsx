import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import { isAfter, parseISO } from 'date-fns'
import getEvent from '@remote/event'
import Preview from '@/components/event/Preview'
import { Event } from '@/models/event'
import { useAlertContext } from '@/context/AlertContext'

interface EventPageProps {
  initialEvent: Event
  id: string
}

// preview의 역할은 데이터를 받아서 프리뷰를 그리는 것임 그런데 프리뷰가 예외처리도 하게되면 공통으로 사용하기 어려워진다.
// 그러므로 여러가지 데이터들에 대한 예외는 사용처에서 처리를 해주도록 한다.

function EventPage({ id, initialEvent }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const 이벤트가종료되었는가 = isAfter(new Date(), parseISO(event.endDate))
      if (이벤트가종료되었는가) {
        open({
          title: `${event.title} 이벤트가 종료되었어요`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={initialEvent} />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)
  return {
    props: { id, initialEvent: event },
  }
}

export default EventPage
