import { patchUser, postImage } from "../../api/userAPI";
import { useState } from "react";

let a = "";

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");
  return canvas;
}

export const generateDownload = async (imageSrc, crop) => {
  if (!crop || !imageSrc) {
    return;
  }

  const canvas = await getCroppedImg(imageSrc, crop);
  //   const cropped = await getCroppedImg(imageSrc, crop);

  //   const dataURLtoFile = (dataurl, filename) => {
  //     const arr = dataurl.split(",");
  //     const mime = arr[0].match(/:(.*?);/)[1];
  //     const bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     const u8arr = new Uint8Array(n);

  //     while (n--) u8arr[n] = bstr.charCodeAt(n);

  //     return new File([u8arr], filename, { type: mime });
  //   };

  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);
      console.log(previewUrl);

      console.log(blob);

      let myfile = blobToFile(blob, "img.jpg");
      console.log(myfile);
      a = myfile;

      //   const anchor = document.createElement("a");
      //   anchor.download = "image.jpeg";
      //   anchor.href = URL.createObjectURL(blob);
      //   anchor.click();

      //   window.URL.revokeObjectURL(previewUrl);

      //   const formData = new FormData();
      //   formData.append("files", myfile);
      //   console.log(formData);

      //   console.log(res);
      //   let profilImageUrl = res.data[0].split("?")[0];
      //   console.log(profilImageUrl);
    },
    "image/jpeg",
    0.66
  );
  const formData = new FormData();
  formData.append("files", a);
  console.log(a);
  console.log(formData);
  const res = await postImage(formData);
  console.log(res);
  let profilImageUrl = res.data[0].split("?")[0];
  console.log(profilImageUrl);
};
