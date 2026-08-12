export type Content = {
  id: string;
  url: string;
  title: string;
  subtitle: string;
};

type TalksPageData = {
  talks: Content[];
  podcasts: Content[];
};

const QUERY = `
  query GetTalksPage {
    talks: contents(where: { category: Talk }) {
      id
      url
      title
      subtitle
    }
    podcasts: contents(where: { category: PodcastParticipation }) {
      id
      url
      title
      subtitle
    }
  }
`;

export async function getTalksPage(): Promise<TalksPageData> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL_ENDPOINT;

  if (!endpoint) {
    return { talks: [], podcasts: [] };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      // Revalidate the CMS content once per hour.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return { talks: [], podcasts: [] };
    }

    const json = (await res.json()) as { data?: TalksPageData };
    return {
      talks: json.data?.talks ?? [],
      podcasts: json.data?.podcasts ?? [],
    };
  } catch {
    return { talks: [], podcasts: [] };
  }
}
