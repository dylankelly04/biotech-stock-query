import logo from "./logo.svg";
import { LineChart } from "@tremor/react";

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
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Newsletter revenue over time (USD)
          </h3>{" "}
          <LineChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            yAxisWidth={65}
            categories={["SemiAnalysis", "The Pragmatic Engineer"]}
            colors={["indigo", "cyan"]}
            valueFormatter={valueFormatter}
          />
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Bring{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Transparency
            </span>{" "}
            To {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-400 from-emerald-600">
              Biotech
            </span>{" "}
          </h1>
        </div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
}

export default App;
