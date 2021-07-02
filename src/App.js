import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";

import ChatList from "./pages/main/ChatList/ChatList";
import ChatRoom from "./pages/main/ChatRoom/ChatRoom";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const newSocket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected Socket Client !");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PublicRoute restricted={true} path="/" exact component={Login} />
            <PublicRoute
              restricted={true}
              path="/register"
              exact
              component={Register}
            />
            <PublicRoute
              restricted={true}
              path="/forget-password"
              exact
              component={ForgotPassword}
            />
            <PrivateRoute
              socket={socket}
              path="/chat-list"
              exact
              component={ChatList}
            />
            <PrivateRoute
              socket={socket}
              path="/chat-room/:id"
              exact
              component={ChatRoom}
            />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
