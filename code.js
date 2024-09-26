// let BASE_URL =
//   "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let ans = document.querySelector(".answer");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amount.value = 1;
  }
  //   console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase());
  //   URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
  //   console.log(URL);

  let from = fromCurr.value.toLowerCase();
  console.log(from);
  let to = toCurr.value.toLowerCase();
  console.log(to);

  async function getUsdInrRate() {
    let url =
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
    let URL = `${url}/${from}.min.json`;

    //Fetch data and get INR rate
    const exc = await fetch(URL)
      .then((response) => response.json())
      .then((data) => data[from][to]);

    // let response=fetch(URL);
    // let data=await response.json();
    // let rate=data[to];
    // console.log(rate)

    console.log(exc);
    let finalAmt = amtVal * exc;
    console.log(finalAmt)
    msg.innerText = `1 ${fromCurr.value} = ${exc}${toCurr.value}`;
    ans.value = finalAmt;
  }

  getUsdInrRate();
});
