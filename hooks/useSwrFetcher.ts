import useSWR, { SWRConfiguration } from 'swr'
import { useEffect } from 'react'

export const useSwrFetcher = (url: string, config: SWRConfiguration = {}, onNewOrder?: () => void) => {
  const { data, error, mutate } = useSWR(url, {
    ...config,
    revalidateOnMount: true,
  })

  useEffect(() => {
    if (!onNewOrder) return
    if (data) {
      onNewOrder()
    }
  }, [data, onNewOrder])

  return {
    data: data || [],
    error,
    isLoading: !data && !error,
    mutate
  }
}