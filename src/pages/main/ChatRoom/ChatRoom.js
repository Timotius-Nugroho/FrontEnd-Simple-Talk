import { useState, useEffect } from "react";
import { Container, Row, Col, Image, InputGroup, Form } from "react-bootstrap";
import LeftSide from "../../../components/LeftSideChat/LeftSide";
import FriendProfile from "../../../components/FriendProfile/FriendProfile";
import styles from "./ChatRoom.module.css";
import pp from "../../../assets/img/squid.jpg";
import {
  PlusLg,
  EmojiWinkFill,
  CursorFill,
  ArrowLeftCircle,
} from "react-bootstrap-icons";

function ChatRoom(props) {
  const [showFriendProfile, setShowFriendProfile] = useState(false);

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

  console.log("ID ROOM", props.match.params);

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            md={4}
            className={`${styles.borderRight} ${styles.breakPoints} p-4`}
          >
            <LeftSide friends={friends} />
          </Col>
          <Col className={showFriendProfile ? styles.breakPoints : ""}>
            <div className="p-3">
              <div className={`d-flex flex-row ${styles.roomTitle}`}>
                <Image
                  src={pp}
                  className={styles.pp}
                  onClick={() => {
                    setShowFriendProfile(true);
                  }}
                />
                <div>
                  <p className={styles.friendName}>Friend Name</p>
                  <p className={styles.status}>Online</p>
                </div>
              </div>
              <div>
                <InputGroup className={`mt-5 mb-4 ${styles.inputGroup}`}>
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    className={styles.input}
                  />
                  <InputGroup.Text className={styles.suplement}>
                    <PlusLg color="#7E98DF" size={25} />
                  </InputGroup.Text>
                  <InputGroup.Text className={styles.suplement}>
                    <EmojiWinkFill color="#7E98DF" size={25} />
                  </InputGroup.Text>
                  <InputGroup.Text className={styles.suplement}>
                    <CursorFill color="#7E98DF" size={25} />
                  </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          {showFriendProfile ? (
            <Col md={3} className={`${styles.borderLeft} p-4`}>
              <div
                className="mt-2 mb-4"
                onClick={() => setShowFriendProfile(false)}
              >
                <ArrowLeftCircle color="#7E98DF" size={37} />
              </div>
              <FriendProfile friendId={1} />
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </>
  );
}

export default ChatRoom;
