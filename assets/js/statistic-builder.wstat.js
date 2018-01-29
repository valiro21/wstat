var statisticsBuilder = {

    entities: [],
    data: null,
    chart: null,
    intervalId: null,
    labelFunc: null,
    keepNull: false,

    /**
     *
     * @param keyFunc {function}
     * @param labelFunc {function}
     * @param aggregate some bullshit structure...
     * @param chartWrapper {ChartWrapper}
     * @param refreshRate {int}
     */
    init: function (keyFunc, labelFunc, aggregate, chartWrapper, refreshRate = 1000) {
        this.keyFunc = keyFunc;
        this.labelFunc = labelFunc;
        this.aggregate = aggregate;
        this.entities = [];

        this.chart = chartWrapper;
        this.chart.render();

        if (refreshRate > 0)
            this.intervalId = setInterval( this.refresh.bind(this), refreshRate);
        else
            this.intervalId = null;
    },

    add: function (entity) {
        this.entities.push(entity);
    },

    finalize: function (keepNull = false) {
        console.log("Finalizing statistic...");

        if (this.intervalId)
            clearInterval(this.intervalId);

        this.refresh()
    },

    buildData: function () {
        this.data = groupBy(this.entities, this.keyFunc, this.aggregate, this.keepNull);
    },

    refresh: function () {

        this.buildData();
        console.log(this.data);

        this.chart.buildDataFromDict(
            'Random bullshit',
            this.labelFunc,
            this.data
        );

        this.chart.update();

        // console.log(this.chart.data.labels);
        // console.log(this.chart.data.datasets[0]);
        // console.log(this.chart.data.datasets[0].data);
        // statisticsBuilder.chart.chart.data.datasets[0].data.push(getRandomInt(1, 100000));
        // this.chart.data.labels = ['1', '2', '3'];
        // this.chart.data.datasets[0].data = [getRandomInt(1,100), getRandomInt(1,100), getRandomInt(1,100)];
        // console.log(statisticsBuilder.chart.chart.datasets[0].data[0]);

    }
};


// executes

const interval = 10;

keyFunc = function (t) {
    try {
        return (t['text'].length / interval | 0); // integer division hack wtf js
    }
    catch (err) {
        return null;
    }
};

labelFunc = function (key) {
    return key * interval;
};

const testId = 'chart';
const testType = 'bar';

let chartWrapper = new ChartWrapper(testId, testType, null, null);
statisticsBuilder.init(keyFunc, labelFunc, 'count', chartWrapper, 1000);

//----------------------------------------------------------------------------------------------------------------------
//------ [ Hacker News ] -----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// saveEntity('Hacker-News', primary_entity);
// saveEntity('Hacker-News', story);
// saveEntity('Hacker-News', comment);
//
// fetchData(
//     {
//         "name": 'Hacker-News',
//         "base_url": "https://hacker-news.firebaseio.com"
//     },
//     'test',
//     'topstories',
//     function (entity) {
//         // console.log(entity);
//         statisticsBuilder.add(entity);
//     },
//     function () {
//         statisticsBuilder.finalize();
//     },
//     10,
//     false,
//     2
// );

//----------------------------------------------------------------------------------------------------------------------
//------ [ Facebook ] --------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

localStorage.clear();

saveEntity('Facebook', self_posts_page);
saveEntity('Facebook', post);
saveEntity('Facebook', post_likes);
saveEntity('Facebook', like);

fetchData(
    {
        "name": 'Facebook',
        "base_url": "https://graph.facebook.com/v2.11",
        "parameters": {
            "access_token": "EAACEdEose0cBAIXZC9lOnL8JcRNcNfLQTimURGpZCnLHIxrSlSvCihPWnty6fKZCuEmnQdqq0gBrZAIoq8UGhfZAXZBRV1R8pZA4fOoYrituULD6mG8UNsPBKoeev1u91j1xctjDo8bMKhrKgplZAX80UPqSHbkfqa4qDmp6dEZB1D1KUZAmdpGiw2AHjhljSaYJIZD"
        }
    },
    'test',
    'self_posts_page',
    function (entity) {
        console.log("Fetched entity: ", entity);
        statisticsBuilder.add(entity);
    },
    function () {
        console.log("Done");
        statisticsBuilder.finalize();
    },
    10,
    true,
    3
);