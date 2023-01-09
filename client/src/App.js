import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "styled-components";
import theme from "./Theme";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./page/LandingPage";
import Login from "./page/Login";
import { Button } from "./component/Button";

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
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
        <Button></Button>
      </ThemeProvider>
    </>
  );
}

export default App;
