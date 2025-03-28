import React, { useEffect, useState } from "react";
import styles from "../css/Keyboard.module.css";
import { RotateCcw } from "lucide-react";
const keyboardKeys = [
  // Function row
  { code: "Escape", label: "Esc" },
  { code: "F1", label: "F1" },
  { code: "F2", label: "F2" },
  { code: "F3", label: "F3" },
  { code: "F4", label: "F4" },
  { code: "F5", label: "F5" },
  { code: "F6", label: "F6" },
  { code: "F7", label: "F7" },
  { code: "F8", label: "F8" },
  { code: "F9", label: "F9" },
  { code: "F10", label: "F10" },
  { code: "F11", label: "F11" },
  { code: "F12", label: "F12" },
  { code: "Insert", label: "Ins" },
  { code: "Delete", label: "Del" },
  { code: "Home", label: "Home" },
  { code: "End", label: "End" },
  { code: "PageUp", label: "PgUp" },
  { code: "PageDown", label: "PgDn" },

  // Main section
  { code: "Backquote", label: "~" }, // Template
  { code: "Digit1", label: "1" },
  { code: "Digit2", label: "2" },
  { code: "Digit3", label: "3" },
  { code: "Digit4", label: "4" },
  { code: "Digit5", label: "5" },
  { code: "Digit6", label: "6" },
  { code: "Digit7", label: "7" },
  { code: "Digit8", label: "8" },
  { code: "Digit9", label: "9" },
  { code: "Digit0", label: "0" },
  { code: "Minus", label: "-" },
  { code: "Equal", label: "=" },
  { code: "Backspace", label: "backspace", class: styles.backspace },
  { code: "NumLock", label: "Num" },
  { code: "NumpadDivide", label: "/" },
  { code: "NumpadMultiply", label: "*" },
  { code: "NumpadSubtract", label: "-" },

  { code: "Tab", label: "tab", class: styles.tab },
  { code: "KeyQ", label: "Q" },
  { code: "KeyW", label: "W" },
  { code: "KeyE", label: "E" },
  { code: "KeyR", label: "R" },
  { code: "KeyT", label: "T" },
  { code: "KeyY", label: "Y" },
  { code: "KeyU", label: "U" },
  { code: "KeyI", label: "I" },
  { code: "KeyO", label: "O" },
  { code: "KeyP", label: "P" },
  { code: "BracketLeft", label: "[" },
  { code: "BracketRight", label: "]" },
  { code: "Backslash", label: "\\" },
  { code: "Numpad7", label: "7" },
  { code: "Numpad8", label: "8" },
  { code: "Numpad9", label: "9" },

  { code: "CapsLock", label: "Caps", class: styles.caps },
  { code: "KeyA", label: "A" },
  { code: "KeyS", label: "S" },
  { code: "KeyD", label: "D" },
  { code: "KeyF", label: "F" },
  { code: "KeyG", label: "G" },
  { code: "KeyH", label: "H" },
  { code: "KeyJ", label: "J" },
  { code: "KeyK", label: "K" },
  { code: "KeyL", label: "L" },
  { code: "Semicolon", label: ";" },
  { code: "Quote", label: "'" },
  { code: "Enter", label: "enter", class: styles.enter },
  { code: "Numpad4", label: "4" },
  { code: "Numpad5", label: "5" },
  { code: "Numpad6", label: "6" },

  { code: "ShiftLeft", label: "Shift", class: styles.shiftLeft },
  { code: "KeyZ", label: "Z" },
  { code: "KeyX", label: "X" },
  { code: "KeyC", label: "C" },
  { code: "KeyV", label: "V" },
  { code: "KeyB", label: "B" },
  { code: "KeyN", label: "N" },
  { code: "KeyM", label: "M" },
  { code: "Comma", label: "," },
  { code: "Period", label: "." },
  { code: "Slash", label: "/" },
  { code: "ShiftRight", label: "Shift", class: styles.shiftRight },
  { code: "Numpad1", label: "1" },
  { code: "Numpad2", label: "2" },
  { code: "Numpad3", label: "3" },

  { code: "ControlLeft", label: "Ctrl" },
  // { code: "Fn", label: "Fn" },
  { code: "MetaLeft", label: "Win" },
  { code: "AltLeft", label: "Alt" },
  { code: "Space", label: "space", class: styles.space },
  { code: "AltRight", label: "Alt" },
  { code: "ControlRight", label: "Ctrl" },

  // Navigation & Editing

  // Arrow keys
  { code: "ArrowLeft", label: "←" },
  { code: "ArrowUp", label: "↑" },
  { code: "ArrowDown", label: "↓" },
  { code: "ArrowRight", label: "→" },
  { code: "Numpad0", label: "0", class: styles.numpadZero },
  { code: "NumpadDecimal", label: "." },
  { code: "NumpadAdd", label: "+", class: styles.numpadAdd },

  { code: "NumpadEnter", label: "enter", class: styles.numpadEnter },
  { code: "Left Click", label: "", class: styles.leftClick },
  { code: "Middle Click", label: "", class: styles.middleClick },
  { code: "Right Click", label: "", class: styles.rightClick },
];

