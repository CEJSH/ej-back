import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Image from 'next/image'

export default function Account() {
  const hasAccount = false

  // 계좌 보유시
  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              찬영님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t6" bold>
              7,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  // 계좌 미보유
  // 개설중 but 완료 아님

  // READY | DONE
  const 계좌개설상태 = 'READY'

  const title =
    계좌개설상태 === 'READY'
      ? '만들고 계신\n계좌가 있으시군요'
      : '계좌 재설이\n더 쉽고 빨라졌어요'

  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어 만들기' : '3분만에 만들기'

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text typography="t6" bold style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>분석</Button>
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
