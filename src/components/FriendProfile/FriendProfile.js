/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserById } from "../../redux/action/user";
import { Image, Button } from "react-bootstrap";
import styles from "./FriendProfile.module.css";
import pp from "../../assets/img/no-img.png";

function FriendProfile(props) {
  useEffect(() => {
    getUserById(props.friendId);
    console.log("did mount");
  }, []);

  // console.log("PROPSID", props);
  return (
    <>
      <div className={styles.setHeight}>
        <div className="text-center mb-5">
          <Image
            src={
              props.user.user_image
                ? `${process.env.REACT_APP_IMAGE_URL}${props.user.user_image}`
                : pp
            }
            className={styles.pp}
          />
        </div>
        <p className={styles.name}>{props.user.user_name}</p>
        <p className={styles.status}>
          {props.user.user_is_online ? "Online" : "Offline"}
        </p>
        <p className={styles.section}>phoneNumber</p>
        <p className={styles.info}>{props.user.user_phone}</p>
        <p className={styles.section}>Email</p>
        <p className={styles.info}>{props.user.user_email}</p>
        <p className={styles.section}>Bio</p>
        <p className={styles.info}>{props.user.user_bio}</p>

        <div className="d-flex justify-content-between mt-5">
          <Button className={styles.btDesc} variant="outline-primary">
            Location
          </Button>

          <Button className={styles.btDesc} variant="outline-primary">
            Images
          </Button>
          <Button className={styles.btDesc} variant="outline-primary">
            Documents
          </Button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.dataUser[0],
});
const mapDispatchToProps = { getUserById };

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
