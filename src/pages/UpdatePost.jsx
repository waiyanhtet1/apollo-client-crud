import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_POSTS } from "../hooks/usePost";

const UPDATE_POST = gql`
  mutation UpdateMutation($id: Int!, $title: String!, $content: String!) {
    update_posts_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, content: $content }
    ) {
      id
      title
      content
    }
  }
`;
const UpdatePost = ({ id, title, content, setIsUpdate }) => {
  const [updatePostMutation, { loading, error }] = useMutation(UPDATE_POST);

  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateContent, setUpdateContent] = useState(content);

  const handleUpdate = async () => {
    try {
      await updatePostMutation({
        variables: { id, title: updateTitle, content: updateContent },
        refetchQueries: [GET_POSTS],
        onCompleted: () => setIsUpdate(false),
      });
    } catch (error) {
      console.log("Error at updating post!");
    }
  };

  if (loading) return "Updating...";
  if (error) return "Fail to update!";

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl text-slate-900 font-bold">Update Post</h1>
      <input
        type="text"
        className="p-2 text-md border-slate-500 border outline-none"
        placeholder="Title"
        value={updateTitle}
        onChange={(e) => setUpdateTitle(e.target.value)}
      />
      <textarea
        name=""
        id=""
        placeholder="Content"
        className="p-2 text-md border-slate-500 border outline-none"
        onChange={(e) => setUpdateContent(e.target.value)}
      >
        {updateContent}
      </textarea>
      <button onClick={handleUpdate} className="p-2 bg-yellow-500 text-white">
        Update
      </button>
    </div>
  );
};

export default UpdatePost;
