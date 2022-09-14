import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useGetProductsQuery, useMeQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/pagePublic";
import { withApollo } from "../../lib/withApollo";

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery()

  return (
    <div>
      <h1>Hello world!</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
     return await getServerPageGetProducts(null, ctx);
  }
})

export default withApollo(
  ssrGetProducts.withPage()(Home)
);