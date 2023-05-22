import { SEARCH_ICON_SVG } from "../../assets/images";
import { RenderIf } from "../../utils";

const Search = ({
  placeholder = "Search",
  className = "",
  searchClassName = "",
  showSearchIcon = true,
  setSearchTerm,
}) => {
  return (
    <div className={className}>
      <input
        type="search"
        placeholder={placeholder}
        className={searchClassName}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <RenderIf isTrue={showSearchIcon}>
        <img src={SEARCH_ICON_SVG} alt="search" className="search-icon" />
      </RenderIf>
    </div>
  );
};

export default Search;
