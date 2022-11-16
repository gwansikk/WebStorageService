import React from "react";
import PropTypes from "prop-types";

import Dropzone from "../components/Dropzone";

import dataJson from "../data/temp.json";

Main.propTypes = {};

function Main(props) {
  const itemList = dataJson.data;
  return (
    <div className="container">
      <h1 className="text-title">WebStorageService</h1>
      <Dropzone />

      <hr />

      <div className="cloud">
        <table className="table">
          <thead>
            <tr>
              <th>이름</th>
              <th>크기</th>
              <th>수정된 날짜</th>
              <th>액션</th>
            </tr>
          </thead>
          {itemList.map((value) => (
            <tr>
              <td>{value.fileName}</td>
              <td>{value.size}</td>
              <td>{value.date}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Main;
