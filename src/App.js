import { useRef, useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-uRUSAoCCO9qJrwkvGVb8qxgc",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef()

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <input ref={ref} />
      <button onClick={() => {
        setImageUrl("")
        setIsLoading(true)
        openai.createImage({
          prompt: ref.current.value,
          n: 1,
          size: "1024x1024",
        })
          .then((response) => {
            setIsLoading(false)
            console.log(response.data.data[0].url)
            setImageUrl(response.data.data[0].url)
          })
          .catch((error) => {
            console.log(error)
            setIsLoading(false)
          })
      }}>Search</button>
      {isLoading && <div>Loading...</div>}
      <img src={imageUrl} style={{ maxWidth: "400px" }} />
    </div>
  );
}

export default App;
