export type FormattedLearningJournal = Omit<LearningJournalSchemaType, 'date'> & {
  dateTitle: string;
}
