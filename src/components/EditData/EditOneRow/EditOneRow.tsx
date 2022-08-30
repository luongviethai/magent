import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import { changeEditOneRow, initDataTable } from "../../../stores/TableStore";
import { classes } from "./EditOneRow.st.css";

export type EditDataProp = {
	idData: string;
	// onChange: (id: string, value: string | number | Date) => void;
};
function EditOneRow(props: EditDataProp) {
	const dataTable = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const editOneRow = useSelector(
		(state: { table: initDataType }) => state.table.editOneRow
	);
	const column = useSelector(
		(state: { table: initDataType }) => state.table.columns
	);
	useEffect(() => {
		setPropValue(props.idData);
	}, [props.idData]);
	const [propValue, setPropValue] = useState(props.idData);
	const [startDate, setStartDate] = useState(new Date());
	const [columnName, setColumnName] = useState("");
	const [columnAge, setColumnAge] = useState(0);
	const [columnOffice, setColumnOffice] = useState("");
	const [columnSalary, setColumnSalary] = useState(0);
	const [columnPosition, setColumnPosition] = useState("");
	const [columnStatus, setColumnStatus] = useState("");
	const dispatch = useDispatch();
	const handlePosition = () => {
		const arr: string[] = [];
		_.each(dataTable, (table) => {
			!_.includes(arr, table?.position) && arr.push(table?.position);
		});
		return arr;
	};
	const nameAll = useSelector(
		(state: { table: initDataType }) => state.table.nameAll
	);
	const ageAll = useSelector(
		(state: { table: initDataType }) => state.table.ageAll
	);
	const positionAll = useSelector(
		(state: { table: initDataType }) => state.table.positionAll
	);
	const officeAll = useSelector(
		(state: { table: initDataType }) => state.table.officeAll
	);
	const statusAll = useSelector(
		(state: { table: initDataType }) => state.table.statusAll
	);
	const salaryAll = useSelector(
		(state: { table: initDataType }) => state.table.salaryAll
	);
	useEffect(() => {
		if (nameAll !== "") {
			setColumnName(nameAll);
		}
		if (ageAll !== 0) {
			setColumnAge(ageAll);
		}
		if (officeAll !== "") {
			setColumnOffice(officeAll);
		}
		if (positionAll !== "") {
			setColumnPosition(positionAll);
		}
		if (salaryAll !== 0) {
			setColumnSalary(salaryAll);
		}
		if (statusAll !== "") {
			setColumnStatus(statusAll);
		}
	}, [ageAll, nameAll, officeAll, positionAll, salaryAll, statusAll]);
	useEffect(() => {
		_.forEach(dataTable, (table) => {
			if (table.id === propValue) {
				setColumnName(table.name);
				setStartDate(new Date(table.startDate));
				setColumnAge(table.age);
				setColumnOffice(table.office);
				setColumnSalary(table.salary);
				setColumnPosition(table.position);
				setColumnStatus(table.status);
			}
		});
	}, [dataTable, propValue]);
	const countItemSelected = _.filter(dataTable, (column) => column.selected);
	useEffect(() => {
		if (editOneRow) {
			const newColumn: Table[] = [];
			_.forEach(dataTable, (table) => {
				let newItem = { ...table };
				if (table.id === propValue) {
					newItem = {
						id: table.id,
						name: columnName,
						position: columnPosition,
						office: columnOffice,
						age: columnAge,
						startDate: table.startDate,
						salary: columnSalary,
						status: columnStatus,
						selected: false,
					};
				}
				newColumn.push(newItem);
			});
			console.log(newColumn);
			localStorage.removeItem("tableData");
			window.localStorage.setItem("tableData", JSON.stringify(newColumn));
			const data = window.localStorage?.getItem("tableData") || "[]";
			dispatch(initDataTable(JSON.parse(data)));
			dispatch(changeEditOneRow(false));
		}
	}, [
		columnAge,
		columnName,
		columnOffice,
		columnPosition,
		columnSalary,
		columnStatus,
		countItemSelected,
		dataTable,
		dispatch,
		editOneRow,
		propValue,
	]);
	return (
		<div className={classes.root}>
			{_.map(column, (columns) => {
				return columns.id === "tt1" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputName}>
						<input
							type="text"
							value={columnName}
							onChange={(e) => setColumnName(e.target.value)}
						/>
					</div>
				) : columns.id === "tt2" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputPosition}>
						<select
							value={columnPosition}
							onChange={(e) => setColumnPosition(e.target.value)}
						>
							{_.map(handlePosition(), (item, index) => {
								return (
									<option key={index} value={item}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
				) : columns.id === "tt3" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputOffice}>
						<input
							type="text"
							value={columnOffice}
							onChange={(e) => setColumnOffice(e.target.value)}
						/>
					</div>
				) : columns.id === "tt4" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputAge}>
						<input
							type="number"
							value={columnAge}
							onChange={(e) => setColumnAge(Number(e.target.value))}
						/>
					</div>
				) : columns.id === "tt5" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputStartDate}>
						<DatePicker
							disabled={true}
							selected={startDate}
							onChange={(date: Date) => setStartDate(date)}
						/>
					</div>
				) : columns.id === "tt6" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputSalary}>
						<input
							type="number"
							value={columnSalary}
							onChange={(e) => setColumnSalary(Number(e.target.value))}
						/>
					</div>
				) : columns.id === "tt7" && columns.statusDisplay ? (
					<div key={columns.id} className={classes.inputStatus}>
						<select
							value={columnStatus}
							onChange={(e) => setColumnStatus(e.target.value)}
						>
							<option value={"enable"}>enable</option>
							<option value={"disable"}>disable</option>
						</select>
					</div>
				) : (
					""
				);
			})}
		</div>
	);
}

export default EditOneRow;
