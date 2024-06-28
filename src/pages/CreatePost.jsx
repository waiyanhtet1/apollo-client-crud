import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_POSTS } from "../hooks/usePost";

const NEW_POST = gql`
  mutation NewPostMutation($title: String!, $content: String!) {
    insert_posts(objects: { title: $title, content: $content, author: 6 }) {
      returning {
        id
        title
        content
      }
    }
  }
`;

const CreatePost = () => {
  const [createPost, { loading, error, data }] = useMutation(NEW_POST);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (loading) return "Creating...";
  if (error) return "Error!";

  console.log("return data", data);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl text-slate-900 font-bold">New Post</h1>
      <input
        type="text"
        className="p-2 text-md border-slate-500 border outline-none"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name=""
        id=""
        placeholder="Content"
        className="p-2 text-md border-slate-500 border outline-none"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="p-2 bg-slate-500 text-white"
        onClick={() =>
          createPost({
            variables: {
              title: title,
              content: content,
            },
            refetchQueries: [GET_POSTS],
          })
        }
      >
        Create
      </button>
    </div>
  );
};

export default CreatePost;
