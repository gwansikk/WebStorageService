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
    setFileList(response.data.data);
  };

  const downloadFile = (file) => {
    const fileURL = process.env.REACT_APP_API_URL + "/files/" + file;

    fetch(fileURL, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
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
                <td>{value[0].slice(14)}</td>
                <td className="text-center">{value[1]}</td>
                <td className="text-center">{value[2]}</td>
                <td className="text-center">
                  <button onClick={() => downloadFile(value[0])}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M13.75 7h-3v5.296l1.943-2.048a.75.75 0 011.114 1.004l-3.25 3.5a.75.75 0 01-1.114 0l-3.25-3.5a.75.75 0 111.114-1.004l1.943 2.048V7h1.5V1.75a.75.75 0 00-1.5 0V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
