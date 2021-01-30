import { LearningJournal } from 'graphql/schema'

export type FormattedLearningJournal = Omit<LearningJournal, 'date'> & {
  dateTitle: string;
}
