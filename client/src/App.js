import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./Theme";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./page/LandingPage";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Community from "./page/Community";
import View from "./page/View";
import Writing from "./page/Writing";
import MyPage from "./page/MyPage";
import MyPageEdit from "./page/MyPageEdit";
import HikingMap from "./page/HikingMap";
import NotFound from "./page/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/writing",
    element: <Writing />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/mypageedit",
    element: <MyPageEdit />,
  },
  {
    path: "/hikingmap",
    element: <HikingMap />,
  },
]);

const GlobalStyle = createGlobalStyle`
*{
  font-family:"Noto Sans CJK KR"
}
body {
  margin: 0;
  padding: 0;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
