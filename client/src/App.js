import { BrowserRouter, Routes, Route } from "react-router-dom";
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
// import EditWritig from "./page/EditWriting/EditWritingPresenter";
import View2 from "./page/Community/View2";
import Community2 from "./page/Community/Community2";

import EditWriting from "./page/EditWriting/EditWritingPresenter";

//   path: "/boards/edit/:boardSeq",
//   element: <EditWriting />,
// },

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
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPresenter />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/community" element={<Community />} />
            <Route path="/writing" element={<Writing />} />
            {/* <Route path="/boards/edit/:boardSeq" element={<Writing />} /> */}
            <Route path="/boards/edit/:boardSeq" element={<EditWriting />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypageedit" element={<MyPageEdit />} />
            <Route path="/hikingmap" element={<HikingMap />} />
            <Route path="/boards/:boardSeq" element={<View />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
