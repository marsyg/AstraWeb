import React, { useState } from "react";
import ModelRunner from "./containers/ModelRunner";

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

	return (
		<div>
			<ModelRunner
				modelOptions={modelOptions}
				selectedModel={selectedModel}
				onModelChange={(model) => setSelectedModel(model)}
			/>
		</div>
	);
};

export default App;
