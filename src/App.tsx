import "./App.css";
import BucketAndFileCreator from "./components/BucketAndFileCreator";
import FileProcessor from "./components/FileProcessor";

const files = [
  "gugd1igugdi",
  "gugdigu2gdi",
  "gugdigu33gdi",
  "gugdigu4gdi",
  "fjkslfjds",
  "fdsjkfdlsjdfklds",
  "fjdskfdjslfdddd",
  "fdjsklfjslkjdslkfjdslkfjdlksfjdslkjfdlksjfdlsk"
];
function App() {

  return (
    <div className="m-0 flex flex-col items-center justify-center min-w-[320px] min-h-screen gap-10">
      <FileProcessor buckets={
        ['bucket1','bucket2','bucketfdfdfdfdfdfdfd3']
      } filesByBucket={{
        bucket1: files,
        bucket2: files,
        bucketfdfdfdfdfdfdfd3: files,
      }} 
      onProcessFiles={(bucket,files)=>{
        console.log(bucket,files)
      }}


        />
      <BucketAndFileCreator />
     
    </div>
  );
}

export default App;
