import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import SEO from '@shared/SEO'
import { GetServerSidePropsContext } from 'next'
import { Card } from '@models/card'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { getCard } from '@remote/card'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

export default function CardDetailPage({ initialCard }: CardDetailPageProps) {
  const router = useRouter()
  const { id } = router.query

  const { data } = useQuery(['card', id], () => getCard(id as string), {
    // 최초에 값이 온전하게 넘어오면 요청을 하지 않음
    initialData: initialCard,
  })

  if (data == null) {
    return
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <SEO
        title={`${corpName} ${name}`}
        description={subTitle}
        image="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1500/ko/20210813/P001501766.jpg/dims/resize/1280"
      />

      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={40}
                  height={40}
                  alt="check"
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          // TODO:
        }}
      />
    </div>
  )
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}
