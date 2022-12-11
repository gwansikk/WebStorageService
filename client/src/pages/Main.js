import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropzone from "../components/Dropzone";

Main.propTypes = {};

function Main(props) {
  const [fileList, setFileList] = useState([]);

  const loadData = async () => {
    // const fileFilter = [".DS_Store"]; //  파일 필터
    // const data = response.data.files.filter((i) => !fileFilter.includes(i));

    const response = await axios.get(process.env.REACT_APP_API_URL);
    const data = response.data.data;

    setFileList(data);
  };

  useEffect(() => {
    loadData();
  }, []);

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
              <th>생성 날짜</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((value, index) => (
              <tr key={index}>
                <td>{value[0]}</td>
                <td className="text-center">{value[1]}</td>
                <td className="text-center">{value[2]}</td>
                <td className="text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;