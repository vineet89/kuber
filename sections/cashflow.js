function addCashFlowSection(cashFlowTable, numYears) {

    const insightsData = { title: 'Cash flow insights', data: [] };

    // Extract net profit data
    const cashFlowData = cashFlowTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.CASH_OPERATING_ACTIVITY) !== -1);

    // Calculate growth rate over last 5 years
    const sixYrCashFlowData = getLastNElementsFromMap(cashFlowData, numYears);
    const { growthRate } = getGrowthRate(sixYrCashFlowData);

    // Get sales growth pattern
    const posNeg = getPositiveToNegatives(growthRate);
    insightsData.data.push({ label: "Cash flow growth pattern", value: getGrowthPattern(posNeg) });

    // Add net profit growth range
    insightsData.data.push({ label: "Cash flow growth range", value: `${Math.min(...growthRate)}%, ${Math.max(...growthRate)}%` });

    // Average growth rate over the past years
    const averageGrowthRate = getAverage(growthRate);
    insightsData.data.push({ label: `Average growth in cash flow over last ${growthRate.length} years is `, value: `${averageGrowthRate}%` });

    return insightsData;
}
