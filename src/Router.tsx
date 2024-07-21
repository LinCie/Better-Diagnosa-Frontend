import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
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
import DiagnoseResult from "./pages/DiagnoseResult";
import AllUsers from "./pages/AllUsers";
import DengueInfo from "./pages/DengueInfo";
import { accessTokenLoader, questionLoader, userLoader } from "./loaders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Root />}
        loader={async () => {
          await accessTokenLoader();
          return await userLoader();
        }}
      >
        <Route path="/" element={<Index />} index />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/diagnose"
          element={<Diagnose />}
          loader={async () => {
            return await questionLoader();
          }}
        />
        <Route path="/result" element={<DiagnoseResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/info" element={<DengueInfo />} />
      </Route>
      <Route
        path="/admin"
        element={<RootAdmin />}
        loader={async () => {
          await accessTokenLoader();
          const user = await userLoader();
          if (user?.roles.includes("ADMIN")) {
            return user;
          }
          return redirect("/");
        }}
      >
        <Route element={<Question />} index />
        <Route path="/admin/users" element={<AllUsers />} />
      </Route>
    </>
  )
);

export default router;
