import Link from 'next/link';
import { asText } from '@prismicio/helpers';
import { fetchFromPrismic } from '../api/prismic';
import { Homepage } from '../types';

type Props = {
  items?: Array<{
    node?: Homepage | undefined;
  }>;
}

function Container({ contents }: {
  contents: Array<{
    node?: Homepage | undefined;
  }>
}) {
  console.log(contents);
  return (
    <section>
      {contents.map((item, i) => {
        const title = asText(item.node?.title);
        const intro = asText(item.node?.intro);
        const linkname = asText(item.node?.link.title);
        const link = JSON.stringify(item.node?.link._meta.uid);
        const uri = link.replace(/['"]+/g, '');
        const linkname2 = asText(item.node?.link2.title);
        const link2 = JSON.stringify(item.node?.link2._meta.uid);
        const uri2 = link2.replace(/['"]+/g, '');

        if (!title || !intro) {
          return null;
        }

        return (
          <section key={i}>
            <h1>{title}</h1>
            <p>{intro}</p>
            <Link href={`/${uri}`}>{linkname}</Link><br></br>
            <Link href={`/${uri2}`}>{linkname2}</Link>
          </section>
        );
      })}
    </section>
  );
}

export default function Home({ items }: Props) {
  return (
    <section>
      <Container contents={items ?? []} />
    </section>
  );
}

const query = `
{
  allHomepages{
    edges{
      node{
        title
        intro
        link {
          ... on Page {
            title
            _meta {
              uid
            }
          }
        }
        link2 {
          ... on Page {
            title
            _meta {
              uid
            }
          }
        }
      }
    }
  }
}
`;

type PrismicResponse = {
  allHomepages?: {
    edges?: Array<{
      node?: Homepage;
    }>;
  }
}

export async function getServerSideProps() {
  const result = await fetchFromPrismic<PrismicResponse>(query);

  const items = result.allHomepages?.edges;

  return {
    props: { items },
  };
}