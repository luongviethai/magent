import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterArr } from "./DataTable";
import _ from "lodash";
type ActionTypes = {
	initDataTable: (state: initDataType, action: PayloadAction<Table[]>) => void;
	initColumn: (state: initDataType, action: PayloadAction<Columns[]>) => void;
	changeRecordsLimit: (
		state: initDataType,
		action: PayloadAction<number>
	) => void;
	changePagesToShow: (
		state: initDataType,
		action: PayloadAction<number>
	) => void;
	changeCurrentPage: (
		state: initDataType,
		action: PayloadAction<number>
	) => void;
	searchRecordChange: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeSortRecord: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeTotalRecord: (
		state: initDataType,
		action: PayloadAction<number>
	) => void;
	changeFilterName: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeFilterPosition: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeFilterOffice: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeFilterAge: (state: initDataType, action: PayloadAction<string>) => void;
	changeFilterStatus: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeFilterStartDate: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeFilterSalary: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeEditMultiRow: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeEditOneRow: (
		state: initDataType,
		action: PayloadAction<boolean>
	) => void;
	changeNameAll: (state: initDataType, action: PayloadAction<string>) => void;
	changeAgeAll: (state: initDataType, action: PayloadAction<number>) => void;
	changeOfficeAll: (state: initDataType, action: PayloadAction<string>) => void;
	changePositionAll: (
		state: initDataType,
		action: PayloadAction<string>
	) => void;
	changeSalaryAll: (state: initDataType, action: PayloadAction<number>) => void;
	changeStatusAll: (state: initDataType, action: PayloadAction<string>) => void;
	changeCountClick: (
		state: initDataType,
		action: PayloadAction<boolean>
	) => void;
	changeFilterArr: (
		state: initDataType,
		action: PayloadAction<{ key: string; value: string }>
	) => void;
};
export const initState = {
	searchRecord: "",
	sortTable: "name",
	totalRecords: 0,
	pagesToShow: 0,
	recordsLimit: 10,
	currentIndexPage: 1,
	dataRecords: [],
	columns: [],
	filterName: "",
	filterPosition: "",
	filterOffice: "",
	filterAge: "",
	filterStartDate: "",
	filterSalary: "",
	filterStatus: "",
	editMultiRow: "normal",
	editOneRow: false,
	nameAll: "",
	ageAll: 0,
	positionAll: "",
	officeAll: "",
	salaryAll: 0,
	statusAll: "",
	countClick: false,
	filterArr: filterArr,
};
const TableStore = createSlice<initDataType, ActionTypes>({
	name: "tableData",
	initialState: initState,
	reducers: {
		initDataTable: (state, action) => {
			state.dataRecords = [...action.payload];
			return state;
		},
		initColumn: (state, action) => {
			state.columns = [...action.payload];
		},
		changeRecordsLimit: (state, action) => {
			state.recordsLimit = action.payload;
		},
		changePagesToShow: (state, action) => {
			state.pagesToShow = action.payload;
		},
		changeCurrentPage: (state, action) => {
			state.currentIndexPage = action.payload;
		},
		searchRecordChange: (state, action) => {
			state.searchRecord = action.payload;
		},
		changeSortRecord: (state, action) => {
			state.sortTable = action.payload;
		},
		changeTotalRecord: (state, action) => {
			state.totalRecords = action.payload;
		},
		changeFilterName: (state, action) => {
			state.filterName = action.payload;
		},
		changeFilterPosition: (state, action) => {
			state.filterPosition = action.payload;
		},
		changeFilterOffice: (state, action) => {
			state.filterOffice = action.payload;
		},
		changeFilterAge: (state, action) => {
			state.filterAge = action.payload;
		},
		changeFilterSalary: (state, action) => {
			state.filterSalary = action.payload;
		},
		changeFilterStatus: (state, action) => {
			state.filterStatus = action.payload;
		},
		changeFilterStartDate: (state, action) => {
			state.filterStartDate = action.payload;
		},
		changeEditMultiRow: (state, action) => {
			state.editMultiRow = action.payload;
		},
		changeEditOneRow: (state, action) => {
			state.editOneRow = action.payload;
		},
		changeNameAll: (state, action) => {
			state.nameAll = action.payload;
		},
		changeAgeAll: (state, action) => {
			state.ageAll = action.payload;
		},
		changeOfficeAll: (state, action) => {
			state.officeAll = action.payload;
		},
		changeStatusAll: (state, action) => {
			state.statusAll = action.payload;
		},
		changeSalaryAll: (state, action) => {
			state.salaryAll = action.payload;
		},
		changePositionAll: (state, action) => {
			state.positionAll = action.payload;
		},
		changeCountClick: (state, action) => {
			state.countClick = action.payload;
		},
		changeFilterArr: (state, action) => {
			const indexOf = _.findIndex(
				state.filterArr,
				(filter) => filter.key === action.payload.key
			);
			state.filterArr[indexOf].value = action.payload.value;
			return state;
		},
	},
});

export const {
	initDataTable,
	initColumn,
	changeRecordsLimit,
	changePagesToShow,
	changeCurrentPage,
	searchRecordChange,
	changeSortRecord,
	changeTotalRecord,
	changeFilterName,
	changeFilterPosition,
	changeFilterOffice,
	changeFilterAge,
	changeFilterStatus,
	changeFilterSalary,
	changeFilterStartDate,
	changeEditMultiRow,
	changeEditOneRow,
	changeNameAll,
	changeAgeAll,
	changeOfficeAll,
	changeStatusAll,
	changeSalaryAll,
	changePositionAll,
	changeCountClick,
	changeFilterArr,
} = TableStore.actions;

export default TableStore.reducer;
