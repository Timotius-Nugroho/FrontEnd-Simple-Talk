import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getUserById } from "../../../redux/action/user";
import { getAllChat, addChat } from "../../../redux/action/chat";
import {
  Container,
  Row,
  Col,
  Image,
  InputGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import LeftSide from "../../../components/LeftSideChat/LeftSide";
import FriendProfile from "../../../components/FriendProfile/FriendProfile";
import styles from "./ChatRoom.module.css";
import pp from "../../../assets/img/no-img.png";
import {
  PlusLg,
  EmojiWinkFill,
  CursorFill,
  ArrowLeftCircle,
  MenuUp,
  Bell,
  XOctagon,
} from "react-bootstrap-icons";

function ChatRoom(props) {
  const [showFriendProfile, setShowFriendProfile] = useState(false);
  const idRoom = props.match.params.id;
  const query = new URLSearchParams(props.location.search);
  const senderId = parseInt(query.get("sender"));
  const receiverId = parseInt(query.get("receiver"));
  const idOldRoom = query.get("oldRoom");

  const [reload, setReload] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showNotif, setShowNotif] = useState([false, "", ""]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    props.getUserById(receiverId);
    props.getAllChat(idRoom).then((res) => {
      setMessages(res.value.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("chatMessage", (dataMessage) => {
        console.log("dari back end", dataMessage);
        if (dataMessage.sender_id === receiverId) {
          setShowNotif([true, dataMessage.username, dataMessage.message]);
        }
        setTimeout(() => {
          setShowNotif([false, "", ""]);
        }, 3000);
        props.getAllChat(idRoom).then((res) => {
          setMessages(res.value.data.data);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket]);

  if (reload) {
    console.log("RELOAD--Rejoin Room");
    props.socket.emit("joinRoom", {
      room: idRoom,
      oldRoom: "",
      username: props.auth.user_name,
    });
    setReload(0);
  }

  useEffect(() => {
    const username = props.auth.user_name;
    if (idRoom !== idOldRoom) {
      console.log(`LEAVE ROOM ${idOldRoom}`);
      props.socket.emit("joinRoom", {
        room: idRoom,
        oldRoom: idOldRoom,
        username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOldRoom, idRoom]);

  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const setData = {
      username: props.auth.user_name,
      room: idRoom,
      sender_id: senderId,
      message,
    };
    props
      .addChat({
        roomChat: idRoom,
        senderId,
        receiverId,
        message: message,
      })
      .then((res) => {
        props.socket.emit("roomMessage", setData);
      });
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // console.log("messages..", messages);
  // console.log("RECIVERID", receiverId);

  return (
    <>
      <Container fluid>
        {showNotif[0] ? (
          <div className={`${styles.notif} p-2 shadow`}>
            <div className="d-flex justify-content-between">
              <div>
                <Bell size={20} />
              </div>
              <div style={{ fontSize: "15px" }}>{showNotif[1]}</div>
              <XOctagon
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShowNotif([false, "", ""]);
                }}
              />
            </div>
            <hr />
            <p style={{ fontSize: "12px" }} className={styles.warp}>
              <i>{showNotif[2]}</i>
            </p>
          </div>
        ) : (
          ""
        )}
        <Row>
          <Col
            md={4}
            className={`${styles.borderRight} ${styles.breakPoints} p-4`}
          >
            <LeftSide />
          </Col>
          <Col className={showFriendProfile ? styles.breakPoints : ""}>
            <div className="p-3">
              <div className="d-flex flex-row justify-content-between">
                <div
                  className={`d-flex flex-row ${styles.roomTitle} shadow p-2`}
                >
                  <Image
                    src={
                      !props.friendDetail[0]
                        ? pp
                        : props.friendDetail[0].user_image.length > 0
                        ? `${process.env.REACT_APP_IMAGE_URL}${props.friendDetail[0].user_image}`
                        : pp
                    }
                    className={styles.pp}
                    onClick={() => {
                      setShowFriendProfile(true);
                    }}
                  />
                  <div>
                    <p className={styles.friendName}>
                      {props.friendDetail[0]
                        ? props.friendDetail[0].user_name
                        : ""}
                    </p>
                    <p className={styles.status}>
                      {!props.friendDetail[0]
                        ? ""
                        : props.friendDetail[0].user_is_online
                        ? "Online"
                        : "Offline"}
                    </p>
                  </div>
                </div>
                <div>
                  <MenuUp
                    color="royalblue"
                    size={30}
                    className={`${styles.breakPointsReverse} mt-3`}
                    style={{ cursor: "pointer" }}
                    onClick={() => props.history.push("/chat-list")}
                  />
                </div>
              </div>
              <div className={`overflow-auto ${styles.chatBox}`}>
                {messages.length > 0
                  ? messages.map((item, index) => {
                      return (
                        <div key={index} className="p-1">
                          {item.sender_id === senderId ? (
                            <Button className={`${styles.bubbleChatLeft} mb-3`}>
                              {item.message}
                              <p className={styles.nameBubble}>
                                {props.auth.user_name}
                              </p>
                            </Button>
                          ) : item.username === "BOT" ? (
                            <Alert variant="warning" className="text-center">
                              {item.alert}
                            </Alert>
                          ) : (
                            <div className="d-flex flex-row-reverse">
                              <Button
                                className={`${styles.bubbleChatRight} mb-3`}
                                variant="outline-secondary"
                              >
                                {item.message}
                                <p className={styles.nameBubble}>
                                  {props.friendDetail[0]
                                    ? props.friendDetail[0].user_name
                                    : ""}
                                </p>
                              </Button>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div>
                <Form onSubmit={handleSendMessage}>
                  <InputGroup className="pt-2 pb-2">
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      className={styles.input}
                      value={message}
                      onChange={(event) => handleChangeText(event)}
                    />
                    <InputGroup.Text className={styles.suplement}>
                      <PlusLg color="#7E98DF" size={25} />
                    </InputGroup.Text>
                    <InputGroup.Text className={styles.suplement}>
                      <EmojiWinkFill color="#7E98DF" size={25} />
                    </InputGroup.Text>
                    <InputGroup.Text
                      className={styles.suplement}
                      onClick={handleSendMessage}
                    >
                      <CursorFill color="#7E98DF" size={25} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
          {showFriendProfile ? (
            <Col md={4} className={`${styles.borderLeft} p-3`}>
              <div
                className="mt-2 mb-4"
                onClick={() => setShowFriendProfile(false)}
              >
                <ArrowLeftCircle color="#7E98DF" size={37} />
              </div>
              <FriendProfile friendId={receiverId} />
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  friendDetail: state.user.dataUser,
  auth: state.auth.data,
});
const mapDispatchToProps = {
  getUserById,
  getAllChat,
  addChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
