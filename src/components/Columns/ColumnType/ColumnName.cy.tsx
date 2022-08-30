import { Provider } from "react-redux";
import { initStore } from "../../../stores/store";
import ColumnName from "./ColumnType";
const store = initStore();
const rowData = {
	id: "dsa",
	name: "hai",
	position: "Leader",
	office: "hai duong",
	age: 22,
	startDate: "11/23/2000",
	salary: 7000,
	status: "enable",
	selected: true,
};

it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<ColumnName rowData={rowData} />
		</Provider>
	);
	cy.get('[data-hook="data-ColumnName"]').viewport("macbook-13");
});
it("should have text", () => {
	cy.mount(
		<Provider store={store}>
			<ColumnName rowData={rowData} />
		</Provider>
	);
	cy.get('[data-hook="data-ColumnName"]').viewport("macbook-13");
	cy.get('[data-hook="data-ColumnName"]').should("have.text", "hai");
});
it("should double click p", () => {
	cy.mount(
		<Provider store={store}>
			<ColumnName rowData={rowData} />
		</Provider>
	);
	cy.get('[data-hook="data-ColumnName"]').viewport("macbook-13");
	cy.get('[data-hook="data-ColumnName"] p').dblclick();
});

it("should change input", () => {
	cy.mount(
		<Provider store={store}>
			<ColumnName rowData={rowData} />
		</Provider>
	);
	cy.get('[data-hook="data-ColumnName"]').viewport("macbook-13");
	cy.get('[data-hook="data-ColumnName"] p').dblclick();
	cy.get('[data-hook="data-ColumnName"] input').clear().type("anh");
});
