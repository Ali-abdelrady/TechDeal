import { useEffect, useRef } from "react";
import styles from "../css/Camera.module.css";
export default function Camera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  async function openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error(err);
      alert("Failed To open camera. Please ensure you have granted permision");
    }
  }
  function handleStopStreaming() {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks in the stream
      streamRef.current = null;
    }
  }
  useEffect(function () {
    openCamera();
    return handleStopStreaming;
  }, []);
  return (
    <div>
      <div className="container">
        <h1>Camera</h1>
        <div className={styles.videoContainer}>
          <video ref={videoRef} autoPlay playsInline />
          <div className={styles.btnContainer}>
            <button onClick={openCamera}>Start Streaming</button>
            <button onClick={handleStopStreaming}>Stop Streaming</button>
          </div>
        </div>
      </div>
    </div>
  );
}
