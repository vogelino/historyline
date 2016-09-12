
const exampleReducer = (state = {}, { type, payload }) => {
	switch (type) {
	case 'EXAMPLE_TYPE':
		return {
			example: payload.name
		};
	default:
		return state;
	}
};

export default exampleReducer;
