import Header from "./components/Header";
import TableData from "./components/TableData";
import Pagination from "./components/Pagination";
import { st, classes } from "./App.st.css";

function App() {
	return (
		<div className={st(classes.root)} data-hook="gird-root">
			<div className={classes.heroCallout}>
				<div className={classes.wrapper}>
					<Header />
					<TableData />
				</div>
				<Pagination />
			</div>
		</div>
	);
}

export default App;
