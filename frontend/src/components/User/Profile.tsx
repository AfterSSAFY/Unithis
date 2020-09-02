import React, { useEffect, useState } from "react";
import http, { imageURL } from "api/http-common";

export const Profile = (props: any) => {
  const [imagePreview, setImagePreview] = useState<string>(
    require("assets/icon/profile.png")
  );

  useEffect(() => {
    if (props["token"].profile) {
      setImagePreview(imageURL + props["token"].profile);
    }
  }, []);

  const onProfileImageDeleteHandle = () => {
    props.setState(undefined, "UploadFile");
    setImagePreview(require("assets/icon/profile.png"));
    http
      .delete("/user/profile/" + props["token"].id)
      .then(() => {
        alert("삭제완료!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setProfileImageAPI = (uploadFile: File) => {
    let formData = new FormData();
    formData.append("userId", props["token"].id);
    formData.append("image", uploadFile);
    http
      .patch("/user/profile/" + props["token"].id, formData, {
        headers: {
          "Content-Type": "multipart/form-data; charset=utf-8",
          Accept: "application/json"
        }
      })
      .then(() => {
        alert("등록완료!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const loadFile = (e: any) => {
    const file = e.target.files;
    setImagePreview(URL.createObjectURL(file[0]));
    setProfileImageAPI(file[0]);
  };

  return (
    <>
      <div className="user-profile-area">
        <div className="user-profile-image-area">
          <label>
            <img
              className="user-profile-image"
              src={imagePreview}
              alt="profile"
            />
            <img
              className="user-profile-camera"
              src={require("assets/icon/profile_camera.png")}
              alt="profile"
            />

            <input
              type="file"
              onChange={loadFile}
              accept=".gif, .jpg, .png, .jpeg"
            />
          </label>
          {imagePreview !== "/static/media/profile.782adc2b.png" && (
            <img
              className="user-profile-delete"
              src={require("assets/icon/delete.png")}
              alt="delete"
              onClick={onProfileImageDeleteHandle}
            />
          )}
        </div>
        <p>{props["email"]}</p>
      </div>
    </>
  );
};
