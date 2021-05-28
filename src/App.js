import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";

import Chat from "./pages/main/Chat/Chat";
import ChatList from "./pages/main/ChatList/ChatList";
import ChatRoom from "./pages/main/ChatRoom/ChatRoom";
import Counter from "./pages/main/Counter/CounterFunctional";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const newSocket = io.connect("http://localhost:3003", {
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
      <Router>
        <Switch>
          <PublicRoute
            restricted={true}
            path="/login"
            exact
            component={Login}
          />
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
          <PrivateRoute socket={socket} path="/chat" exact component={Chat} />
          <PublicRoute path="/chat-list" exact component={ChatList} />
          <PublicRoute path="/chat-room/:id" exact component={ChatRoom} />
          <PrivateRoute path="/counter" exact component={Counter} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
