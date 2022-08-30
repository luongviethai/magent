import { Provider } from "react-redux";
import { initStore } from "../../../stores/store";
import HeaderTop from "./HeaderTop";
const store = initStore();

it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<HeaderTop />
		</Provider>
	);
	cy.get('[data-hook="groupTop"]').viewport("macbook-11");
});
it("should click filter", () => {
	cy.mount(
		<Provider store={store}>
			<HeaderTop />
		</Provider>
	);
	cy.get('[data-hook="groupTop"]').viewport("macbook-11");
	cy.get('[data-hook="filterButton"]').click();
});
it("should click column", () => {
	cy.mount(
		<Provider store={store}>
			<HeaderTop />
		</Provider>
	);
	cy.get('[data-hook="groupTop"]').viewport("macbook-11");
	cy.get('[data-hook="groupTop"] [data-hook="groupColumn"] button').click();
});
