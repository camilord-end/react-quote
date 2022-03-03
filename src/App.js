import { useState, useEffect } from "react";
import "./App.css";
import COLORS_ARRAY from "./colorsArray";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "In order to succeed, your desire for success should be greater than your fear of failure."
  );
  const [author, setAuthor] = useState("Bill Cosby");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState("#14532D");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, []);

  const generateRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    let randomAccent = Math.floor(COLORS_ARRAY.length * Math.random());
    setAccentColor(COLORS_ARRAY[randomAccent]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header
        className="App-header bg-purple-900"
        style={{ backgroundColor: accentColor, color: accentColor }}
      >
        <div
          id="quote-box"
          className={`m-5 max-w-md bg-white rounded px-5 py-5 shadow-2xl shadow-stone-900 text-purple-900 `}
          style={{ color: accentColor }}
        >
          <i className="fa-solid fa-quote-left fa-xl flex float-left pt-3 pl-3"></i>
          <p id="text">{quote}</p>
          <p id="author" className="text-right font-bold pb-4 pr-6">
            -{author}
          </p>
          <a
            id="tweet-quote"
            href={`http://www.twitter.com/intent/tweet?text="${quote}" ${author}`}
            target="_blank"
            rel="noreferrer"
            className="float-left float- pl-3"
          >
            <i className="fa-brands fa-twitter fa-xl fa-beat"></i>
          </a>
          <button
            style={{ backgroundColor: accentColor }}
            id="new-quote"
            className="mx-2 float-right rounded-md px-3 py-1 font-semibold cursor-pointe border-2  bg-purple-900 text-white hover:bg-white hover:border-cyan-400 transition duration-200 ease-in-out hover:shadow-lg hover:shadow-cyan-500/50"
            onClick={() => {
              generateRandomQuote();
            }}
          >
            New quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
