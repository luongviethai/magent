import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { st, classes } from "./HeaderTop.st.css";
import {
	changeCurrentPage,
	changeFilterOffice,
	changeFilterName,
	changeFilterPosition,
	changeFilterAge,
	changeFilterStatus,
	changeFilterSalary,
	changeFilterStartDate,
	initColumn,
} from "../../../stores/TableStore";
function HeaderTop() {
	const [newDate, setNewDate] = useState<Date | null>(null);
	const dispatch = useDispatch();
	const columnsAtr = useSelector(
		(state: { table: initDataType }) => state.table.columns
	);
	const dataTable = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const [enableColumns, setEnableColumns] = useState(false);
	const [enableFilters, setEnableFilters] = useState(false);
	const [filterPosition, setFilterPosition] = useState("");
	const [filterName, setFilterName] = useState("");
	const [filterAge, setFilterAge] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [filterStartDate, setFilterStartDate] = useState("");
	const [filterSalary, setFilterSalary] = useState("");
	const [filterOffice, setFilterOffice] = useState("");

	const filterPositionStore = useSelector(
		(state: { table: initDataType }) => state.table.filterPosition
	);
	const filterOfficeStore = useSelector(
		(state: { table: initDataType }) => state.table.filterOffice
	);
	const filterAgeStore = useSelector(
		(state: { table: initDataType }) => state.table.filterAge
	);
	const filterStartDateStore = useSelector(
		(state: { table: initDataType }) => state.table.filterStartDate
	);
	const filterSalaryStore = useSelector(
		(state: { table: initDataType }) => state.table.filterSalary
	);
	const filterStatusStore = useSelector(
		(state: { table: initDataType }) => state.table.filterStatus
	);
	const filterNameStore = useSelector(
		(state: { table: initDataType }) => state.table.filterName
	);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setEnableColumns(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [wrapperRef]);
	const handleChangeFilterSelect = (
		e: React.ChangeEvent<HTMLSelectElement>,
		filter: string
	) => {
		switch (filter) {
			case "position":
				return setFilterPosition(e.target.value);
			case "status":
				return setFilterStatus(e.target.value);
		}
	};
	const handleChangeInputFilter = (
		e: React.ChangeEvent<HTMLInputElement>,
		filter: string
	) => {
		switch (filter) {
			case "name":
				return setFilterName(e.target.value);
			case "office":
				return setFilterOffice(e.target.value);
			case "startDate":
				return setFilterStartDate(e.target.value);
			case "age":
				return setFilterAge(e.target.value);
			case "salary":
				return setFilterSalary(e.target.value);
			default:
				return;
		}
	};
	const changeStatusEnableFilters = () => {
		setEnableFilters(!enableFilters);
	};
	const handleApplyFilters = () => {
		dispatch(changeFilterName(filterName));
		dispatch(changeFilterPosition(filterPosition));
		dispatch(changeFilterOffice(filterOffice));
		dispatch(changeFilterAge(filterAge));
		dispatch(changeFilterStartDate(filterStartDate));
		dispatch(changeFilterSalary(filterSalary));
		dispatch(changeFilterStatus(filterStatus));
		newDate !== null && dispatch(changeFilterStartDate(convertDate(newDate)));
		dispatch(changeCurrentPage(1));
		setEnableFilters(false);
	};
	const showColumns = () => {
		setEnableColumns(!enableColumns);
	};
	const countColumnDisplay = _.filter(
		columnsAtr,
		(column) => column.statusDisplay
	);
	const handleStatusDisplay = (id: string) => {
		const newColumn: Columns[] = [];
		_.map(columnsAtr, (columns: Columns) => {
			let newItem = { ...columns };
			if (columns.id === id) {
				newItem = {
					id: id,
					title: columns.title,
					name: columns.name,
					statusDisplay: !columns.statusDisplay,
				};
			}
			newColumn.push(newItem);
		});
		localStorage.removeItem("columnsData");
		window.localStorage.setItem("columnsData", JSON.stringify(newColumn));
		const dataColumn = window.localStorage?.getItem("columnsData") || "[]";
		dispatch(initColumn(JSON.parse(dataColumn)));
	};
	function convertDate(inputFormat: Date | null) {
		function pad(dateTime: string | number) {
			return dateTime < 10 ? "0" + dateTime : dateTime;
		}
		let date = new Date();
		if (inputFormat !== null) {
			date = new Date(inputFormat);
		}
		return [
			pad(date.getMonth() + 1),
			pad(date.getDate()),
			date.getFullYear(),
		].join("-");
	}

	const handlePosition = () => {
		const arr: string[] = [];
		_.each(dataTable, (table) => {
			!_.includes(arr, table?.position) && arr.push(table?.position);
		});
		return arr;
	};
	const deleteFilter = (filter: string) => {
		if (filter === "name") {
			dispatch(changeFilterName(""));
			setFilterName("");
		}
		if (filter === "position") {
			dispatch(changeFilterPosition(""));
			setFilterPosition("");
		}
		if (filter === "office") {
			dispatch(changeFilterOffice(""));
			setFilterOffice("");
		}
		if (filter === "age") {
			dispatch(changeFilterAge(""));
			setFilterAge("");
		}
		if (filter === "startDate") {
			dispatch(changeFilterStartDate(""));
			setNewDate(null);
		}
		if (filter === "salary") {
			dispatch(changeFilterSalary(""));
			setFilterSalary("");
		}
		if (filter === "status") {
			dispatch(changeFilterStatus(""));
			setFilterStatus("");
		}
	};
	const filterArr = [
		{
			name: "Position",
			value: filterPositionStore,
			key: "position",
		},
		{
			name: "Name",
			value: filterNameStore,
			key: "name",
		},
		{
			name: "Office",
			value: filterOfficeStore,
			key: "office",
		},
		{
			name: "Age",
			value: filterAgeStore,
			key: "age",
		},
		{
			name: "Start Date",
			value: filterStartDateStore,
			key: "startDate",
		},
		{
			name: "Salary",
			value: filterSalaryStore,
			key: "salary",
		},
		{
			name: "Status",
			value: filterStatusStore,
			key: "status",
		},
	];
	return (
		<>
			<div className={classes.groupFilted}>
				{_.map(filterArr, (item) => {
					return (
						item.value !== "" && (
							<div className={classes.filterAtr} key={item.key}>
								<p>{item.name}: </p>
								<p>{item.value}</p>
								<p
									data-hook="clearFilterPosition"
									className={classes.deleteFilter}
									onClick={() => deleteFilter(item.key)}
								>
									x
								</p>
							</div>
						)
					);
				})}
			</div>
			<div className={st(classes.groupTop, classes.root)} data-hook="groupTop">
				<div className={classes.groupFilter}>
					<button
						data-hook="filterButton"
						className={classes.buttonFilter}
						onClick={changeStatusEnableFilters}
					>
						Filters
					</button>
					{enableFilters && (
						<div className={classes.filterActions}>
							{_.map(columnsAtr, (columns) => {
								return columns.id === "tt2" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterPosition}>
										<label>Position: </label>
										<select
											value={filterPosition}
											onChange={(e) => handleChangeFilterSelect(e, "position")}
											data-hook="filter"
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
								) : columns.id === "tt1" && columns.statusDisplay ? (
									<div key={columns.id}>
										<label htmlFor="inputFilterName">Name: </label>
										<input
											data-hook="filterName"
											placeholder="Enter your name"
											type="search"
											value={filterName}
											className="inputFilterName"
											onChange={(e) => handleChangeInputFilter(e, "name")}
										/>
									</div>
								) : columns.id === "tt3" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterOffice}>
										<label htmlFor="inputFilterOffice">Office: </label>
										<input
											data-hook="filterOffice"
											type="search"
											placeholder="Enter your office"
											value={filterOffice}
											className="inputFilterOffice"
											onChange={(e) => handleChangeInputFilter(e, "office")}
										/>
									</div>
								) : columns.id === "tt4" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterAge}>
										<label htmlFor="inputFilterAge">Age: </label>
										<input
											type="number"
											value={filterAge}
											placeholder="Enter your age"
											min={0}
											className="inputFilterAge"
											onChange={(e) => handleChangeInputFilter(e, "age")}
										/>
									</div>
								) : columns.id === "tt5" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterStartDate}>
										<label htmlFor="inputFilterStartDate">Start Date: </label>
										<DatePicker
											dateFormat="MM/dd/yyyy"
											selected={newDate}
											onChange={(date: Date) => setNewDate(date)}
											placeholderText="Enter your date"
										/>
									</div>
								) : columns.id === "tt6" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterSalary}>
										<label htmlFor="inputFilterSalary">Salary: </label>
										<input
											type="number"
											placeholder="Enter your salary"
											value={filterSalary}
											className="inputFilterSalary"
											onChange={(e) => handleChangeInputFilter(e, "salary")}
										/>
									</div>
								) : columns.id === "tt7" && columns.statusDisplay ? (
									<div key={columns.id} className={classes.filterStatus}>
										<label htmlFor="inputFilterStatus">Status: </label>
										<select
											value={filterStatus}
											onChange={(e) => handleChangeFilterSelect(e, "status")}
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
							<div>
								<p onClick={handleApplyFilters} data-hook="applyFilter">
									Apply Filters
								</p>
							</div>
						</div>
					)}
				</div>
				<div
					className={classes.groupColumns}
					data-hook="groupColumn"
					ref={wrapperRef}
				>
					<button onClick={showColumns}>Columns</button>
					{enableColumns && (
						<div className={classes.columnsAction}>
							{_.map(columnsAtr, (columns) => {
								return (
									columns.id !== "tt8" &&
									columns.id !== "tt9" && (
										<div
											key={columns.id}
											className={st(classes.showColumn, {
												disable:
													countColumnDisplay.length === 3 &&
													columns.statusDisplay,
											})}
										>
											{columns.title}
											<label>
												<input
													type="checkbox"
													checked={columns.statusDisplay}
													onChange={() => handleStatusDisplay(columns.id)}
												/>
												<span></span>
											</label>
										</div>
									)
								);
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default HeaderTop;
