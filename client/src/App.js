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
import WritingPresenter from "./page/Writing/WritingPresenter";
import MypagePresenter from "./page/Mypage/MypagePresenter";
import MyPageEdit from "./page/MyPageEdit";
import HikingMap from "./page/HikingMap";
import { NotFound } from "./page/NotFound";
import EditWriting from "./page/EditWriting/EditWritingPresenter";
import SignupNotice from "./page/SignupNotice";
import axios from "axios";
import Gallery from "./page/Gallery";
import Test from "./page/Test";
import Gallery2 from "./page/Gallery2";
import Crop from "./page/Crop";
import PostGallery from "./page/PostGallery";

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
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/crop" element={<Crop />} />
            <Route path="/postGallery" element={<PostGallery />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
