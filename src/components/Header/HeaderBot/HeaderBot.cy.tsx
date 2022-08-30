import { Provider } from "react-redux";
import { initStore } from "../../../stores/store";
import Header from "./HeaderBot";
const store = initStore();

const buttonAction = '[data-hook="buttonAction"]';
it("mount", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get('[data-hook="groupBot"]').viewport("macbook-11");
});
it("should click action ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get('[data-hook="groupBot"]').viewport("macbook-11");
	cy.get(buttonAction).click();
	cy.get('[data-hook="groupBot"] p:nth(1)').click();
});
it("should custom limit ", () => {
	cy.mount(
		<Provider store={store}>
			<Header />
		</Provider>
	);
	cy.get('[data-hook="groupBot"]').viewport("macbook-11");
	cy.get('[data-hook="groupBot"] [data-hook="buttonCustom"]').click();
});
