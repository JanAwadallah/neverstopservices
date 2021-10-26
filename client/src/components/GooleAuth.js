import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import nss from "../assests/NSS.png";
import axios from "axios";

import Form from "./Form";

const GoogleAuth = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState("");
  const [address, setAddress] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    onAuthChange();
  }, [isSignedIn, address, error]);

  const onAuthChange = () => {
    setUser(props.match.params.userName);
    setDate(
      `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`
    );
    const hour = new Date().getHours().toString();
    let currentHour = "";
    let currentMin = "";
    const min = new Date().getMinutes().toString();
    hour.length < 2 ? (currentHour = `0${hour}`) : (currentHour = hour);

    min.length < 2 ? (currentMin = `0${min}`) : (currentMin = min);
    setTime(`${currentHour}:${currentMin}`);
  };

  const onSubmit = (currentUser, manAddress) => {
    if (!currentUser || (!manAddress && !address)) {
      setError(true);

      return;
    }
    console.log(address);

    axios
      .post("/insert", {
        currentUser: currentUser,
        address: address ? address : manAddress,
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
            width: "100%",
          }}
        >
          <Image src={nss} size="medium" centered />
          <Form
            address={address}
            error={error}
            user={user}
            date={date}
            time={time}
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
  };

  const getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  };

  getPosition().then((pos) => {
    // let fetchedAddress = "";
    const { latitude, longitude } = pos.coords;
    // const key = process.env.REACT_APP_GEOCODE_KEY;
    const key = process.env.REACT_APP_OPENCAGE_KEY;

    fetch(
      // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${key}`
    )
      .then((res) => {
        if (!res.ok) {
          setAddress("");
          //  throw new Error(`Error ${res.status}`);
          return;
        }
        return res.json();
      })
      .then((data) => {
        // if (data.results[0]) {
        //   fetchedAddress = data.results[0].formatted_address;

        //   setAddress(fetchedAddress);
        // }
        // if (data.results) {
        setAddress(data.results[0].formatted);
        // }
      });
  });

  return <div className="ui flex">{renderAuth()}</div>;
};

export default GoogleAuth;
