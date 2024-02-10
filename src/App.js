import logo from "./logo.svg";
import { LineChart } from "@tremor/react";
import { useState } from "react";
import axios from 'axios';
import 'flowbite';

const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

function formatDate(dateObj) {
  // Extract the month and day, and ensure they are in two-digit format
  var month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are 0-indexed
  var day = ('0' + dateObj.getDate()).slice(-2); // Pad single-digit days with a leading zero

  // Combine the month and day in MM-DD format
  return month + '-' + day;
}



function App() {
  const [chartData, setChartData] = useState([
    { date: "Jan 22", SemiAnalysis: 2890 },
    { date: "Feb 22", SemiAnalysis: 2756},
    { date: "Mar 22", SemiAnalysis: 3322},
    { date: "Apr 22", SemiAnalysis: 3470},
    { date: "May 22", SemiAnalysis: 3475},
    { date: "Jun 22", SemiAnalysis: 3129},
    { date: "Jul 22", SemiAnalysis: 3490},
    { date: "Aug 22", SemiAnalysis: 2903},
    { date: "Sep 22", SemiAnalysis: 2643},
    { date: "Oct 22", SemiAnalysis: 2837},
    { date: "Nov 22", SemiAnalysis: 2954},
    { date: "Dec 22", SemiAnalysis: 3239},
  ]);
  console.log(chartData);

  const [inputValue, setInputValue] = useState({ticker: '$HACK', query: 'Why?'});
  const [selectedItem, setSelectedItem] = useState('1mo');
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
    console.log(selectedItem);
  };

  async function fetchData(e)
{
    e.preventDefault();
    var req = await axios.get(`http://127.0.0.1:8000/data?ticker=${inputValue.ticker}&time=${selectedItem}`);
    var data = req.data;
    data = JSON.parse(data);
    console.log(data);
    var close = data.Close;

    var newChart = [];
    console.log(close);
    for (const [key, value] of Object.entries(close)) {

      var formattedDate = new Date(parseInt(key));
      
      newChart.push({date: formatDate(formattedDate), SemiAnalysis: value});
    }
    setChartData(newChart);

    console.log(newChart);
}
  return (
    <div>
      {/* <header class="flex justify-right items-center mt-10">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Bring{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Transparency
        </span>{" "}
        To {""}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-emerald-600">
          Biotech
        </span>{" "}
      </h1> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React! (Test for deployment)
        </a> */}
      {/* </header> */}
      <div className="grid grid-cols-3 gap-4 mt-6 ml-6">
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Newsletter revenue over time (USD)
          </h3>{" "}
          <LineChart
            className="mt-4 h-[650px]"
            data={chartData}
            index="date"
            yAxisWidth={65}
            categories={["SemiAnalysis"]}
            colors={["indigo", "cyan"]}
            // valueFormatter={valueFormatter}
          />
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mt-1 mr-2">
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
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ticker
                </label>
                <input
                  type="text"
                  id="email"
                  name = "ticker"
                  class="shadow-sm w-[72px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value = {inputValue.ticker}
                  onChange = {handleChange}
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
                  class="shadow-sm w-[425px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value = {inputValue.query}
                  onChange = {handleChange}
                />
              </div>

              
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Period <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" onClick = {handleMenuItemClick} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1mo</a>
      </li>
      <li>
        <a href="#" onClick = {handleMenuItemClick} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">3mo</a>
      </li>
      <li>
        <a href="#" onClick = {handleMenuItemClick} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">6mo</a>
      </li>
      <li>
        <a href="#" onClick = {handleMenuItemClick} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1yr</a>
      </li>
    </ul>
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
        </div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
}


export default App;
