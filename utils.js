const removeLeadingChars = (str) => str.replace(/^\D+/g, '');
const removeCommaNumber = (str) => Number(str.replace(/,/g, ''));
const getLastNElementsFromMap = (map, n = 5) => Array.from(map.values()).slice(-n).filter(e => typeof e === 'number');
const getGrowthRate = (vals = []) => {
    const gr = [];
    vals.forEach((v, index) => {
        if (index > 0) {
            const absIncrease = (v - vals[index - 1]);
            const percentIncrease = (absIncrease / vals[index - 1]) * 100
            const fixedDecimals = percentIncrease.toFixed(2);
            gr.push(Number(fixedDecimals));
        }
    });
    return gr;
};

const getCAGR = (initialValue, finalValue, timePeriods) => {
    if (initialValue <= 0 || finalValue <= 0) return null;
    return ((Math.pow(finalValue / initialValue, 1 / timePeriods) - 1) * 100).toFixed(2);
}

const getAverage = (vals = []) => {
    const n = vals.length;
    if (!n) return 0;
    const mean = vals.reduce((a, b) => a + b) / n;
    return Number(mean.toFixed(2));
}

// Get cofficient of variation
const getVariability = (vals = []) => {
    const n = vals.length;

    if (!n) return 0;

    const mean = getAverage(vals);
    const std = Math.sqrt(vals.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return (std / mean).toFixed(2);
}

const getPositiveToNegatives = (vals = []) => {
    let positive = 0, posCount = 0, negative = 0, negCount = 0;
    vals.forEach(v => {
        if (v > 0) {
            positive += v;
            posCount += 1;
        } else {
            negative += v;
            negCount += 1;
        }
    });
    return { up: posCount, upMagnitude: positive, down: negCount, downMagnitude: negative }
}

const getGrowthPattern = (posNeg) => {
    return `${posNeg.up} growths, ${posNeg.down} declines`
}


var tableToObject = (tableSelector) => {
    var cols = [];
    var result = [];
    $(`${tableSelector} thead th`).each(function () {
        const headerName = $(this).text().trim().toLowerCase();
        cols.push(headerName || CONSANTS.METRIC_HEADER);
    });
    $(`${tableSelector}>tbody>tr`).each(function (id) {
        const row = new Map();
        row.set('id', id + 1);
        $(this).find('td').each(function (index) {
            const val = cols[index] === CONSANTS.METRIC_HEADER ?
                $(this).text().trim().toLowerCase() :
                removeCommaNumber($(this).text().trim());
            row.set(cols[index], val);
        });
        result.push(row);
    });

    return result;

}


