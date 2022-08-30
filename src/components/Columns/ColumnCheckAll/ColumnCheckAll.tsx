import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { initDataTable } from "../../../stores/TableStore";
import { classes } from "./ColumnCheckAll.st.css";
export type TableProp = {
	sorting: boolean;
	arrSorting: Table[];
	arrReversSorting: Table[];
};

function ColumnCheckAll(props: TableProp) {
	const [checkSelectPage, setCheckSelectOnPage] = useState(false);
	const [showOption, setShowOption] = useState(false);
	const [toggleSelectAll, setToggleSelectAll] = useState(true);
	const wrapperRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowOption(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [wrapperRef]);
	useEffect(() => {
		_.forEach(
			props.sorting ? props.arrSorting : props.arrReversSorting,
			(arr) =>
				(!arr.selected && setCheckSelectOnPage(false)) ||
				(arr.selected && setCheckSelectOnPage(true))
		);
	}, [props.arrReversSorting, props.arrSorting, props.sorting]);
	const dispatch = useDispatch();
	const handleSelectOnPage = () => {
		setCheckSelectOnPage(!checkSelectPage);
		const newColumn: Table[] = [];
		handleNewTableStorage(
			newColumn,
			props.sorting ? props.arrSorting : props.arrReversSorting
		);
		handleStorage(newColumn);
	};
	const handleSelectAll = (selected: boolean) => {
		setToggleSelectAll(!selected);
		setCheckSelectOnPage(selected);
		const newColumn: Table[] = [];
		_.forEach(dataRecord, (table) => {
			let newItem = { ...table };
			newItem = {
				id: table.id,
				name: table.name,
				position: table.position,
				office: table.office,
				age: table.age,
				startDate: table.startDate,
				salary: table.salary,
				status: table.status,
				selected: selected,
			};
			newColumn.push(newItem);
		});
		handleStorage(newColumn);
	};
	const dataRecord = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	const handleStorage = (newColumn: Table[] | []) => {
		localStorage.removeItem("tableData");
		window.localStorage.setItem("tableData", JSON.stringify(newColumn));
		const dataTable = window.localStorage?.getItem("tableData") || "[]";
		dispatch(initDataTable(JSON.parse(dataTable)));
	};
	const handleNewTableStorage = (newColumn: Table[], newTableSort: Table[]) => {
		_.forEach(dataRecord, (table) => {
			let newItem = { ...table };
			_.forEach(newTableSort, (data) => {
				if (table.id === data.id) {
					newItem = {
						id: data.id,
						name: data.name,
						position: data.position,
						office: data.office,
						age: data.age,
						startDate: data.startDate,
						salary: data.salary,
						status: data.status,
						selected: !checkSelectPage,
					};
				}
			});
			newColumn.push(newItem);
		});
	};

	return (
		<div className={classes.root} data-hook="checkAll" ref={wrapperRef}>
			<label>
				<input
					type="checkbox"
					onChange={handleSelectOnPage}
					checked={checkSelectPage}
				/>
				<span></span>
			</label>
			<div>
				<button
					onClick={() => setShowOption(!showOption)}
					data-hook="showOptionSelect"
				>
					{showOption ? (
						<label className={classes.labelOption}>&#9660;</label>
					) : (
						<label className={classes.labelOption}>&#9650;</label>
					)}
				</button>
				{showOption && (
					<div className={classes.toggleSelectAll}>
						{checkSelectPage ? (
							<>
								{toggleSelectAll && (
									<p
										onClick={() => handleSelectAll(true)}
										data-hook="selectAll"
									>
										Select All
									</p>
								)}
								<p
									onClick={() => handleSelectAll(false)}
									data-hook="deselectAll"
								>
									Deselect All
								</p>
								<p onClick={handleSelectOnPage}>Deselect All On Page</p>
							</>
						) : (
							<>
								<p onClick={() => handleSelectAll(true)} data-hook="selectAll">
									Select All
								</p>
								<p onClick={handleSelectOnPage}>Select All On Page</p>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ColumnCheckAll;
