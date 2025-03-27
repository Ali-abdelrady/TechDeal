import React from "react";
import { useParams } from "react-router-dom";

export default function ExternalPage() {
  const { url } = useParams();
  const decodedUrl = decodeURIComponent(url);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src={decodedUrl}
        title="External Page"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
}
