import { useState, useEffect } from "react";
import "./App.css";

let quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  );
  const [author, setAuthor] = useState("Lorem ipsum");
  const [quotesArray, setQuotesArray] = useState(null);

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
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="quote-box" className="bg-purple-300 rounded px-5 py-5">
          <p id="text">"{quote}"</p>
          <p id="author">-{author}</p>
          <a
            id="tweet-quote"
            href={`http://www.twitter.com/intent/tweet?text="${quote}" -${author}`}
            target="_blank"
            rel="noreferrer"
          >
            Tweet quote
          </a>
          <button
            id="new-quote"
            className="bg-purple-900 text-white rounded"
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
