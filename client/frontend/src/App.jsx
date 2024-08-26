import React, { useState } from "react";
import ModelRunner from "./containers/ModelRunner";

import config from "./config.json"
const modelOptions = [
	{ id: "bert-base-uncased", name: "BERT Base Uncased" },
	{ id: "distilbert-base-uncased", name: "DistilBERT Base Uncased" },
	{ id: "roberta-base", name: "RoBERTa Base" },
	{ id: "albert-base-v2", name: "ALBERT Base V2" },
	{ id: "xlnet-base-uncased", name: "XLNet Base Uncased" },
	{ id: "longformer-base-4096", name: "Longformer Base 4096" },
	{ id: "bigbird-base-uncased", name: "BigBird Base Uncased" },
];

const App = () => {
	const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
 
  console.log(config.apiKey);
	async function query(data) {  
		const response = await fetch(
			"https://api-inference.huggingface.co/models/bert-base-uncased",
			{
				headers: {
					Authorization: `Bearer ${config.apiKey}`,
				},
				method: "POST",
				body: JSON.stringify(data),
			}
		);
		const result = await response.json();
		return result;
	}
	query({ inputs: "I   [MASK] love." }).then(
		(response) => {
			console.log(JSON.stringify(response));
		}
	);
	// [{"sequence":"the answer to the universe is no.","score":0.16963955760002136,"token":2053,"token_str":"no"},{"sequence":"the answer to the universe is nothing.","score":0.07344776391983032,"token":2498,"token_str":"nothing"},{"sequence":"the answer to the universe is yes.","score":0.05803241208195686,"token":2748,"token_str":"yes"},{"sequence":"the answer to the universe is unknown.","score":0.043957844376564026,"token":4242,"token_str":"unknown"},{"sequence":"the answer to the universe is simple.","score":0.04015745222568512,"token":3722,"token_str":"simple"}]
	return (
		<div>
			{/* <ModelRunner
				modelOptions={modelOptions}
				selectedModel={selectedModel}
				onModelChange={(model) => setSelectedModel(model)}
			/> */}
			<input placeholder="holder"></input>
		</div>
	);
};

export default App;
