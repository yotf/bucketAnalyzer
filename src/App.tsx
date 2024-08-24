import "./App.css";
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
    <div className="m-0 flex items-center justify-center min-w-[320px] min-h-screen">
      <FileProcessor buckets={
        ['bucket1','bucket2','bucketfdfdfdfdfdfdfd3']
      } filesByBucket={{
        bucket1: files,
        bucket2: files,
        bucketfdfdfdfdfdfdfd3: files,
      }} onProcessFiles={(bucket,files)=>{
        console.log(bucket,files)
      } }/>
     
    </div>
  );
}

export default App;