export default function Keyboard() {
  const [keyInfo, setKeyInfo] = useState({});
  const [pressedKeys, setPressedKeys] = useState(new Map());
  const [temporaryKeys, setTemporaryKeys] = useState(new Map()); // Tracks pressed effect

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeyInfo({ key: event.key, code: event.code });

      setPressedKeys((prev) => {
        const newMap = new Map(prev);
        newMap.set(event.code, true);
        return newMap;
      });

      setTemporaryKeys((prev) => {
        const newMap = new Map(prev);
        newMap.set(event.code, true); // Mark as temporarily pressed
        return newMap;
      });
    };

    const handleKeyUp = (event) => {
      setTemporaryKeys((prev) => {
        const newMap = new Map(prev);
        newMap.delete(event.code);
        return newMap;
      });
    };

    const handleMouseDown = (event) => {
      let mouseEvent = "";
      if (event.button === 0) mouseEvent = "Left Click";
      if (event.button === 1) mouseEvent = "Middle Click";
      if (event.button === 2) mouseEvent = "Right Click";

      if (mouseEvent) {
        setKeyInfo({ key: mouseEvent, code: mouseEvent });

        setPressedKeys((prev) => {
          const newMap = new Map(prev);
          newMap.set(mouseEvent, true);
          return newMap;
        });

        setTemporaryKeys((prev) => {
          const newMap = new Map(prev);
          newMap.set(mouseEvent, true);
          return newMap;
        });
      }
    };

    const handleMouseUp = (event) => {
      let mouseEvent = "";
      if (event.button === 0) mouseEvent = "Left Click";
      if (event.button === 1) mouseEvent = "Middle Click";
      if (event.button === 2) mouseEvent = "Right Click";

      if (mouseEvent) {
        setTemporaryKeys((prev) => {
          const newMap = new Map(prev);
          newMap.delete(mouseEvent);
          return newMap;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  function handleResetButton() {
    setPressedKeys(new Map());
  }
  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1>Keyboard</h1>
      <div className={styles.textContent}>
        <h2 style={{ textTransform: "capitalize" }}>
          <strong>Key Pressed:</strong> <span>{keyInfo.code}</span>
        </h2>
        <button onClick={handleResetButton}>
          Reset <RotateCcw />{" "}
        </button>
      </div>
      <div className={styles.keyboardContainer}>
        {keyboardKeys.map((key) => (
          <div
            key={key.code}
            className={`${key.class ? key.class : ""} ${styles.key} 
              ${pressedKeys.has(key.code) ? styles.active : ""} 
              ${temporaryKeys.has(key.code) ? styles.pressed : ""}`}
          >
            {key.label}
          </div>
        ))}
      </div>
    </div>
  );
}
