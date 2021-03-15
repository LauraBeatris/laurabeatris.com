import { useReducer } from 'react'

import { Pagination } from './types'

const INITIAL_PAGE = 1

const ACTION_TYPES = {
  NEXT: 'NEXT',
  RESET: 'RESET'
} as const

const paginationReducer = (page, action) => {
  switch (action) {
    case ACTION_TYPES.NEXT: {
      return page + 1
    }
    case ACTION_TYPES.RESET: {
      return INITIAL_PAGE
    }
  }
}

export function usePagination<Timeline> ({
  list,
  itemsPerPage = 4
}: Pagination<Timeline>) {
  const [page, dispatch] = useReducer(paginationReducer, INITIAL_PAGE)

  const offset = page * itemsPerPage
  const data = (list ?? []).slice(0, offset)
  const hasMoreItems = offset < list?.length

  const handlePagination = () => {
    if (!hasMoreItems) {
      dispatch(ACTION_TYPES.RESET)

      return
    }

    dispatch(ACTION_TYPES.NEXT)
  }

  return {
    data,
    hasMoreItems,
    handlePagination
  }
}
