import { useReducer } from 'react'

const INITIAL_PAGE = 1
const ITEMS_PER_PAGE = 4

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

export function useProjectsPagination (projects) {
  const [page, dispatch] = useReducer(paginationReducer, INITIAL_PAGE)

  const offset = page * ITEMS_PER_PAGE
  const data = (projects ?? []).slice(0, offset)
  const hasMoreProjects = Boolean(projects[offset - 1])

  const handlePagination = () => {
    if (!hasMoreProjects) {
      dispatch(ACTION_TYPES.RESET)

      return
    }

    dispatch(ACTION_TYPES.NEXT)
  }

  return {
    data,
    hasMoreProjects,
    handlePagination
  }
}
