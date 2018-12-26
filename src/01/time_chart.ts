import { Chart } from 'chart.js';
import { interval, pipe } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

let html = document.getElementById('myChart')
let ctx = (<any>html).getContext('2d')

let newDate = new Date() as any as number;


let chartData = [];

for (let i = 0; i < 20; i++) {
    chartData[i] = { x: (newDate - 1000 * i), y: 0 }
}
let takeLast = (array: any[], counter) => {
    return array
        .filter((el, index) => array.length - counter - index <= 0);

}

let copyLast = (target, source, counter) => {
    source.forEach((element, index) => {
        if (source.length - counter - index <=0)
        target[counter + index - source.length] = source[index]
    });
}
let vData = takeLast(chartData, 20);

//let vData = [...chartData];


let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        datasets: [{
            label: "Point",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(155, 99, 132)',
            steppedLine: "before",
            data: vData,
            fill: false,
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Time Point Data'
        },
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                time: {
                    displayFormats: {
                        'second': 'HH:mm:ss ',
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    suggestedMin: 8,
                    suggestedMax: 8
                }
            }],
            yAxes: [{
                type: "linear",
                display: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1,
                    stepSize: 1
                },
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                },
            }]

        }
    }
});

//chartData = vData;

console.log(takeLast(chartData, 10));

interval(1000).pipe(
    map((value) => {
        let random = Math.round(Math.random() + 0.0)
        return random
    }),
    // distinctUntilChanged()
).subscribe(value => {
    let newDate = +new Date();

    chartData.push({ x: newDate, y: value });
    copyLast(vData,chartData,20);
    console.log(vData);
    chart.update();
})
