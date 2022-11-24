import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });

  const onClickUpload = () => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <div {...getRootProps()} className="cloud text-center">
        <input {...getInputProps()} />
        <p className="font-xl">{isDragActive ? "파일 받을 준비!" : "파일을 올려주세요"}</p>
      </div>
      <button onClick={onClickUpload}>업로드</button>
      <div className="cloud">
        <ul className="list-group mt-2">{acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile, index) => <li key={index}>{acceptedFile.name}</li>)}</ul>
      </div>
    </>
  );
}

export default Dropzone;
