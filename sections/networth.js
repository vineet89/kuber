function addNetWorthSection(balanceSheetTable, numYears) {

    const insightsData = { title: 'Net worth insights', data: [] };

    // Extract net profit data
    const reservesData = balanceSheetTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.RESERVES) !== -1);

    // Calculate growth rate over last 5 years
    const sixYrReservesData = getLastNElementsFromMap(reservesData, numYears);
    const { growthRate } = getGrowthRate(sixYrReservesData);

    // Get growth pattern
    const posNeg = getPositiveToNegatives(growthRate);
    insightsData.data.push({ label: "Reserves growth pattern", value: getGrowthPattern(posNeg) });

    // Add net profit growth range
    insightsData.data.push({ label: "Reserves growth range", value: `${Math.min(...growthRate)}%, ${Math.max(...growthRate)}%` });

    // Average growth rate over the past years
    const averageGrowthRate = getAverage(growthRate);
    insightsData.data.push({ label: `Average growth in reserves over last ${growthRate.length} years is `, value: `${averageGrowthRate}%` });

    return insightsData;
}
