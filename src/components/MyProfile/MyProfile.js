/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getUserByIdNoState,
  updateUser,
  deletePhotoUser,
  changePasswordUser,
} from "../../redux/action/user";
import { logout } from "../../redux/action/auth";
import { Form, Image, Modal, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "./MyProfile.module.css";
import { ShieldLock, DoorOpen, XSquare } from "react-bootstrap-icons";
import dummyPp from "../../assets/img/no-img.png";

function MyProfile(props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBio, setUserBio] = useState("");
  const [photoProfile, setPhotoProfile] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState([false, ""]);
  const [isUpdate, setIsUpdate] = useState([false, "Tap to make changes"]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    getAndSetData();
  }, []);

  const getAndSetData = () => {
    props.getUserByIdNoState(props.userId).then((res) => {
      setUserName(res.value.data.data[0].user_name);
      setUserEmail(res.value.data.data[0].user_email);
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
      setUserImage(null);
    }
  };

  const handleUpdate = () => {
    setShowInput(!showInput);
    if (isUpdate[0]) {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("userPhone", userPhone);
      formData.append("userBio", userBio);
      if (userImage) {
        formData.append("image", userImage);
      }

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      props
        .updateUser(props.userId, formData)
        .then((res) => {
          setShowAlert([true, res.value.data.msg]);
          getAndSetData();
          setTimeout(() => {
            setShowAlert([false, ""]);
          }, 3000);
        })
        .catch((err) => {
          setShowAlert([true, err.response.data.msg]);
          getAndSetData();
          setTimeout(() => {
            setShowAlert([false, ""]);
          }, 3000);
        });
      setIsUpdate([false, "Tap to make changes"]);
    } else {
      setIsUpdate([true, "Tap to update your profile"]);
    }
  };

  const handleDeletePhoto = () => {
    props
      .deletePhotoUser(props.userId)
      .then((res) => {
        setShowAlert([true, res.value.data.msg]);
        getAndSetData();
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      })
      .catch((err) => {
        setShowAlert([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          getAndSetData();
        }, 3000);
      });
  };

  const handleLogout = () => {
    props.logout(props.userId).then((res) => {
      getAndSetData();
    });
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();
    if (newPassword === confirmNewPassword) {
      props.changePasswordUser({ userPassword: newPassword }).then((res) => {
        setShowAlert([true, "Succes change password"]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          setShowModal(false);
          setNewPassword("");
          setConfirmNewPassword("");
        }, 1000);
      });
    } else {
      setShowAlert([true, "Please check your confirm password !"]);
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        setShowAlert([false, ""]);
      }, 1000);
    }
  };

  // console.log("propssnya", props);
  // console.log("dari auth", props.userId);

  return (
    <>
      <Modal show={showModal}>
        <div className="p-3">
          <div className="d-flex justify-content-between mb-3 mt-2">
            <div>
              <p className={styles.modalTitle}>Change your Password</p>
            </div>
            <div
              onClick={() => {
                setShowModal(false);
              }}
            >
              <XSquare size={30} />
            </div>
          </div>
          <Form onSubmit={handleSubmitPassword}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className={styles.info}>
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Input new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className={styles.info}>
                Confirm Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  required
                />
              </Col>
            </Form.Group>
            {showAlert[0] ? (
              <Alert variant="warning" className="text-center">
                {showAlert[1]}
              </Alert>
            ) : (
              ""
            )}
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#7e98df" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Modal>
      {showAlert[0] ? (
        <Alert variant="warning" className="text-center">
          {showAlert[1]}
        </Alert>
      ) : (
        ""
      )}
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
          className={styles.updateImage}
          onChange={(event) => handleImage(event)}
        />
      </Form.Group>

      <p className={`${styles.email} text-center`}>{userEmail}</p>

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
      <p
        className={`${styles.deletePhoto} mb-4 text-center`}
        onClick={() => handleDeletePhoto()}
      >
        Delete photo profile
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

      <p className={`${styles.titleInfo} mb-3`}>Bio</p>
      <p className={`${styles.section} mb-4`}>Settings</p>
      <div className={styles.setting} onClick={() => setShowModal(true)}>
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
const mapDispatchToProps = {
  getUserByIdNoState,
  updateUser,
  deletePhotoUser,
  changePasswordUser,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
