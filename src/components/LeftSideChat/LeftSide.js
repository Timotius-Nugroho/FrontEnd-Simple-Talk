import { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Form, InputGroup, Image, Overlay, Modal } from "react-bootstrap";
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
// import SearchFriends from "../SearchFriends/SearchFriends";
import pp from "../../assets/img/squid.jpg";

function Chat(props) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [search, setSearch] = useState("");
  const target = useRef(null);

  const friends = props.friends;

  useEffect(() => {
    console.log(selectedRoom);
  }, [selectedRoom]);

  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
    props.history.push(`/chat-room/${roomId}`);
  };

  const handleSearch = (event) => {
    console.log(search);
    setSearch(event.target.value);
  };

  const goToSettings = () => {
    console.log("settings");
    setShowMenu(false);
    setShowMyProfile(true);
  };

  const goToContacts = () => {
    console.log("Contacts");
    setShowMenu(false);
    setShowContact(true);
  };

  const goToInvite = () => {
    console.log("invite");
    setShowMenu(false);
    setShowInvite(true);
  };

  return (
    <>
      <Modal show={showContact}>
        <div className="p-3">
          <div class="d-flex justify-content-between mb-3 mt-2">
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
          <div style={{ height: "200px" }}>
            <div className={`${styles.friendChat} d-flex overflow-auto mb-2`}>
              <div className="d-flex">
                <Image src={pp} className={styles.pp} />
                <div>
                  <p className={styles.friendName}>Friend Name</p>
                  <p className={styles.status}>Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={showInvite}>
        <div className="p-3">
          <div class="d-flex justify-content-between mb-3 mt-2">
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
          <Form.Control
            type="text"
            placeholder="Type here..."
            className="mb-3"
            value={search}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <div style={{ height: "200px" }}>
            <div
              className={`${styles.friendChat} d-flex justify-content-between overflow-auto mb-2`}
            >
              <div className="d-flex">
                <Image src={pp} className={styles.pp} />
                <div>
                  <p className={styles.friendName}>Friend Name</p>
                  <p className={styles.status}>email@email</p>
                </div>
              </div>
              <PersonPlus size={30} />
            </div>
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
            <h1 className={styles.title}>Telegram</h1>
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
            {friends.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.friendChat} d-flex justify-content-between overflow-auto mb-2`}
                  onClick={() => {
                    handleSelectRoom(item);
                  }}
                >
                  <div className="d-flex">
                    <Image src={pp} className={styles.pp} />
                    <div>
                      <p className={styles.friendName}>Friend Name</p>
                      <p className={styles.friendMsg}>messagsssss sssssss</p>
                    </div>
                  </div>
                  <div>
                    <p className={styles.time}>20:30</p>
                    <div className={styles.unread}>22</div>
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

export default withRouter(Chat);
