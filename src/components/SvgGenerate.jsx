// SvgGenerate.jsx

import { useEffect, useState } from "react";
import API_TOKEN from "../constants/ApiToken";

function SvgGenerate({
  id,
  currency,
  day,
  width,
  height,
  price_change_percentage_24h,
}) {
  // State to hold the points for the polyline in the SVG
  const [polylinePoints, setPolylinePoints] = useState("");

  useEffect(() => {
    const getData = async () => {
      // Fetch market chart data for the specified coin
      const result = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${day}${API_TOKEN}`,
      );
      const data = await result.json();

      // Extract prices from the data
      const prices = data.prices;

      // Normalize prices to fit within the SVG height
      const minPrice = Math.min(...prices.map((entry) => entry[1]));
      const maxPrice = Math.max(...prices.map((entry) => entry[1]));
      const normalizedPrices = prices.map((entry) => [
        entry[0],
        ((entry[1] - minPrice) / (maxPrice - minPrice)) * height,
      ]);

      // Create SVG polyline string with normalized prices
      const points = normalizedPrices
        .map(
          (entry, index) =>
            `${(index * width) / normalizedPrices.length},${height - entry[1]}`,
        )
        .join(" ");
      setPolylinePoints(points); // Set the polyline points in the state
    };
    getData();
  }, []);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={price_change_percentage_24h <= 0 ? "red" : "green"}
        strokeWidth="1.25"
      ></polyline>
    </svg>
  );
}

export default SvgGenerate;
