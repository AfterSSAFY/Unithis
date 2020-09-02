import React, { useEffect, useState } from "react";

export const PhotoSelecter = (props: any) => {
  const [uploadFileList, setUploadFileList] = useState<Array<File>>([]);
  const [imagePreviewList, setImagePreviewList] = useState<Array<string>>([]);

  const loadFile = (e: any) => {
    const files = e.target.files;
    let image: Array<string> = [...imagePreviewList];
    let file: Array<File> = [...uploadFileList];

    if (image.length !== 5) {
      Array.from(files).forEach((v: any) => {
        if (image.length < 5) {
          image.push(URL.createObjectURL(v));
          file.push(v);
        }
      });
    }
    setImagePreviewList(image);
    props.onPhotoSelecter(image);
    setUploadFileList(file);
    props.onFileSelecter(file);
  };

  useEffect(() => {
    if (props["item"].length !== 0) {
      setImagePreviewList(props["item"]);
    }
  }, [props.item]);

  return (
    <>
      <label>
        <figure>
          <img
            src={require("assets/icon/photo.png")}
            className="photoImage"
            alt="photoImage"
          />
          <figcaption>{imagePreviewList.length}/5</figcaption>
        </figure>
        <input
          type="file"
          onChange={loadFile}
          accept=".gif, .jpg, .png, .jpeg"
          multiple
        />
      </label>
    </>
  );
};
