import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserById } from "../../redux/action/user";
import { Image, Button, Row, Col } from "react-bootstrap";
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

      <Row className="mt-5">
        <Col xs={4}>
          <Button className={styles.btDesc} variant="outline-primary">
            Location
          </Button>
        </Col>
        <Col xs={4}>
          <Button className={styles.btDesc} variant="outline-primary">
            Images
          </Button>
        </Col>
        <Col xs={4}>
          <Button className={styles.btDesc} variant="outline-primary">
            Documents
          </Button>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.dataUser[0],
});
const mapDispatchToProps = { getUserById };

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
