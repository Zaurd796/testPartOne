document.addEventListener("DOMContentLoaded", function () {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1";
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e.message);
    }
  };

  getData(url).then((data) => {
    const elements = data.map((item, i) => {
      if (i < 5 && item.symbol !== "usdt") {
        return `
        <tr style="background-color: blue; color: white;">
          <td>${item.id}</td>
          <td>${item.symbol}</td>
          <td>${item.name}</td>
        </tr>
      `;
      } else if (item.symbol === "usdt") {
        return `
          <tr style="background-color: green; color: white;">
            <td>${item.id}</td>
            <td>${item.symbol}</td>
            <td>${item.name}</td>
          </tr>
      `;
      }
      return `
        <tr>
          <td>${item.id}</td>
          <td>${item.symbol}</td>
          <td>${item.name}</td>
        </tr>
      `;
    });

    document.querySelector("table").innerHTML += elements.join("");
  });
});
