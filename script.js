const reset = document.getElementById("reset");
const tamt = document.getElementById("tamt");
const totalInWords = document.getElementById("totalInWords");

const values = {
  fiveHundred: { value: 500, span: "fiveHundredAmt" },
  twoHundred: { value: 200, span: "twoHundredAmt" },
  oneHundred: { value: 100, span: "oneHundredAmt" },
  fifty: { value: 50, span: "fiftyAmt" },
  twenty: { value: 20, span: "twentyAmt" },
  ten: { value: 10, span: "tenAmt" },
  five: { value: 5, span: "fiveAmt" },
};

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", calculateTotal);
});

reset.addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
  tamt.innerHTML = "0";
  totalInWords.innerHTML = "";

  for (let key in values) {
    document.getElementById(values[key].span).innerHTML = "0";
  }
});

function calculateTotal() {
  let total = 0;

  for (let key in values) {
    const quantity = parseInt(document.getElementById(key).value) || 0;
    const amount = quantity * values[key].value;
    total += amount;

    document.getElementById(values[key].span).innerHTML = amount;
  }

  tamt.innerHTML = total;
  totalInWords.innerHTML = numberToWords(total);
}

function numberToWords(num) {
  if (num === 0) return "Zero";

  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function helper(n) {
    if (n < 20) return belowTwenty[n];
    else if (n < 100)
      return tens[Math.floor(n / 10)] + " " + belowTwenty[n % 10];
    else if (n < 1000)
      return belowTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100);
    else if (n < 1000000)
      return helper(Math.floor(n / 1000)) + " Thousand " + helper(n % 1000);
  }

  return helper(num).trim();
}
