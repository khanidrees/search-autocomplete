export const fetchApi = async (query, signal) => {
  //   return new Promise((res, rej) => {
  //     setTimeout(() => {
  //       res([
  //         "banana",
  //         "apple",
  //         "mango",
  //         "banana",
  //         "apple",
  //         "mango",
  //         "banana",
  //         "apple",
  //         "mango",
  //         "banana",
  //         "apple",
  //         "mango",
  //       ]);
  //     }, 300);
  //   });
  const response = await fetch(
    "https://dummyjson.com/products/search?q=" + query,
    {
      signal,
    }
  );
  if (!response.ok) {
    throw Error("error while fetching products autocomplete");
  }
  return response.json();
};
