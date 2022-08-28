import { Project, TransformedStack } from 'graphql/schema'

export type ProjectsListProps = {
  initialProjects: Array<Project>;
  transformedStack: TransformedStack
}
