import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./Theme";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./page/LandingPage";
import LoginPresenter from "./page/Login/LoginPresenter";
import Signup from "./page/Signup";
import Community from "./page/Community/Community";
import View from "./page/View/ViewPresenter";
import Writing from "./page/Writing/Writing";
import MyPage from "./page/Mypage/MyPage";
import MyPageEdit from "./page/MyPageEdit";
import HikingMap from "./page/HikingMap";
import NotFound from "./page/NotFound";

import View2 from "./page/Community/View2";
import Community2 from "./page/Community/Community2";

import Kakao from "./page/KakaoMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPresenter />,
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
  {
    path: "/view2/:boardSeq",
    element: <View2 />,
  },
  {
    path: "/kakao",
    element: <Kakao />,
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
