import React from "react";
import styles from "../css/Sound.module.css";
export default function Sound() {
  return (
    <div>
      <div className="container">
        <h1 style={{ alignSelf: "flex-start" }}>Sound</h1>
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/WX1Hvr_yxtI?si=SzMKe1X03m8u5oK-"
            frameborder="0"
            allow="autoplay"
            width={900}
            height={500}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
