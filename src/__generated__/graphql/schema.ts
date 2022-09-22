export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export enum _FilterKind {
  And = 'AND',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Not = 'NOT',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  Or = 'OR',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

/** Controls the content for the about me page */
export type AboutMePage = Node & {
  __typename?: 'AboutMePage';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<AboutMePage>;
  /** List of AboutMePage versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The sections of a "About Me" page */
  sections: Array<Section>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Controls the content for the about me page */
export type AboutMePageCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Controls the content for the about me page */
export type AboutMePageDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Controls the content for the about me page */
export type AboutMePageHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Controls the content for the about me page */
export type AboutMePagePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Controls the content for the about me page */
export type AboutMePageScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Controls the content for the about me page */
export type AboutMePageSectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<SectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SectionWhereInput>;
};


/** Controls the content for the about me page */
export type AboutMePageUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type AboutMePageConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AboutMePageWhereUniqueInput;
};

/** A connection to a list of items. */
export type AboutMePageConnection = {
  __typename?: 'AboutMePageConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AboutMePageEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AboutMePageCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<SectionCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AboutMePageCreateManyInlineInput = {
  /** Connect multiple existing AboutMePage documents */
  connect?: InputMaybe<Array<AboutMePageWhereUniqueInput>>;
  /** Create and connect multiple existing AboutMePage documents */
  create?: InputMaybe<Array<AboutMePageCreateInput>>;
};

export type AboutMePageCreateOneInlineInput = {
  /** Connect one existing AboutMePage document */
  connect?: InputMaybe<AboutMePageWhereUniqueInput>;
  /** Create and connect one AboutMePage document */
  create?: InputMaybe<AboutMePageCreateInput>;
};

/** An edge in a connection. */
export type AboutMePageEdge = {
  __typename?: 'AboutMePageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AboutMePage;
};

/** Identifies documents */
export type AboutMePageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AboutMePageWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AboutMePageWhereStageInput>;
  documentInStages_none?: InputMaybe<AboutMePageWhereStageInput>;
  documentInStages_some?: InputMaybe<AboutMePageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AboutMePageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AboutMePageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  sections_every?: InputMaybe<SectionWhereInput>;
  sections_none?: InputMaybe<SectionWhereInput>;
  sections_some?: InputMaybe<SectionWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AboutMePageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AboutMePageUpdateInput = {
  sections?: InputMaybe<SectionUpdateManyInlineInput>;
};

export type AboutMePageUpdateManyInlineInput = {
  /** Connect multiple existing AboutMePage documents */
  connect?: InputMaybe<Array<AboutMePageConnectInput>>;
  /** Create and connect multiple AboutMePage documents */
  create?: InputMaybe<Array<AboutMePageCreateInput>>;
  /** Delete multiple AboutMePage documents */
  delete?: InputMaybe<Array<AboutMePageWhereUniqueInput>>;
  /** Disconnect multiple AboutMePage documents */
  disconnect?: InputMaybe<Array<AboutMePageWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing AboutMePage documents */
  set?: InputMaybe<Array<AboutMePageWhereUniqueInput>>;
  /** Update multiple AboutMePage documents */
  update?: InputMaybe<Array<AboutMePageUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple AboutMePage documents */
  upsert?: InputMaybe<Array<AboutMePageUpsertWithNestedWhereUniqueInput>>;
};

export type AboutMePageUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']>;
};

export type AboutMePageUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AboutMePageUpdateManyInput;
  /** Document search */
  where: AboutMePageWhereInput;
};

export type AboutMePageUpdateOneInlineInput = {
  /** Connect existing AboutMePage document */
  connect?: InputMaybe<AboutMePageWhereUniqueInput>;
  /** Create and connect one AboutMePage document */
  create?: InputMaybe<AboutMePageCreateInput>;
  /** Delete currently connected AboutMePage document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected AboutMePage document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single AboutMePage document */
  update?: InputMaybe<AboutMePageUpdateWithNestedWhereUniqueInput>;
  /** Upsert single AboutMePage document */
  upsert?: InputMaybe<AboutMePageUpsertWithNestedWhereUniqueInput>;
};

export type AboutMePageUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AboutMePageUpdateInput;
  /** Unique document search */
  where: AboutMePageWhereUniqueInput;
};

export type AboutMePageUpsertInput = {
  /** Create document if it didn't exist */
  create: AboutMePageCreateInput;
  /** Update document if it exists */
  update: AboutMePageUpdateInput;
};

export type AboutMePageUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AboutMePageUpsertInput;
  /** Unique document search */
  where: AboutMePageWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AboutMePageWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AboutMePageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AboutMePageWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AboutMePageWhereStageInput>;
  documentInStages_none?: InputMaybe<AboutMePageWhereStageInput>;
  documentInStages_some?: InputMaybe<AboutMePageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AboutMePageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AboutMePageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  sections_every?: InputMaybe<SectionWhereInput>;
  sections_none?: InputMaybe<SectionWhereInput>;
  sections_some?: InputMaybe<SectionWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AboutMePageWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AboutMePageWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AboutMePageWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AboutMePageWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AboutMePageWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References AboutMePage record uniquely */
export type AboutMePageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Achievement = Node & {
  __typename?: 'Achievement';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Achievement>;
  /** List of Achievement versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  timeline?: Maybe<Timeline>;
  title: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type AchievementCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type AchievementDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type AchievementHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type AchievementPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type AchievementScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type AchievementTimelineArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type AchievementUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type AchievementConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AchievementWhereUniqueInput;
};

/** A connection to a list of items. */
export type AchievementConnection = {
  __typename?: 'AchievementConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AchievementEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AchievementCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  timeline?: InputMaybe<TimelineCreateOneInlineInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AchievementCreateManyInlineInput = {
  /** Connect multiple existing Achievement documents */
  connect?: InputMaybe<Array<AchievementWhereUniqueInput>>;
  /** Create and connect multiple existing Achievement documents */
  create?: InputMaybe<Array<AchievementCreateInput>>;
};

export type AchievementCreateOneInlineInput = {
  /** Connect one existing Achievement document */
  connect?: InputMaybe<AchievementWhereUniqueInput>;
  /** Create and connect one Achievement document */
  create?: InputMaybe<AchievementCreateInput>;
};

/** An edge in a connection. */
export type AchievementEdge = {
  __typename?: 'AchievementEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Achievement;
};

/** Identifies documents */
export type AchievementManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AchievementWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<AchievementWhereStageInput>;
  documentInStages_none?: InputMaybe<AchievementWhereStageInput>;
  documentInStages_some?: InputMaybe<AchievementWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AchievementWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AchievementWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  timeline?: InputMaybe<TimelineWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AchievementOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AchievementUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  timeline?: InputMaybe<TimelineUpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type AchievementUpdateManyInlineInput = {
  /** Connect multiple existing Achievement documents */
  connect?: InputMaybe<Array<AchievementConnectInput>>;
  /** Create and connect multiple Achievement documents */
  create?: InputMaybe<Array<AchievementCreateInput>>;
  /** Delete multiple Achievement documents */
  delete?: InputMaybe<Array<AchievementWhereUniqueInput>>;
  /** Disconnect multiple Achievement documents */
  disconnect?: InputMaybe<Array<AchievementWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Achievement documents */
  set?: InputMaybe<Array<AchievementWhereUniqueInput>>;
  /** Update multiple Achievement documents */
  update?: InputMaybe<Array<AchievementUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Achievement documents */
  upsert?: InputMaybe<Array<AchievementUpsertWithNestedWhereUniqueInput>>;
};

export type AchievementUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AchievementUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AchievementUpdateManyInput;
  /** Document search */
  where: AchievementWhereInput;
};

export type AchievementUpdateOneInlineInput = {
  /** Connect existing Achievement document */
  connect?: InputMaybe<AchievementWhereUniqueInput>;
  /** Create and connect one Achievement document */
  create?: InputMaybe<AchievementCreateInput>;
  /** Delete currently connected Achievement document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Achievement document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Achievement document */
  update?: InputMaybe<AchievementUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Achievement document */
  upsert?: InputMaybe<AchievementUpsertWithNestedWhereUniqueInput>;
};

export type AchievementUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AchievementUpdateInput;
  /** Unique document search */
  where: AchievementWhereUniqueInput;
};

export type AchievementUpsertInput = {
  /** Create document if it didn't exist */
  create: AchievementCreateInput;
  /** Update document if it exists */
  update: AchievementUpdateInput;
};

export type AchievementUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AchievementUpsertInput;
  /** Unique document search */
  where: AchievementWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AchievementWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AchievementWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AchievementWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<AchievementWhereStageInput>;
  documentInStages_none?: InputMaybe<AchievementWhereStageInput>;
  documentInStages_some?: InputMaybe<AchievementWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AchievementWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AchievementWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  timeline?: InputMaybe<TimelineWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AchievementWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AchievementWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AchievementWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AchievementWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AchievementWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Achievement record uniquely */
export type AchievementWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

/** Asset system model */
export type Asset = Node & {
  __typename?: 'Asset';
  assetImage: Array<Image>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  imageContent: Array<Content>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  mainImageProject: Array<Project>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  ogImageSeo: Array<Seo>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
};


/** Asset system model */
export type AssetAssetImageArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ImageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetImageContentArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ContentOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentWhereInput>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
};


/** Asset system model */
export type AssetMainImageProjectArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ProjectOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};


/** Asset system model */
export type AssetOgImageSeoArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SeoWhereInput>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  assetImage?: InputMaybe<ImageCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  imageContent?: InputMaybe<ContentCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  mainImageProject?: InputMaybe<ProjectCreateManyInlineInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  ogImageSeo?: InputMaybe<SeoCreateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  assetImage_every?: InputMaybe<ImageWhereInput>;
  assetImage_none?: InputMaybe<ImageWhereInput>;
  assetImage_some?: InputMaybe<ImageWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  imageContent_every?: InputMaybe<ContentWhereInput>;
  imageContent_none?: InputMaybe<ContentWhereInput>;
  imageContent_some?: InputMaybe<ContentWhereInput>;
  mainImageProject_every?: InputMaybe<ProjectWhereInput>;
  mainImageProject_none?: InputMaybe<ProjectWhereInput>;
  mainImageProject_some?: InputMaybe<ProjectWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  ogImageSeo_every?: InputMaybe<SeoWhereInput>;
  ogImageSeo_none?: InputMaybe<SeoWhereInput>;
  ogImageSeo_some?: InputMaybe<SeoWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  assetImage?: InputMaybe<ImageUpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  imageContent?: InputMaybe<ContentUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  mainImageProject?: InputMaybe<ProjectUpdateManyInlineInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  ogImageSeo?: InputMaybe<SeoUpdateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateManyLocalizationInput>>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  assetImage_every?: InputMaybe<ImageWhereInput>;
  assetImage_none?: InputMaybe<ImageWhereInput>;
  assetImage_some?: InputMaybe<ImageWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  imageContent_every?: InputMaybe<ContentWhereInput>;
  imageContent_none?: InputMaybe<ContentWhereInput>;
  imageContent_some?: InputMaybe<ContentWhereInput>;
  mainImageProject_every?: InputMaybe<ProjectWhereInput>;
  mainImageProject_none?: InputMaybe<ProjectWhereInput>;
  mainImageProject_some?: InputMaybe<ProjectWhereInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  ogImageSeo_every?: InputMaybe<SeoWhereInput>;
  ogImageSeo_none?: InputMaybe<SeoWhereInput>;
  ogImageSeo_some?: InputMaybe<SeoWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String'];
  hex: Scalars['Hex'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']>;
};

