import { calculateInvestmentResults } from "./investmentCalculate.js";
import { formatter } from "./investmentCalculate.js";

const userInputs = document.querySelectorAll(".user-input");
const container = document.querySelector(".container");
const table = document.querySelector(".result");

const para = `<p class="center">Please enter a duration greater than zero.</p>`;

let userData = {
    initial_investment: 10000,
    annual_investment: 1200,
    expected_return: 6,
    duration: 10,
}

let inputIsValid = true;


userInputs.forEach(input => {
    input.addEventListener("input", (e) => {
        const activeInput = e.target.getAttribute("id");
        const inputVal = e.target.value;
        const data = {
            ...userData,
            [activeInput]: +inputVal,
        }
        userData = data;
        inputIsValid = userData.duration > 0 ? true : false;

        resultUiUpdate();
    });

    const inputId = input.getAttribute("id")
    if (inputId === "initial_investment") input.value = userData.initial_investment;
    if (inputId === "annual_investment") input.value = userData.annual_investment;
    if (inputId === "expected_return") input.value = userData.expected_return;
    if (inputId === "duration") input.value = userData.duration;
});


function resultUiUpdate() {
    let displayHTML;
    if (!inputIsValid) {
        table.innerHTML = "";
        displayHTML = para;
    } else {
        table.innerHTML = "";
        const resultsData = calculateInvestmentResults(userData);
        const initialInvestment = resultsData[0].valueEndOfYear -
            resultsData[0].interest -
            resultsData[0].annualInvestment;

        displayHTML = `
        <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody class="table-body">
        
      
        `;
        resultsData.forEach(data => {
            const totalInterest =
                data.valueEndOfYear -
                data.annualInvestment * data.year -
                initialInvestment;
            const totalAmountInvested = data.valueEndOfYear - totalInterest;

            displayHTML += `
        <tr>
          <td>${data.year}</td>
          <td>${formatter.format(data.valueEndOfYear)}</td>
          <td>${formatter.format(data.interest)}</td>
          <td>${formatter.format(totalInterest)}</td>
          <td>${formatter.format(totalAmountInvested)}</td>
      </tr>
        `;
        });
        displayHTML += "</tbody>"
    }
    table.insertAdjacentHTML("afterbegin", displayHTML);
}

resultUiUpdate();