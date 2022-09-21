/**
 * A object mapper for SWR key getters that define a unique signature
 * for interpolated parameters and associate it with the cache key
 *
 * @example useSWR(SWRCacheKeyGetters.learningJournal(1, '01-01-2022'))
 */
export const SWRCacheKeyGetters = {
  timeline: (pageIndex = 0) => ['timeline', pageIndex],
  learningJournalPage: (page: number, date?: string) => {
    return `learning-journal-${page}-${date}`
  },
  learningJournalEntry: (id: string) => `learning-journal-entry-${id}`
}
