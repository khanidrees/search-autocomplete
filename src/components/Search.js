import { useState, useEffect, useMemo, useRef } from "react";
import { fetchApi } from "../apis/index.js";

const debounce = function (funct, delay = 300) {
  let timer;
  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      funct.apply(this, arguments);
    }, delay);
  };
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const abortRef = useRef();
  useEffect(() => {
    if (query.trim() == "") {
      return setData([]);
    }

    debouncedFetch(query);
  }, [query]);

  const debouncedFetch = useMemo(() => debounce(fetchQuery, 600), []);
  async function fetchQuery(query) {
    if (query == "") {
      return setData([]);
    }
    try {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const abortController = new AbortController();
      abortRef.current = abortController;
      const res = await fetchApi(query, abortController.signal);
      console.log(res);
      setData(res.products);
    } catch (e) {
      if (e.name !== "AbortError") {
        // Add this line
        console.log(e);
      }
    }
  }
  return (
    <div className="search-container">
      <label htmlFor="search">Search: </label>
      <input
        id={"search"}
        onChange={(e) => setQuery(e.target.value)}
        type={"text"}
        value={query}
      />

      {Array.isArray(data) && data.length > 0 && (
        <div className="items-container">
          {data.map((item) => {
            return (
              <p
                key={item.id}
                onClick={(e) => setQuery(item.title)}
                className="item"
              >
                {item.title}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
