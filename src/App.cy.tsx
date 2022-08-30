import { Provider } from "react-redux";
import { initStore } from "./stores/store";
import App from "./App";
const store = initStore();

const gridRoot = '[data-hook="gird-root"]';
const clickSelect =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="data-ColumnOption"] span';

const titleColumn =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="titleColumn"]:first';
const clickEditName =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="data-ColumnName"] p:first';
const clickEditPosition =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="data-ColumnPosition"] p:first';
const editName =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="data-ColumnName"] input';
const editPosition =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="data-ColumnPosition"] select';
const clickCheckAll =
	'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="checkAll"] button';
const clickAction = '[data-hook="gird-root"] [data-hook="buttonAction"]';
const hideColumn =
	'[data-hook="gird-root"] [data-hook="groupColumn"] input:first';
const clickColumn = '[data-hook="gird-root"] [data-hook="groupColumn"]';
const hideAllColumn = '[data-hook="gird-root"] [data-hook="groupColumn"]';
const deleteSelected = '[data-hook="gird-root"] [data-hook="deleteSelected"]';
const buttonChooseLimit =
	'[data-hook="gird-root"] [data-hook="grid-header"] button:first';
const buttonFilter = '[data-hook="gird-root"] [data-hook="filterButton"]';
const filterPosition = '[data-hook="gird-root"] [data-hook="filter"]';
const inputFilterName = '[data-hook="gird-root"] [data-hook="filterName"] ';
const applyFilter = '[data-hook="gird-root"] [data-hook="applyFilter"]';
const inputFilterOffice = '[data-hook="gird-root"] [data-hook="filterOffice"]';
const customChooseLimit =
	'[data-hook="gird-root"] [data-hook="grid-header"] p:nth(4)';
const chooseLimit =
	'[data-hook="gird-root"] [data-hook="grid-header"] p:nth(2)';
const inputChooseLimit =
	'[data-hook="gird-root"] [data-hook="grid-header"] input:nth(1)';

const headerSearch = '[data-hook="gird-root"] [data-hook="inputSearch"] input';
const paginationButton =
	'[data-hook="gird-root"] [data-hook="gridPagination"] button';
const paginationNext =
	'[data-hook="gird-root"] [data-hook="gridPagination"] [data-hook="clickNextPage"]';
const paginationPre =
	'[data-hook="gird-root"] [data-hook="gridPagination"] [data-hook="clickPrePage"]';
it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
});
it("should input search", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-13");
	cy.get(headerSearch).type("ha").clear().viewport("macbook-16");
});
it("should click button pagination", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
	cy.get(paginationButton)
		.click({ force: true, multiple: true })
		.viewport("macbook-13");
});
it("should click deselect all page", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
	cy.get(
		'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="showOptionSelect"]'
	).click();
	cy.get(
		'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="checkAll"] span'
	).click();
	cy.get(
		'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="checkAll"] [data-hook="deselectAll"]'
	).click();
});
describe("group choose and custom option", () => {
	it("should choose limit", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonChooseLimit).click();
		cy.get(chooseLimit).click();
	});
	it("should enter limit", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonChooseLimit).click();
		cy.get(customChooseLimit).click();
		cy.get(buttonChooseLimit).click();
		cy.get(inputChooseLimit).type("25");
		cy.get(inputChooseLimit).type("{enter}");
	});
	it("should input limit", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonChooseLimit).click();
		cy.get('[data-hook="gird-root"] [data-hook="grid-header"] input:first')
			.clear()
			.type("15")
			.type("{enter}");
	});
	it("should input character limit", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonChooseLimit).click();
		cy.get('[data-hook="gird-root"] [data-hook="grid-header"] input:first')
			.clear()
			.type("gdfgdgd")
			.type("{enter}")
			.clear()
			.type("10")
			.type("{enter}");
	});
});
describe("group filter", () => {
	it("should click filter", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonFilter).click();
		cy.get(inputFilterName).type("a");
		cy.get(inputFilterOffice).type("da");
		cy.get(applyFilter).click();

		cy.get('[data-hook="gird-root"] [data-hook="clearFilterName"]').click({
			force: true,
		});
		cy.get('[data-hook="gird-root"] [data-hook="clearFilterOffice"]').click({
			force: true,
		});

		cy.get(headerSearch).type("du").viewport("macbook-16");
		cy.get(headerSearch).clear();
	});
});
describe("group action", () => {
	it("should click action", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickSelect).click({ multiple: true });
		cy.get(clickAction).click();
		cy.get(deleteSelected).click();
	});
});
describe("group column", () => {
	it("should click column", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickColumn).click({ multiple: true });
		cy.get(clickColumn).click();
	});
});
describe("group edit data", () => {
	it("should click edit data", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickEditName).dblclick();
		cy.get(editName).clear().type("An cute").type("{enter}");
		cy.get(clickEditPosition).dblclick();
	});
});
it("should click sort", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
	cy.get(titleColumn).click();
	cy.get(
		'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="titleColumn"]:nth(1)'
	).click();
});
describe("group search and next page", () => {
	it("should click next page", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(paginationNext).click({ force: true });
		cy.get(headerSearch).type("v").clear();
	});
});
describe("group check all", () => {
	it("should check all", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickCheckAll).click();
		cy.get(clickCheckAll).click();
		cy.get(clickCheckAll).click();
	});
	it("should check all when have option checked", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickSelect).click({ multiple: true });
		cy.get(clickCheckAll).click();
		cy.get(clickCheckAll).click();
	});
});
describe("group hide all column", () => {
	it("should hide all column", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(clickColumn).click({ multiple: true });
		cy.get(hideAllColumn).click({ multiple: true });
		cy.get(clickColumn).click();
	});
});
describe("group hide column and hide filter", () => {
	it("should hide all column", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(buttonFilter).click();
		cy.get(clickColumn).click();
	});
});
it("should edit swap other column", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
	cy.get(clickEditName).dblclick();
	cy.get(clickEditPosition).click();
});
it("should search and grow limit", () => {
	cy.mount(
		<Provider store={store}>
			<App />
		</Provider>
	);
	cy.get(gridRoot).viewport("macbook-16");
	cy.get(headerSearch).type("v");
});
describe("group toggle select all and select all on page", () => {
	it("should select all", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="showOptionSelect"]'
		).click();
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="selectAll"]'
		).click({ force: true });
		cy.get(paginationNext).click();
	});
	it("should select all on page", () => {
		cy.mount(
			<Provider store={store}>
				<App />
			</Provider>
		);
		cy.get(gridRoot).viewport("macbook-16");
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="showOptionSelect"]'
		).click();
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="selectAll"]'
		).click({ force: true });
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="showOptionSelect"]'
		).click();
		cy.get(
			'[data-hook="gird-root"] [data-hook="grid-list-data"] [data-hook="deselectAll"]'
		).click({ force: true });
		cy.get(paginationPre).click();
	});
});
