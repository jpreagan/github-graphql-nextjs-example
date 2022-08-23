import type { Repository } from "../types";
import Head from "next/head";
import { GraphQLClient, gql } from "graphql-request";
import Header from "../components/header";
import Message from "../components/message";
import Card from "../components/card";

type SsgProps = {
  data: Repository[];
};

const Ssg = ({ data }: SsgProps) => {
  return (
    <>
      <Head>
        <title>Static site generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Message>This page was successfuly loaded using SSG!</Message>
        <section>
          {data.map(
            ({
              id,
              url,
              name,
              description,
              primaryLanguage,
              stargazerCount,
              forkCount,
            }) => (
              <Card
                key={id}
                url={url}
                name={name}
                description={description}
                primaryLanguage={primaryLanguage}
                stargazerCount={stargazerCount}
                forkCount={forkCount}
              />
            )
          )}
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const endpoint = "https://api.github.com/graphql";

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const query = gql`
    {
      viewer {
        login
        repositories(
          first: 20
          privacy: PUBLIC
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          nodes {
            id
            name
            description
            url
            primaryLanguage {
              color
              id
              name
            }
            forkCount
            stargazerCount
          }
        }
      }
    }
  `;

  const {
    viewer: {
      repositories: { nodes: data },
    },
  } = await client.request(query);

  return { props: { data } };
}

export default Ssg;
