import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Image from 'next/image'

import useAccount from '@hooks/useAccount'
import useUser from '@hooks/useUser'
import addDelimiter from '@/utils/addDelimiter'
import Link from 'next/link'

export default function Account() {
  const { data: account } = useAccount()
  const user = useUser()

  // 계좌 보유X
  if (account == null) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text typography="t6" bold style={{ whiteSpace: 'pre-wrap' }}>
              {'계좌 개설이\n더 쉽고 빨라졌어요'}
            </Text>
            <Spacing size={8} />
            <Link href={'/account/new'}>
              <Button>3분만에 개설하기</Button>
            </Link>
          </Flex>
          <Image
            alt=""
            width={80}
            height={80}
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
          />
        </Flex>
      </div>
    )
  }

  if (account.status === 'READY') {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text typography="t6" bold style={{ whiteSpace: 'pre-wrap' }}>
              {'계좌 개설 심사중입니다.'}
            </Text>
            <Spacing size={8} />
          </Flex>
          <Image
            alt=""
            width={80}
            height={80}
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
          />
        </Flex>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text typography="t6" color="gray600">
            {user?.name} 회원님의 자산
          </Text>
          <Spacing size={2} />
          <Text typography="t6" bold>
            {addDelimiter(account.balance)}원
          </Text>
        </Flex>
        <Link href="/account">
          <Button>분석</Button>
        </Link>
      </Flex>
    </div>
  )
}
