import { Chart } from 'chart.js';
import { interval, pipe } from 'rxjs';
import { map, distinctUntilChanged, take } from 'rxjs/operators';

let html = document.getElementById('myChart')
let ctx = (<any>html).getContext('2d')

let newDate = new Date() as any as number;



let fillArray = (numberOfElements: number, pattern: Function) => {
    let arr = []
    for (let i = 0; i < numberOfElements; i++) {
        arr[i] = pattern(i)
    }
    return arr.reverse();
}

let chartData = fillArray(10, (index) => { return { x: (newDate - 1000 * index), y: 0 } });


//let vData = takeLast(chartData, 10);
let vData = chartData.slice();


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

interval(1000).pipe(
    map((value) => {
        let random = Math.round(Math.random() + 0.0)
        return random
    }),
    // distinctUntilChanged()
).subscribe(value => {
    let newDate = +new Date();
    chartData.push({ x: newDate, y: value });
    // vData.push(chartData[chartData.length -1])
    // vData.shift();

    chart.data.datasets.forEach(dataset=> {
        dataset.data.forEach((d,index)=>{
            console.log(d);
            d[index] = chartData[chartData.length - 1 - d.length   + index]
    });
})
    chart.update();
})