export type Content = Node & {
  __typename?: 'Content';
  category: ContentCategory;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Content>;
  /** List of Content versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  image?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  subtitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  url?: Maybe<Scalars['String']>;
};


export type ContentCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ContentDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type ContentHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ContentImageArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ContentPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ContentScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ContentUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export enum ContentCategory {
  PodcastParticipation = 'PodcastParticipation',
  Talk = 'Talk',
  UseCast = 'UseCast'
}

export type ContentConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ContentWhereUniqueInput;
};

/** A connection to a list of items. */
export type ContentConnection = {
  __typename?: 'ContentConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ContentEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ContentCreateInput = {
  category: ContentCategory;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<AssetCreateOneInlineInput>;
  subtitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ContentCreateManyInlineInput = {
  /** Connect multiple existing Content documents */
  connect?: InputMaybe<Array<ContentWhereUniqueInput>>;
  /** Create and connect multiple existing Content documents */
  create?: InputMaybe<Array<ContentCreateInput>>;
};

export type ContentCreateOneInlineInput = {
  /** Connect one existing Content document */
  connect?: InputMaybe<ContentWhereUniqueInput>;
  /** Create and connect one Content document */
  create?: InputMaybe<ContentCreateInput>;
};

/** An edge in a connection. */
export type ContentEdge = {
  __typename?: 'ContentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Content;
};

/** Identifies documents */
export type ContentManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ContentWhereInput>>;
  category?: InputMaybe<ContentCategory>;
  /** All values that are contained in given list. */
  category_in?: InputMaybe<Array<InputMaybe<ContentCategory>>>;
  /** All values that are not equal to given value. */
  category_not?: InputMaybe<ContentCategory>;
  /** All values that are not contained in given list. */
  category_not_in?: InputMaybe<Array<InputMaybe<ContentCategory>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ContentWhereStageInput>;
  documentInStages_none?: InputMaybe<ContentWhereStageInput>;
  documentInStages_some?: InputMaybe<ContentWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<AssetWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ContentWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ContentWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subtitle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subtitle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subtitle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  subtitle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subtitle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subtitle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subtitle_starts_with?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ContentOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SubtitleAsc = 'subtitle_ASC',
  SubtitleDesc = 'subtitle_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type ContentUpdateInput = {
  category?: InputMaybe<ContentCategory>;
  image?: InputMaybe<AssetUpdateOneInlineInput>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ContentUpdateManyInlineInput = {
  /** Connect multiple existing Content documents */
  connect?: InputMaybe<Array<ContentConnectInput>>;
  /** Create and connect multiple Content documents */
  create?: InputMaybe<Array<ContentCreateInput>>;
  /** Delete multiple Content documents */
  delete?: InputMaybe<Array<ContentWhereUniqueInput>>;
  /** Disconnect multiple Content documents */
  disconnect?: InputMaybe<Array<ContentWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Content documents */
  set?: InputMaybe<Array<ContentWhereUniqueInput>>;
  /** Update multiple Content documents */
  update?: InputMaybe<Array<ContentUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Content documents */
  upsert?: InputMaybe<Array<ContentUpsertWithNestedWhereUniqueInput>>;
};

export type ContentUpdateManyInput = {
  category?: InputMaybe<ContentCategory>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ContentUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ContentUpdateManyInput;
  /** Document search */
  where: ContentWhereInput;
};

export type ContentUpdateOneInlineInput = {
  /** Connect existing Content document */
  connect?: InputMaybe<ContentWhereUniqueInput>;
  /** Create and connect one Content document */
  create?: InputMaybe<ContentCreateInput>;
  /** Delete currently connected Content document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Content document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Content document */
  update?: InputMaybe<ContentUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Content document */
  upsert?: InputMaybe<ContentUpsertWithNestedWhereUniqueInput>;
};

export type ContentUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ContentUpdateInput;
  /** Unique document search */
  where: ContentWhereUniqueInput;
};

export type ContentUpsertInput = {
  /** Create document if it didn't exist */
  create: ContentCreateInput;
  /** Update document if it exists */
  update: ContentUpdateInput;
};

export type ContentUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ContentUpsertInput;
  /** Unique document search */
  where: ContentWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ContentWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ContentWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ContentWhereInput>>;
  category?: InputMaybe<ContentCategory>;
  /** All values that are contained in given list. */
  category_in?: InputMaybe<Array<InputMaybe<ContentCategory>>>;
  /** All values that are not equal to given value. */
  category_not?: InputMaybe<ContentCategory>;
  /** All values that are not contained in given list. */
  category_not_in?: InputMaybe<Array<InputMaybe<ContentCategory>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ContentWhereStageInput>;
  documentInStages_none?: InputMaybe<ContentWhereStageInput>;
  documentInStages_some?: InputMaybe<ContentWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<AssetWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ContentWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ContentWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subtitle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subtitle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subtitle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  subtitle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subtitle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subtitle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subtitle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subtitle_starts_with?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ContentWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ContentWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ContentWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ContentWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ContentWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Content record uniquely */
export type ContentWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum DocumentFileTypes {
  Doc = 'doc',
  Docx = 'docx',
  Html = 'html',
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Pdf = 'pdf',
  Png = 'png',
  Ppt = 'ppt',
  Pptx = 'pptx',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Xls = 'xls',
  Xlsx = 'xlsx'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type Image = Node & {
  __typename?: 'Image';
  asset: Asset;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Image>;
  /** List of Image versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The highlighted caption of a image */
  mainCaption: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** Caption that comes afterwards the main caption but with a smaller size */
  subCaption?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type ImageAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ImageCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ImageDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type ImageHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ImagePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ImageScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ImageUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type ImageConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ImageWhereUniqueInput;
};

/** A connection to a list of items. */
export type ImageConnection = {
  __typename?: 'ImageConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ImageEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ImageCreateInput = {
  asset: AssetCreateOneInlineInput;
  cl04altgv17nt01xo6hka6f90?: InputMaybe<SectionCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  mainCaption: Scalars['String'];
  subCaption?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ImageCreateManyInlineInput = {
  /** Connect multiple existing Image documents */
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  /** Create and connect multiple existing Image documents */
  create?: InputMaybe<Array<ImageCreateInput>>;
};

export type ImageCreateOneInlineInput = {
  /** Connect one existing Image document */
  connect?: InputMaybe<ImageWhereUniqueInput>;
  /** Create and connect one Image document */
  create?: InputMaybe<ImageCreateInput>;
};

/** An edge in a connection. */
export type ImageEdge = {
  __typename?: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Image;
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

/** Identifies documents */
export type ImageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ImageWhereInput>>;
  asset?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ImageWhereStageInput>;
  documentInStages_none?: InputMaybe<ImageWhereStageInput>;
  documentInStages_some?: InputMaybe<ImageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  mainCaption?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mainCaption_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mainCaption_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mainCaption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  mainCaption_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mainCaption_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mainCaption_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mainCaption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mainCaption_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mainCaption_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ImageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subCaption?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subCaption_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subCaption_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subCaption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  subCaption_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subCaption_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subCaption_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subCaption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subCaption_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subCaption_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ImageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MainCaptionAsc = 'mainCaption_ASC',
  MainCaptionDesc = 'mainCaption_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SubCaptionAsc = 'subCaption_ASC',
  SubCaptionDesc = 'subCaption_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
};

export type ImageUpdateInput = {
  asset?: InputMaybe<AssetUpdateOneInlineInput>;
  cl04altgv17nt01xo6hka6f90?: InputMaybe<SectionUpdateManyInlineInput>;
  mainCaption?: InputMaybe<Scalars['String']>;
  subCaption?: InputMaybe<Scalars['String']>;
};

export type ImageUpdateManyInlineInput = {
  /** Connect multiple existing Image documents */
  connect?: InputMaybe<Array<ImageConnectInput>>;
  /** Create and connect multiple Image documents */
  create?: InputMaybe<Array<ImageCreateInput>>;
  /** Delete multiple Image documents */
  delete?: InputMaybe<Array<ImageWhereUniqueInput>>;
  /** Disconnect multiple Image documents */
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Image documents */
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
  /** Update multiple Image documents */
  update?: InputMaybe<Array<ImageUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Image documents */
  upsert?: InputMaybe<Array<ImageUpsertWithNestedWhereUniqueInput>>;
};

export type ImageUpdateManyInput = {
  mainCaption?: InputMaybe<Scalars['String']>;
  subCaption?: InputMaybe<Scalars['String']>;
};

export type ImageUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ImageUpdateManyInput;
  /** Document search */
  where: ImageWhereInput;
};

export type ImageUpdateOneInlineInput = {
  /** Connect existing Image document */
  connect?: InputMaybe<ImageWhereUniqueInput>;
  /** Create and connect one Image document */
  create?: InputMaybe<ImageCreateInput>;
  /** Delete currently connected Image document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Image document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Image document */
  update?: InputMaybe<ImageUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Image document */
  upsert?: InputMaybe<ImageUpsertWithNestedWhereUniqueInput>;
};

export type ImageUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ImageUpdateInput;
  /** Unique document search */
  where: ImageWhereUniqueInput;
};

export type ImageUpsertInput = {
  /** Create document if it didn't exist */
  create: ImageCreateInput;
  /** Update document if it exists */
  update: ImageUpdateInput;
};

export type ImageUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ImageUpsertInput;
  /** Unique document search */
  where: ImageWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ImageWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ImageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ImageWhereInput>>;
  asset?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ImageWhereStageInput>;
  documentInStages_none?: InputMaybe<ImageWhereStageInput>;
  documentInStages_some?: InputMaybe<ImageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  mainCaption?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mainCaption_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mainCaption_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mainCaption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  mainCaption_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mainCaption_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mainCaption_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mainCaption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mainCaption_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mainCaption_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ImageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  subCaption?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  subCaption_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  subCaption_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  subCaption_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  subCaption_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  subCaption_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  subCaption_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  subCaption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  subCaption_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  subCaption_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ImageWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ImageWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ImageWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ImageWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ImageWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Image record uniquely */
export type ImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type LearningJournal = Node & {
  __typename?: 'LearningJournal';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  curiosity: Array<Scalars['String']>;
  date: Scalars['Date'];
  /** Get the document in other stages */
  documentInStages: Array<LearningJournal>;
  /** List of LearningJournal versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  programming: Array<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  resources: Array<Resource>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  work: Array<Scalars['String']>;
};


export type LearningJournalCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type LearningJournalDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type LearningJournalHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type LearningJournalPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type LearningJournalResourcesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ResourceOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ResourceWhereInput>;
};


export type LearningJournalScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type LearningJournalUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type LearningJournalConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LearningJournalWhereUniqueInput;
};

/** A connection to a list of items. */
export type LearningJournalConnection = {
  __typename?: 'LearningJournalConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LearningJournalEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LearningJournalCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  curiosity?: InputMaybe<Array<Scalars['String']>>;
  date: Scalars['Date'];
  programming?: InputMaybe<Array<Scalars['String']>>;
  resources?: InputMaybe<ResourceCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  work?: InputMaybe<Array<Scalars['String']>>;
};

export type LearningJournalCreateManyInlineInput = {
  /** Connect multiple existing LearningJournal documents */
  connect?: InputMaybe<Array<LearningJournalWhereUniqueInput>>;
  /** Create and connect multiple existing LearningJournal documents */
  create?: InputMaybe<Array<LearningJournalCreateInput>>;
};

export type LearningJournalCreateOneInlineInput = {
  /** Connect one existing LearningJournal document */
  connect?: InputMaybe<LearningJournalWhereUniqueInput>;
  /** Create and connect one LearningJournal document */
  create?: InputMaybe<LearningJournalCreateInput>;
};

/** An edge in a connection. */
export type LearningJournalEdge = {
  __typename?: 'LearningJournalEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: LearningJournal;
};

/** Identifies documents */
export type LearningJournalManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LearningJournalWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  curiosity?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  curiosity_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  curiosity_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  curiosity_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  curiosity_not?: InputMaybe<Array<Scalars['String']>>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** All values that are not equal to given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  documentInStages_every?: InputMaybe<LearningJournalWhereStageInput>;
  documentInStages_none?: InputMaybe<LearningJournalWhereStageInput>;
  documentInStages_some?: InputMaybe<LearningJournalWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LearningJournalWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LearningJournalWhereInput>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  programming?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  programming_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  programming_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  programming_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  programming_not?: InputMaybe<Array<Scalars['String']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  resources_every?: InputMaybe<ResourceWhereInput>;
  resources_none?: InputMaybe<ResourceWhereInput>;
  resources_some?: InputMaybe<ResourceWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  work?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  work_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  work_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  work_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  work_not?: InputMaybe<Array<Scalars['String']>>;
};

export enum LearningJournalOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CuriosityAsc = 'curiosity_ASC',
  CuriosityDesc = 'curiosity_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ProgrammingAsc = 'programming_ASC',
  ProgrammingDesc = 'programming_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkAsc = 'work_ASC',
  WorkDesc = 'work_DESC'
}

export type LearningJournalUpdateInput = {
  curiosity?: InputMaybe<Array<Scalars['String']>>;
  date?: InputMaybe<Scalars['Date']>;
  programming?: InputMaybe<Array<Scalars['String']>>;
  resources?: InputMaybe<ResourceUpdateManyInlineInput>;
  work?: InputMaybe<Array<Scalars['String']>>;
};

export type LearningJournalUpdateManyInlineInput = {
  /** Connect multiple existing LearningJournal documents */
  connect?: InputMaybe<Array<LearningJournalConnectInput>>;
  /** Create and connect multiple LearningJournal documents */
  create?: InputMaybe<Array<LearningJournalCreateInput>>;
  /** Delete multiple LearningJournal documents */
  delete?: InputMaybe<Array<LearningJournalWhereUniqueInput>>;
  /** Disconnect multiple LearningJournal documents */
  disconnect?: InputMaybe<Array<LearningJournalWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing LearningJournal documents */
  set?: InputMaybe<Array<LearningJournalWhereUniqueInput>>;
  /** Update multiple LearningJournal documents */
  update?: InputMaybe<Array<LearningJournalUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple LearningJournal documents */
  upsert?: InputMaybe<Array<LearningJournalUpsertWithNestedWhereUniqueInput>>;
};

export type LearningJournalUpdateManyInput = {
  curiosity?: InputMaybe<Array<Scalars['String']>>;
  date?: InputMaybe<Scalars['Date']>;
  programming?: InputMaybe<Array<Scalars['String']>>;
  work?: InputMaybe<Array<Scalars['String']>>;
};

export type LearningJournalUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LearningJournalUpdateManyInput;
  /** Document search */
  where: LearningJournalWhereInput;
};

