// Table.jsx

import { useEffect, useState } from "react";
import API_TOKEN from "../constants/ApiToken";
import ColumnsName from "../constants/Columns";
import CoinRow from "./CoinRow";
import Pagination from "./Pagination";
import Search from "./Search";
import Loader from "./Loader";
import Chart from "./Chart";

function CryptoTable() {
  // State to track the current page of pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State to track the selected currency
  const [currency, setCurrency] = useState("usd");

  // Construct the API link for fetching coins data
  const apiLink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false&locale=en`;
  const fullApi = apiLink + API_TOKEN;

  // State to hold the fetched coins data
  const [coinsData, setCoinsData] = useState([]);

  // State to track the coin selected for showing the chart
  const [chartShowId, setChartShowId] = useState("");

  // Fetch data from the API when the component mounts or when currentPage or currency changes
  useEffect(() => {
    const getData = async () => {
      setCoinsData([]); // Clear the coins data before fetching new data
      const result = await fetch(fullApi);
      const json = await result.json();
      setCoinsData(json); // Set the fetched data to the state
    };
    getData();
  }, [fullApi]);

  return (
    <div className="font-roboto flex flex-col items-center justify-center gap-y-4 shadow-md sm:rounded-lg">
      {/* Search component to filter results based on currency */}
      <Search currency={currency} setCurrency={setCurrency} />
      <div className="relative min-h-[35rem] w-full overflow-auto text-left text-sm">
        <table className="w-full">
          <thead className="bg-gray-700 text-sm">
            <tr className="border-b">
              {/* Render column names dynamically */}
              {ColumnsName.map((item, index) => {
                return (
                  <th scope="col" key={index} className="px-6 py-3">
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* Render each coin row */}
            {coinsData.map((item) => {
              return (
                <CoinRow
                  setChartShowId={setChartShowId}
                  currency={currency}
                  API_TOKEN={API_TOKEN}
                  key={item.id}
                  item={item}
                />
              );
            })}
          </tbody>
        </table>
        {/* Show loader if no coins data is present */}
        {!coinsData.length && <Loader />}
      </div>
      {/* Render chart if a coin is selected */}
      {!!chartShowId.id && (
        <Chart
          setChartShowId={setChartShowId}
          chartShowId={chartShowId}
          currency={currency}
        />
      )}
      {/* Pagination component to navigate between pages */}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default CryptoTable;
