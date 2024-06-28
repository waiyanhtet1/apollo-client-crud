import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index path="/" element={<AllPosts />} />
      <Route index path="/:id" element={<PostDetail />} />
    </>
  )
);

const App = () => {
  return (
    <div className="max-w-[30rem] my-[5rem] mx-auto">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
