import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/collection'
import { store } from './firebase'
import { Account, Term } from '@models/account'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}

export function createAccount(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export function updateAccountBalance(userId: string, balance: number) {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId)

  return updateDoc(snapshot, { balance })
}

// termIds = [1, 2, 3] => [1, 3]
export function updateTerms(userId: string, termIds: string[]) {
  const snapshot = doc(collection(store, COLLECTIONS.TERMS), userId)

  return updateDoc(snapshot, { termIds })
}
