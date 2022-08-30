declare interface Table {
    id: string;
    name: string;
    position: string;
    office: string;
    age: number;
    startDate: string;
    salary: number;
    status: string;
    selected: boolean;
}
declare interface Columns {
    id: string;
    name: string;
    title: string;
    statusDisplay: boolean;
}
declare interface Filters {
    name: string;
    value: string;
    key: string;
}
declare interface initDataType {
    searchRecord: string,
    sortTable: string,
    dataRecords: Table[],
    recordsLimit: number,
    currentIndexPage: number,
    totalRecords: number,
    pagesToShow: number;
    columns: Columns[],
    filterArr: Filters[],
    filterName: string;
    filterPosition: string;
    filterOffice: string;
    filterAge: string;
    filterStartDate: string;
    filterSalary: string;
    filterStatus: string;
    editMultiRow: string;
    editOneRow: boolean;
    nameAll: string;
    ageAll: number;
    positionAll: string;
    officeAll: string;
    salaryAll: number;
    statusAll: string;
    countClick: boolean;

}