import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./Theme";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LandingPage from "./page/Landing/LandingPage";
import LoginPresenter from "./page/Login/LoginPresenter";
import Community from "./page/Community/Community";
import View from "./page/View/ViewPresenter";
<<<<<<< HEAD
import WritingPresenter from "./page/Writing/WritingPresenter";
import MypagePresenter from "./page/Mypage/MypagePresenter";
import MyPageEdit from "./page/MyPageEdit";
=======
import Writing from "./page/Writing/Writing";
import MyPage from "./page/Mypage/MyPage";
import MyPageEdit from "./page/Mypage/MyPageEdit";
>>>>>>> b05c5625c19a995e2fa0e57d2f8c2226a14bb97e
import HikingMap from "./page/HikingMap";
import { NotFound } from "./page/NotFound";
import EditWriting from "./page/EditWriting/EditWritingPresenter";
import SignupNotice from "./page/SignupNotice";
import Gallery from "./page/Gallery/Gallery";
import Gallery2 from "./page/Gallery/Gallery2";
import Crop from "./page/Crop";
import PostGallery from "./page/PostGallery";
import Calendar from "./page/Calendar/Calendar";
import SignupPresenter from "./page/Signup/SignupPresenter";

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
            <Route path="/signup" element={<SignupPresenter />} />
            <Route path="/community" element={<Community />} />
            <Route path="/writing" element={<WritingPresenter />} />
            {/* <Route path="/boards/edit/:boardSeq" element={<Writing />} /> */}
            <Route path="/boards/edit/:boardSeq" element={<EditWriting />} />
            <Route path="/mypage" element={<MypagePresenter />} />
            <Route path="/mypageedit" element={<MyPageEdit />} />
            <Route path="/hikingmap" element={<HikingMap />} />
            <Route path="/boards/:boardSeq" element={<View />} />
            <Route path="/signupnotice" element={<SignupNotice />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery2" element={<Gallery2 />} />
            <Route path="/crop" element={<Crop />} />
            <Route path="/postGallery" element={<PostGallery />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
