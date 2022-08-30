import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./TableStore";

export const initStore = () => {
	return configureStore({
		reducer: { table: mainReducer },
	});
};
