import React, { useState, useEffect } from "react";
import { Image, Button, Row, Col } from "react-bootstrap";
import styles from "./FriendProfile.module.css";
import pp from "../../assets/img/squid.jpg";

function FriendProfile(props) {
  console.log("props id", props);
  return (
    <>
      <div className="text-center mb-5">
        <Image src={pp} className={styles.pp} />
      </div>
      <p className={styles.name}>friendName</p>
      <p className={styles.status}>Online</p>
      <p className={styles.section}>phoneNumber</p>
      <p className={styles.info}>088888267</p>
      <p className={styles.section}>Email</p>
      <p className={styles.info}>some@gmail</p>

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

export default FriendProfile;
