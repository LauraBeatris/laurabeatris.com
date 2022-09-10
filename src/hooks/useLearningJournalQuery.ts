import useSWR from 'swr'
import { useQueryParam, NumberParam, withDefault } from 'use-query-params'

import { getLearningJournalPage, LEARNING_JOURNAL_PAGE_SIZE } from 'graphql/queries/getLearningJournalPage'

import { SWRCacheKeyGetters } from './SWRCacheKeyGetters'

type UseLearningJournalQueryParameters = {
  date: string;
  initialPage: number;
}

function calculatePagesCount (pageSize: number, totalCount: number) {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}

export function useLearningJournalQuery ({
  date,
  initialPage
}: UseLearningJournalQueryParameters) {
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, initialPage))

  const {
    data,
    error,
    isValidating
  } = useSWR(SWRCacheKeyGetters.learningJournalPage(page, date), () =>
    getLearningJournalPage(page, date)
  )

  const { edges, aggregate } = data ?? {}
  const pagesCount = calculatePagesCount(LEARNING_JOURNAL_PAGE_SIZE, aggregate?.count)

  const handleNextPage = () => {
    setPage(prev => Math.min(prev + 1, pagesCount))
  }

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }

  const hasEntries = edges?.length > 0
  const isLoading = !hasEntries && isValidating

  return {
    data,
    error,
    isLoading,
    handleNextPage,
    handlePrevPage
  }
}
