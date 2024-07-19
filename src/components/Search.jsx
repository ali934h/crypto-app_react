// Search.jsx

import { useEffect, useState } from "react";
import API_TOKEN from "../constants/ApiToken";
import { FaSearch } from "react-icons/fa";

function Search({ currency, setCurrency }) {
  // State to track the search input
  const [searchInput, setSearchInput] = useState("");

  // State to trigger search execution
  const [searchRun, setSearchRun] = useState(false);

  // Construct the API link for searching coins
  const apiLink = `https://api.coingecko.com/api/v3/search?query=${searchInput}`;
  const fullApi = apiLink + API_TOKEN;

  // State to hold the search results
  const [searchResult, setSearchResult] = useState([]);

  // Fetch search results when searchRun or searchInput changes
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(fullApi);
      const json = await result.json();
      setSearchResult(json["coins"]);
    };
    !!searchInput && getData();
  }, [searchRun]);

  return (
    <form action="" className="flex w-full items-stretch gap-x-1 py-1">
      <div className="relative ">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="rounded-md px-2.5 py-1 text-sm text-slate-700"
          id="search"
          value={searchInput}
          onChange={(event) => {
            setSearchResult([]); // Clear search results on input change
            setSearchInput(event.target.value); // Update search input state
          }}
        />
        {!!searchInput && !!searchRun && (
          <div className="miniSearch absolute z-10 flex max-h-52 w-full flex-col overflow-scroll rounded-md bg-slate-500 bg-scroll">
            {searchResult.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full items-center gap-x-2 p-1 text-xs odd:bg-gray-800 even:bg-gray-700"
                >
                  <img src={item.thumb} alt={item.id} className="h-6 w-6" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        className="flex cursor-pointer items-center justify-center rounded-md border bg-pink-700 p-1"
        onClick={(event) => {
          event.preventDefault();
          setSearchRun((searchRun) => !searchRun); // Toggle search execution state
        }}
      >
        <FaSearch />
      </button>
      <select
        name="currency"
        id="currency"
        className="rounded-md text-sm text-black"
        onChange={(event) => {
          setCurrency(event.target.value); // Update selected currency
        }}
        value={currency}
      >
        <option value="usd">Dollar</option>
        <option value="eur">Euro</option>
        <option value="gbp">Pound</option>
      </select>
    </form>
  );
}

export default Search;
