import mainSlice, {
  changeRecordsLimit,
  changePagesToShow,
  changeCurrentPage,
  searchRecordChange,
  changeSortRecord,
  changeTotalRecord,
  changeFilterName,
  changeFilterPosition,
  changeFilterOffice,
  initState,
} from "./TableStore";

it("changeRecordsLimit", () => {
  const store = mainSlice(initState, changeRecordsLimit(10));
  expect(store.recordsLimit);
});
it("changeFilterName", () => {
  const store = mainSlice(initState, changeFilterName("fsd"));
  expect(store.filterName);
});
it("changeFilterPosition", () => {
  const store = mainSlice(initState, changeFilterPosition("SEO"));
  expect(store.filterPosition);
});
it("changeFilterPosition", () => {
  const store = mainSlice(initState, changeFilterPosition("SEO"));
  expect(store.filterPosition);
});
it("changeFilterOffice", () => {
  const store = mainSlice(initState, changeFilterOffice("ha noi"));
  expect(store.filterOffice);
});
it("changePagesToShow", () => {
  const store = mainSlice(initState, changePagesToShow(5));
  expect(store.pagesToShow);
});
it("changeCurrentPage", () => {
  const store = mainSlice(initState, changeCurrentPage(1));
  expect(store.currentIndexPage);
});
it("searchRecordChange", () => {
  const store = mainSlice(initState, searchRecordChange("dasd"));
  expect(store.searchRecord);
});
it("changeSortRecord", () => {
  const store = mainSlice(initState, changeSortRecord("position"));
  expect(store.sortTable);
});
it("changeTotalRecord", () => {
  const store = mainSlice(initState, changeTotalRecord(80));
  expect(store.totalRecords);
});
