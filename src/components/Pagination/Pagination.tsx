import { useSelector, useDispatch } from "react-redux";
import { changeCurrentPage } from "../../stores/TableStore";
import { st, classes } from "./Pagination.st.css";

const Pagination = () => {
	const dispatch = useDispatch();
	let currentIndexPage = useSelector(
		(state: { table: initDataType }) => state.table.currentIndexPage
	);
	let pagesToShow = useSelector(
		(state: { table: initDataType }) => state.table.pagesToShow
	);
	const recordsLimit = useSelector(
		(state: { table: initDataType }) => state.table.recordsLimit
	);
	const totalRecords = useSelector(
		(state: { table: initDataType }) => state.table.totalRecords
	);

	const handleChangePreOrNextPage = (statusPage: string) => {
		statusPage === "pre" ? currentIndexPage-- : currentIndexPage++;
		dispatch(changeCurrentPage(currentIndexPage));
	};

	pagesToShow = Math.ceil(totalRecords / recordsLimit);
	const startIndex = (currentIndexPage - 1) * recordsLimit;
	const endIndex = Math.min(startIndex + recordsLimit - 1, totalRecords - 1);
	return (
		<>
			<div data-hook="gridPagination" className={st(classes.root)}>
				<div className={classes.entries}>
					<p>
						Show {startIndex + 1} to {endIndex + 1} of {totalRecords} entries
					</p>
				</div>
				<div className={st(classes.buttonPage)}>
					<div className={st(classes.page, classes.pagePrevious)}>
						<button
							data-hook="clickPrePage"
							disabled={currentIndexPage === 1 ? true : false}
							onClick={() => handleChangePreOrNextPage("pre")}
						>
							Previous
						</button>
					</div>
					<div
						data-hook="pageNumber"
						className={st(classes.pageNumber, classes.page)}
					>
						<button className="pageSelect">{currentIndexPage}</button>
					</div>
					<div className={st(classes.page, classes.pageNext)}>
						<button
							data-hook="clickNextPage"
							type="button"
							disabled={
								currentIndexPage === pagesToShow ||
								(currentIndexPage === 1 && pagesToShow <= 1)
									? true
									: false
							}
							onClick={() => handleChangePreOrNextPage("next")}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Pagination;
