import logo from "./logo.svg";
import { LineChart } from "@tremor/react";
import { useState } from "react";

const chartdata = [
  { date: "Jan 22", SemiAnalysis: 2890, "The Pragmatic Engineer": 2338 },
  { date: "Feb 22", SemiAnalysis: 2756, "The Pragmatic Engineer": 2103 },
  { date: "Mar 22", SemiAnalysis: 3322, "The Pragmatic Engineer": 2194 },
  { date: "Apr 22", SemiAnalysis: 3470, "The Pragmatic Engineer": 2108 },
  { date: "May 22", SemiAnalysis: 3475, "The Pragmatic Engineer": 1812 },
  { date: "Jun 22", SemiAnalysis: 3129, "The Pragmatic Engineer": 1726 },
  { date: "Jul 22", SemiAnalysis: 3490, "The Pragmatic Engineer": 1982 },
  { date: "Aug 22", SemiAnalysis: 2903, "The Pragmatic Engineer": 2012 },
  { date: "Sep 22", SemiAnalysis: 2643, "The Pragmatic Engineer": 2342 },
  { date: "Oct 22", SemiAnalysis: 2837, "The Pragmatic Engineer": 2473 },
  { date: "Nov 22", SemiAnalysis: 2954, "The Pragmatic Engineer": 3848 },
  { date: "Dec 22", SemiAnalysis: 3239, "The Pragmatic Engineer": 3736 },
];
const valueFormatter = function (number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
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
            data={chartdata}
            index="date"
            yAxisWidth={65}
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["indigo", "cyan"]}
            valueFormatter={valueFormatter}
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
          <form class="max-w-sm">
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
                  class="shadow-sm w-[72px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="$HACK"
                  required
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
                  class="shadow-sm w-[425px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div class="flex items-start mb-5">
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
              Register new account
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
