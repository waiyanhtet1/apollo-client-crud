import { gql, useQuery } from "@apollo/client";

const GET_SINGLEUSER = gql`
  query GetSingleUser($id: Int!) {
    posts_by_pk(id: $id) {
      id
      title
      content
      user {
        name
        email
      }
      comments {
        id
        comment
        user {
          name
        }
      }
    }
  }
`;

const usePostDetail = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLEUSER, {
    variables: { id },
  });

  return {
    loading,
    error,
    data,
  };
};

export default usePostDetail;
