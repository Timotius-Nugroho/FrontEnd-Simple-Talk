import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import LeftSide from "../../../components/LeftSideChat/LeftSide";
import styles from "./ChatList.module.css";
import { Bell, XOctagon } from "react-bootstrap-icons";

function Chat(props) {
  const [showNotif, setShowNotif] = useState([false, "", ""]);

  useEffect(() => {
    props.socket.emit("connectServer", props.userId);
    props.socket.emit("joinRoom", {
      room: `${props.userId}`,
      oldRoom: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("notifMessage", (data) => {
        setShowNotif([true, data.username, data.message]);
        setTimeout(() => {
          setShowNotif([false, "", ""]);
        }, 3000);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.socket]);

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
          <Col md={4} className={`${styles.border}  p-4`}>
            <LeftSide socket={props.socket} />
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

const mapStateToProps = (state) => ({
  userId: state.auth.data.user_id,
});

export default connect(mapStateToProps)(Chat);
