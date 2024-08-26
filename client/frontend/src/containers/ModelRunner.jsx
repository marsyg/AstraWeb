import React, { useState, useEffect } from "react";
import axios from "axios";

const ModelRunner = ({ modelOptions, selectedModel, onModelChange }) => {
	const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
		const fetchData = async () => {
			if (selectedModel) {
				setIsLoading(true);

				try {
					const apiEndpoint = `https://api-inference.huggingface.co/models/${selectedModel}`;
					const headers = {
						Authorization: `Bearer ,,`, 
					};

					const response = await axios.post(
						apiEndpoint,
						{ inputs: inputText },
						{ headers }
					);
          setOutputText(response.data);
          console.log(response.data.generated_text)
				} catch (error) {
					console.error(error);
				} finally {
					setIsLoading(false); // Reset loading state
				}
			}
		};

		fetchData();
	}, [selectedModel, inputText]);

	// const handleModelRunner = async () => {
	// 	if (inputText === "") {
	// 		return;
			
  //   }
  //   try {
	// 		const apiEndpoint = `https://api-inference.huggingface.co/models/${selectedModel}`;
	// 		const headers = {
	// 			Authorization: `Bearer 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`, //remove token
	// 		};
	// 		const response = await axios.get(
	// 			apiEndpoint,
	// 			{ inputs: inputText },
	// 			{ headers }
	// 		);
  //     setOutputText(response.data);
  //     console.log(response)
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
  // };
  // handleModelRunner();
  //   useEffect(() => {
  //     if (selectedModel) {
  //       const apiEndpoint = `https://api-inference.huggingface.co/models/${selectedModel}`;
  //       const headers = {
  //         Authorization: `Bearer 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`, 
  //       };

	// 		const handleAPIendpoint = async () => {
	// 			const response = await axios.get(
	// 				apiEndpoint,
	// 				{ inputs: inputText },
	// 				{ headers }
	// 			);
	// 			setOutputText(response.data);
	// 			console.log(response);
	// 			console.log(outputText, "from handelAPI point");
	// 		};
	// 		handleAPIendpoint();
	// 	}
	// }, [selectedModel, inputText]);

	const handleInputChange = (event) => {
		setInputText(event.target.value);
	};

	const handleModelChange = (event) => {
		console.log(event, "from ModelChange");
		onModelChange(event);
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
			<textarea
				value={inputText}
				placeholder="your text"
				onChange={handleInputChange}
			/>
			<button onClick={() => handleModelChange(selectedModel)}>
				Run Model
			</button>

			{isLoading && <p>Loading...</p>}
			<p>Output:</p>
			<textarea value={outputText} readOnly />
		</div>
	);
};

export default ModelRunner;