export type LearningJournalUpdateOneInlineInput = {
  /** Connect existing LearningJournal document */
  connect?: InputMaybe<LearningJournalWhereUniqueInput>;
  /** Create and connect one LearningJournal document */
  create?: InputMaybe<LearningJournalCreateInput>;
  /** Delete currently connected LearningJournal document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected LearningJournal document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single LearningJournal document */
  update?: InputMaybe<LearningJournalUpdateWithNestedWhereUniqueInput>;
  /** Upsert single LearningJournal document */
  upsert?: InputMaybe<LearningJournalUpsertWithNestedWhereUniqueInput>;
};

export type LearningJournalUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LearningJournalUpdateInput;
  /** Unique document search */
  where: LearningJournalWhereUniqueInput;
};

export type LearningJournalUpsertInput = {
  /** Create document if it didn't exist */
  create: LearningJournalCreateInput;
  /** Update document if it exists */
  update: LearningJournalUpdateInput;
};

export type LearningJournalUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LearningJournalUpsertInput;
  /** Unique document search */
  where: LearningJournalWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type LearningJournalWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type LearningJournalWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LearningJournalWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  curiosity?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  curiosity_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  curiosity_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  curiosity_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  curiosity_not?: InputMaybe<Array<Scalars['String']>>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** All values that are not equal to given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  documentInStages_every?: InputMaybe<LearningJournalWhereStageInput>;
  documentInStages_none?: InputMaybe<LearningJournalWhereStageInput>;
  documentInStages_some?: InputMaybe<LearningJournalWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LearningJournalWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LearningJournalWhereInput>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  programming?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  programming_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  programming_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  programming_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  programming_not?: InputMaybe<Array<Scalars['String']>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  resources_every?: InputMaybe<ResourceWhereInput>;
  resources_none?: InputMaybe<ResourceWhereInput>;
  resources_some?: InputMaybe<ResourceWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  work?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  work_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  work_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  work_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  work_not?: InputMaybe<Array<Scalars['String']>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type LearningJournalWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LearningJournalWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<LearningJournalWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LearningJournalWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LearningJournalWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References LearningJournal record uniquely */
export type LearningJournalWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create one aboutMePage */
  createAboutMePage?: Maybe<AboutMePage>;
  /** Create one achievement */
  createAchievement?: Maybe<Achievement>;
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<Asset>;
  /** Create one content */
  createContent?: Maybe<Content>;
  /** Create one image */
  createImage?: Maybe<Image>;
  /** Create one learningJournal */
  createLearningJournal?: Maybe<LearningJournal>;
  /** Create one page */
  createPage?: Maybe<Page>;
  /** Create one project */
  createProject?: Maybe<Project>;
  /** Create one resource */
  createResource?: Maybe<Resource>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one section */
  createSection?: Maybe<Section>;
  /** Create one seo */
  createSeo?: Maybe<Seo>;
  /** Create one stack */
  createStack?: Maybe<Stack>;
  /** Create one timeline */
  createTimeline?: Maybe<Timeline>;
  /** Delete one aboutMePage from _all_ existing stages. Returns deleted document. */
  deleteAboutMePage?: Maybe<AboutMePage>;
  /** Delete one achievement from _all_ existing stages. Returns deleted document. */
  deleteAchievement?: Maybe<Achievement>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /** Delete one content from _all_ existing stages. Returns deleted document. */
  deleteContent?: Maybe<Content>;
  /** Delete one image from _all_ existing stages. Returns deleted document. */
  deleteImage?: Maybe<Image>;
  /** Delete one learningJournal from _all_ existing stages. Returns deleted document. */
  deleteLearningJournal?: Maybe<LearningJournal>;
  /**
   * Delete many AboutMePage documents
   * @deprecated Please use the new paginated many mutation (deleteManyAboutMePagesConnection)
   */
  deleteManyAboutMePages: BatchPayload;
  /** Delete many AboutMePage documents, return deleted documents */
  deleteManyAboutMePagesConnection: AboutMePageConnection;
  /**
   * Delete many Achievement documents
   * @deprecated Please use the new paginated many mutation (deleteManyAchievementsConnection)
   */
  deleteManyAchievements: BatchPayload;
  /** Delete many Achievement documents, return deleted documents */
  deleteManyAchievementsConnection: AchievementConnection;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Content documents
   * @deprecated Please use the new paginated many mutation (deleteManyContentsConnection)
   */
  deleteManyContents: BatchPayload;
  /** Delete many Content documents, return deleted documents */
  deleteManyContentsConnection: ContentConnection;
  /**
   * Delete many Image documents
   * @deprecated Please use the new paginated many mutation (deleteManyImagesConnection)
   */
  deleteManyImages: BatchPayload;
  /** Delete many Image documents, return deleted documents */
  deleteManyImagesConnection: ImageConnection;
  /**
   * Delete many LearningJournal documents
   * @deprecated Please use the new paginated many mutation (deleteManyLearningJournalsConnection)
   */
  deleteManyLearningJournals: BatchPayload;
  /** Delete many LearningJournal documents, return deleted documents */
  deleteManyLearningJournalsConnection: LearningJournalConnection;
  /**
   * Delete many Page documents
   * @deprecated Please use the new paginated many mutation (deleteManyPagesConnection)
   */
  deleteManyPages: BatchPayload;
  /** Delete many Page documents, return deleted documents */
  deleteManyPagesConnection: PageConnection;
  /**
   * Delete many Project documents
   * @deprecated Please use the new paginated many mutation (deleteManyProjectsConnection)
   */
  deleteManyProjects: BatchPayload;
  /** Delete many Project documents, return deleted documents */
  deleteManyProjectsConnection: ProjectConnection;
  /**
   * Delete many Resource documents
   * @deprecated Please use the new paginated many mutation (deleteManyResourcesConnection)
   */
  deleteManyResources: BatchPayload;
  /** Delete many Resource documents, return deleted documents */
  deleteManyResourcesConnection: ResourceConnection;
  /**
   * Delete many Section documents
   * @deprecated Please use the new paginated many mutation (deleteManySectionsConnection)
   */
  deleteManySections: BatchPayload;
  /** Delete many Section documents, return deleted documents */
  deleteManySectionsConnection: SectionConnection;
  /**
   * Delete many Seo documents
   * @deprecated Please use the new paginated many mutation (deleteManySeosConnection)
   */
  deleteManySeos: BatchPayload;
  /** Delete many Seo documents, return deleted documents */
  deleteManySeosConnection: SeoConnection;
  /**
   * Delete many Stack documents
   * @deprecated Please use the new paginated many mutation (deleteManyStacksConnection)
   */
  deleteManyStacks: BatchPayload;
  /** Delete many Stack documents, return deleted documents */
  deleteManyStacksConnection: StackConnection;
  /**
   * Delete many Timeline documents
   * @deprecated Please use the new paginated many mutation (deleteManyTimelinesConnection)
   */
  deleteManyTimelines: BatchPayload;
  /** Delete many Timeline documents, return deleted documents */
  deleteManyTimelinesConnection: TimelineConnection;
  /** Delete one page from _all_ existing stages. Returns deleted document. */
  deletePage?: Maybe<Page>;
  /** Delete one project from _all_ existing stages. Returns deleted document. */
  deleteProject?: Maybe<Project>;
  /** Delete one resource from _all_ existing stages. Returns deleted document. */
  deleteResource?: Maybe<Resource>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one section from _all_ existing stages. Returns deleted document. */
  deleteSection?: Maybe<Section>;
  /** Delete one seo from _all_ existing stages. Returns deleted document. */
  deleteSeo?: Maybe<Seo>;
  /** Delete one stack from _all_ existing stages. Returns deleted document. */
  deleteStack?: Maybe<Stack>;
  /** Delete one timeline from _all_ existing stages. Returns deleted document. */
  deleteTimeline?: Maybe<Timeline>;
  /** Publish one aboutMePage */
  publishAboutMePage?: Maybe<AboutMePage>;
  /** Publish one achievement */
  publishAchievement?: Maybe<Achievement>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /** Publish one content */
  publishContent?: Maybe<Content>;
  /** Publish one image */
  publishImage?: Maybe<Image>;
  /** Publish one learningJournal */
  publishLearningJournal?: Maybe<LearningJournal>;
  /**
   * Publish many AboutMePage documents
   * @deprecated Please use the new paginated many mutation (publishManyAboutMePagesConnection)
   */
  publishManyAboutMePages: BatchPayload;
  /** Publish many AboutMePage documents */
  publishManyAboutMePagesConnection: AboutMePageConnection;
  /**
   * Publish many Achievement documents
   * @deprecated Please use the new paginated many mutation (publishManyAchievementsConnection)
   */
  publishManyAchievements: BatchPayload;
  /** Publish many Achievement documents */
  publishManyAchievementsConnection: AchievementConnection;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Content documents
   * @deprecated Please use the new paginated many mutation (publishManyContentsConnection)
   */
  publishManyContents: BatchPayload;
  /** Publish many Content documents */
  publishManyContentsConnection: ContentConnection;
  /**
   * Publish many Image documents
   * @deprecated Please use the new paginated many mutation (publishManyImagesConnection)
   */
  publishManyImages: BatchPayload;
  /** Publish many Image documents */
  publishManyImagesConnection: ImageConnection;
  /**
   * Publish many LearningJournal documents
   * @deprecated Please use the new paginated many mutation (publishManyLearningJournalsConnection)
   */
  publishManyLearningJournals: BatchPayload;
  /** Publish many LearningJournal documents */
  publishManyLearningJournalsConnection: LearningJournalConnection;
  /**
   * Publish many Page documents
   * @deprecated Please use the new paginated many mutation (publishManyPagesConnection)
   */
  publishManyPages: BatchPayload;
  /** Publish many Page documents */
  publishManyPagesConnection: PageConnection;
  /**
   * Publish many Project documents
   * @deprecated Please use the new paginated many mutation (publishManyProjectsConnection)
   */
  publishManyProjects: BatchPayload;
  /** Publish many Project documents */
  publishManyProjectsConnection: ProjectConnection;
  /**
   * Publish many Resource documents
   * @deprecated Please use the new paginated many mutation (publishManyResourcesConnection)
   */
  publishManyResources: BatchPayload;
  /** Publish many Resource documents */
  publishManyResourcesConnection: ResourceConnection;
  /**
   * Publish many Section documents
   * @deprecated Please use the new paginated many mutation (publishManySectionsConnection)
   */
  publishManySections: BatchPayload;
  /** Publish many Section documents */
  publishManySectionsConnection: SectionConnection;
  /**
   * Publish many Seo documents
   * @deprecated Please use the new paginated many mutation (publishManySeosConnection)
   */
  publishManySeos: BatchPayload;
  /** Publish many Seo documents */
  publishManySeosConnection: SeoConnection;
  /**
   * Publish many Stack documents
   * @deprecated Please use the new paginated many mutation (publishManyStacksConnection)
   */
  publishManyStacks: BatchPayload;
  /** Publish many Stack documents */
  publishManyStacksConnection: StackConnection;
  /**
   * Publish many Timeline documents
   * @deprecated Please use the new paginated many mutation (publishManyTimelinesConnection)
   */
  publishManyTimelines: BatchPayload;
  /** Publish many Timeline documents */
  publishManyTimelinesConnection: TimelineConnection;
  /** Publish one page */
  publishPage?: Maybe<Page>;
  /** Publish one project */
  publishProject?: Maybe<Project>;
  /** Publish one resource */
  publishResource?: Maybe<Resource>;
  /** Publish one section */
  publishSection?: Maybe<Section>;
  /** Publish one seo */
  publishSeo?: Maybe<Seo>;
  /** Publish one stack */
  publishStack?: Maybe<Stack>;
  /** Publish one timeline */
  publishTimeline?: Maybe<Timeline>;
  /** Schedule to publish one aboutMePage */
  schedulePublishAboutMePage?: Maybe<AboutMePage>;
  /** Schedule to publish one achievement */
  schedulePublishAchievement?: Maybe<Achievement>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one content */
  schedulePublishContent?: Maybe<Content>;
  /** Schedule to publish one image */
  schedulePublishImage?: Maybe<Image>;
  /** Schedule to publish one learningJournal */
  schedulePublishLearningJournal?: Maybe<LearningJournal>;
  /** Schedule to publish one page */
  schedulePublishPage?: Maybe<Page>;
  /** Schedule to publish one project */
  schedulePublishProject?: Maybe<Project>;
  /** Schedule to publish one resource */
  schedulePublishResource?: Maybe<Resource>;
  /** Schedule to publish one section */
  schedulePublishSection?: Maybe<Section>;
  /** Schedule to publish one seo */
  schedulePublishSeo?: Maybe<Seo>;
  /** Schedule to publish one stack */
  schedulePublishStack?: Maybe<Stack>;
  /** Schedule to publish one timeline */
  schedulePublishTimeline?: Maybe<Timeline>;
  /** Unpublish one aboutMePage from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAboutMePage?: Maybe<AboutMePage>;
  /** Unpublish one achievement from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAchievement?: Maybe<Achievement>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one content from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishContent?: Maybe<Content>;
  /** Unpublish one image from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishImage?: Maybe<Image>;
  /** Unpublish one learningJournal from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishLearningJournal?: Maybe<LearningJournal>;
  /** Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishPage?: Maybe<Page>;
  /** Unpublish one project from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishProject?: Maybe<Project>;
  /** Unpublish one resource from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishResource?: Maybe<Resource>;
  /** Unpublish one section from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishSection?: Maybe<Section>;
  /** Unpublish one seo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishSeo?: Maybe<Seo>;
  /** Unpublish one stack from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishStack?: Maybe<Stack>;
  /** Unpublish one timeline from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTimeline?: Maybe<Timeline>;
  /** Unpublish one aboutMePage from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAboutMePage?: Maybe<AboutMePage>;
  /** Unpublish one achievement from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAchievement?: Maybe<Achievement>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /** Unpublish one content from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishContent?: Maybe<Content>;
  /** Unpublish one image from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishImage?: Maybe<Image>;
  /** Unpublish one learningJournal from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishLearningJournal?: Maybe<LearningJournal>;
  /**
   * Unpublish many AboutMePage documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAboutMePagesConnection)
   */
  unpublishManyAboutMePages: BatchPayload;
  /** Find many AboutMePage documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAboutMePagesConnection: AboutMePageConnection;
  /**
   * Unpublish many Achievement documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAchievementsConnection)
   */
  unpublishManyAchievements: BatchPayload;
  /** Find many Achievement documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAchievementsConnection: AchievementConnection;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Content documents
   * @deprecated Please use the new paginated many mutation (unpublishManyContentsConnection)
   */
  unpublishManyContents: BatchPayload;
  /** Find many Content documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyContentsConnection: ContentConnection;
  /**
   * Unpublish many Image documents
   * @deprecated Please use the new paginated many mutation (unpublishManyImagesConnection)
   */
  unpublishManyImages: BatchPayload;
  /** Find many Image documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyImagesConnection: ImageConnection;
  /**
   * Unpublish many LearningJournal documents
   * @deprecated Please use the new paginated many mutation (unpublishManyLearningJournalsConnection)
   */
  unpublishManyLearningJournals: BatchPayload;
  /** Find many LearningJournal documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyLearningJournalsConnection: LearningJournalConnection;
  /**
   * Unpublish many Page documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPagesConnection)
   */
  unpublishManyPages: BatchPayload;
  /** Find many Page documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPagesConnection: PageConnection;
  /**
   * Unpublish many Project documents
   * @deprecated Please use the new paginated many mutation (unpublishManyProjectsConnection)
   */
  unpublishManyProjects: BatchPayload;
  /** Find many Project documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyProjectsConnection: ProjectConnection;
  /**
   * Unpublish many Resource documents
   * @deprecated Please use the new paginated many mutation (unpublishManyResourcesConnection)
   */
  unpublishManyResources: BatchPayload;
  /** Find many Resource documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyResourcesConnection: ResourceConnection;
  /**
   * Unpublish many Section documents
   * @deprecated Please use the new paginated many mutation (unpublishManySectionsConnection)
   */
  unpublishManySections: BatchPayload;
  /** Find many Section documents that match criteria in specified stage and unpublish from target stages */
  unpublishManySectionsConnection: SectionConnection;
  /**
   * Unpublish many Seo documents
   * @deprecated Please use the new paginated many mutation (unpublishManySeosConnection)
   */
  unpublishManySeos: BatchPayload;
  /** Find many Seo documents that match criteria in specified stage and unpublish from target stages */
  unpublishManySeosConnection: SeoConnection;
  /**
   * Unpublish many Stack documents
   * @deprecated Please use the new paginated many mutation (unpublishManyStacksConnection)
   */
  unpublishManyStacks: BatchPayload;
  /** Find many Stack documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyStacksConnection: StackConnection;
  /**
   * Unpublish many Timeline documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTimelinesConnection)
   */
  unpublishManyTimelines: BatchPayload;
  /** Find many Timeline documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTimelinesConnection: TimelineConnection;
  /** Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPage?: Maybe<Page>;
  /** Unpublish one project from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishProject?: Maybe<Project>;
  /** Unpublish one resource from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishResource?: Maybe<Resource>;
  /** Unpublish one section from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishSection?: Maybe<Section>;
  /** Unpublish one seo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishSeo?: Maybe<Seo>;
  /** Unpublish one stack from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishStack?: Maybe<Stack>;
  /** Unpublish one timeline from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTimeline?: Maybe<Timeline>;
  /** Update one aboutMePage */
  updateAboutMePage?: Maybe<AboutMePage>;
  /** Update one achievement */
  updateAchievement?: Maybe<Achievement>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /** Update one content */
  updateContent?: Maybe<Content>;
  /** Update one image */
  updateImage?: Maybe<Image>;
  /** Update one learningJournal */
  updateLearningJournal?: Maybe<LearningJournal>;
  /**
   * Update many aboutMePages
   * @deprecated Please use the new paginated many mutation (updateManyAboutMePagesConnection)
   */
  updateManyAboutMePages: BatchPayload;
  /** Update many AboutMePage documents */
  updateManyAboutMePagesConnection: AboutMePageConnection;
  /**
   * Update many achievements
   * @deprecated Please use the new paginated many mutation (updateManyAchievementsConnection)
   */
  updateManyAchievements: BatchPayload;
  /** Update many Achievement documents */
  updateManyAchievementsConnection: AchievementConnection;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many contents
   * @deprecated Please use the new paginated many mutation (updateManyContentsConnection)
   */
  updateManyContents: BatchPayload;
  /** Update many Content documents */
  updateManyContentsConnection: ContentConnection;
  /**
   * Update many images
   * @deprecated Please use the new paginated many mutation (updateManyImagesConnection)
   */
  updateManyImages: BatchPayload;
  /** Update many Image documents */
  updateManyImagesConnection: ImageConnection;
  /**
   * Update many learningJournals
   * @deprecated Please use the new paginated many mutation (updateManyLearningJournalsConnection)
   */
  updateManyLearningJournals: BatchPayload;
  /** Update many LearningJournal documents */
  updateManyLearningJournalsConnection: LearningJournalConnection;
  /**
   * Update many pages
   * @deprecated Please use the new paginated many mutation (updateManyPagesConnection)
   */
  updateManyPages: BatchPayload;
  /** Update many Page documents */
  updateManyPagesConnection: PageConnection;
  /**
   * Update many projects
   * @deprecated Please use the new paginated many mutation (updateManyProjectsConnection)
   */
  updateManyProjects: BatchPayload;
  /** Update many Project documents */
  updateManyProjectsConnection: ProjectConnection;
  /**
   * Update many resources
   * @deprecated Please use the new paginated many mutation (updateManyResourcesConnection)
   */
  updateManyResources: BatchPayload;
  /** Update many Resource documents */
  updateManyResourcesConnection: ResourceConnection;
  /**
   * Update many sections
   * @deprecated Please use the new paginated many mutation (updateManySectionsConnection)
   */
  updateManySections: BatchPayload;
  /** Update many Section documents */
  updateManySectionsConnection: SectionConnection;
  /**
   * Update many seos
   * @deprecated Please use the new paginated many mutation (updateManySeosConnection)
   */
  updateManySeos: BatchPayload;
  /** Update many Seo documents */
  updateManySeosConnection: SeoConnection;
  /**
   * Update many stacks
   * @deprecated Please use the new paginated many mutation (updateManyStacksConnection)
   */
  updateManyStacks: BatchPayload;
  /** Update many Stack documents */
  updateManyStacksConnection: StackConnection;
  /**
   * Update many timelines
   * @deprecated Please use the new paginated many mutation (updateManyTimelinesConnection)
   */
  updateManyTimelines: BatchPayload;
  /** Update many Timeline documents */
  updateManyTimelinesConnection: TimelineConnection;
  /** Update one page */
  updatePage?: Maybe<Page>;
  /** Update one project */
  updateProject?: Maybe<Project>;
  /** Update one resource */
  updateResource?: Maybe<Resource>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one section */
  updateSection?: Maybe<Section>;
  /** Update one seo */
  updateSeo?: Maybe<Seo>;
  /** Update one stack */
  updateStack?: Maybe<Stack>;
  /** Update one timeline */
  updateTimeline?: Maybe<Timeline>;
  /** Upsert one aboutMePage */
  upsertAboutMePage?: Maybe<AboutMePage>;
  /** Upsert one achievement */
  upsertAchievement?: Maybe<Achievement>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one content */
  upsertContent?: Maybe<Content>;
  /** Upsert one image */
  upsertImage?: Maybe<Image>;
  /** Upsert one learningJournal */
  upsertLearningJournal?: Maybe<LearningJournal>;
  /** Upsert one page */
  upsertPage?: Maybe<Page>;
  /** Upsert one project */
  upsertProject?: Maybe<Project>;
  /** Upsert one resource */
  upsertResource?: Maybe<Resource>;
  /** Upsert one section */
  upsertSection?: Maybe<Section>;
  /** Upsert one seo */
  upsertSeo?: Maybe<Seo>;
  /** Upsert one stack */
  upsertStack?: Maybe<Stack>;
  /** Upsert one timeline */
  upsertTimeline?: Maybe<Timeline>;
};


