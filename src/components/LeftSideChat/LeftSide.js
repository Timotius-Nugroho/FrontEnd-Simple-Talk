import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getAllUser } from "../../redux/action/user";
import { addContact, getAllContact } from "../../redux/action/contact";
import { getRoomChat, addRoomChat } from "../../redux/action/roomChat";
import { withRouter } from "react-router-dom";
import {
  Form,
  InputGroup,
  Image,
  Overlay,
  Modal,
  Alert,
} from "react-bootstrap";
import {
  MenuButtonWideFill,
  PlusLg,
  Search,
  GearWideConnected,
  Person,
  PersonPlus,
  QuestionCircle,
  ArrowLeftCircle,
  XSquare,
} from "react-bootstrap-icons";
import styles from "./LeftSide.module.css";
import MyProfile from "../MyProfile/MyProfile";
import pp from "../../assets/img/no-img.png";

function Chat(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState([false, ""]);
  const [search, setSearch] = useState("");
  const [oldRoomId, setOldRoomId] = useState("");
  const target = useRef(null);

  useEffect(() => {
    props.getRoomChat(props.userId);
  }, []);

  const handleSelectRoom = (roomId, senderId, receiverId) => {
    props.history.push(
      `/chat-room/${roomId}?sender=${senderId}&receiver=${receiverId}&oldRoom=${oldRoomId}`
    );
    setOldRoomId(roomId);
  };

  const handleSearch = (event) => {
    // console.log(search);
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      props.getAllUser(event.target.value);
    } else {
      props.getAllUser("*^");
    }
  };

  const goToSettings = () => {
    console.log("settings");
    setShowMenu(false);
    setShowMyProfile(true);
  };

  const goToContacts = () => {
    console.log("Contacts");
    props.getAllContact(props.userId).then((res) => {
      setShowMenu(false);
      setShowContact(true);
    });
  };

  const goToInvite = () => {
    console.log("invite");
    setShowMenu(false);
    setShowInvite(true);
  };

  const handleAddFriend = (friendId) => {
    // console.log(friendId);
    props
      .addContact({
        contactUserId: props.userId,
        contactFriendId: friendId,
      })
      .then((res) => {
        setShowAlertModal([true, "Succes add to contcat !"]);
        setTimeout(() => {
          setShowAlertModal([false, ""]);
        }, 3000);
      })
      .catch((err) => {
        setShowAlertModal([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlertModal([false, ""]);
        }, 3000);
      });
  };

  const handleMakeRoom = (userId, friendId) => {
    props
      .addRoomChat({ userId, friendId })
      .then((res) => {
        props.getRoomChat(props.userId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("propssnyaa", props.roomChat);

  return (
    <>
      <Modal show={showContact}>
        <div className="p-3">
          <div className="d-flex justify-content-between mb-3 mt-2">
            <div>
              <p className={styles.modalTitle}>Search your Contacts</p>
            </div>
            <div
              onClick={() => {
                setShowContact(false);
              }}
            >
              <XSquare size={30} />
            </div>
          </div>
          <Form.Control
            type="text"
            placeholder="Type here..."
            className="mb-3"
            value={search}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <div style={{ height: "200px" }} className="overflow-auto">
            {props.contact.length > 0
              ? props.contact.map((item, index) => {
                  return (
                    <div
                      className={`${styles.friendChat} d-flex overflow-auto mb-2`}
                      key={index}
                      onClick={() => {
                        handleMakeRoom(
                          item.contact_user_id,
                          item.contact_friend_id
                        );
                      }}
                    >
                      <div className="d-flex">
                        <Image
                          src={
                            item.detail.user_image.length > 0
                              ? `${process.env.REACT_APP_IMAGE_URL}${item.detail.user_image}`
                              : pp
                          }
                          className={styles.pp}
                        />
                        <div>
                          <p className={styles.friendName}>
                            {item.detail.user_name}
                          </p>
                          <p className={styles.status}>
                            {item.detail.user_is_online ? "Online" : "Offline"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </Modal>
      <Modal show={showInvite}>
        <div className="p-3">
          <div className="d-flex justify-content-between mb-3 mt-2">
            <div>
              <p className={styles.modalTitle}>Add new friends</p>
            </div>
            <div
              onClick={() => {
                setShowInvite(false);
              }}
            >
              <XSquare size={30} />
            </div>
          </div>
          {showAlertModal[0] ? (
            <Alert className="text-center" variant="warning">
              {showAlertModal[1]}
            </Alert>
          ) : (
            ""
          )}
          <Form.Control
            type="text"
            placeholder="Type here..."
            className="mb-3"
            value={search}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <div style={{ height: "200px" }} className="overflow-auto">
            {props.allUser.length > 0
              ? props.allUser.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`${styles.friendChat} d-flex justify-content-between overflow-auto mb-2`}
                      onClick={() => {
                        handleAddFriend(item.user_id);
                      }}
                    >
                      <div className="d-flex">
                        <Image
                          src={
                            item.user_image.length > 0
                              ? `${process.env.REACT_APP_IMAGE_URL}${item.user_image}`
                              : pp
                          }
                          className={styles.pp}
                        />
                        <div>
                          <p className={styles.friendName}>{item.user_name}</p>
                          <p className={styles.status}>{item.user_email}</p>
                        </div>
                      </div>
                      <PersonPlus size={30} />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </Modal>
      {showMyProfile ? (
        <div>
          <div className="mt-2 mb-4" onClick={() => setShowMyProfile(false)}>
            <ArrowLeftCircle color="#7E98DF" size={37} />
          </div>
          <MyProfile />
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between mt-4">
            <h1 className={styles.title}>Simple talk</h1>
            <MenuButtonWideFill
              color="royalblue"
              size={29}
              className="mt-2"
              style={{ cursor: "pointer" }}
              ref={target}
              onClick={() => setShowMenu(!showMenu)}
            />
            <Overlay target={target.current} show={showMenu} placement="bottom">
              {(props) => (
                <div {...props} className={`${styles.menu} p-3`}>
                  <div
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToSettings()}
                  >
                    <GearWideConnected color="white" size={21} />
                    <span className="m-2">Settings</span>
                  </div>
                  <div
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToContacts()}
                  >
                    <Person color="white" size={21} />
                    <span className="m-2">Contacts</span>
                  </div>
                  <div
                    className="mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToInvite()}
                  >
                    <PersonPlus color="white" size={21} />
                    <span className="m-2">Invite Friends</span>
                  </div>
                  <div style={{ cursor: "pointer" }}>
                    <QuestionCircle color="white" size={21} />
                    <span className="m-2">Telegram FAQ</span>
                  </div>
                </div>
              )}
            </Overlay>
          </div>
          <InputGroup className="mt-5 mb-4">
            <InputGroup.Text className={styles.suplement}>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              className={styles.input}
            />
            <InputGroup.Text className={styles.suplement}>
              <PlusLg color="#7E98DF" />
            </InputGroup.Text>
          </InputGroup>
          <div className={`${styles.friendList} overflow-auto`}>
            {props.roomChat.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.friendChat} d-flex justify-content-between overflow-auto mb-2`}
                  onClick={() => {
                    handleSelectRoom(
                      item.room_chat,
                      item.user_id,
                      item.friend_id
                    );
                  }}
                >
                  <div className="d-flex">
                    <Image
                      src={
                        item.friendDetail.user_image.length > 0
                          ? `${process.env.REACT_APP_IMAGE_URL}${item.friendDetail.user_image}`
                          : pp
                      }
                      className={styles.pp}
                    />
                    <div>
                      <p className={styles.friendName}>
                        {item.friendDetail.user_name}
                      </p>
                      {item.sampleChat[0] ? (
                        <p className={styles.friendMsg}>
                          {item.sampleChat[0].message}
                        </p>
                      ) : (
                        <p className={styles.friendMsg}>
                          <i>No message yet</i>
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {item.sampleChat[0] ? (
                      <p className={styles.time}>
                        {item.sampleChat[0].created_at
                          .split("T")[1]
                          .slice(0, 5)}
                      </p>
                    ) : (
                      ""
                    )}
                    {/* <div className={styles.unread}>22</div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.data.user_id,
  allUser: state.user.dataAllUser,
  contact: state.contact.data,
  roomChat: state.roomChat.data,
});
const mapDispatchToProps = {
  getAllUser,
  addContact,
  getAllContact,
  getRoomChat,
  addRoomChat,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
