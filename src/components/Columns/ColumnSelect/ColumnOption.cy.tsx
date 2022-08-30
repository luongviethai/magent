import { Provider } from "react-redux";
import { initStore } from "../../../stores/store";
import ColumnOption from "./ColumnSelect";
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
      <ColumnOption rowData={rowData} />
    </Provider>
  );
  cy.get('[data-hook="data-ColumnOption"]').viewport("macbook-13");
});

it("should change input", () => {
  cy.mount(
    <Provider store={store}>
      <ColumnOption rowData={rowData} />
    </Provider>
  );
  cy.get('[data-hook="data-ColumnOption"]').viewport("macbook-13");
  cy.get('[data-hook="data-ColumnOption"] input').click();
});
