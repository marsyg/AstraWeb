const express = require("express");
const { Transformers } = require("@huggingface/transformers");

const app = express();




const model = Transformers.from_pretrained("bert-base-uncased");

app.post("/classify", (req, res) => {
	const text = req.body.text;
async function classifyText(text) {
	const inputs = await model.encode(text);
	const outputs = await model.predict(inputs);
	const classification = outputs[0].classification;
	return classification;
}
	res.json({ result });
});

app.post("/translate", (req, res) => {
	const text = req.body.text;
	const inputs = model.tokenize(text);
	const outputs = model.generate(inputs, { max_length: 100 });
	const result = outputs.text;
	res.json({ result });
});

app.post("/summarize", (req, res) => {
	const text = req.body.text;
	const inputs = model.tokenize(text);
	const outputs = model.generate(inputs, { max_length: 100 });
	const result = outputs.text;
	res.json({ result });
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});
