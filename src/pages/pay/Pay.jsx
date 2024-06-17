import React from "react";
import "./Pay.scss";
import GcashQR from "/img/gcash-qr.png";

const Pay = () => {
  return (
    <div className="payment-container">
      <div className="qr-container">
        <img src={GcashQR} alt="QR" />
      </div>
      <form>
        <label htmlFor="">Reference No. </label>
        <input type="file" />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Pay;
