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
import Question from "./pages/Question";
import RootAdmin from "./RootAdmin";
import History from "./pages/History";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Index />} index />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/diagnose" element={<Diagnose />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="/admin" element={<RootAdmin />}>
        <Route element={<Question />} index />
      </Route>
    </>
  )
);

export default router;
