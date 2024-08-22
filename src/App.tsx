import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MultiListBox from "./components/MultiListBox";

const files = [
  "gugd1igugdi",
  "gugdigu2gdi",
  "gugdigu33gdi",
  "gugdigu4gdi",
  "fjkslfjds",
  "fdsjkfdlsjdfklds",
  "fjdskfdjslfdddd",
];
function App() {
  return (
    <>
      <MultiListBox options={files} label={"Files"} />
    </>
  );
}

export default App;
