import { Provider } from "react-redux";
import { initStore } from "../../stores/store";
import Header from "./Header";
const store = initStore();

const gridHeader = '[data-hook="grid-header"]';
const gridHeaderSearch = '[data-hook="headerSearch"]';
const inputSearch = '[data-hook="inputSearch"] input';
const filterButton = ' [data-hook="filterButton"]';
const buttonCustom = '[data-hook="grid-header"] [data-hook="buttonCustom"]';
const inputCustom = '[data-hook="grid-header"] input:nth(1)';
const buttonColumn = '[data-hook="groupColumn"] button';
const buttonAction = '[data-hook="buttonAction"]';
it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
});

it("should display text search", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(gridHeaderSearch).contains("Search:");
});
it("should click buttom choose ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(buttonCustom).click();
	cy.get('[data-hook="grid-header"] p:nth(2)').click();
});
it("should click custom choose ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(buttonCustom).click();
	cy.get('[data-hook="grid-header"] p:nth(4)').click();
	cy.get(inputCustom).focus().type("24").blur();
	cy.get('[data-hook="grid-header"] p:nth(2)').click();
});
it("should change text search ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(inputSearch).type("v");
});
it("should click buttom filter ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(filterButton).click();
});
it("should click action and columns ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get(gridHeader).viewport("macbook-11");
	cy.get(buttonColumn).click();
	cy.get(buttonAction).click();
});
