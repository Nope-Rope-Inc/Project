const populateFields = (document, fields = []) => {
	return document.populate(
		fields.map(field => ({ path: field }))
	);
};

module.exports = {
	populateFields
};
