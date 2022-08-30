import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { initStore } from "./stores/store";
import App from "./App";

const store = initStore();
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
