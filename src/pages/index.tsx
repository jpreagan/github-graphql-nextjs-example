import type { Repository } from "../types";
import { GraphQLClient, gql } from "graphql-request";
import Card from "../components/card";

type HomeProps = {
  data: Repository[];
};

const Home = ({ data }: HomeProps) => {
  return (
    <>
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
    </>
  );
};

export async function getServerSideProps() {
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

export default Home;
