import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
	changeAgeAll,
	changeNameAll,
	changeOfficeAll,
	changePositionAll,
	changeSalaryAll,
	changeStatusAll,
} from "../../../stores/TableStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { classes } from "./EditMultiRow.st.css";
function EditMultiRow() {
	const [columnName, setColumnName] = useState("");
	const [columnAge, setColumnAge] = useState(0);
	const [columnOffice, setColumnOffice] = useState("");
	const [columnSalary, setColumnSalary] = useState(0);
	const [columnPosition, setColumnPosition] = useState("");
	const [columnStatus, setColumnStatus] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const dispatch = useDispatch();
	const column = useSelector(
		(state: { table: initDataType }) => state.table.columns
	);
	const tableData = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const handlePosition = () => {
		const arr: string[] = [];
		_.each(tableData, (table) => {
			!_.includes(arr, table?.position) && arr.push(table?.position);
		});
		return arr;
	};
	const sendDataAllColumn = () => {
		dispatch(changeNameAll(columnName));
		dispatch(changeAgeAll(columnAge));
		dispatch(changeSalaryAll(columnSalary));
		dispatch(changePositionAll(columnPosition));
		dispatch(changeStatusAll(columnStatus));
		dispatch(changeOfficeAll(columnOffice));
	};
	return (
		<>
			<div className={classes.allInColumn}>
				{_.map(column, (columns) => {
					return (
						columns.id !== "tt8" &&
						columns.id !== "tt9" &&
						columns.statusDisplay && (
							<p key={columns.id} className={classes.allName}>
								All in column
							</p>
						)
					);
				})}
			</div>
			<div className={classes.editAll}>
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
								<option value={""}> </option>
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
								<option value={""}> </option>
								<option value={"enable"}>enable</option>
								<option value={"disable"}>disable</option>
							</select>
						</div>
					) : (
						""
					);
				})}
				<button onClick={sendDataAllColumn}>Apply</button>
			</div>
		</>
	);
}

export default EditMultiRow;
