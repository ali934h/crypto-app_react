// App.jsx

import CryptoTable from "./components/CryptoTable";
import Layout from "./layouts/Layout";

function App() {
  return (
    // Layout component wraps the entire application
    <Layout>
      {/* CryptoTable component displays the table of cryptocurrencies */}
      <CryptoTable />
    </Layout>
  );
}

export default App;
