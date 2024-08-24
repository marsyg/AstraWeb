import React, { useState, useEffect } from "react";
import axios from "axios";


const ModelRunner = ({ modelOptions, selectedModel, onModelChange }) => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [isRateLimited, setIsRateLimited] = useState(false);

	useEffect(() => {
		if (selectedModel) {
			const apiEndpoint = `https://api-inference.huggingface.co/models/${selectedModel}`;
			const headers = {
				Authorization: `Bearer `,
			};

			axios
				.get(apiEndpoint, { headers })
				.then((response) => {
					console.log(response.data);
				
				})
				.catch((error) => {
					console.error("Error fetching model information:", error);
				});
		}
	}, [selectedModel]);

	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};

	const handleModelChange = (event) => {
		onModelChange(event.target.value);
	};

	return (
		<div>
			<h1>Model Runner</h1>
			<select value={selectedModel} onChange={handleModelChange}>
				{modelOptions.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
			<textarea value={inputText} placeholder="your text" onChange={handleInputChange} />
			<button onClick={() => handleModelChange(selectedModel)}>
				Run Model
			</button>
			{isRateLimited && <p>Rate limit exceeded. Please try again later.</p>}
			<p>Output:</p>
			<textarea value={outputText} readOnly />
		</div>
	);
};

export default ModelRunner;
