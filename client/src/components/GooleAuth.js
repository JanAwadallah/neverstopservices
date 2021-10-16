import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import nss from "../assests/NSS.png";
import axios from "axios";

import Form from "./Form";

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [address, setAddress] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    onAuthChange();
    // window.gapi.load("client:auth2", () => {
    //   window.gapi.client
    //     .init({
    //       clientId:
    //         "256546520924-ipdcpbq22ltoruqv2n9hbqug7c14f063.apps.googleusercontent.com",
    //       scope: "email",
    //     })
    //     .then(() => {
    //       const auth = window.gapi.auth2.getAuthInstance();
    //       setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    //       auth.isSignedIn.listen(onAuthChange);
    //     });
    // });
  }, [isSignedIn, address]);

  const onAuthChange = () => {
    // if (isSignedIn) {
    // setCurrentUser(
    //   window.gapi.auth2
    //     .getAuthInstance()
    //     .currentUser.get()
    //     .getBasicProfile()
    //     .getName()
    // );
    setDate(
      `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`
    );
    setTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
    // } else {
    //   setCurrentUser(null);
    //   setIsSignedIn(false);
    // }
  };

  const onSubmit = (currentUser) => {
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
            checkStatus={checkStatus}
            onSubmit={onSubmit}
          />
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
            <button className="ui blue button" onClick={googleCheckIn}>
              <i className="icon sign in"></i>
              Check in
            </button>
            <button className="ui red button" onClick={googleCheckOut}>
              <i className="icon sign out"></i>
              Check out
            </button>
          </div>
        </div>
      );
    }
  };
  const googleCheckIn = () => {
    setIsSignedIn(true);
    setCheckStatus("IN");
  };
  const googleCheckOut = () => {
    setIsSignedIn(true);
    setCheckStatus("OUT");
  };
  const googleSignOut = () => {
    alert("All done thank you");
    setIsSignedIn(false);

    // setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  const getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  getPosition().then((pos) => {
    let fetchedAddress = "";
    const { latitude, longitude } = pos.coords;
    const key = "AIzaSyBowHu8yzTf9pJnuUpSErMHd263nmgbNPw";
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.results[0]) {
          fetchedAddress = data.results[0].formatted_address;

          console.log(fetchedAddress);
          setAddress(fetchedAddress);
        }
      });
  });

  return <div className="ui flex"> {renderAuth()}</div>;
};

export default GoogleAuth;
