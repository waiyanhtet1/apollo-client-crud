import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";

const PostDetail = () => {
  const { id } = useParams();

  const { loading, error, data } = usePostDetail(id);

  if (loading) return "Loading...";
  if (error) return "Error!";

  const res = data && data?.posts_by_pk;

  console.log(res);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-2xl">{res.title}</h1>
      <p className="text-lg">{res.content}</p>
      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-500">Created By:</p>
        <p className="text-sm">
          {res.user.name} - {res.user.email}
        </p>
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