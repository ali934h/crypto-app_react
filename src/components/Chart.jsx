// Chart.jsx
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API_TOKEN from "../constants/ApiToken";
import currencyList from "../constants/CurrencySymbol";

function Chart({
  setChartShowId,
  chartShowId: { id, current_price, market_cap, ath, image },
  currency,
}) {
  // State to track the type of data to display (prices, market caps, or total volumes)
  const [priceType, setPriceType] = useState("prices");

  // State to hold the fetched data
  const [data, setData] = useState({});

  // Construct the API link for fetching data
  const apiLink = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`;
  const fullApi = apiLink + API_TOKEN;

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(fullApi);
      const json = await result.json();
      const newData = {};

      // Process the data into a format suitable for the chart
      for (const [key, value] of Object.entries(json)) {
        newData[key] = value.map((item) => {
          return { time: new Date(item[0]).toLocaleString(), [key]: item[1] };
        });
      }
      setData(newData);
    };
    getData();
  }, [fullApi]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip rounded-md bg-slate-200 px-2 py-1">
          <p className="label">{`time: ${label}`}</p>
          <p className="label">{`${priceType}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed left-0 top-0 z-20 flex h-full w-full flex-col items-center justify-center rounded-md backdrop-blur-[2px]">
      {/* Overlay to close the chart */}
      <div
        className="absolute left-0 top-0 z-10 min-h-full min-w-full"
        onClick={() => {
          setChartShowId({});
        }}
      ></div>
      {/* Close button */}
      <IoIosCloseCircleOutline
        className="mb-auto cursor-pointer self-start text-4xl"
        fill="red"
        onClick={() => {
          setChartShowId({});
        }}
      />
      <div className="z-20 mb-auto flex flex-col items-center justify-center gap-y-5 rounded-3xl border bg-slate-600 px-6 py-5 text-black">
        {/* Display coin image and name */}
        <div className="flex w-full items-center justify-start gap-x-2">
          <img className="w-8" src={image} alt="" />
          <span className="text-2xl font-bold">
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </span>
        </div>
        {/* Responsive container for the line chart */}
        <ResponsiveContainer width={700} height={400}>
          <LineChart
            width="100%"
            height="100%"
            data={data[priceType]}
            margin={{ top: 20, bottom: 20, left: 20, right: 30 }}
          >
            <CartesianGrid
              strokeDasharray="3"
              stroke="white"
              strokeWidth={0.2}
            />
            <YAxis
              dataKey={priceType}
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                Number(value.toFixed(10)).toExponential()
              }
              tick={{
                letterSpacing: "1px",
                fontSize: "12px",
                fontWeight: "100",
                fill: "white",
              }}
              tickLine={false}
              tickCount={5}
            />
            <Line
              dot={false}
              type="monotone"
              dataKey={priceType}
              stroke="black"
              strokeWidth="1px"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <XAxis
              dataKey="time"
              tick={{
                letterSpacing: "1px",
                fontSize: "10px",
                fontWeight: "100",
                fill: "white",
              }}
              tickFormatter={(value) => {
                const date = new Date(Date.parse(value));
                return `${date.getDate()}\\${date.getMonth()}`;
              }}
              interval={23}
              angle={-15}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* Buttons to switch between price types */}
        <div className="btns justify-betweens flex w-full items-center justify-around text-white">
          <button
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-black 
            ${priceType === "prices" ? "bg-lime-400" : "bg-slate-200"}`}
            onClick={() => {
              setPriceType("prices");
            }}
          >
            Prices
          </button>
          <button
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-black 
            ${priceType === "market_caps" ? "bg-lime-400" : "bg-slate-200"}`}
            onClick={() => {
              setPriceType("market_caps");
            }}
          >
            Market Caps
          </button>
          <button
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-black 
            ${priceType === "total_volumes" ? "bg-lime-400" : "bg-slate-200"}`}
            onClick={() => {
              setPriceType("total_volumes");
            }}
          >
            Total Volumes
          </button>
        </div>
        {/* Display additional coin information */}
        <div className="info flex w-full items-center justify-around gap-x-6 px-5">
          <div className="flex items-center justify-center gap-x-2 font-bold">
            <span className="text-violet-50">Price:</span>
            <span>
              {currencyList[currency]}
              {current_price}
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-2 font-bold">
            <span className="text-violet-50">ATH:</span>
            <span>
              {currencyList[currency]}
              {ath}
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-2 font-bold">
            <span className="text-violet-50">Market Cap:</span>
            <span>
              {currencyList[currency]}
              {market_cap}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;
