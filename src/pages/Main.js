import React, { useEffect, useState } from "react";

import Dropzone from "../components/Dropzone";

Main.propTypes = {};

function Main(props) {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:13621/", {
      method: "GET",
    }).then((response) => {
      console.log(response);
      setFileList(response.files);
    });
  });

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
            {/* {fileList.map((value, index) => (
              <tr key={index}>
                <td>{value}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
