function addNetProfitSection(profitLossTable, numYears) {

    const insightsData = { title: 'Net profit insights', data: [] };

    // Extract net profit data
    const netProfitData = profitLossTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.NET_PROFIT) !== -1);

    // Calculate growth rate over last 5 years
    const sixYrNetProfitData = getLastNElementsFromMap(netProfitData, numYears);
    const { growthRate } = getGrowthRate(sixYrNetProfitData);

    // Get sales growth pattern
    const posNeg = getPositiveToNegatives(growthRate);
    insightsData.data.push({ label: "Net profit growth pattern", value: getGrowthPattern(posNeg) });

    // Add net profit growth range
    insightsData.data.push({ label: "Net profit growth range", value: `${Math.min(...growthRate)}%, ${Math.max(...growthRate)}%` });

    // Average growth rate over the past years
    const averageGrowthRate = getAverage(growthRate);
    insightsData.data.push({ label: `Average growth in net profit over last ${growthRate.length} years is `, value: `${averageGrowthRate}%` });

    return insightsData;
}
