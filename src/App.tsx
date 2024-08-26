import "./App.css";
import BucketAndFileCreator from "./components/BucketAndFileCreator";
import FileProcessor from "./components/FileProcessor";

function App() {
  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen gap-10">
      <FileProcessor
        onProcessFiles={(bucket, files) => {
          console.log(bucket, files);
        }}
      />
      <BucketAndFileCreator />
    </div>
  );
}

export default App;
