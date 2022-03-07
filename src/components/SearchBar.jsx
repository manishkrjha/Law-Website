import React from "react";

function SearchBar() {
    return (
        <form>
            <input placeholder="search" className="border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500 w-56" />
        </form>
    )
}

export default SearchBar;