import useSWR, { SWRConfiguration } from 'swr'

export const useSwrFetcher = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, mutate } = useSWR(url, config)

  return {
    data: data || [],
    error,
    isLoading: !data && !error,
    mutate
  }
}