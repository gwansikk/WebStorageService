import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noClick: true });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div {...getRootProps({ className: "dropzone" })} className="cloud">
      <input {...getInputProps()} />

      {files.length === 0 ? <p className="text-center font-bold">파일을 여기에 넣어주세요!</p> : <ul>{files}</ul>}
    </div>
  );
}

export default Dropzone;
