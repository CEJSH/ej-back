import { useQuery } from 'react-query'
import { getCards } from '@remote/card'

export default function useCards() {
  return useQuery(['cards'], () => getCards(), {
    suspense: true,
  })
}
