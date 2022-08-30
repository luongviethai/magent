import { Provider } from "react-redux";
import { initStore } from "../../stores/store";
import Pagination from "./Pagination";
const store = initStore();

const gridPagination = '[data-hook="gridPagination"]';
const paginationButton = '[data-hook="gridPagination"] button';
it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<Pagination />
		</Provider>
	);
	cy.get(gridPagination).viewport("macbook-13");
});
it("should button click", () => {
	cy.mount(
		<Provider store={store}>
			<Pagination />
		</Provider>
	);
	cy.get(gridPagination).viewport("macbook-13");
	cy.get(paginationButton)
		.click({ force: true, multiple: true })
		.viewport("macbook-13");
});
