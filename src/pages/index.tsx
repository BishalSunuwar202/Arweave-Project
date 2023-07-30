import React from "react";

//import "antd/dist/antd.css";
import DragNdrop from "@/component/DragNdrop";
import Arweave from "arweave";

import { ConnectButton } from "arweave-wallet-kit";
import { Button } from "antd";


export default function Home() {
  async function upload() {}

  return (
    <main>
      <div>
        <ConnectButton
          accent="rgb(255, 0, 0)"
          profileModal={false}
          showBalance={true}
        />
      </div>

      <DragNdrop />
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "10vh",
        }}
      >
        <Button onClick={upload}> upload </Button>
      </div> */}
    </main>
  );
}
