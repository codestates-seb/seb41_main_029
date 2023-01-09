import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./Theme";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./page/LandingPage";
import Login from "./page/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
