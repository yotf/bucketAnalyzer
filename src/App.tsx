import { Toaster } from "react-hot-toast";
import "./App.css";
import BucketAndFileCreator from "./components/BucketAndFileCreator";
import FileProcessor from "./components/FileProcessor";

function App() {
  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen gap-10">
      <Toaster position="top-right" />
      <FileProcessor />
      <BucketAndFileCreator />
    </div>
  );
}

export default App;
