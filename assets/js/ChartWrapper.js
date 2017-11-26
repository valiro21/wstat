// Constants ------------------------------------------------------------------------------

var BACKGROUND_ALPHA = 0.2;

var BORDER_ALPHA = 1.0;
var BORDER_WIDTH = 1.0;

var CHART_TYPES = ['pie', 'bar', 'doughnut', 'line', 'radar'];

// Class implementation -------------------------------------------------------------------

ChartWrapper = function(chartElementId, type, options, data) {
    this.id = chartElementId;
    this.context = document.getElementById(chartElementId).getContext('2d');
    this.chart = null;
    this.type = type;
    this.options = options;
    this.data = data;
};

ChartWrapper.prototype.render = function () {
    this.chart = new Chart(this.context, {
        type: this.type,
        data: this.data,
        options: this.options
    });
};

ChartWrapper.prototype.destroy = function () {
    this.chart.destroy();
};

ChartWrapper.prototype.update = function () {
    this.chart.update();
};

ChartWrapper.prototype.changeTypeRandom = function () {
    this.changeType(randomChoice(CHART_TYPES));
};

ChartWrapper.prototype.changeType = function (newType) {
    this.destroy();
    this.type = newType;
    this.render();
};

// Data builders ------------------------------------------------------------------------------------------

ChartWrapper.prototype.buildData = function (labels, datasets) {
    var data = {
        labels: labels,
        datasets: datasets
    };

    this.data = data;

    return data;
};

ChartWrapper.prototype.buildDataSingle = function (chartLabels, datasetLabel, data) {
    var rgbColors = getRandomColors(data.length);

    var borderColors = getRgbaFromRgbArray(rgbColors, BORDER_ALPHA);
    var backgroundColors = getRgbaFromRgbArray(rgbColors, BACKGROUND_ALPHA);

    var datasets = [{
        label: datasetLabel,
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: BORDER_WIDTH
    }];

    return this.buildData(chartLabels, datasets);
};