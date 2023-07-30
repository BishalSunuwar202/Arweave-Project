import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Arweave from "arweave";
import { useApi } from "arweave-wallet-kit";

const { Dragger } = Upload;

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const App: React.FC = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const walletApi = useApi();

  const customRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    try {
      const data = await new Response(file).arrayBuffer();
      const transaction = await arweave.createTransaction({
        data,
      });
      transaction.addTag("App-Name", "Arweave-Wallet-Kit-Demo");
      transaction.addTag("Content-Type", file.type);
      await walletApi?.sign(transaction);
      const response = await walletApi?.dispatch(transaction);
      if (response?.id) {
        console.log(response);
        onProgress({ percent: 100 });
        setUploadedUrls((prev) => [
          ...prev,
          `https://arweave.net/${transaction.id}`,
        ]);
        onSuccess("Ok");
      }
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };

  const onChange = (info: any) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onDrop = (e: any) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  return (
    <>
      <Dragger
        name="file"
        multiple={true}
        onChange={onChange}
        //onDrop={onDrop}
        customRequest={customRequest}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </>
  );
};

export default App;
