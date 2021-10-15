import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import nss from "../assests/NSS.png";
import axios from "axios";

import Form from "./Form";

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "256546520924-ipdcpbq22ltoruqv2n9hbqug7c14f063.apps.googleusercontent.com",

          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [currentUser]);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      setCurrentUser(
        window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile()
          .getName()
      );
      setDate(
        `${new Date().getDate()}/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`
      );
      setTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
    } else {
      setCurrentUser(null);
      setIsSignedIn(false);
    }
  };

  const onSubmit = () => {
    const PORT = process.env.PORT || 4000;
    axios
      .post("/insert", {
        currentUser: currentUser,
        address: address,
        date: date,
        time: time,
        checkStatus: checkStatus,
      })
      .then(() => {
        alert("Sucess");
      });
    googleSignOut();
  };

  const renderAuth = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div
          style={{
            backgroundColor: "#a3aad6",
            fontSize: 50,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Image src={nss} size="medium" centered />
          <Form
            date={date}
            time={time}
            address={address}
            currentUser={currentUser}
            checkStatus={checkStatus}
            onSubmit={onSubmit}
          />
          <button
            onClick={googleSignOut}
            className="ui button primary right floated"
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div>
            <Image src={nss} size="medium" centered />
          </div>
          <div>
            <button className="ui blue google button" onClick={googleCheckIn}>
              <i className="icon google"></i>
              Check in
            </button>
            <button className="ui red google button" onClick={googleCheckOut}>
              <i className="icon google"></i>
              Check out
            </button>
          </div>
        </div>
      );
    }
  };
  const googleCheckIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    setCheckStatus("IN");
  };
  const googleCheckOut = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    setCheckStatus("OUT");
  };
  const googleSignOut = () => {
    alert("All done thankyou");
    window.gapi.auth2.getAuthInstance().signOut();
    // setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  const getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };
  getPosition().then((pos) => {
    const { latitude, longitude } = pos.coords;
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3f29112bcb6742e693ffb5be38e1c3ce`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAddress(data.results[0].formatted);
      });
  });

  return <div className="ui flex"> {renderAuth()}</div>;
};

export default GoogleAuth;
