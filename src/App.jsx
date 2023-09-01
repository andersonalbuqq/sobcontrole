import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Main from "./layouts/mainlayout";
import Summary from "./pages/aplication/summary";
import AddTransaction from "./pages/aplication/addtransacion";
import EditTransaction from "./pages/aplication/edittransaction";
import MyTransactions from "./pages/aplication/mytransactions";
import ManageAccounts from "./pages/aplication/manageaccounts";
import Profile from "./pages/aplication/profile";
import About from "./pages/aplication/about";
import NotFound from "./pages/aplication/notfound";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <Main>
                <Summary />
              </Main>
            }
          ></Route>
          <Route
            path="/addtransaction"
            element={
              <Main>
                <AddTransaction />
              </Main>
            }
          ></Route>
          <Route
            path="/edittransaction/:id"
            element={
              <Main>
                <EditTransaction />
              </Main>
            }
          ></Route>
          <Route
            path="/mytransactions"
            element={
              <Main>
                <MyTransactions />
              </Main>
            }
          ></Route>
          <Route
            path="/myaccounts"
            element={
              <Main>
                <ManageAccounts />
              </Main>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Main>
                <Profile />
              </Main>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <Main>
                <About />
              </Main>
            }
          ></Route>
          <Route
            path="/*"
            element={
              <Main>
                <NotFound />
              </Main>
            }
          ></Route>
      </Routes>
    </Router>
  );
}

export default App;
