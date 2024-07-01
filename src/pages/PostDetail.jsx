import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";

const PostDetail = () => {
  const { id } = useParams();

  const { loading, error, data } = usePostDetail(id);

  const [isUpdate, setIsUpdate] = useState(false);

  if (loading) return "Loading...";
  if (error) return "Error!";

  const res = data && data?.posts_by_pk;

  return (
    <div className="flex flex-col gap-8">
      <Link to={-1}>
        <button className="bg-slate-500 text-white p-2 rounded">Back</button>
      </Link>

      {!isUpdate ? (
        <>
          <h1 className="font-bold text-2xl">{res.title}</h1>
          <p className="text-lg">{res.content}</p>
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-500">Created By:</p>
            <p className="text-sm">
              {res.user.name} - {res.user.email}
            </p>
          </div>
        </>
      ) : (
        <UpdatePost
          id={res.id}
          title={res.title}
          content={res.content}
          setIsUpdate={setIsUpdate}
        />
      )}
      <div className="self-end">
        <button
          className={`p-2 ${
            isUpdate ? "bg-slate-500" : "bg-yellow-500"
          } text-white rounded mr-4`}
          onClick={() => setIsUpdate((prev) => !prev)}
        >
          {isUpdate ? "Cancel" : "Update"}
        </button>
        <DeletePost id={res.id} />
      </div>
      <div>
        <p className="font-bold">Comments:</p>
        {res.comments?.length === 0 ? (
          <div className="text-xs">NO COMMENTS</div>
        ) : (
          res.comments?.map((comment) => (
            <div key={comment.id} className="mb-5">
              <p className="text-sm text-slate-600">
                {comment.user.name} says:
              </p>
              <p className="text-slate-900 text-sm">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