export type MutationCreateAboutMePageArgs = {
  data: AboutMePageCreateInput;
};


export type MutationCreateAchievementArgs = {
  data: AchievementCreateInput;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateContentArgs = {
  data: ContentCreateInput;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateLearningJournalArgs = {
  data: LearningJournalCreateInput;
};


export type MutationCreatePageArgs = {
  data: PageCreateInput;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateResourceArgs = {
  data: ResourceCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateSectionArgs = {
  data: SectionCreateInput;
};


export type MutationCreateSeoArgs = {
  data: SeoCreateInput;
};


export type MutationCreateStackArgs = {
  data: StackCreateInput;
};


export type MutationCreateTimelineArgs = {
  data: TimelineCreateInput;
};


export type MutationDeleteAboutMePageArgs = {
  where: AboutMePageWhereUniqueInput;
};


export type MutationDeleteAchievementArgs = {
  where: AchievementWhereUniqueInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteContentArgs = {
  where: ContentWhereUniqueInput;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteLearningJournalArgs = {
  where: LearningJournalWhereUniqueInput;
};


export type MutationDeleteManyAboutMePagesArgs = {
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationDeleteManyAboutMePagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationDeleteManyAchievementsArgs = {
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationDeleteManyAchievementsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyContentsArgs = {
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationDeleteManyContentsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationDeleteManyImagesArgs = {
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationDeleteManyImagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationDeleteManyLearningJournalsArgs = {
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationDeleteManyLearningJournalsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationDeleteManyPagesArgs = {
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationDeleteManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationDeleteManyProjectsArgs = {
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationDeleteManyProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationDeleteManyResourcesArgs = {
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationDeleteManyResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationDeleteManySectionsArgs = {
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationDeleteManySectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationDeleteManySeosArgs = {
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationDeleteManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationDeleteManyStacksArgs = {
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationDeleteManyStacksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationDeleteManyTimelinesArgs = {
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationDeleteManyTimelinesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteResourceArgs = {
  where: ResourceWhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteSectionArgs = {
  where: SectionWhereUniqueInput;
};


export type MutationDeleteSeoArgs = {
  where: SeoWhereUniqueInput;
};


export type MutationDeleteStackArgs = {
  where: StackWhereUniqueInput;
};


export type MutationDeleteTimelineArgs = {
  where: TimelineWhereUniqueInput;
};


export type MutationPublishAboutMePageArgs = {
  to?: Array<Stage>;
  where: AboutMePageWhereUniqueInput;
};


export type MutationPublishAchievementArgs = {
  to?: Array<Stage>;
  where: AchievementWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishContentArgs = {
  to?: Array<Stage>;
  where: ContentWhereUniqueInput;
};


export type MutationPublishImageArgs = {
  to?: Array<Stage>;
  where: ImageWhereUniqueInput;
};


export type MutationPublishLearningJournalArgs = {
  to?: Array<Stage>;
  where: LearningJournalWhereUniqueInput;
};


export type MutationPublishManyAboutMePagesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationPublishManyAboutMePagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationPublishManyAchievementsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationPublishManyAchievementsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyContentsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationPublishManyContentsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationPublishManyImagesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationPublishManyImagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationPublishManyLearningJournalsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationPublishManyLearningJournalsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationPublishManyPagesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationPublishManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationPublishManyProjectsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationPublishManyProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationPublishManyResourcesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationPublishManyResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationPublishManySectionsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationPublishManySectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationPublishManySeosArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationPublishManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationPublishManyStacksArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationPublishManyStacksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationPublishManyTimelinesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationPublishManyTimelinesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationPublishPageArgs = {
  to?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationPublishProjectArgs = {
  to?: Array<Stage>;
  where: ProjectWhereUniqueInput;
};


export type MutationPublishResourceArgs = {
  to?: Array<Stage>;
  where: ResourceWhereUniqueInput;
};


export type MutationPublishSectionArgs = {
  to?: Array<Stage>;
  where: SectionWhereUniqueInput;
};


export type MutationPublishSeoArgs = {
  to?: Array<Stage>;
  where: SeoWhereUniqueInput;
};


export type MutationPublishStackArgs = {
  to?: Array<Stage>;
  where: StackWhereUniqueInput;
};


export type MutationPublishTimelineArgs = {
  to?: Array<Stage>;
  where: TimelineWhereUniqueInput;
};


export type MutationSchedulePublishAboutMePageArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AboutMePageWhereUniqueInput;
};


export type MutationSchedulePublishAchievementArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AchievementWhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishContentArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ContentWhereUniqueInput;
};


export type MutationSchedulePublishImageArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ImageWhereUniqueInput;
};


export type MutationSchedulePublishLearningJournalArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: LearningJournalWhereUniqueInput;
};


export type MutationSchedulePublishPageArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationSchedulePublishProjectArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ProjectWhereUniqueInput;
};


export type MutationSchedulePublishResourceArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ResourceWhereUniqueInput;
};


export type MutationSchedulePublishSectionArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: SectionWhereUniqueInput;
};


export type MutationSchedulePublishSeoArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: SeoWhereUniqueInput;
};


export type MutationSchedulePublishStackArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: StackWhereUniqueInput;
};


export type MutationSchedulePublishTimelineArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TimelineWhereUniqueInput;
};


export type MutationScheduleUnpublishAboutMePageArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: AboutMePageWhereUniqueInput;
};


export type MutationScheduleUnpublishAchievementArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: AchievementWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishContentArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ContentWhereUniqueInput;
};


export type MutationScheduleUnpublishImageArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ImageWhereUniqueInput;
};


export type MutationScheduleUnpublishLearningJournalArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: LearningJournalWhereUniqueInput;
};


export type MutationScheduleUnpublishPageArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: PageWhereUniqueInput;
};


export type MutationScheduleUnpublishProjectArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ProjectWhereUniqueInput;
};


export type MutationScheduleUnpublishResourceArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ResourceWhereUniqueInput;
};


export type MutationScheduleUnpublishSectionArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: SectionWhereUniqueInput;
};


export type MutationScheduleUnpublishSeoArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: SeoWhereUniqueInput;
};


export type MutationScheduleUnpublishStackArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: StackWhereUniqueInput;
};


export type MutationScheduleUnpublishTimelineArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TimelineWhereUniqueInput;
};


