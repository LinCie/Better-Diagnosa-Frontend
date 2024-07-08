import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./Root";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Index />} index />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </>
  )
);

export default router;
