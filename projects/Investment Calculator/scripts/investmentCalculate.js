export function calculateInvestmentResults({
    initial_investment,
    annual_investment,
    expected_return,
    duration,
}) {
    const annualData = [];
    let investmentValue = initial_investment;

    for (let i = 0; i < duration; i++) {
        const interestEarnedInYear = investmentValue * (expected_return / 100);
        investmentValue += interestEarnedInYear + annual_investment;
        annualData.push({
            year: i + 1,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: annual_investment,
        });
    }

    return annualData;
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});