export type MutationUnpublishAboutMePageArgs = {
  from?: Array<Stage>;
  where: AboutMePageWhereUniqueInput;
};


export type MutationUnpublishAchievementArgs = {
  from?: Array<Stage>;
  where: AchievementWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishContentArgs = {
  from?: Array<Stage>;
  where: ContentWhereUniqueInput;
};


export type MutationUnpublishImageArgs = {
  from?: Array<Stage>;
  where: ImageWhereUniqueInput;
};


export type MutationUnpublishLearningJournalArgs = {
  from?: Array<Stage>;
  where: LearningJournalWhereUniqueInput;
};


export type MutationUnpublishManyAboutMePagesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationUnpublishManyAboutMePagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationUnpublishManyAchievementsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationUnpublishManyAchievementsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyContentsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationUnpublishManyContentsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationUnpublishManyImagesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationUnpublishManyImagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationUnpublishManyLearningJournalsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationUnpublishManyLearningJournalsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationUnpublishManyPagesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUnpublishManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUnpublishManyProjectsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationUnpublishManyProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationUnpublishManyResourcesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationUnpublishManyResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationUnpublishManySectionsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationUnpublishManySectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationUnpublishManySeosArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUnpublishManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUnpublishManyStacksArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationUnpublishManyStacksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationUnpublishManyTimelinesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationUnpublishManyTimelinesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationUnpublishPageArgs = {
  from?: Array<Stage>;
  where: PageWhereUniqueInput;
};


export type MutationUnpublishProjectArgs = {
  from?: Array<Stage>;
  where: ProjectWhereUniqueInput;
};


export type MutationUnpublishResourceArgs = {
  from?: Array<Stage>;
  where: ResourceWhereUniqueInput;
};


export type MutationUnpublishSectionArgs = {
  from?: Array<Stage>;
  where: SectionWhereUniqueInput;
};


export type MutationUnpublishSeoArgs = {
  from?: Array<Stage>;
  where: SeoWhereUniqueInput;
};


export type MutationUnpublishStackArgs = {
  from?: Array<Stage>;
  where: StackWhereUniqueInput;
};


export type MutationUnpublishTimelineArgs = {
  from?: Array<Stage>;
  where: TimelineWhereUniqueInput;
};


export type MutationUpdateAboutMePageArgs = {
  data: AboutMePageUpdateInput;
  where: AboutMePageWhereUniqueInput;
};


export type MutationUpdateAchievementArgs = {
  data: AchievementUpdateInput;
  where: AchievementWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateContentArgs = {
  data: ContentUpdateInput;
  where: ContentWhereUniqueInput;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateLearningJournalArgs = {
  data: LearningJournalUpdateInput;
  where: LearningJournalWhereUniqueInput;
};


export type MutationUpdateManyAboutMePagesArgs = {
  data: AboutMePageUpdateManyInput;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationUpdateManyAboutMePagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AboutMePageUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AboutMePageManyWhereInput>;
};


export type MutationUpdateManyAchievementsArgs = {
  data: AchievementUpdateManyInput;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationUpdateManyAchievementsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AchievementUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AchievementManyWhereInput>;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyContentsArgs = {
  data: ContentUpdateManyInput;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationUpdateManyContentsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ContentUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContentManyWhereInput>;
};


export type MutationUpdateManyImagesArgs = {
  data: ImageUpdateManyInput;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationUpdateManyImagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ImageUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageManyWhereInput>;
};


export type MutationUpdateManyLearningJournalsArgs = {
  data: LearningJournalUpdateManyInput;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationUpdateManyLearningJournalsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: LearningJournalUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LearningJournalManyWhereInput>;
};


export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyInput;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUpdateManyPagesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: PageUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PageManyWhereInput>;
};


export type MutationUpdateManyProjectsArgs = {
  data: ProjectUpdateManyInput;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationUpdateManyProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ProjectUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectManyWhereInput>;
};


export type MutationUpdateManyResourcesArgs = {
  data: ResourceUpdateManyInput;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationUpdateManyResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ResourceUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ResourceManyWhereInput>;
};


export type MutationUpdateManySectionsArgs = {
  data: SectionUpdateManyInput;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationUpdateManySectionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: SectionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SectionManyWhereInput>;
};


export type MutationUpdateManySeosArgs = {
  data: SeoUpdateManyInput;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUpdateManySeosConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: SeoUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SeoManyWhereInput>;
};


export type MutationUpdateManyStacksArgs = {
  data: StackUpdateManyInput;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationUpdateManyStacksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: StackUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StackManyWhereInput>;
};


export type MutationUpdateManyTimelinesArgs = {
  data: TimelineUpdateManyInput;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationUpdateManyTimelinesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TimelineUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TimelineManyWhereInput>;
};


export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateResourceArgs = {
  data: ResourceUpdateInput;
  where: ResourceWhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateSectionArgs = {
  data: SectionUpdateInput;
  where: SectionWhereUniqueInput;
};


export type MutationUpdateSeoArgs = {
  data: SeoUpdateInput;
  where: SeoWhereUniqueInput;
};


export type MutationUpdateStackArgs = {
  data: StackUpdateInput;
  where: StackWhereUniqueInput;
};


export type MutationUpdateTimelineArgs = {
  data: TimelineUpdateInput;
  where: TimelineWhereUniqueInput;
};


export type MutationUpsertAboutMePageArgs = {
  upsert: AboutMePageUpsertInput;
  where: AboutMePageWhereUniqueInput;
};


export type MutationUpsertAchievementArgs = {
  upsert: AchievementUpsertInput;
  where: AchievementWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertContentArgs = {
  upsert: ContentUpsertInput;
  where: ContentWhereUniqueInput;
};


export type MutationUpsertImageArgs = {
  upsert: ImageUpsertInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpsertLearningJournalArgs = {
  upsert: LearningJournalUpsertInput;
  where: LearningJournalWhereUniqueInput;
};


export type MutationUpsertPageArgs = {
  upsert: PageUpsertInput;
  where: PageWhereUniqueInput;
};


export type MutationUpsertProjectArgs = {
  upsert: ProjectUpsertInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpsertResourceArgs = {
  upsert: ResourceUpsertInput;
  where: ResourceWhereUniqueInput;
};


export type MutationUpsertSectionArgs = {
  upsert: SectionUpsertInput;
  where: SectionWhereUniqueInput;
};


export type MutationUpsertSeoArgs = {
  upsert: SeoUpsertInput;
  where: SeoWhereUniqueInput;
};


export type MutationUpsertStackArgs = {
  upsert: StackUpsertInput;
  where: StackWhereUniqueInput;
};


export type MutationUpsertTimelineArgs = {
  upsert: TimelineUpsertInput;
  where: TimelineWhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

export type Page = Node & {
  __typename?: 'Page';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Page>;
  /** List of Page versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  seo?: Maybe<Seo>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type PageCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type PageDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type PageHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type PagePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type PageScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type PageSeoArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type PageUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type PageConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: PageWhereUniqueInput;
};

/** A connection to a list of items. */
export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<PageEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type PageCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  seo?: InputMaybe<SeoCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PageCreateManyInlineInput = {
  /** Connect multiple existing Page documents */
  connect?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Create and connect multiple existing Page documents */
  create?: InputMaybe<Array<PageCreateInput>>;
};

export type PageCreateOneInlineInput = {
  /** Connect one existing Page document */
  connect?: InputMaybe<PageWhereUniqueInput>;
  /** Create and connect one Page document */
  create?: InputMaybe<PageCreateInput>;
};

/** An edge in a connection. */
export type PageEdge = {
  __typename?: 'PageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Page;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Identifies documents */
export type PageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PageWhereStageInput>;
  documentInStages_none?: InputMaybe<PageWhereStageInput>;
  documentInStages_some?: InputMaybe<PageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum PageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PageUpdateInput = {
  seo?: InputMaybe<SeoUpdateOneInlineInput>;
};

export type PageUpdateManyInlineInput = {
  /** Connect multiple existing Page documents */
  connect?: InputMaybe<Array<PageConnectInput>>;
  /** Create and connect multiple Page documents */
  create?: InputMaybe<Array<PageCreateInput>>;
  /** Delete multiple Page documents */
  delete?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Disconnect multiple Page documents */
  disconnect?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Page documents */
  set?: InputMaybe<Array<PageWhereUniqueInput>>;
  /** Update multiple Page documents */
  update?: InputMaybe<Array<PageUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Page documents */
  upsert?: InputMaybe<Array<PageUpsertWithNestedWhereUniqueInput>>;
};

export type PageUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']>;
};

export type PageUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: PageUpdateManyInput;
  /** Document search */
  where: PageWhereInput;
};

export type PageUpdateOneInlineInput = {
  /** Connect existing Page document */
  connect?: InputMaybe<PageWhereUniqueInput>;
  /** Create and connect one Page document */
  create?: InputMaybe<PageCreateInput>;
  /** Delete currently connected Page document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Page document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Page document */
  update?: InputMaybe<PageUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Page document */
  upsert?: InputMaybe<PageUpsertWithNestedWhereUniqueInput>;
};

export type PageUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: PageUpdateInput;
  /** Unique document search */
  where: PageWhereUniqueInput;
};

export type PageUpsertInput = {
  /** Create document if it didn't exist */
  create: PageCreateInput;
  /** Update document if it exists */
  update: PageUpdateInput;
};

export type PageUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: PageUpsertInput;
  /** Unique document search */
  where: PageWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type PageWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type PageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<PageWhereStageInput>;
  documentInStages_none?: InputMaybe<PageWhereStageInput>;
  documentInStages_some?: InputMaybe<PageWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  seo?: InputMaybe<SeoWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type PageWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PageWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<PageWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PageWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PageWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Page record uniquely */
export type PageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Project = Node & {
  __typename?: 'Project';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Project>;
  githubUrl?: Maybe<Scalars['String']>;
  /** List of Project versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  liveUrl?: Maybe<Scalars['String']>;
  mainImage: Asset;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  stack?: Maybe<Stack>;
  /** System stage field */
  stage: Stage;
  title: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type ProjectCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ProjectDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type ProjectHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ProjectMainImageArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ProjectPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ProjectScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ProjectStackArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ProjectUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type ProjectConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ProjectWhereUniqueInput;
};

/** A connection to a list of items. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ProjectEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ProjectCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  githubUrl?: InputMaybe<Scalars['String']>;
  liveUrl?: InputMaybe<Scalars['String']>;
  mainImage: AssetCreateOneInlineInput;
  stack?: InputMaybe<StackCreateOneInlineInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProjectCreateManyInlineInput = {
  /** Connect multiple existing Project documents */
  connect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  /** Create and connect multiple existing Project documents */
  create?: InputMaybe<Array<ProjectCreateInput>>;
};

export type ProjectCreateOneInlineInput = {
  /** Connect one existing Project document */
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  /** Create and connect one Project document */
  create?: InputMaybe<ProjectCreateInput>;
};

/** An edge in a connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Project;
};

/** Identifies documents */
export type ProjectManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ProjectWhereStageInput>;
  documentInStages_none?: InputMaybe<ProjectWhereStageInput>;
  documentInStages_some?: InputMaybe<ProjectWhereStageInput>;
  githubUrl?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  githubUrl_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  githubUrl_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  githubUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  githubUrl_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  githubUrl_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  githubUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  githubUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  githubUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  githubUrl_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  liveUrl?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  liveUrl_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  liveUrl_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  liveUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  liveUrl_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  liveUrl_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  liveUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  liveUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  liveUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  liveUrl_starts_with?: InputMaybe<Scalars['String']>;
  mainImage?: InputMaybe<AssetWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  stack?: InputMaybe<StackWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ProjectOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  GithubUrlAsc = 'githubUrl_ASC',
  GithubUrlDesc = 'githubUrl_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LiveUrlAsc = 'liveUrl_ASC',
  LiveUrlDesc = 'liveUrl_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProjectUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  githubUrl?: InputMaybe<Scalars['String']>;
  liveUrl?: InputMaybe<Scalars['String']>;
  mainImage?: InputMaybe<AssetUpdateOneInlineInput>;
  stack?: InputMaybe<StackUpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectUpdateManyInlineInput = {
  /** Connect multiple existing Project documents */
  connect?: InputMaybe<Array<ProjectConnectInput>>;
  /** Create and connect multiple Project documents */
  create?: InputMaybe<Array<ProjectCreateInput>>;
  /** Delete multiple Project documents */
  delete?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  /** Disconnect multiple Project documents */
  disconnect?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Project documents */
  set?: InputMaybe<Array<ProjectWhereUniqueInput>>;
  /** Update multiple Project documents */
  update?: InputMaybe<Array<ProjectUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Project documents */
  upsert?: InputMaybe<Array<ProjectUpsertWithNestedWhereUniqueInput>>;
};

export type ProjectUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  githubUrl?: InputMaybe<Scalars['String']>;
  liveUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ProjectUpdateManyInput;
  /** Document search */
  where: ProjectWhereInput;
};

export type ProjectUpdateOneInlineInput = {
  /** Connect existing Project document */
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  /** Create and connect one Project document */
  create?: InputMaybe<ProjectCreateInput>;
  /** Delete currently connected Project document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Project document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Project document */
  update?: InputMaybe<ProjectUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Project document */
  upsert?: InputMaybe<ProjectUpsertWithNestedWhereUniqueInput>;
};

export type ProjectUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ProjectUpdateInput;
  /** Unique document search */
  where: ProjectWhereUniqueInput;
};

export type ProjectUpsertInput = {
  /** Create document if it didn't exist */
  create: ProjectCreateInput;
  /** Update document if it exists */
  update: ProjectUpdateInput;
};

export type ProjectUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ProjectUpsertInput;
  /** Unique document search */
  where: ProjectWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ProjectWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ProjectWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<ProjectWhereStageInput>;
  documentInStages_none?: InputMaybe<ProjectWhereStageInput>;
  documentInStages_some?: InputMaybe<ProjectWhereStageInput>;
  githubUrl?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  githubUrl_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  githubUrl_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  githubUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  githubUrl_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  githubUrl_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  githubUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  githubUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  githubUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  githubUrl_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  liveUrl?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  liveUrl_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  liveUrl_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  liveUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  liveUrl_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  liveUrl_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  liveUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  liveUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  liveUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  liveUrl_starts_with?: InputMaybe<Scalars['String']>;
  mainImage?: InputMaybe<AssetWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  stack?: InputMaybe<StackWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ProjectWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ProjectWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ProjectWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ProjectWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ProjectWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Project record uniquely */
export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single aboutMePage */
  aboutMePage?: Maybe<AboutMePage>;
  /** Retrieve multiple aboutMePages */
  aboutMePages: Array<AboutMePage>;
  /** Retrieve multiple aboutMePages using the Relay connection interface */
  aboutMePagesConnection: AboutMePageConnection;
  /** Retrieve document version */
  aboutMePageVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single achievement */
  achievement?: Maybe<Achievement>;
  /** Retrieve multiple achievements */
  achievements: Array<Achievement>;
  /** Retrieve multiple achievements using the Relay connection interface */
  achievementsConnection: AchievementConnection;
  /** Retrieve document version */
  achievementVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single content */
  content?: Maybe<Content>;
  /** Retrieve multiple contents */
  contents: Array<Content>;
  /** Retrieve multiple contents using the Relay connection interface */
  contentsConnection: ContentConnection;
  /** Retrieve document version */
  contentVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single image */
  image?: Maybe<Image>;
  /** Retrieve multiple images */
  images: Array<Image>;
  /** Retrieve multiple images using the Relay connection interface */
  imagesConnection: ImageConnection;
  /** Retrieve document version */
  imageVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single learningJournal */
  learningJournal?: Maybe<LearningJournal>;
  /** Retrieve multiple learningJournals */
  learningJournals: Array<LearningJournal>;
  /** Retrieve multiple learningJournals using the Relay connection interface */
  learningJournalsConnection: LearningJournalConnection;
  /** Retrieve document version */
  learningJournalVersion?: Maybe<DocumentVersion>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single page */
  page?: Maybe<Page>;
  /** Retrieve multiple pages */
  pages: Array<Page>;
  /** Retrieve multiple pages using the Relay connection interface */
  pagesConnection: PageConnection;
  /** Retrieve document version */
  pageVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single project */
  project?: Maybe<Project>;
  /** Retrieve multiple projects */
  projects: Array<Project>;
  /** Retrieve multiple projects using the Relay connection interface */
  projectsConnection: ProjectConnection;
  /** Retrieve document version */
  projectVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single resource */
  resource?: Maybe<Resource>;
  /** Retrieve multiple resources */
  resources: Array<Resource>;
  /** Retrieve multiple resources using the Relay connection interface */
  resourcesConnection: ResourceConnection;
  /** Retrieve document version */
  resourceVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single section */
  section?: Maybe<Section>;
  /** Retrieve multiple sections */
  sections: Array<Section>;
  /** Retrieve multiple sections using the Relay connection interface */
  sectionsConnection: SectionConnection;
  /** Retrieve document version */
  sectionVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single seo */
  seo?: Maybe<Seo>;
  /** Retrieve multiple seos */
  seos: Array<Seo>;
  /** Retrieve multiple seos using the Relay connection interface */
  seosConnection: SeoConnection;
  /** Retrieve document version */
  seoVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single stack */
  stack?: Maybe<Stack>;
  /** Retrieve multiple stacks */
  stacks: Array<Stack>;
  /** Retrieve multiple stacks using the Relay connection interface */
  stacksConnection: StackConnection;
  /** Retrieve document version */
  stackVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single timeline */
  timeline?: Maybe<Timeline>;
  /** Retrieve multiple timelines */
  timelines: Array<Timeline>;
  /** Retrieve multiple timelines using the Relay connection interface */
  timelinesConnection: TimelineConnection;
  /** Retrieve document version */
  timelineVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};


export type QueryAboutMePageArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AboutMePageWhereUniqueInput;
};


export type QueryAboutMePagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AboutMePageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AboutMePageWhereInput>;
};


export type QueryAboutMePagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AboutMePageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AboutMePageWhereInput>;
};


