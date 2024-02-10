import logo from "./logo.svg";
import { LineChartHero } from "./sampleGraph";

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
        <div className="col-span-2">{LineChartHero}</div>
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
