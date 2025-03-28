import React from "react";
import styles from "../css/Sound.module.css";
import videoSrc from "../assets/video/video.mp4";
export default function Sound() {
  return (
    <div>
      <div className="container">
        <h1 style={{ alignSelf: "flex-start" }}>Sound</h1>
        <div className={styles.videoContainer}>
          <video width={900} height={500} controls autoPlay>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
