import React, { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import styles from "./MyProfile.module.css";
import { ShieldLock, DoorOpen } from "react-bootstrap-icons";
import pp from "../../assets/img/squid.jpg";

function MyProfile(props) {
  const [userName, setUserName] = useState("Timo");
  const [userPhone, setUserPhone] = useState("088888888888");
  const [userBio, setUserBio] = useState("lorem ipsum dolor");
  const [userImage, setUserImage] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isUpdate, setIsUpdate] = useState([false, "Tap to make changes"]);

  useEffect(() => {
    console.log(userName, userPhone, userBio);
  }, [userName, userPhone, userBio, userImage]);

  const handleImage = (event) => {
    console.log("change img !", event.target.files[0]);
    setUserImage(event.target.files[0]);
  };

  const handleUpdate = () => {
    setShowInput(!showInput);
    if (isUpdate[0]) {
      setIsUpdate([false, "Tap to make changes"]);
    } else {
      setIsUpdate([true, "Tap to update your profile"]);
    }
  };

  return (
    <>
      <Form.Group style={{ textAlign: "center" }}>
        <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
          <Image src={pp} className={styles.pp} />
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
      <div className={`${styles.setting} mt-3`}>
        <DoorOpen size={23} />
        <span className="p-2">Log out</span>
      </div>
    </>
  );
}

export default MyProfile;
