import { Link } from "react-router-dom";
import usePost from "../hooks/usePost";

const AllPosts = () => {
  const { loading, error, data } = usePost();

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className="flex flex-col gap-5">
      {data?.posts?.map((post) => (
        <div key={post.id} className="bg-slate-200 p-5 rounded-lg">
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-600">Created By:</p>
            <p className="font-bold text-red-400">{post.user.name}</p>
          </div>
          <div className="flex justify-between ">
            <h3 className="mt-3 text-slate-900 font-bold ">{post.title}</h3>

            <Link to={`/${post.id}`}>
              <button className="text-md">See More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
