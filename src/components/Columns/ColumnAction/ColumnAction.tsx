import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
	changeCountClick,
	changeEditMultiRow,
	changeEditOneRow,
	initDataTable,
} from "../../../stores/TableStore";

import { classes } from "./ColumnAction.st.css";
import EditOneRow from "../../EditData/EditOneRow";
import EditMultiRow from "../../EditData/EditMultiRow";

export type TableProp = {
	rowData: Table;
	arrSorting: Table[];
	isSort: boolean;
	arrReversSorting: Table[];
};
function ColumnAction(props: TableProp) {
	const [selectAction, setSelectAction] = useState(false);
	const [editTable, setEditTable] = useState(false);
	const dispatch = useDispatch();
	const tableData = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const editMultiRow = useSelector(
		(state: { table: initDataType }) => state.table.editMultiRow
	);

	const countClick = useSelector(
		(state: { table: initDataType }) => state.table.countClick
	);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setSelectAction(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [wrapperRef]);
	const changeSelectAction = () => {
		setSelectAction(!selectAction);
	};
	const editDataMultiRow = () => {
		const newColumn: Table[] = [];
		_.forEach(tableData, (table) => {
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
	const handleStorage = (newColumn: Table[] | []) => {
		localStorage.removeItem("tableData");
		window.localStorage.setItem("tableData", JSON.stringify(newColumn));
		const dataTable = window.localStorage?.getItem("tableData") || "[]";
		dispatch(initDataTable(JSON.parse(dataTable)));
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
	const editData = () => {
		if (
			editMultiRow !== "btnEditMulRow" &&
			editMultiRow !== "dblEditRow" &&
			countClick === false
		) {
			editDataMultiRow();
			setEditTable(true);
			dispatch(changeEditMultiRow("editOneRow"));
			dispatch(changeCountClick(true));
		}
	};
	const deleteData = () => {
		const newTableData = _.filter(tableData, (table: Table) => {
			if (props.rowData.id === table.id) return false;
			return true;
		});
		handleStorage(newTableData);
	};
	const saveData = () => {
		dispatch(changeEditOneRow(true));
		// setTimeout(() => {
		// 	dispatch(changeEditOneRow(false));
		// }, 1000);
	};
	const cancelEditData = () => {
		dispatch(changeEditMultiRow("normal"));
		dispatch(changeCountClick(false));
		setEditTable(false);
	};
	return (
		<div className={classes.root} onClick={changeSelectAction} ref={wrapperRef}>
			<div>
				{selectAction ? (
					<div>
						<p>Select &#9660;</p>
						<div className={classes.groupAction}>
							<p onClick={editData}>Edit</p>
							<p onClick={deleteData}>Delete</p>
						</div>
					</div>
				) : (
					<p>Select &#9650;</p>
				)}
			</div>
			<div className={classes.groupEditMultiRow}>
				{editTable && countItemSelected.length > 0 && (
					<>
						{countItemSelected.length > 1 && <EditMultiRow />}
						<div>
							{_.map(countItemSelected, (table) => {
								return <EditOneRow idData={table.id} key={table.id} />;
							})}
						</div>
						<div className={classes.groupHandleData}>
							<div className={classes.saveData}>
								<p onClick={saveData}>Save</p>
							</div>
							<div className={classes.cancelData}>
								<p onClick={cancelEditData}>Cancel</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ColumnAction;
