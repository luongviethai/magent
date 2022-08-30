import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { initDataTable } from "../../../stores/TableStore";
import { classes } from "./ColumnSelect.st.css";
export type TableProp = {
  rowData: Table;
};
function ColumnSelect(props: TableProp) {
  const [columnData, setColumnData] = useState(props.rowData.selected);

  useEffect(() => {
    setColumnData(props.rowData.selected);
  }, [props.rowData.selected]);

  const dispatch = useDispatch();
  const handleSelected = () => {
    setColumnData(!columnData);
    const newColumn: Table[] = [];
    handleNewTableStorage(newColumn);
    handleStorage(newColumn);
  };
  const handleStorage = (newColumn: Table[] | []) => {
    localStorage.removeItem("tableData");
    window.localStorage.setItem("tableData", JSON.stringify(newColumn));
    const dataTable = window.localStorage?.getItem("tableData") || "[]";
    dispatch(initDataTable(JSON.parse(dataTable)));
  };
  const dataRecord = useSelector(
    (state: { table: initDataType }) => state.table.dataRecords
  );
  const handleNewTableStorage = (newColumn: Table[]) => {
    _.forEach(dataRecord, (table) => {
      let newItem = { ...table };
      if (table.id === props.rowData.id) {
        newItem = {
          id: props.rowData.id,
          name: props.rowData.name,
          position: props.rowData.position,
          office: props.rowData.office,
          age: props.rowData.age,
          startDate: props.rowData.startDate,
          salary: props.rowData.salary,
          status: props.rowData.status,
          selected: !props.rowData.selected,
        };
      }
      newColumn.push(newItem);
    });
  };
  return (
    <div className={classes.root} data-hook="data-ColumnSelect">
      <label>
        <input type="checkbox" checked={columnData} onChange={handleSelected} />
        <span></span>
      </label>
    </div>
  );
}

export default ColumnSelect;
