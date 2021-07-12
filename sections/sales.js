function addSalesSection(profitLossTable, numYears) {

    const insightsData = { title: 'Sales insights', data: [] };

    // Extract sales data
    const salesData = profitLossTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.SALES) !== -1);

    // Calculate growth rate over last 5 years
    const sixYrSalesData = getLastNElementsFromMap(salesData, numYears);
    const { growthRate } = getGrowthRate(sixYrSalesData);

    // Get sales growth pattern
    const posNeg = getPositiveToNegatives(growthRate);
    insightsData.data.push({ label: "Sales growth pattern", value: getGrowthPattern(posNeg) });

    // Add sales growth range
    insightsData.data.push({ label: "Sales growth range", value: `${Math.min(...growthRate)}%, ${Math.max(...growthRate)}%` });

    // Average growth rate over the past years
    const averageGrowthRate = getAverage(growthRate);
    insightsData.data.push({ label: `Average growth in sales over last ${growthRate.length} years is `, value: `${averageGrowthRate}%` });

    return insightsData;
}
