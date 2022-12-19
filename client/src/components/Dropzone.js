import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Dropzone() {
  // TODO: onDrop하면 카운트 다운해서 5초후 자동으로 파일 업로드 취소하려면 취소버튼
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();
  const MySwal = withReactContent(Swal);

  const onClickUpload = () => {
    MySwal.fire({
      title: "Upload",
      text: "업로드를 하시겠습니까?",
      confirmButtonText: "확인",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        acceptedFiles.forEach((file, index) => {
          formData.append(`files`, file, encodeURIComponent(file.name));
        });

        const options = {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(`${loaded}kb of ${total}kb | ${percent}%`);
          },
        };

        axios
          .post(process.env.REACT_APP_API_URL + "/upload", formData, options)
          .then((response) => {
            console.log(response);
            MySwal.fire("성공!", "업로드에 성공했습니다.", "success");
            // Main.loadData();
          })
          .catch((error) => {
            console.log(error);
            MySwal.fire("실패!", "업로드에 실패했습니다.", "error");
          });
      }
    });
  };

  return (
    <>
      <div {...getRootProps()} className="cloud text-center">
        <input {...getInputProps()} />
        <p className="font-xl">{isDragActive ? "파일을 받을 준비가 되었습니다!" : "여기에 파일을 올려주세요!"}</p>
      </div>
      <div className="cloud">
        <ul className="list-group mt-2">{acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile, index) => <li key={index}>{acceptedFile.name}</li>)}</ul>
        {acceptedFiles.length > 0 && (
          <button className="w-full" onClick={onClickUpload}>
            업로드
          </button>
        )}
      </div>
    </>
  );
}

export default Dropzone;
