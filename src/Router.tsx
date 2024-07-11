import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./Root";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Diagnose from "./pages/Diagnose";
import Admin from "./pages/Admin";
import RootAdmin from "./RootAdmin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Index />} index />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/diagnose" element={<Diagnose />} />
      </Route>
      <Route path="/admin" element={<RootAdmin />}>
        <Route element={<Admin />} index />
      </Route>
    </>
  )
);

export default router;
