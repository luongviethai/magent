import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
	initDataTable,
	changeEditMultiRow,
	changeCountClick,
	changeEditOneRow,
} from "../../../stores/TableStore";
import { classes } from "./ColumnType.st.css";
import EditOneRow from "../../EditData/EditOneRow";
import EditMultiRow from "../../EditData/EditMultiRow";

export type TableProp = {
	rowData: Table;
	arrSorting: Table[];
	isSort: boolean;
	arrReversSorting: Table[];
	typeColumn: string;
};
function ColumnName(props: TableProp) {
	const [editTable, setEditTable] = useState(false);
	const dispatch = useDispatch();
	const dataRecord = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const editMultiRow = useSelector(
		(state: { table: initDataType }) => state.table.editMultiRow
	);

	const countClick = useSelector(
		(state: { table: initDataType }) => state.table.countClick
	);
	const editDataSingleColumn = () => {
		if (
			editMultiRow !== "btnEditMulRow" &&
			editMultiRow !== "editOneRow" &&
			countClick === false
		) {
			editDataMultiRow();
			setEditTable(true);
			dispatch(changeEditMultiRow("dblEditRow"));
			dispatch(changeCountClick(true));
		}
	};

	const handleStorage = (newColumn: Table[] | []) => {
		localStorage.removeItem("tableData");
		window.localStorage.setItem("tableData", JSON.stringify(newColumn));
		const dataTable = window.localStorage?.getItem("tableData") || "[]";
		dispatch(initDataTable(JSON.parse(dataTable)));
	};
	const editDataMultiRow = () => {
		const newColumn: Table[] = [];
		_.forEach(dataRecord, (table) => {
			let newItem = { ...table };
			const itemSelect = props.rowData.id === table.id;
			newItem = {
				id: itemSelect ? props.rowData.id : table.id,
				name: itemSelect ? props.rowData.name : table.name,
				position: itemSelect ? props.rowData.position : table.position,
				office: itemSelect ? props.rowData.office : table.office,
				age: itemSelect ? props.rowData.age : table.age,
				startDate: itemSelect ? props.rowData.startDate : table.startDate,
				salary: itemSelect ? props.rowData.salary : table.salary,
				status: itemSelect ? props.rowData.status : table.status,
				selected: itemSelect ? true : false,
			};

			newColumn.push(newItem);
		});
		handleStorage(newColumn);
	};
	const countItemSelected = _.filter(
		props.isSort ? props.arrSorting : props.arrReversSorting,
		(column) => column.selected
	);
	useEffect(() => {
		if (countItemSelected.length === 0) {
			setEditTable(false);
			dispatch(changeEditMultiRow("normal"));
			dispatch(changeCountClick(false));
		}
	}, [countItemSelected.length, dispatch]);
	const saveData = () => {
		dispatch(changeEditOneRow(true));
	};
	const cancelEditData = () => {
		dispatch(changeEditMultiRow("normal"));
		dispatch(changeCountClick(false));
		setEditTable(false);
	};

	const handleTypeColumn = () => {
		switch (props.typeColumn) {
			case "name":
				return props.rowData.name;
			case "position":
				return props.rowData.position;
			case "office":
				return props.rowData.office;
			case "age":
				return props.rowData.age;
			case "status":
				return props.rowData.status;
			case "salary":
				return props.rowData.salary + "$";
			case "startDate":
				return props.rowData.startDate;
			default:
				return;
		}
	};
	return (
		<div
			className={classes.root}
			data-hook="data-columnAge"
			onDoubleClick={editDataSingleColumn}
		>
			{editTable ? (
				countItemSelected.length > 0 && (
					<div className={classes.editMulRow}>
						{countItemSelected.length > 1 && <EditMultiRow />}
						{_.map(countItemSelected, (table) => {
							return <EditOneRow idData={table.id} key={table.id} />;
						})}
						<div className={classes.groupHandleData}>
							<div className={classes.saveData}>
								<p onClick={saveData}>Save</p>
							</div>
							<div className={classes.cancelData}>
								<p onClick={cancelEditData}>Cancel</p>
							</div>
						</div>
					</div>
				)
			) : (
				<p onDoubleClick={editDataSingleColumn} key={props.rowData.id}>
					{handleTypeColumn()}
				</p>
			)}
		</div>
	);
}

export default ColumnName;
