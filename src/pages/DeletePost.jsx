import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_POSTS } from "../hooks/usePost";

const DELETE_POST = gql`
  mutation DeleteMutation($id: Int!) {
    delete_posts(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const DeletePost = ({ id }) => {
  const [deletePost, { loading, error, data }] = useMutation(DELETE_POST);
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    try {
      await deletePost({
        variables: { id: itemId },
        refetchQueries: [GET_POSTS],
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "Deleting...";
  if (error) return "Error!";

  console.log(data);

  return (
    <button
      onClick={() => handleDelete(id)}
      className="text-white bg-red-500 p-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeletePost;
