import {
  collection,
  doc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'

import { Transaction, TransactionFilterType } from '@models/transaction'
import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

export async function getTransaction({
  pageParam,
  userId,
  filter = 'all',
}: {
  pageParam?: QuerySnapshot<Transaction>
  userId: string
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ filter, pageParam, userId })

  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}

function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  filter?: TransactionFilterType
  pageParam?: QuerySnapshot<Transaction>
  userId: string
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  // 모두가 아닌 입금 또는 출금일 경우
  if (filter != 'all') {
    // 첫번째 호출
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  }
  // 전체호출
  else {
    if (pageParam == null) {
      return baseQuery
    }
    return query(baseQuery, startAfter(pageParam))
  }
}