export type QueryAboutMePageVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAchievementArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AchievementWhereUniqueInput;
};


export type QueryAchievementsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AchievementOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AchievementWhereInput>;
};


export type QueryAchievementsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AchievementOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AchievementWhereInput>;
};


export type QueryAchievementVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryContentArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ContentWhereUniqueInput;
};


export type QueryContentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ContentOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ContentWhereInput>;
};


export type QueryContentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ContentOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ContentWhereInput>;
};


export type QueryContentVersionArgs = {
  where: VersionWhereInput;
};


export type QueryImageArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ImageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ImageWhereInput>;
};


export type QueryImagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ImageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ImageWhereInput>;
};


export type QueryImageVersionArgs = {
  where: VersionWhereInput;
};


export type QueryLearningJournalArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: LearningJournalWhereUniqueInput;
};


export type QueryLearningJournalsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LearningJournalOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<LearningJournalWhereInput>;
};


export type QueryLearningJournalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LearningJournalOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<LearningJournalWhereInput>;
};


export type QueryLearningJournalVersionArgs = {
  where: VersionWhereInput;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
};


export type QueryPageArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: PageWhereUniqueInput;
};


export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PageWhereInput>;
};


export type QueryPagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PageWhereInput>;
};


export type QueryPageVersionArgs = {
  where: VersionWhereInput;
};


export type QueryProjectArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ProjectWhereUniqueInput;
};


export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ProjectOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QueryProjectsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ProjectOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QueryProjectVersionArgs = {
  where: VersionWhereInput;
};


export type QueryResourceArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ResourceWhereUniqueInput;
};


export type QueryResourcesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ResourceOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ResourceWhereInput>;
};


export type QueryResourcesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ResourceOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ResourceWhereInput>;
};


export type QueryResourceVersionArgs = {
  where: VersionWhereInput;
};


export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QuerySectionArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: SectionWhereUniqueInput;
};


export type QuerySectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SectionWhereInput>;
};


export type QuerySectionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SectionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SectionWhereInput>;
};


export type QuerySectionVersionArgs = {
  where: VersionWhereInput;
};


export type QuerySeoArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: SeoWhereUniqueInput;
};


export type QuerySeosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SeoWhereInput>;
};


export type QuerySeosConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeoOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SeoWhereInput>;
};


export type QuerySeoVersionArgs = {
  where: VersionWhereInput;
};


export type QueryStackArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: StackWhereUniqueInput;
};


export type QueryStacksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<StackOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<StackWhereInput>;
};


export type QueryStacksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<StackOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<StackWhereInput>;
};


export type QueryStackVersionArgs = {
  where: VersionWhereInput;
};


export type QueryTimelineArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TimelineWhereUniqueInput;
};


export type QueryTimelinesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TimelineOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TimelineWhereInput>;
};


export type QueryTimelinesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TimelineOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TimelineWhereInput>;
};


export type QueryTimelineVersionArgs = {
  where: VersionWhereInput;
};


export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

export type Resource = Node & {
  __typename?: 'Resource';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Resource>;
  /** List of Resource versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  label: Scalars['String'];
  learningJournal?: Maybe<LearningJournal>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  url: Scalars['String'];
};


export type ResourceCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ResourceDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type ResourceHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ResourceLearningJournalArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ResourcePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type ResourceScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ResourceUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type ResourceConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ResourceWhereUniqueInput;
};

/** A connection to a list of items. */
export type ResourceConnection = {
  __typename?: 'ResourceConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ResourceEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ResourceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  label: Scalars['String'];
  learningJournal?: InputMaybe<LearningJournalCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
};

export type ResourceCreateManyInlineInput = {
  /** Connect multiple existing Resource documents */
  connect?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  /** Create and connect multiple existing Resource documents */
  create?: InputMaybe<Array<ResourceCreateInput>>;
};

export type ResourceCreateOneInlineInput = {
  /** Connect one existing Resource document */
  connect?: InputMaybe<ResourceWhereUniqueInput>;
  /** Create and connect one Resource document */
  create?: InputMaybe<ResourceCreateInput>;
};

/** An edge in a connection. */
export type ResourceEdge = {
  __typename?: 'ResourceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Resource;
};

/** Identifies documents */
export type ResourceManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ResourceWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ResourceWhereStageInput>;
  documentInStages_none?: InputMaybe<ResourceWhereStageInput>;
  documentInStages_some?: InputMaybe<ResourceWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  label_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  label_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  label_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  label_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  label_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  label_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  label_starts_with?: InputMaybe<Scalars['String']>;
  learningJournal?: InputMaybe<LearningJournalWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ResourceWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ResourceWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ResourceOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type ResourceUpdateInput = {
  label?: InputMaybe<Scalars['String']>;
  learningJournal?: InputMaybe<LearningJournalUpdateOneInlineInput>;
  url?: InputMaybe<Scalars['String']>;
};

export type ResourceUpdateManyInlineInput = {
  /** Connect multiple existing Resource documents */
  connect?: InputMaybe<Array<ResourceConnectInput>>;
  /** Create and connect multiple Resource documents */
  create?: InputMaybe<Array<ResourceCreateInput>>;
  /** Delete multiple Resource documents */
  delete?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  /** Disconnect multiple Resource documents */
  disconnect?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Resource documents */
  set?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  /** Update multiple Resource documents */
  update?: InputMaybe<Array<ResourceUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Resource documents */
  upsert?: InputMaybe<Array<ResourceUpsertWithNestedWhereUniqueInput>>;
};

export type ResourceUpdateManyInput = {
  label?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ResourceUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ResourceUpdateManyInput;
  /** Document search */
  where: ResourceWhereInput;
};

export type ResourceUpdateOneInlineInput = {
  /** Connect existing Resource document */
  connect?: InputMaybe<ResourceWhereUniqueInput>;
  /** Create and connect one Resource document */
  create?: InputMaybe<ResourceCreateInput>;
  /** Delete currently connected Resource document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Resource document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Resource document */
  update?: InputMaybe<ResourceUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Resource document */
  upsert?: InputMaybe<ResourceUpsertWithNestedWhereUniqueInput>;
};

export type ResourceUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ResourceUpdateInput;
  /** Unique document search */
  where: ResourceWhereUniqueInput;
};

