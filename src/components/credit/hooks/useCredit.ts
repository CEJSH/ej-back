import { getCredit } from '@remote/credit'
import { useQuery } from 'react-query'
import useUser from '@hooks/useUser'

function useCredit() {
  const user = useUser()

  return useQuery(['credit', user?.id], () => getCredit(user?.id as string), {
    enabled: user != null,
  })
}

export default useCredit
