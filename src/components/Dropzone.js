import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  const onClickUpload = () => {
    const formData = new FormData();

    acceptedFiles.forEach((file, index) => {
      formData.append(`files`, file, encodeURIComponent(file.name));
    });

    fetch("http://localhost:13621/files", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div {...getRootProps()} className="cloud text-center">
        <input {...getInputProps()} />
        <p className="font-xl">{isDragActive ? "파일을 받을 준비가 되었습니다!" : "여기에 파일을 올려주세요!"}</p>
      </div>
      <button onClick={onClickUpload}>업로드</button>
      <div className="cloud">
        <ul className="list-group mt-2">{acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile, index) => <li key={index}>{acceptedFile.name}</li>)}</ul>
      </div>
    </>
  );
}

export default Dropzone;
