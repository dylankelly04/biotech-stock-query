import logo from "./logo.svg";
import { LineChart, CategoryBar, DonutChart } from "@tremor/react";
import { useState, useEffect } from "react";
import axios from "axios";
import "flowbite";
import { TypeAnimation } from "react-type-animation";

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
  const [shownStocks, setShownStocks] = useState([]);
  const [stockName, setStockName] = useState("$ORGO");
  const [chartData, setChartData] = useState([]);
  const [refData, setRefData] = useState([]);
  const [prediction, setPrediction] = useState([
    { name: "Very Strong Potential", value: 0.1 },
    { name: "Strong Potential", value: 0.4 },
    { name: "Neutral", value: 0.3 },
    { name: "Low Potential", value: 0.1 },
    { name: "Little/No Potential", value: 0.1 },
  ]);

  const [inputValue, setInputValue] = useState({
    ticker: "ORGO",
    query: "Why is the stock going up?",
  });
  const [selectedItem, setSelectedItem] = useState("1mo");
  const [gptResponse, setGptResponse] = useState([
    "GPT response here (may take 10-15 seconds to load)",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [similarStocks, setSimilarStocks] = useState([]);

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

  async function fetchGPTResponse(e) {
    setIsLoading(true);
    console.log("fetch gpt " + JSON.stringify(inputValue));
    var req = await axios.get(
      `https://biotech-stock-query-backend.onrender.com/api/${inputValue.ticker}?query=${inputValue.query}`
    );
    var data = req.data;
    console.log(data);
    setGptResponse(data.messages);
    setIsLoading(false);
  }

  async function fetchSimilarStocks(e) {
    console.log("fetch similar stocks " + JSON.stringify(inputValue));
    var req = await axios.get(
      `https://biotech-stock-query-backend.onrender.com/api/similar/${inputValue.ticker}`
    );
    var data = req.data;
    setSimilarStocks(data.similar.map((stock) => "$" + stock).sort());
    setShownStocks(new Array(data.similar.length).fill(false));
  }

  async function fetchData(e) {
    e.preventDefault();
    setStockName("$" + inputValue.ticker);
    fetchGPTResponse(e);
  }
  async function fetchDataAsync(ticker) {
    if (!stockName) return;

    try {
      var response = await axios.get(
        `https://biotech-stock-query-backend.onrender.com/data?ticker=${ticker.slice(
          1
        )}&time=${selectedItem}`
      );

      var data = response.data;
      data = JSON.parse(data);
      var close = data.Close;
      var newChart = [];

      for (const [key, value] of Object.entries(close)) {
        var formattedDate = new Date(parseInt(key));
        newChart.push({
          date: formatDate(formattedDate),
          [ticker]: value,
        });
      }
      return newChart;
    } catch (error) {
      console.error("There was an error fetching the data: ", error);
    }
  }

  useEffect(() => {
    console.log(shownStocks);
    fetchDataAsync(stockName).then((data) => {
      setRefData(data);
      setChartData(data);
    });
    fetchSimilarStocks();
  }, [stockName, selectedItem]);

  useEffect(() => {
    console.log("shown", shownStocks);
    Promise.all(
      shownStocks.map((bool, idx) => {
        if (bool) {
          return fetchDataAsync(similarStocks[idx]);
        }
        return null;
      })
    ).then((data) => {
      console.log(data);
      let merged = refData;
      for (let i = 0; i < data.length; i++) {
        if (data[i]) {
          console.log("result", i, data[i]);
          merged = merged.map((old, idx) => {
            return { ...old, ...data[i][idx] };
          });
        }
      }
      setChartData(merged);
    });
  }, [shownStocks]);

  return (
    <div className="grid grid-cols-3 grid-rows-5 gap-5 h-full p-5">
      <div className="col-span-2 row-span-4 border border-slate-100 rounded-md bg-zinc-800 p-5">
        <h3 className="text-lg font-medium text-white">
          Stock Price Trend (USD)
        </h3>
        <LineChart
          className="h-[95%]"
          data={chartData}
          index="date"
          yAxisWidth={30}
          categories={[stockName].concat(
            similarStocks.filter((stock, idx) => shownStocks[idx])
          )}
          colors={[
            "indigo",
            "cyan",
            "red",
            "green",
            "yellow",
            "purple",
            "blue",
            "pink",
            "gray",
          ]}
          showAnimation={true}
          autoMinValue={true}
        />
      </div>
      <div className="row-span-2">
        <h1 className="text-6xl font-extrabold text-cyan-300">Equity^2</h1>
        <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl mt-1 mr-2">
          We're Bringing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Equity
          </span>{" "}
          To {""}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-emerald-600">
            Equities
          </span>{" "}
        </h1>
        {/* <form class="max-w-sm mx-auto"> */}
        <form class="max-w-sm" onSubmit={fetchData}>
          <div class="mb-2 flex left-0">
            <div class="mr-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-white">
                Ticker
              </label>
              <input
                type="text"
                id="email"
                name="ticker"
                class="shadow-sm w-[72px] border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                required
                placeholder="AAPL"
                value={inputValue.ticker}
                onChange={handleChange}
              />
            </div>
            <div class="w-1/2">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-white">
                Query
              </label>
              <input
                type="text"
                id="password"
                name="query"
                class="shadow-sm w-[425px]  border text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                placeholder="Why?"
                required
                value={inputValue.query}
                onChange={handleChange}
              />
            </div>
          </div>

          <label class="block mb-2 text-sm font-medium text-white">
            Timeframe
          </label>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            class="mr-5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  focus:border-gray-900 hover:bg-slate-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            {selectedItem}
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6">
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
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton">
              <li>
                <a
                  href="#"
                  onClick={handleMenuItemClick}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  1mo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleMenuItemClick}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  3mo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleMenuItemClick}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  6mo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleMenuItemClick}
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  1y
                </a>
              </li>
            </ul>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <div class="flex">
              Submit Query{" "}
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
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
          <div>
            <label for="terms" class="text-sm font-medium text-gray-500">
              This is not financial advice and may contain mistakes.
            </label>
          </div>
        </form>
      </div>
      <div class="row-span-3 overflow-y-auto bg-black p-6 border rounded-md border-gray-950">
        {isLoading ? (
          <span class="text-xs font-medium text-cyan-400 dark:text-white font-mono">
            Loading
            <TypeAnimation sequence={["..."]} speed={20} />
          </span>
        ) : (
          gptResponse
            .filter((r) => r.length !== 0)
            .map((message) => {
              return (
                <div class="mb-4">
                  <div class="text-xs font-medium text-cyan-400 dark:text-white font-mono">
                    <TypeAnimation
                      sequence={message}
                      wrapper="span"
                      speed={80}
                      repeat={1}
                      cursor={false}
                    />
                    <br />
                  </div>
                </div>
              );
            })
        )}
      </div>
      <div className="border rounded-md border-sky-700">
        <h3 className="text-slate-200 text-center mt-4">
          Compare Similar Stocks
        </h3>
        <div className="grid grid-flow-dense grid-cols-3 p-5 gap-3">
          {similarStocks.map((stock, idx) => {
            return (
              <button
                key={idx}
                onClick={(e) => {
                  const newShownStocks = shownStocks;
                  newShownStocks[idx] = !newShownStocks[idx];
                  setShownStocks([...newShownStocks]);
                }}
                className="inline-block px-1 bg-zinc-400 rounded-lg text-center py-1 hover:bg-zinc-500 duration-200">
                {stock}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border rounded-md border-emerald-600 h-full flex flex-row px-12">
        <div className="text-slate-200 my-6 w-1/2 text-lg">
          Stock prediction based on our custom data-driven stock vetter. (Currently only supports local run due to cloud limitations in the free tier for running ML models. Please refer to demo video)
        </div>
        <div className="text-white my-3 grow">
          <DonutChart
            data={prediction}
            variant="pie"
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
