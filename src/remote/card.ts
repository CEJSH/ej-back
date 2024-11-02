import { Card } from '@models/card'
import { getDocs, where } from 'firebase/firestore'
import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDoc,
  doc,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  // pageParam이 null이면 첫 호출
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )

  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getSearchCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  )

  const cardSnapshot = await getDocs(searchQuery)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

// \u8ff는 유니코드 문자중 가장 큰 값임. 조건의 의미는 키워드로 시작하는 모든 카드들을 찾아라

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.CARD), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Card),
  }
}
