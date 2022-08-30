import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
	changeRecordsLimit,
	changePagesToShow,
	changeCurrentPage,
	initDataTable,
	changeEditOneRow,
	changeEditMultiRow,
} from "../../../stores/TableStore";

import { st, classes } from "./HeaderBot.st.css";
import EditOneRow from "../../EditData/EditOneRow";
import EditMultiRow from "../../EditData/EditMultiRow";
function HeaderBot() {
	const dispatch = useDispatch();
	const [showAction, setShowAction] = useState(false);
	const [editStatus, setEditStatus] = useState(false);
	const [updateMultiRow, setUpdateMultiRow] = useState(false);
	const [enterRecordLimit, setEnterRecordLimit] = useState(false);
	const [editLimitRecord, setEditLimitRecord] = useState(false);
	const [enterCustomRecordLitmit, setEnterCustomRecordLimit] = useState<
		string | number
	>("");
	const recordsLimit = useSelector(
		(state: { table: initDataType }) => state.table.recordsLimit
	);
	const editMultiRow = useSelector(
		(state: { table: initDataType }) => state.table.editMultiRow
	);
	const [customRecordLimit, setCustomRecordLimit] = useState<string | number>(
		recordsLimit
	);
	const totalRecords = useSelector(
		(state: { table: initDataType }) => state.table.totalRecords
	);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const wrapperRefLimit = useRef<HTMLDivElement>(null);
	useEffect(() => {
		function handleClickOutside(event: { target: any }) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowAction(false);
			}
			if (
				wrapperRefLimit.current &&
				!wrapperRefLimit.current.contains(event.target)
			) {
				setEditLimitRecord(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [wrapperRef, wrapperRefLimit]);
	const showEditStatus = () => {
		setEditStatus(!editStatus);
	};
	const tableData = useSelector(
		(state: { table: initDataType }) => state.table.dataRecords
	);
	let pagesToShow = useSelector(
		(state: { table: initDataType }) => state.table.pagesToShow
	);
	pagesToShow = Math.ceil(totalRecords / recordsLimit);
	const handleChangePageLimit = (limitRecord: string) => {
		dispatch(changeRecordsLimit(Number(limitRecord)));
		dispatch(changePagesToShow(pagesToShow));
		dispatch(changeCurrentPage(1));
		setCustomRecordLimit(Number(limitRecord));
		setEditLimitRecord(false);
		setEnterRecordLimit(false);
	};
	const handleShowActions = () => {
		setShowAction(!showAction);
		setEditStatus(false);
	};
	const handleStorage = (newColumn: Table[] | []) => {
		localStorage.removeItem("tableData");
		window.localStorage.setItem("tableData", JSON.stringify(newColumn));
		const dataTable = window.localStorage?.getItem("tableData") || "[]";
		dispatch(initDataTable(JSON.parse(dataTable)));
	};
	const deleteSelected = () => {
		const newTableData = _.filter(tableData, (table: Table) => {
			if (table.selected) return false;
			return true;
		});
		handleStorage(newTableData);
	};
	const changeStatus = (status: string) => {
		const newColumn: Table[] = [];
		_.forEach(tableData, (table) => {
			let newItem = { ...table };
			if (table.selected) {
				newItem = {
					id: table.id,
					name: table.name,
					position: table.position,
					office: table.office,
					age: table.age,
					startDate: table.startDate,
					salary: table.salary,
					status: status,
					selected: table.selected,
				};
			}
			newColumn.push(newItem);
		});
		handleStorage(newColumn);
		setEditStatus(false);
		setShowAction(false);
	};
	const changeCustomRecordLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCustomRecordLimit(e.target.value);
	};
	const handleCustomLimitRecord = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter" && customRecordLimit) {
			const currentNumber = _.toNumber(customRecordLimit) || 1;
			dispatch(
				changeRecordsLimit(
					currentNumber < totalRecords
						? currentNumber
						: totalRecords > 0
						? totalRecords
						: 1
				)
			);
			setCustomRecordLimit(
				currentNumber < totalRecords
					? currentNumber
					: totalRecords > 0
					? totalRecords
					: 1
			);
			dispatch(changePagesToShow(pagesToShow));
			dispatch(changeCurrentPage(1));
			setEditLimitRecord(false);
		}
	};
	const handleEnterCustomLimitRecord = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter" && enterCustomRecordLitmit) {
			const currentNumber = _.toNumber(enterCustomRecordLitmit) || 1;
			dispatch(
				changeRecordsLimit(
					currentNumber < totalRecords
						? currentNumber
						: totalRecords > 0
						? totalRecords
						: 1
				)
			);
			dispatch(changePagesToShow(pagesToShow));
			dispatch(changeCurrentPage(1));
			setEnterRecordLimit(false);
			setCustomRecordLimit(
				currentNumber < totalRecords
					? currentNumber
					: totalRecords > 0
					? totalRecords
					: 1
			);
			setEnterCustomRecordLimit("");
			setEditLimitRecord(false);
		}
	};
	const countItemSelected = _.filter(tableData, (column) => column.selected);
	useEffect(() => {
		if (countItemSelected.length === 0) {
			setUpdateMultiRow(false);
			dispatch(changeEditMultiRow("normal"));
		}
	}, [countItemSelected.length, dispatch]);
	const saveData = () => {
		dispatch(changeEditOneRow(true));
	};
	const cancelEditData = () => {
		setUpdateMultiRow(false);
		dispatch(changeEditMultiRow("normal"));
	};
	const handleEditData = () => {
		if (editMultiRow !== "dblEditRow" && editMultiRow !== "editOneRow") {
			setUpdateMultiRow(true);
			dispatch(changeEditMultiRow("btnEditMulRow"));
		}
		setShowAction(false);
	};

	return (
		<div className={st(classes.root, classes.groupBot)} data-hook="groupBot">
			<div className={classes.groundAction} ref={wrapperRef}>
				<button onClick={handleShowActions} data-hook="buttonAction">
					<span>Actions</span>
				</button>
				{showAction && (
					<div className={classes.deleteAction}>
						<p onClick={deleteSelected} data-hook="deleteSelected">
							Delete
						</p>
						<p onClick={showEditStatus}>
							Change Status <label className={classes.arrowRight}>&rarr;</label>
						</p>
						<p onClick={handleEditData}>Edit</p>

						{editStatus && (
							<div className={classes.editStatus}>
								<p onClick={() => changeStatus("enable")}>enable</p>
								<p onClick={() => changeStatus("disable")}>disable</p>
							</div>
						)}
					</div>
				)}
			</div>
			<div className={classes.groupEditMultiRow}>
				{updateMultiRow && countItemSelected.length > 0 && (
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
			<div
				data-hook="grid-header"
				className={classes.groupPage}
				ref={wrapperRefLimit}
			>
				<div className={classes.groupLimit}>
					<input
						type="text"
						value={customRecordLimit}
						onChange={changeCustomRecordLimit}
						onKeyPress={handleCustomLimitRecord}
					/>
					<button
						className={`${editLimitRecord ? classes.editing : classes.notEdit}`}
						data-hook="buttonCustom"
						onClick={() => setEditLimitRecord(!editLimitRecord)}
					>
						{editLimitRecord ? <label>&#9660;</label> : <label>&#9650;</label>}
					</button>
					{editLimitRecord && (
						<div className={classes.customsLimit}>
							<p onClick={() => handleChangePageLimit("10")}>10</p>
							<p onClick={() => handleChangePageLimit("25")}>25</p>
							<p onClick={() => handleChangePageLimit("50")}>50</p>
							<p onClick={() => handleChangePageLimit("100")}>100</p>
							{enterRecordLimit ? (
								<input
									type="text"
									value={enterCustomRecordLitmit}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setEnterCustomRecordLimit(e.target.value)
									}
									onKeyPress={handleEnterCustomLimitRecord}
								/>
							) : (
								<p
									onClick={() => setEnterRecordLimit(true)}
									data-hook="customLimit"
								>
									Custom
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default HeaderBot;
