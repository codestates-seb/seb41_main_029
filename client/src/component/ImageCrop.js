import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "./Demo.css";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
export const Demo = (props) => {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  // 모달
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  //--------------------------------//
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { style: { width: "100%" } },
      React.createElement("input", { type: "file", onChange: onChange }),
      React.createElement("button", null, "Use default img"),
      React.createElement(
        "button",
        { style: { float: "right" }, onClick: openModalHandler },
        "X"
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(Cropper, {
        style: { height: 400, width: "100%" },
        zoomTo: 0.5,
        // initialAspectRatio: 1,
        aspectRatio: 0.7,
        preview: ".img-preview",
        src: image,
        viewMode: 1,
        minCropBoxHeight: 10,
        minCropBoxWidth: 10,
        background: false,
        responsive: true,
        autoCropArea: 1,
        checkOrientation: false,
        onInitialized: (instance) => {
          setCropper(instance);
        },
        guides: true,
      })
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "box", style: { width: "50%", float: "right" } }
        // React.createElement("h1", null, "Preview"),
        // React.createElement("div", {
        //   className: "img-preview",
        //   style:
        //     // { width: "100%", float: "left", height: "300px" },
        //     { width: "300px", float: "left", height: "300px" },
        // })
      ),
      React.createElement(
        "div",
        {
          className: "box",
          style: { width: "50%", float: "right", height: "300px" },
        },
        React.createElement(
          "h1",
          null,
          React.createElement("span", null, "Crop"),
          React.createElement(
            "button",
            { style: { float: "right" }, onClick: getCropData },
            "이미지 업로드"
          ),
          // 버튼을 누르면 cropdata가 이미지 첨부 div에 뜨도록
          React.createElement(
            "button",
            { style: { float: "right" }, onClick: getCropData },
            "Crop Image"
          )
        ),
        React.createElement("img", {
          style: { width: "100%" },
          src: cropData,
          alt: "cropped",
        })
      )
    ),
    React.createElement("br", { style: { clear: "both" } })
  );
};
export default Demo;
