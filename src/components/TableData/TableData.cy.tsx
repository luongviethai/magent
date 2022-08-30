import { Provider } from "react-redux";
import { initStore } from "../../stores/store";
import TableData from "./TableData";

const store = initStore();
const gridListData = '[data-hook="grid-list-data"]';
it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<TableData />
		</Provider>
	);
	cy.get(gridListData).viewport("macbook-11");
});
it("click each column", () => {
	cy.mount(
		<Provider store={store}>
			<TableData />
		</Provider>
	);
	cy.get(gridListData).viewport("macbook-11");
	cy.get('[data-hook="grid-list-data"] [data-hook="titleColumn"]').click({
		multiple: true,
	});
});
it("click check all page", () => {
	cy.mount(
		<Provider store={store}>
			<TableData />
		</Provider>
	);
	cy.get(gridListData).viewport("macbook-11");
	cy.get('[data-hook="grid-list-data"] [data-hook="checkAll"] input').check();
	cy.get('[data-hook="grid-list-data"] [data-hook="showOptionSelect"]').click();
});
