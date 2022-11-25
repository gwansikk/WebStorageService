import React from "react";

import Dropzone from "../components/Dropzone";

import dataJson from "../data/temp.json";

Main.propTypes = {};

function Main(props) {
  const itemList = dataJson.data;
  return (
    <div className="container">
      <h1 className="text-title">WebStorageService</h1>
      <Dropzone />

      <div className="cloud">
        <table className="table">
          <thead>
            <tr>
              <th>이름</th>
              <th>크기</th>
              <th>수정된 날짜</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((value, index) => (
              <tr key={index}>
                <td>{value.fileName}</td>
                <td className="text-center">{value.size}</td>
                <td className="text-center">{value.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
