const kuberData = new Map();

// Get data from profit loss table and balance sheet
const profitLossTable = tableToObject('#profit-loss table.data-table');
const balalnceSheetTable = tableToObject('#balance-sheet table.data-table');

// Extract sales data
const salesData = profitLossTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.SALES) !== -1);
const epsData = profitLossTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.EPS) !== -1);
const reservesData = balalnceSheetTable.find(e => e.get(CONSANTS.METRIC_HEADER).indexOf(CONSANTS.RESERVES) !== -1);

// Calculate growth rate over last 5 years
const sixYrSalesData = getLastNElementsFromMap(salesData, 6);
const growthRate = getGrowthRate(sixYrSalesData);
const averageGrowthRate = getAverage(growthRate);

kuberData.set(`Average growth in sales over last ${growthRate.length} years is `, averageGrowthRate);

// Get pos neg ratio
const posNeg = getPositiveToNegatives(growthRate);
kuberData.set("PosNeg sales ratio is ", posNeg);

// Get EPS growth for last 5 years
const sixYrEPSData = getLastNElementsFromMap(epsData, 6);
const epsGrowthRate = getGrowthRate(sixYrEPSData);
const epsCAGR = getCAGR(sixYrEPSData[0], sixYrEPSData[sixYrEPSData.length - 1], sixYrEPSData.length - 1);
const epsGrowthAbsolutePerYear = ((sixYrEPSData[sixYrEPSData.length - 1] - sixYrEPSData[0]) / (sixYrEPSData.length - 1)).toFixed(2);

if (epsCAGR)
    kuberData.set(`Compounded EPS growth rate for ${sixYrEPSData.length - 1} years is `, epsCAGR + '%')
else {
    kuberData.set(`Average EPS growth in ${sixYrEPSData.length - 1} years:`, 'Rs.' + epsGrowthAbsolutePerYear);
}

// Get EPS variability
const epsPosNeg = getPositiveToNegatives(epsGrowthRate);
kuberData.set("PosNeg ratio for EPS = ", epsPosNeg);

// Get reserves to market cap ratio
const reserves = getLastNElementsFromMap(reservesData, 1);
const marketCap = removeCommaNumber($('#top-ratios > li:nth-child(1) > span.nowrap.value > span').text());
kuberData.set("Reserves / Market Cap = ", ((reserves / marketCap) * 100).toFixed(2) + '%');

// Analyze price
const stockPrice = removeCommaNumber($('#top-ratios > li:nth-child(2) > span.nowrap.value > span').text());
let numYears = 0, aggregateEarnings = sixYrEPSData[sixYrEPSData.length - 1];

if (epsGrowthAbsolutePerYear < 0)
    kuberData.set(`The company has negative EPS growth and thus aggregate earnings cant be analysed`, epsGrowthAbsolutePerYear);
else {

    while (aggregateEarnings < stockPrice) {
        numYears += 1;
        aggregateEarnings += epsGrowthAbsolutePerYear * numYears;
    }
    kuberData.set(`With inital EPS of ${sixYrEPSData[sixYrEPSData.length - 1]} and average growth of ${epsGrowthAbsolutePerYear} per year, aggregate earnings will reach ${aggregateEarnings.toFixed(2)} against stock price of Rs. ${stockPrice} in`, numYears + ' years');

}



$(CONSANTS.TARGET_CONTAINER).append(kuberUIBox(kuberData));

