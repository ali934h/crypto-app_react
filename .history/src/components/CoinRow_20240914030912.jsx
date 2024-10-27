// CoinRow.jsx

import currencyList from "../constants/CurrencySymbol";
import SvgGenerate from "./SvgGenerate";

function CoinRow({ item, currency, API_TOKEN, setChartShowId }) {
  // Destructure relevant properties from the item object
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h,
    total_volume,
  } = item;

  return (
    <tr className="border-b border-gray-700 odd:bg-gray-800 even:bg-gray-700">
      {/* Coin symbol and image, clicking sets the chart to show this coin's details */}
      <th
        scope="row"
        className="flex cursor-pointer gap-x-2 whitespace-nowrap px-6 py-4 font-medium text-white"
        onClick={() => {
          setChartShowId(item);
        }}
      >
        <img className="w-5" src={image} alt={name} />
        {symbol.toUpperCase()}
      </th>
      {/* Coin name */}
      <td className="px-6 py-4">{name}</td>
      {/* Current price of the coin formatted as per the selected currency */}
      <td className="px-6 py-4">
        {currencyList[currency]}
        {new Intl.NumberFormat().format(current_price)}
      </td>
      {/* Price change percentage over the last 24 hours, color-coded */}
      <td
        className={`px-6 py-4 ${
          price_change_percentage_24h <= 0 ? "text-red-700" : "text-lime-600"
        }`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      {/* Total volume of the coin traded, formatted as per the selected currency */}
      <td className="px-6 py-4">
        {currencyList[currency]}
        {new Intl.NumberFormat().format(total_volume)}
      </td>
      {/* Placeholder for the SVG graph generation, commented out due to API token limits */}
      <td className="px-6 py-4">
        {/* 
        The following section is commented out because the API token has a daily limit.
        Uncomment and use this section if you have sufficient API access.
        
        <SvgGenerate
          id={id}
          currency={currency}
          day="7"
          width="135"
          height="50"
          price_change_percentage_24h={price_change_percentage_24h}
        /> 
        */}
        SVG
      </td>
    </tr>
  );
}

export default CoinRow;
