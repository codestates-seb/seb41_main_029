const fontSizes = {
  fs10: "10px",
  fs12: "12px",
  fs16: "16px", // 본문 내용
  fs18: "18px",
  fs24: "24px", // 제목
  fs30: "30px",
  fs36: "36px",
  fs48: "48px",
  fs64: "64px",
};

const colors = {
  white: "#FFFFFF",
  container: "#EEEEEE",
  gray_01: "#DDDDDD",
  gray_02: "#CCCCCC",
  gray_03: "#BBBBBB",
  black: "#000000",
  main: "#62B6B7",
  main_hover: "#439A97",
  menu: "#331708",
  tag_question: "#CCD6A6",
  tag_general: "#A0C3D2",
  views: "#844700",
};

const deviceSizes = {
  mobile: "600px",
  tablet: "1336px",
};

const device = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
};

export default theme;
