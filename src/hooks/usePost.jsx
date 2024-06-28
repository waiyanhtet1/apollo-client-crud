import { gql, useQuery } from "@apollo/client";

export const GET_POSTS = gql`
  query MyQuery {
    posts(order_by: { id: desc }) {
      id
      title
      user {
        name
      }
    }
  }
`;

const usePost = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  return {
    loading,
    error,
    data,
  };
};

export default usePost;
