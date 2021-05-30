// import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSide from "../../../components/LeftSideChat/LeftSide";
import styles from "./ChatList.module.css";

function Chat(props) {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className={`${styles.border}  p-4`}>
            <LeftSide />
          </Col>
          <Col sm={8} className={styles.breakPoints}>
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
