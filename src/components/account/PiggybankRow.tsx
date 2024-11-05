import ListRow from '@shared/ListRow'
import Image from 'next/image'
import { useRouter } from 'next/router'
import withSuspense from '@hooks/withSuspense'
import { getPiggybank } from '@remote/piggybank'
import { useQuery } from 'react-query'
import useUser from '@hooks/useUser'
import { differenceInDays } from 'date-fns'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import addDelimiter from '@/utils/addDelimiter'

function PiggybankRow() {
  const navigate = useRouter()
  const user = useUser()

  const { data } = useQuery(
    ['piggybank', user?.id],
    () => getPiggybank(user?.id as string),
    { suspense: true },
  )
  console.log(data, 'ddaattaa')

  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn4.iconfinder.com/data/icons/banking-52/512/piggy_bank-512.png"
                width={40}
                height={40}
                alt="piggy_bank"
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금식 저금해 목표 금액을 모아보아요"
              />
            }
            onClick={() => {
              navigate.push('/account/piggybank/new')
            }}
            withArrow
          />
        </ul>
      </div>
    )
  }
  const { balance, endDate, goalAmount } = data
  const dDay = differenceInDays(endDate, new Date())
  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn4.iconfinder.com/data/icons/banking-52/512/piggy_bank-512.png"
              width={40}
              height={40}
              alt="piggy_bank"
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold>
                D-{dDay}
              </Text>
              <Text>{addDelimiter(goalAmount - balance)}원 남았어요</Text>
            </Flex>
          }
          onClick={() => {
            // 저금통 상세보기 or 저금통 리스트
          }}
          withArrow
        />
      </ul>
    </div>
  )
}

export default withSuspense(PiggybankRow, { fallback: <div>로딩 중...</div> })
