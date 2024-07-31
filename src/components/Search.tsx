import { Dispatch, SetStateAction} from "react";

type SearchProps = {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>
    clear: () => void
    searching: () => void
}

const Search = ({search,setSearch,clear,searching}:SearchProps) => {

    return (
        <>
            {" "}
            <h3>Search:</h3>
            <div className="block frame">
                <div className="line">
                    <input
                        type="text"
                        placeholder="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={searching} className="in">
                        Search
                    </button>
                    <button onClick={clear} className="out">
                        Clear
                    </button>
                </div>
            </div>
        </>
    );
};

export { Search };
