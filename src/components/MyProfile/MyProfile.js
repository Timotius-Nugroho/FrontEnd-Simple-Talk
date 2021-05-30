import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserById, updateUser } from "../../redux/action/user";
import { logout } from "../../redux/action/auth";
import { Form, Image } from "react-bootstrap";
import styles from "./MyProfile.module.css";
import { ShieldLock, DoorOpen } from "react-bootstrap-icons";
import dummyPp from "../../assets/img/no-img.png";

function MyProfile(props) {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBio, setUserBio] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [userImage, setUserImage] = useState(undefined);
  const [showInput, setShowInput] = useState(false);
  const [isUpdate, setIsUpdate] = useState([false, "Tap to make changes"]);

  useEffect(() => {
    getAndSetData();
    console.log("did mount");
  }, []);

  const getAndSetData = () => {
    props.getUserById(props.userId).then((res) => {
      setUserName(res.value.data.data[0].user_name);
      setUserPhone(res.value.data.data[0].user_phone);
      setUserBio(res.value.data.data[0].user_bio);
      setPhotoProfile(
        `${process.env.REACT_APP_IMAGE_URL}${res.value.data.data[0].user_image}`
      );
    });
  };

  const handleImage = (event) => {
    console.log("change img !", event.target.files[0]);
    setUserImage(event.target.files[0]);
    if (event.target.files[0]) {
      setPhotoProfile(URL.createObjectURL(event.target.files[0]));
    } else {
      setPhotoProfile(
        `${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`
      );
      setUserImage(undefined);
    }
  };

  const handleUpdate = () => {
    setShowInput(!showInput);
    if (isUpdate[0]) {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("userPhone", userPhone);
      formData.append("userBio", userBio);
      formData.append("image", userImage);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      props.updateUser(props.userId, formData).then((res) => {
        getAndSetData();
      });
      setIsUpdate([false, "Tap to make changes"]);
    } else {
      setIsUpdate([true, "Tap to update your profile"]);
    }
  };

  const handleLogout = () => {
    props.logout(props.userId).then((res) => {
      getAndSetData();
    });
  };

  // console.log("propssnya", props);
  // console.log("dari auth", props.userId);
  console.log("SET FOTO", photoProfile);

  return (
    <>
      <Form.Group style={{ textAlign: "center" }}>
        <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
          <Image
            src={
              photoProfile !== process.env.REACT_APP_IMAGE_URL
                ? photoProfile
                : dummyPp
            }
            className={styles.pp}
          />
        </Form.Label>
        <Form.Control
          type="file"
          id="files"
          onChange={(event) => handleImage(event)}
          className={styles.updateImage}
        />
      </Form.Group>

      {showInput ? (
        <Form.Control
          className={`${styles.name} text-center`}
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          style={{ marginBottom: "6px" }}
        />
      ) : (
        <p className={`${styles.name} text-center`}>{userName}</p>
      )}

      <p
        className={`${styles.change} mb-4 text-center`}
        onClick={() => handleUpdate()}
      >
        {isUpdate[1]}
      </p>
      <p className={`${styles.section} mb-4`}>Account</p>
      {showInput ? (
        <Form.Control
          className={`${styles.info}`}
          style={{ marginLeft: "-12px", marginBottom: "6px" }}
          type="text"
          value={userPhone}
          onChange={(event) => setUserPhone(event.target.value)}
        />
      ) : (
        <p className={styles.info}>{userPhone}</p>
      )}

      <p className={styles.titleInfo}>Phone number</p>
      {showInput ? (
        <Form.Control
          className={`${styles.info}`}
          style={{ marginLeft: "-12px", marginBottom: "6px" }}
          type="text"
          value={userBio}
          onChange={(event) => setUserBio(event.target.value)}
        />
      ) : (
        <p className={styles.info}>{userBio}</p>
      )}

      <p className={`${styles.titleInfo} mb-5`}>Bio</p>
      <p className={`${styles.section} mb-4`}>Settings</p>
      <div className={styles.setting}>
        <ShieldLock size={23} />
        <span className="p-2">Change password</span>
      </div>
      <div className={`${styles.setting} mt-3`} onClick={() => handleLogout()}>
        <DoorOpen size={23} />
        <span className="p-2">Log out</span>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.data.user_id,
  user: state.user.dataUser[0],
});
const mapDispatchToProps = { getUserById, updateUser, logout };

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
