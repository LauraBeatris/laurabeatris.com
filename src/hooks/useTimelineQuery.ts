import useSWRInfinite from 'swr/infinite'

import { getTimeline } from 'graphql/queries/getTimeline'

import { SWRCacheKeyGetters } from './SWRCacheKeyGetters'

export function useTimelineQuery ({ fallbackData }) {
  const {
    data,
    size,
    setSize,
    isValidating
  } = useSWRInfinite(
    SWRCacheKeyGetters.timeline,
    (_cacheString, pageIndex: number) => getTimeline(pageIndex ?? 1), {
      fallbackData
    })

  const hasEntries = data?.length > 0
  const isLoading = !hasEntries && isValidating
  const timeline = data ? [].concat(...data) : []

  const handleNextPage = () => {
    setSize(size + 1)
  }

  const resetPagination = () => {
    setSize(1)
  }

  return {
    timeline,
    isLoading,
    isValidating,
    handleNextPage,
    resetPagination
  }
}
