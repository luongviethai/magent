import { Provider } from "react-redux";
import { initStore } from "../../../stores/store";
import HeaderMid from "./HeaderMid";
const store = initStore();

it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<HeaderMid />
		</Provider>
	);
	cy.get('[data-hook="headerMid"]').viewport("macbook-11");
});
it("should enter search", () => {
	cy.mount(
		<Provider store={store}>
			<HeaderMid />
		</Provider>
	);
	cy.get('[data-hook="headerMid"]').viewport("macbook-11");
	cy.get('[data-hook="headerMid"] input').type("v");
});
