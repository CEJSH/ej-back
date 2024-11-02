import { useEffect, useState } from 'react'

function useDebounce<T = any>(value: T, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // 위 함수가 실행이 되기 전 밖에서 변화가 일어났다면 return을 활용하여 timeout을 clear해 준다.
    return () => {
      clearTimeout(timeout)
    }
  }, [delay, value])

  return debouncedValue
}

export default useDebounce
