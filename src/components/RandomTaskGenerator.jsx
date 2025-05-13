const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_HUGGINGFACE_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: "Give me a random fun task I can do in under 10 minutes."
    })
  });
  
  const data = await response.json();
  console.log(data[0]?.generated_text || data);
  