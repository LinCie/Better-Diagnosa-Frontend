import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}></Route>
    </>
  )
);

export default router;
