import logo from "./logo.svg";
import { LineChart } from "@tremor/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "flowbite";

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

function formatDate(dateObj) {
  // Extract the month and day, and ensure they are in two-digit format
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are 0-indexed
  var day = ("0" + dateObj.getDate()).slice(-2); // Pad single-digit days with a leading zero

  // Combine the month and day in MM-DD format
  return month + "-" + day;
}

function App() {
  const [stockName, setStockName] = useState("HACK");
  const [chartData, setChartData] = useState([
    { date: "Jan 22", [stockName]: 2890 },
    { date: "Feb 22", [stockName]: 2756 },
    { date: "Mar 22", [stockName]: 3322 },
    { date: "Apr 22", [stockName]: 3470 },
    { date: "May 22", [stockName]: 3475 },
    { date: "Jun 22", [stockName]: 3129 },
    { date: "Jul 22", [stockName]: 3490 },
    { date: "Aug 22", [stockName]: 2903 },
    { date: "Sep 22", [stockName]: 2643 },
    { date: "Oct 22", [stockName]: 2837 },
    { date: "Nov 22", [stockName]: 2954 },
    { date: "Dec 22", [stockName]: 3239 },
  ]);

  const [inputValue, setInputValue] = useState({
    ticker: "",
    query: "",
  });
  const [selectedItem, setSelectedItem] = useState("1mo");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleMenuItemClick = (e) => {
    e.preventDefault(); // Prevent the default anchor action
    setSelectedItem(e.currentTarget.textContent);
  };

  function fetchData(e) {
    e.preventDefault();
    setStockName(inputValue.ticker);
  }
  
  useEffect(() => {
    const fetchDataAsync = async () => {
      if (!stockName) return;
      
      console.log(stockName);
      
      try {
        var response = await axios.get(
          `https://biotech-stock-query-backend.onrender.com/data?ticker=${stockName}&time=${selectedItem}`
        );
        
        var data = response.data;
        data = JSON.parse(data);
        var close = data.Close;
        console.log(close);
        var newChart = [];
        
        for (const [key, value] of Object.entries(close)) {
          var formattedDate = new Date(parseInt(key));
          newChart.push({ date: formatDate(formattedDate), [stockName]: value });
        }
        
        setChartData(newChart);
        
      } catch (error) {
        console.error("There was an error fetching the data: ", error);
      }
    };
  
    fetchDataAsync();
  }, [stockName]); // Effect runs only when stockName changes
  
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-6 ml-6">
        <div className="col-span-2 border border-slate-100 rounded-md bg-[#403e3e] ">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Newsletter revenue over time (USD)
          </h3>{" "}
          <LineChart
            className="mt-4 h-[650px]"
            data={chartData}
            index="date"
            yAxisWidth={65}
            categories={[stockName]}
            colors={["indigo", "cyan"]}
            // valueFormatter={valueFormatter}
          />
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl mt-1 mr-2">
            We're Bringing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Transparency
            </span>{" "}
            To {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-emerald-600">
              Biotech
            </span>{" "}
          </h1>
          {/* <form class="max-w-sm mx-auto"> */}
          <form class="max-w-sm" onSubmit={fetchData}>
            <div class="mb-2 flex left-0">
              <div class="mr-4">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Ticker
                </label>
                <input
                  type="text"
                  id="email"
                  name="ticker"
                  class="shadow-sm w-[72px] border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                  required
                  placeholder="$HACK"
                  value={inputValue.ticker}
                  onChange={handleChange}
                />
              </div>
              <div class="w-1/2">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Query
                </label>
                <input
                  type="text"
                  id="password"
                  name="query"
                  class="shadow-sm w-[425px]  border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                  placeholder="Why did $HACK stock go up 30% this month?"
                  required
                  value={inputValue.query}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="flex items-start mb-2">
              {/* <div class="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div> */}
              <label
                for="terms"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
              >
                This is not financial advice and may contain mistakes.
              </label>
            </div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-gray-900 hover:bg-slate-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Time Period{" "}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    onClick={handleMenuItemClick}
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    1mo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleMenuItemClick}
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    3mo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleMenuItemClick}
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    6mo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleMenuItemClick}
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    1y
                  </a>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <div class="flex">
                Submit Query{" "}
                <svg
                  class="w-5 h-5 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          </form>
          {/* <div class="h-[600px] overflow-y-auto bg-gray-200 row-span-2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum." "Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum." "Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum." "Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum." "Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
          </div> */}
        </div>
        <div className="border rounded-md border-sky-400">
          <h3 className="text-slate-200">Compare Similar Stocks</h3>
        </div>
        <div className="border rounded-md border-emerald-600">
          Stock Analysis
        </div>
      </div>
    </div>
  );
}

export default App;