export type ResourceUpsertInput = {
  /** Create document if it didn't exist */
  create: ResourceCreateInput;
  /** Update document if it exists */
  update: ResourceUpdateInput;
};

export type ResourceUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ResourceUpsertInput;
  /** Unique document search */
  where: ResourceWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ResourceWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ResourceWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ResourceWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<ResourceWhereStageInput>;
  documentInStages_none?: InputMaybe<ResourceWhereStageInput>;
  documentInStages_some?: InputMaybe<ResourceWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  label_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  label_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  label_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  label_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  label_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  label_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  label_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  label_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  label_starts_with?: InputMaybe<Scalars['String']>;
  learningJournal?: InputMaybe<LearningJournalWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ResourceWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ResourceWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ResourceWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ResourceWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ResourceWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ResourceWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ResourceWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Resource record uniquely */
export type ResourceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String'];
  /** Returns Markdown representation */
  markdown: Scalars['String'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = AboutMePage | Achievement | Asset | Content | Image | LearningJournal | Page | Project | Resource | Section | Seo | Stack | Timeline;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** All values that are not equal to given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Sections of a page  */
export type Section = Node & {
  __typename?: 'Section';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** The description of a section */
  description?: Maybe<RichText>;
  /** Get the document in other stages */
  documentInStages: Array<Section>;
  /** List of Section versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The images to be included within a section */
  images: Array<Image>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The title of a section */
  title: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Sections of a page  */
export type SectionCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Sections of a page  */
export type SectionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Sections of a page  */
export type SectionHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Sections of a page  */
export type SectionImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ImageOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


/** Sections of a page  */
export type SectionPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


/** Sections of a page  */
export type SectionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Sections of a page  */
export type SectionUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type SectionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: SectionWhereUniqueInput;
};

/** A connection to a list of items. */
export type SectionConnection = {
  __typename?: 'SectionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<SectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type SectionCreateInput = {
  cl04ahm310tyy01xehaz3azcm?: InputMaybe<AboutMePageCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['RichTextAST']>;
  images?: InputMaybe<ImageCreateManyInlineInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SectionCreateManyInlineInput = {
  /** Connect multiple existing Section documents */
  connect?: InputMaybe<Array<SectionWhereUniqueInput>>;
  /** Create and connect multiple existing Section documents */
  create?: InputMaybe<Array<SectionCreateInput>>;
};

export type SectionCreateOneInlineInput = {
  /** Connect one existing Section document */
  connect?: InputMaybe<SectionWhereUniqueInput>;
  /** Create and connect one Section document */
  create?: InputMaybe<SectionCreateInput>;
};

/** An edge in a connection. */
export type SectionEdge = {
  __typename?: 'SectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Section;
};

/** Identifies documents */
export type SectionManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SectionWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SectionWhereStageInput>;
  documentInStages_none?: InputMaybe<SectionWhereStageInput>;
  documentInStages_some?: InputMaybe<SectionWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  images_every?: InputMaybe<ImageWhereInput>;
  images_none?: InputMaybe<ImageWhereInput>;
  images_some?: InputMaybe<ImageWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SectionWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum SectionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type SectionUpdateInput = {
  cl04ahm310tyy01xehaz3azcm?: InputMaybe<AboutMePageUpdateManyInlineInput>;
  description?: InputMaybe<Scalars['RichTextAST']>;
  images?: InputMaybe<ImageUpdateManyInlineInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type SectionUpdateManyInlineInput = {
  /** Connect multiple existing Section documents */
  connect?: InputMaybe<Array<SectionConnectInput>>;
  /** Create and connect multiple Section documents */
  create?: InputMaybe<Array<SectionCreateInput>>;
  /** Delete multiple Section documents */
  delete?: InputMaybe<Array<SectionWhereUniqueInput>>;
  /** Disconnect multiple Section documents */
  disconnect?: InputMaybe<Array<SectionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Section documents */
  set?: InputMaybe<Array<SectionWhereUniqueInput>>;
  /** Update multiple Section documents */
  update?: InputMaybe<Array<SectionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Section documents */
  upsert?: InputMaybe<Array<SectionUpsertWithNestedWhereUniqueInput>>;
};

export type SectionUpdateManyInput = {
  description?: InputMaybe<Scalars['RichTextAST']>;
};

export type SectionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: SectionUpdateManyInput;
  /** Document search */
  where: SectionWhereInput;
};

export type SectionUpdateOneInlineInput = {
  /** Connect existing Section document */
  connect?: InputMaybe<SectionWhereUniqueInput>;
  /** Create and connect one Section document */
  create?: InputMaybe<SectionCreateInput>;
  /** Delete currently connected Section document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Section document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Section document */
  update?: InputMaybe<SectionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Section document */
  upsert?: InputMaybe<SectionUpsertWithNestedWhereUniqueInput>;
};

export type SectionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: SectionUpdateInput;
  /** Unique document search */
  where: SectionWhereUniqueInput;
};

export type SectionUpsertInput = {
  /** Create document if it didn't exist */
  create: SectionCreateInput;
  /** Update document if it exists */
  update: SectionUpdateInput;
};

export type SectionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: SectionUpsertInput;
  /** Unique document search */
  where: SectionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type SectionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type SectionWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SectionWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SectionWhereStageInput>;
  documentInStages_none?: InputMaybe<SectionWhereStageInput>;
  documentInStages_some?: InputMaybe<SectionWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  images_every?: InputMaybe<ImageWhereInput>;
  images_none?: InputMaybe<ImageWhereInput>;
  images_some?: InputMaybe<ImageWhereInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SectionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SectionWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type SectionWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SectionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<SectionWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SectionWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SectionWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Section record uniquely */
export type SectionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Seo = Node & {
  __typename?: 'Seo';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Seo>;
  focusKeywords: Array<Scalars['String']>;
  /** List of Seo versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  metaType?: Maybe<Scalars['String']>;
  ogImage: Asset;
  page?: Maybe<Page>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type SeoCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type SeoHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type SeoOgImageArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoPageArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type SeoScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type SeoUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type SeoConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: SeoWhereUniqueInput;
};

/** A connection to a list of items. */
export type SeoConnection = {
  __typename?: 'SeoConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<SeoEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type SeoCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  focusKeywords: Array<Scalars['String']>;
  metaDescription: Scalars['String'];
  metaTitle: Scalars['String'];
  metaType?: InputMaybe<Scalars['String']>;
  ogImage: AssetCreateOneInlineInput;
  page?: InputMaybe<PageCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SeoCreateManyInlineInput = {
  /** Connect multiple existing Seo documents */
  connect?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Create and connect multiple existing Seo documents */
  create?: InputMaybe<Array<SeoCreateInput>>;
};

export type SeoCreateOneInlineInput = {
  /** Connect one existing Seo document */
  connect?: InputMaybe<SeoWhereUniqueInput>;
  /** Create and connect one Seo document */
  create?: InputMaybe<SeoCreateInput>;
};

/** An edge in a connection. */
export type SeoEdge = {
  __typename?: 'SeoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Seo;
};

/** Identifies documents */
export type SeoManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SeoWhereStageInput>;
  documentInStages_none?: InputMaybe<SeoWhereStageInput>;
  documentInStages_some?: InputMaybe<SeoWhereStageInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  focusKeywords?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  focusKeywords_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  focusKeywords_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  focusKeywords_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  focusKeywords_not?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaDescription_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaDescription_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaDescription_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaDescription_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaDescription_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaDescription_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaDescription_starts_with?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaTitle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaTitle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaTitle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaTitle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaTitle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaTitle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaTitle_starts_with?: InputMaybe<Scalars['String']>;
  metaType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaType_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereInput>>;
  ogImage?: InputMaybe<AssetWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereInput>>;
  page?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum SeoOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FocusKeywordsAsc = 'focusKeywords_ASC',
  FocusKeywordsDesc = 'focusKeywords_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MetaDescriptionAsc = 'metaDescription_ASC',
  MetaDescriptionDesc = 'metaDescription_DESC',
  MetaTitleAsc = 'metaTitle_ASC',
  MetaTitleDesc = 'metaTitle_DESC',
  MetaTypeAsc = 'metaType_ASC',
  MetaTypeDesc = 'metaType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type SeoUpdateInput = {
  focusKeywords?: InputMaybe<Array<Scalars['String']>>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  metaType?: InputMaybe<Scalars['String']>;
  ogImage?: InputMaybe<AssetUpdateOneInlineInput>;
  page?: InputMaybe<PageUpdateOneInlineInput>;
};

export type SeoUpdateManyInlineInput = {
  /** Connect multiple existing Seo documents */
  connect?: InputMaybe<Array<SeoConnectInput>>;
  /** Create and connect multiple Seo documents */
  create?: InputMaybe<Array<SeoCreateInput>>;
  /** Delete multiple Seo documents */
  delete?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Disconnect multiple Seo documents */
  disconnect?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Seo documents */
  set?: InputMaybe<Array<SeoWhereUniqueInput>>;
  /** Update multiple Seo documents */
  update?: InputMaybe<Array<SeoUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Seo documents */
  upsert?: InputMaybe<Array<SeoUpsertWithNestedWhereUniqueInput>>;
};

export type SeoUpdateManyInput = {
  focusKeywords?: InputMaybe<Array<Scalars['String']>>;
  metaDescription?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  metaType?: InputMaybe<Scalars['String']>;
};

export type SeoUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: SeoUpdateManyInput;
  /** Document search */
  where: SeoWhereInput;
};

export type SeoUpdateOneInlineInput = {
  /** Connect existing Seo document */
  connect?: InputMaybe<SeoWhereUniqueInput>;
  /** Create and connect one Seo document */
  create?: InputMaybe<SeoCreateInput>;
  /** Delete currently connected Seo document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Seo document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Seo document */
  update?: InputMaybe<SeoUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Seo document */
  upsert?: InputMaybe<SeoUpsertWithNestedWhereUniqueInput>;
};

export type SeoUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: SeoUpdateInput;
  /** Unique document search */
  where: SeoWhereUniqueInput;
};

export type SeoUpsertInput = {
  /** Create document if it didn't exist */
  create: SeoCreateInput;
  /** Update document if it exists */
  update: SeoUpdateInput;
};

export type SeoUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: SeoUpsertInput;
  /** Unique document search */
  where: SeoWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type SeoWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type SeoWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SeoWhereStageInput>;
  documentInStages_none?: InputMaybe<SeoWhereStageInput>;
  documentInStages_some?: InputMaybe<SeoWhereStageInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  focusKeywords?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  focusKeywords_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  focusKeywords_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  focusKeywords_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  focusKeywords_not?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaDescription_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaDescription_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaDescription_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaDescription_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaDescription_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaDescription_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaDescription_starts_with?: InputMaybe<Scalars['String']>;
  metaTitle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaTitle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaTitle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaTitle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaTitle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaTitle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaTitle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaTitle_starts_with?: InputMaybe<Scalars['String']>;
  metaType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  metaType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  metaType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  metaType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  metaType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  metaType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  metaType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  metaType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  metaType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  metaType_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereInput>>;
  ogImage?: InputMaybe<AssetWhereInput>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereInput>>;
  page?: InputMaybe<PageWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type SeoWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeoWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<SeoWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeoWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeoWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Seo record uniquely */
