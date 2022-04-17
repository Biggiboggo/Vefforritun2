import { asText } from '@prismicio/helpers';
import { fetchFromPrismic } from '../api/prismic';
import { PrismicRichText, Slice } from '../types';
import Image from 'next/image';
import Link from 'next/link';

//Setti any þar sem var vesen að skilgreina, skilgreindi items þá var vesen með title og body þannig ég gafst upp :)

function Container({ contents }: {
  contents: Array<{
    primary?: Slice | undefined;
  }>
}) {
  return (
    <section>
      {contents.map((item, i) => {
        const context = asText(item.primary?.context);
        const img1 = JSON.stringify(item.primary?.img.url);
        const imgurl = img1.replace(/['"]+/g, '');
        const img2 = JSON.stringify(item.primary?.img.alt);
        const imgalt = img2.replace(/['"]+/g, '');
        const img3 = JSON.stringify(item.primary?.img.dimensions?.width);
        const imgwidth = img3.replace(/['"]+/g, '');
        const img4 = JSON.stringify(item.primary?.img.dimensions?.height);
        const imgheight = img4.replace(/['"]+/g, '');
        const date = JSON.stringify(item.primary?.date)
        const date2 = date.replace(/['"]+/g, '');
        const color = JSON.stringify(item.primary?.color)
        const color2 = color.replace(/['"]+/g, '');

        if (!context) {
          return null;
        }
        
        return (
          <section key={i}>
            <p>Text: {context}</p>
            <Image src={imgurl} alt={imgalt} width={parseInt(imgwidth)} height={parseInt(imgheight)}/>
            <p>Date: {date2}</p>
            <p>Color: {color2}</p>
            <style jsx>{`
              section {
                background-color: ${color2};
              }
            `}</style>
            <Link href={`/`}>Til baka</Link>
          </section>
        );
      })}
    </section>
  );
}

function Container2({ contents }: {
  contents: PrismicRichText;
}) {
  console.log(contents);
  return (
    <section>
      {//@ts-ignore 
      contents.map((item, i) => {
        const title = JSON.stringify(item?.text);
        const title2 = title.replace(/['"]+/g, '');

        if (!title) {
          return null;
        }
        
        return (
          <section key={i}>
            <title>{title2}</title>
            <h1>{title2}</h1>
          </section>
        );
      })}
    </section>    
  );
}

export default function Home({ items }: any) {
  return (
    <section>
      <Container2 contents={items.page?.title ?? []} />
      <Container contents={items.page?.body ?? []} />
    </section>
  );
}

const query = `
query($uid: String = "")
{
  page(uid:$uid, lang: "is") {
    title
    body {
      ... on PageBodySlice {
        primary {
          context
          img
          date
          color
        }
      }
    }
  }
}
`;

type PrismicResponse = {
  page?: Array<{
    title?: string;
    body?: Array<{
      primary?: Slice;
      }>;
    }>;
  }

export async function getServerSideProps({ params }: any) {
  const { uid } = params;
  const result = await fetchFromPrismic<PrismicResponse>(query, { uid });

  const items = result;
  if (!result) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: { items },
  };
}
