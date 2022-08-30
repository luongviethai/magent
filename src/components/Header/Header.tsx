import HeaderTop from "./HeaderTop";
import HeaderBot from "./HeaderBot";
import HeaderMid from "./HeaderMid";
import { st, classes } from "./Header.st.css";
function Header() {
  return (
    <div className={st(classes.root)}>
      <HeaderTop />
      <HeaderMid />
      <HeaderBot />
    </div>
  );
}

export default Header;