export type SeoWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Stack = Node & {
  __typename?: 'Stack';
  categories: Array<StackCategory>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  databases: Array<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Stack>;
  framework?: Maybe<Scalars['String']>;
  /** List of Stack versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  language: Scalars['String'];
  libraries: Array<Scalars['String']>;
  projects: Array<Project>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type StackCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type StackDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type StackHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type StackProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ProjectOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};


export type StackPublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type StackScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type StackUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export enum StackCategory {
  Backend = 'Backend',
  Frontend = 'Frontend',
  Library = 'Library',
  Mobile = 'Mobile',
  Package = 'Package'
}

export type StackConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: StackWhereUniqueInput;
};

/** A connection to a list of items. */
export type StackConnection = {
  __typename?: 'StackConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<StackEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type StackCreateInput = {
  categories?: InputMaybe<Array<StackCategory>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  databases?: InputMaybe<Array<Scalars['String']>>;
  framework?: InputMaybe<Scalars['String']>;
  language: Scalars['String'];
  libraries?: InputMaybe<Array<Scalars['String']>>;
  projects?: InputMaybe<ProjectCreateManyInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StackCreateManyInlineInput = {
  /** Connect multiple existing Stack documents */
  connect?: InputMaybe<Array<StackWhereUniqueInput>>;
  /** Create and connect multiple existing Stack documents */
  create?: InputMaybe<Array<StackCreateInput>>;
};

export type StackCreateOneInlineInput = {
  /** Connect one existing Stack document */
  connect?: InputMaybe<StackWhereUniqueInput>;
  /** Create and connect one Stack document */
  create?: InputMaybe<StackCreateInput>;
};

/** An edge in a connection. */
export type StackEdge = {
  __typename?: 'StackEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Stack;
};

/** Identifies documents */
export type StackManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<StackWhereInput>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  categories?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array contains *all* items provided to the filter */
  categories_contains_all?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  categories_contains_none?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array contains at least one item provided to the filter */
  categories_contains_some?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  categories_not?: InputMaybe<Array<StackCategory>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  databases?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  databases_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  databases_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  databases_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  databases_not?: InputMaybe<Array<Scalars['String']>>;
  documentInStages_every?: InputMaybe<StackWhereStageInput>;
  documentInStages_none?: InputMaybe<StackWhereStageInput>;
  documentInStages_some?: InputMaybe<StackWhereStageInput>;
  framework?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  framework_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  framework_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  framework_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  framework_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  framework_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  framework_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  framework_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  framework_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  framework_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  language_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  language_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  language_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  language_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  language_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  language_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  language_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  language_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  language_starts_with?: InputMaybe<Scalars['String']>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  libraries?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  libraries_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  libraries_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  libraries_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  libraries_not?: InputMaybe<Array<Scalars['String']>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<StackWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<StackWhereInput>>;
  projects_every?: InputMaybe<ProjectWhereInput>;
  projects_none?: InputMaybe<ProjectWhereInput>;
  projects_some?: InputMaybe<ProjectWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum StackOrderByInput {
  CategoriesAsc = 'categories_ASC',
  CategoriesDesc = 'categories_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DatabasesAsc = 'databases_ASC',
  DatabasesDesc = 'databases_DESC',
  FrameworkAsc = 'framework_ASC',
  FrameworkDesc = 'framework_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  LibrariesAsc = 'libraries_ASC',
  LibrariesDesc = 'libraries_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StackUpdateInput = {
  categories?: InputMaybe<Array<StackCategory>>;
  databases?: InputMaybe<Array<Scalars['String']>>;
  framework?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  libraries?: InputMaybe<Array<Scalars['String']>>;
  projects?: InputMaybe<ProjectUpdateManyInlineInput>;
};

export type StackUpdateManyInlineInput = {
  /** Connect multiple existing Stack documents */
  connect?: InputMaybe<Array<StackConnectInput>>;
  /** Create and connect multiple Stack documents */
  create?: InputMaybe<Array<StackCreateInput>>;
  /** Delete multiple Stack documents */
  delete?: InputMaybe<Array<StackWhereUniqueInput>>;
  /** Disconnect multiple Stack documents */
  disconnect?: InputMaybe<Array<StackWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Stack documents */
  set?: InputMaybe<Array<StackWhereUniqueInput>>;
  /** Update multiple Stack documents */
  update?: InputMaybe<Array<StackUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Stack documents */
  upsert?: InputMaybe<Array<StackUpsertWithNestedWhereUniqueInput>>;
};

export type StackUpdateManyInput = {
  categories?: InputMaybe<Array<StackCategory>>;
  databases?: InputMaybe<Array<Scalars['String']>>;
  framework?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  libraries?: InputMaybe<Array<Scalars['String']>>;
};

export type StackUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: StackUpdateManyInput;
  /** Document search */
  where: StackWhereInput;
};

export type StackUpdateOneInlineInput = {
  /** Connect existing Stack document */
  connect?: InputMaybe<StackWhereUniqueInput>;
  /** Create and connect one Stack document */
  create?: InputMaybe<StackCreateInput>;
  /** Delete currently connected Stack document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Stack document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Stack document */
  update?: InputMaybe<StackUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Stack document */
  upsert?: InputMaybe<StackUpsertWithNestedWhereUniqueInput>;
};

export type StackUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: StackUpdateInput;
  /** Unique document search */
  where: StackWhereUniqueInput;
};

export type StackUpsertInput = {
  /** Create document if it didn't exist */
  create: StackCreateInput;
  /** Update document if it exists */
  update: StackUpdateInput;
};

export type StackUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: StackUpsertInput;
  /** Unique document search */
  where: StackWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type StackWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type StackWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<StackWhereInput>>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  categories?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array contains *all* items provided to the filter */
  categories_contains_all?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  categories_contains_none?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array contains at least one item provided to the filter */
  categories_contains_some?: InputMaybe<Array<StackCategory>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  categories_not?: InputMaybe<Array<StackCategory>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  databases?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  databases_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  databases_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  databases_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  databases_not?: InputMaybe<Array<Scalars['String']>>;
  documentInStages_every?: InputMaybe<StackWhereStageInput>;
  documentInStages_none?: InputMaybe<StackWhereStageInput>;
  documentInStages_some?: InputMaybe<StackWhereStageInput>;
  framework?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  framework_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  framework_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  framework_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  framework_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  framework_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  framework_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  framework_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  framework_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  framework_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  language_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  language_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  language_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  language_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  language_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  language_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  language_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  language_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  language_starts_with?: InputMaybe<Scalars['String']>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  libraries?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains *all* items provided to the filter */
  libraries_contains_all?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  libraries_contains_none?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array contains at least one item provided to the filter */
  libraries_contains_some?: InputMaybe<Array<Scalars['String']>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  libraries_not?: InputMaybe<Array<Scalars['String']>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<StackWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<StackWhereInput>>;
  projects_every?: InputMaybe<ProjectWhereInput>;
  projects_none?: InputMaybe<ProjectWhereInput>;
  projects_some?: InputMaybe<ProjectWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type StackWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<StackWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<StackWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<StackWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<StackWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Stack record uniquely */
export type StackWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type Timeline = Node & {
  __typename?: 'Timeline';
  achievements: Array<Achievement>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Timeline>;
  /** List of Timeline versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  year: Scalars['Int'];
};


export type TimelineAchievementsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AchievementOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AchievementWhereInput>;
};


export type TimelineCreatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type TimelineDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type TimelineHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TimelinePublishedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};


export type TimelineScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type TimelineUpdatedByArgs = {
  locales?: InputMaybe<Array<Locale>>;
};

export type TimelineConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TimelineWhereUniqueInput;
};

/** A connection to a list of items. */
export type TimelineConnection = {
  __typename?: 'TimelineConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TimelineEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TimelineCreateInput = {
  achievements?: InputMaybe<AchievementCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  year: Scalars['Int'];
};

export type TimelineCreateManyInlineInput = {
  /** Connect multiple existing Timeline documents */
  connect?: InputMaybe<Array<TimelineWhereUniqueInput>>;
  /** Create and connect multiple existing Timeline documents */
  create?: InputMaybe<Array<TimelineCreateInput>>;
};

export type TimelineCreateOneInlineInput = {
  /** Connect one existing Timeline document */
  connect?: InputMaybe<TimelineWhereUniqueInput>;
  /** Create and connect one Timeline document */
  create?: InputMaybe<TimelineCreateInput>;
};

/** An edge in a connection. */
export type TimelineEdge = {
  __typename?: 'TimelineEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Timeline;
};

/** Identifies documents */
export type TimelineManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  achievements_every?: InputMaybe<AchievementWhereInput>;
  achievements_none?: InputMaybe<AchievementWhereInput>;
  achievements_some?: InputMaybe<AchievementWhereInput>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TimelineWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<TimelineWhereStageInput>;
  documentInStages_none?: InputMaybe<TimelineWhereStageInput>;
  documentInStages_some?: InputMaybe<TimelineWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TimelineWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TimelineWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  year?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  year_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  year_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  year_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  year_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  year_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  year_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  year_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export enum TimelineOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC'
}

export type TimelineUpdateInput = {
  achievements?: InputMaybe<AchievementUpdateManyInlineInput>;
  year?: InputMaybe<Scalars['Int']>;
};

export type TimelineUpdateManyInlineInput = {
  /** Connect multiple existing Timeline documents */
  connect?: InputMaybe<Array<TimelineConnectInput>>;
  /** Create and connect multiple Timeline documents */
  create?: InputMaybe<Array<TimelineCreateInput>>;
  /** Delete multiple Timeline documents */
  delete?: InputMaybe<Array<TimelineWhereUniqueInput>>;
  /** Disconnect multiple Timeline documents */
  disconnect?: InputMaybe<Array<TimelineWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Timeline documents */
  set?: InputMaybe<Array<TimelineWhereUniqueInput>>;
  /** Update multiple Timeline documents */
  update?: InputMaybe<Array<TimelineUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Timeline documents */
  upsert?: InputMaybe<Array<TimelineUpsertWithNestedWhereUniqueInput>>;
};

export type TimelineUpdateManyInput = {
  year?: InputMaybe<Scalars['Int']>;
};

export type TimelineUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TimelineUpdateManyInput;
  /** Document search */
  where: TimelineWhereInput;
};

export type TimelineUpdateOneInlineInput = {
  /** Connect existing Timeline document */
  connect?: InputMaybe<TimelineWhereUniqueInput>;
  /** Create and connect one Timeline document */
  create?: InputMaybe<TimelineCreateInput>;
  /** Delete currently connected Timeline document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Timeline document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Timeline document */
  update?: InputMaybe<TimelineUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Timeline document */
  upsert?: InputMaybe<TimelineUpsertWithNestedWhereUniqueInput>;
};

export type TimelineUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TimelineUpdateInput;
  /** Unique document search */
  where: TimelineWhereUniqueInput;
};

export type TimelineUpsertInput = {
  /** Create document if it didn't exist */
  create: TimelineCreateInput;
  /** Update document if it exists */
  update: TimelineUpdateInput;
};

export type TimelineUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TimelineUpsertInput;
  /** Unique document search */
  where: TimelineWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TimelineWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TimelineWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  achievements_every?: InputMaybe<AchievementWhereInput>;
  achievements_none?: InputMaybe<AchievementWhereInput>;
  achievements_some?: InputMaybe<AchievementWhereInput>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TimelineWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<TimelineWhereStageInput>;
  documentInStages_none?: InputMaybe<TimelineWhereStageInput>;
  documentInStages_some?: InputMaybe<TimelineWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TimelineWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TimelineWhereInput>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  year?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  year_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  year_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  year_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  year_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  year_lte?: InputMaybe<Scalars['Int']>;
  /** All values that are not equal to given value. */
  year_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  year_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type TimelineWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TimelineWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TimelineWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TimelineWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TimelineWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Timeline record uniquely */
export type TimelineWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values that are not equal to given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** All values that are not equal to given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** All values that are not equal to given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values that are not equal to given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type ContentFieldsFragment = { __typename?: 'Content', id: string, url?: string | null, title: string, subtitle?: string | null, image?: { __typename?: 'Asset', id: string, url: string } | null };

export type StackFieldsFragment = { __typename?: 'Stack', id: string, projects: Array<{ __typename?: 'Project', id: string, title: string, liveUrl?: string | null, githubUrl?: string | null, description?: string | null, stack?: { __typename?: 'Stack', id: string, framework?: string | null, language: string, libraries: Array<string>, databases: Array<string>, categories: Array<StackCategory> } | null, mainImage: { __typename?: 'Asset', id: string, url: string } }> };

export type GetAboutMePageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAboutMePageQuery = { __typename?: 'Query', aboutMePage?: { __typename?: 'AboutMePage', sections: Array<{ __typename?: 'Section', id: string, title: string, description?: { __typename?: 'RichText', raw: any } | null, images: Array<{ __typename?: 'Image', id: string, subCaption?: string | null, mainCaption: string, asset: { __typename?: 'Asset', id: string, url: string } }> }> } | null };

export type GetHomePageQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<StackCategory> | StackCategory>;
}>;


export type GetHomePageQuery = { __typename?: 'Query', initialProjects: Array<{ __typename?: 'Stack', id: string, projects: Array<{ __typename?: 'Project', id: string, title: string, liveUrl?: string | null, githubUrl?: string | null, description?: string | null, stack?: { __typename?: 'Stack', id: string, framework?: string | null, language: string, libraries: Array<string>, databases: Array<string>, categories: Array<StackCategory> } | null, mainImage: { __typename?: 'Asset', id: string, url: string } }> }>, stacks: Array<{ __typename?: 'Stack', id: string, categories: Array<StackCategory> }> };

export type GetLearningJournalEntryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLearningJournalEntryQuery = { __typename?: 'Query', learningJournal?: { __typename?: 'LearningJournal', id: string, work: Array<string>, date: any, curiosity: Array<string>, programming: Array<string> } | null };

export type GetLearningJournalPageQueryVariables = Exact<{
  where?: InputMaybe<LearningJournalWhereInput>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetLearningJournalPageQuery = { __typename?: 'Query', learningJournalsConnection: { __typename?: 'LearningJournalConnection', aggregate: { __typename?: 'Aggregate', count: number }, edges: Array<{ __typename?: 'LearningJournalEdge', node: { __typename?: 'LearningJournal', id: string, work: Array<string>, date: any, curiosity: Array<string>, programming: Array<string>, resources: Array<{ __typename?: 'Resource', id: string, url: string, label: string }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type GetTalksPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTalksPageQuery = { __typename?: 'Query', talks: Array<{ __typename?: 'Content', id: string, url?: string | null, title: string, subtitle?: string | null, image?: { __typename?: 'Asset', id: string, url: string } | null }>, podcasts: Array<{ __typename?: 'Content', id: string, url?: string | null, title: string, subtitle?: string | null, image?: { __typename?: 'Asset', id: string, url: string } | null }> };

export type GetTimelineQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetTimelineQuery = { __typename?: 'Query', timeline: Array<{ __typename?: 'Timeline', id: string, year: number, achievements: Array<{ __typename?: 'Achievement', id: string, title: string, description?: string | null }> }>, timelinesConnection: { __typename?: 'TimelineConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } };
