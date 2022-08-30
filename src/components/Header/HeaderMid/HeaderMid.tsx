import { classes } from "./HeaderMid.st.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	searchRecordChange,
	changeCurrentPage,
} from "../../../stores/TableStore";
function HeaderMid() {
	const dispatch = useDispatch();
	const searchRecordText = useSelector(
		(state: { table: initDataType }) => state.table.searchRecord
	);
	const [searchRecord, setSearchRecord] = useState(searchRecordText);
	const handleSearchRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchRecord(e.target.value);
		dispatch(searchRecordChange(e.target.value));
		dispatch(changeCurrentPage(1));
	};
	return (
		<div className={classes.groupMid} data-hook="headerMid">
			<div className={classes.searchRecord} data-hook="inputSearch">
				<label data-hook="headerSearch" htmlFor="input-search">
					Search:
				</label>
				<input
					type="search"
					value={searchRecord}
					className="input-search"
					onChange={handleSearchRecordChange}
				/>
			</div>
		</div>
	);
}

export default HeaderMid;
