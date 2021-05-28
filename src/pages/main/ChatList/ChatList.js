// import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSide from "../../../components/LeftSideChat/LeftSide";
import styles from "./ChatList.module.css";

function Chat(props) {
  const friends = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "w",
    "e",
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col className={`${styles.border}  p-4`}>
            <LeftSide friends={friends} />
          </Col>
          <Col md={8} className={styles.breakPoints}>
            <div className={styles.chatRoom}>
              <p className={styles.noMsg}>
                Please select a chat to start messaging
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Chat;
