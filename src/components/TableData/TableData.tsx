import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";
import { init, titleTable } from "../../stores/DataTable";
import {
	changeSortRecord,
	changeTotalRecord,
	changeCurrentPage,
	initDataTable,
	initColumn,
} from "../../stores/TableStore";
import ColumnType from "../Columns/ColumnType";
import ColumnSelect from "../Columns/ColumnSelect";
import ColumnCheckAll from "../Columns/ColumnCheckAll";
import { st, classes } from "./TableData.st.css";
import ColumnAction from "../Columns/ColumnAction";

function TableData() {
	const [isSorting, setIsSorting] = useState(true);
	const dispatch = useDispatch();
	const searchRecord = useSelector(
		(state: { table: initDataType }) => state.table.searchRecord
	);
	const recordsLimit = useSelector(
		(state: { table: initDataType }) => state.table.recordsLimit
	);
	const sortRecordChange = useSelector(
		(state: { table: initDataType }) => state.table.sortTable
	);
	const currentIndexPage = useSelector(
		(state: { table: initDataType }) => state.table.currentIndexPage
	);
	const totalRecords = useSelector(
		(state: { table: initDataType }) => state.table.totalRecords
	);
	let columnsAtr = useSelector(
		(state: { table: initDataType }) => state.table.columns
	);
	const ref = useRef(true);
	useEffect(() => {
		const firstTime = ref.current;
		const checkLocalRow = window.localStorage?.getItem("tableData");
		const checkLocalColums = window.localStorage?.getItem("columnsData");
		if (firstTime && checkLocalRow === null) {
			ref.current = false;
			window.localStorage.setItem("tableData", JSON.stringify(init));
		}
		if (firstTime && checkLocalColums === null) {
			ref.current = false;
			window.localStorage.setItem("columnsData", JSON.stringify(titleTable));
		}
	});
	useEffect(() => {
		const dataStorageTable = window.localStorage?.getItem("tableData") || "[]";
		dispatch(initDataTable(JSON.parse(dataStorageTable)));
		const dataStorageColumn =
			window.localStorage?.getItem("columnsData") || "[]";
		dispatch(initColumn(JSON.parse(dataStorageColumn)));
	}, [dispatch]);
	let tableRecordsFilters = useSelector((state: { table: initDataType }) => {
		const tableRecordsRemaining = _.filter(
			state.table.dataRecords,
			(table: Table) => {
				const lowerName = _.toLower(table.name);
				const lowerPosition = _.toLower(table.position);
				const lowerOffice = _.toLower(table.office);
				return (
					_.includes(lowerName, _.toLower(state.table.filterName)) &&
					_.includes(lowerPosition, _.toLower(state.table.filterPosition)) &&
					_.includes(lowerOffice, _.toLower(state.table.filterOffice)) &&
					_.includes(
						_.toString(table.age),
						_.toString(state.table.filterAge)
					) &&
					_.includes(table.startDate, _.toLower(state.table.filterStartDate)) &&
					_.includes(
						_.toString(table.salary),
						_.toLower(state.table.filterSalary)
					) &&
					_.includes(table.status, _.toLower(state.table.filterStatus))
				);
			}
		);
		return tableRecordsRemaining;
	});
	if (searchRecord !== "") {
		tableRecordsFilters = _.filter(tableRecordsFilters, (table) => {
			const lowerName = _.toLower(table.name);
			const lowerPosition = _.toLower(table.position);
			const lowerOffice = _.toLower(table.office);
			return (
				_.includes(lowerName, _.toLower(searchRecord)) ||
				_.includes(lowerPosition, _.toLower(searchRecord)) ||
				_.includes(lowerOffice, _.toLower(searchRecord)) ||
				_.includes(table.startDate, searchRecord)
			);
		});
	}
	useEffect(() => {
		dispatch(changeTotalRecord(tableRecordsFilters.length));
	}, [dispatch, tableRecordsFilters.length]);
	const handleChangeSortRecord = (atributeSort: string) => {
		setIsSorting(!isSorting);
		dispatch(changeSortRecord(atributeSort));
		dispatch(changeCurrentPage(1));
	};
	const handleChangeClassNameSort = (property: string) => {
		return sortRecordChange === property
			? classes.selectedSort
			: classes.noSelectedSort;
	};
	tableRecordsFilters = _.sortBy(tableRecordsFilters, (atributeRecord) => {
		switch (sortRecordChange) {
			case "position":
				return atributeRecord.position;
			case "office":
				return atributeRecord.office;
			case "age":
				return atributeRecord.age;
			case "startDate":
				return atributeRecord.startDate;
			default:
				return atributeRecord.name;
		}
	});
	const startIndex = (currentIndexPage - 1) * recordsLimit;
	const endIndex = Math.min(startIndex + recordsLimit - 1, totalRecords - 1);
	const sortNewRecordsTable: Table[] = _.slice(
		tableRecordsFilters,
		startIndex,
		endIndex + 1
	);
	let reverseSortNewRecordsTable: Table[] = _.reverse(tableRecordsFilters);
	reverseSortNewRecordsTable = _.slice(
		reverseSortNewRecordsTable,
		startIndex,
		endIndex + 1
	);
	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) {
			return;
		}
		const items = Array.from(columnsAtr);
		const [reorderItems] = items.splice(source.index, 1);
		items.splice(destination.index, 0, reorderItems);
		columnsAtr = items;
		localStorage.removeItem("columnsData");
		window.localStorage.setItem("columnsData", JSON.stringify(columnsAtr));
		const dataColumn = window.localStorage?.getItem("columnsData") || "[]";
		dispatch(initColumn(JSON.parse(dataColumn)));
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<div
						data-hook="grid-list-data"
						className={st(
							classes.root,
							{ tablesort: isSorting },
							`${
								snapshot.isDraggingOver
									? classes.droppableStyle
									: classes.nodroppableStyle
							}`
						)}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{_.map(columnsAtr, (initTitle, index) => {
							return (
								<Draggable
									key={initTitle.id}
									draggableId={initTitle.id}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.dragHandleProps}
											{...provided.draggableProps}
											className={st(
												classes.dataContent,
												`${
													initTitle.statusDisplay
														? classes.displayColumn
														: classes.noDisplayColumn
												}`,
												`${
													tableRecordsFilters.length !== 0
														? classes.haveBorder
														: classes.notBorder
												}`,
												`${snapshot.isDragging && classes.draggableStyle}`,
												`${initTitle.id === "tt8" && classes.columnCheckAll}`,
												`${initTitle.id === "tt9" && classes.columnAction}`
											)}
										>
											{initTitle.statusDisplay && initTitle.id === "tt8" ? (
												<ColumnCheckAll
													sorting={isSorting}
													arrSorting={sortNewRecordsTable}
													arrReversSorting={reverseSortNewRecordsTable}
												/>
											) : (
												<p
													data-hook="titleColumn"
													className={`${handleChangeClassNameSort(
														initTitle.name
													)}`}
													onClick={() => handleChangeSortRecord(initTitle.name)}
												>
													{initTitle.title}
												</p>
											)}
											<div className={classes.content}>
												{tableRecordsFilters.length !== 0
													? _.map(
															isSorting
																? sortNewRecordsTable
																: reverseSortNewRecordsTable,
															(table) => {
																switch (initTitle.title) {
																	case "Option":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnSelect
																					key={table.id}
																					rowData={table}
																				/>
																			)
																		);
																	case "Name":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"name"}
																				/>
																			)
																		);
																	case "Position":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"position"}
																				/>
																			)
																		);
																	case "Office":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"office"}
																				/>
																			)
																		);
																	case "Age":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"age"}
																				/>
																			)
																		);
																	case "Start Date":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"startDate"}
																				/>
																			)
																		);
																	case "Salary":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"salary"}
																				/>
																			)
																		);
																	case "Status":
																		return (
																			initTitle.statusDisplay && (
																				<ColumnType
																					key={table.id}
																					rowData={table}
																					arrSorting={sortNewRecordsTable}
																					isSort={isSorting}
																					arrReversSorting={
																						reverseSortNewRecordsTable
																					}
																					typeColumn={"status"}
																				/>
																			)
																		);
																	case "Action":
																		return (
																			<ColumnAction
																				key={table.id}
																				rowData={table}
																				arrSorting={sortNewRecordsTable}
																				isSort={isSorting}
																				arrReversSorting={
																					reverseSortNewRecordsTable
																				}
																			/>
																		);
																	default:
																		return;
																}
															}
													  )
													: initTitle.title === "Office" && "don't found it"}
											</div>
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default TableData;
