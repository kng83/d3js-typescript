import { Chart } from 'chart.js';
import { interval, pipe } from 'rxjs';
import { map, distinctUntilChanged, take } from 'rxjs/operators';

let html = document.getElementById('myChart')
//console.log(html);
let ctx = (<any>html).getContext('2d')

let newDate = Date.now();

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
            borderColor: 'rgba(66, 134, 244,0.7)',
            steppedLine: 'before',
            data: vData,
       //     fill: true,
            pointStyle:"circle",
        //    pointBackgroundColor:"rgb(200,100,200)",
       //     pointBorderColor:"rgb(200,100,200)",
       //     pointHoverBackgroundColor:"rgb(200,200,100)",
          //  showLine:false
        }]
    },

    // Configuration options go here
    options: {
        responsive: true,
        tooltips:{
            backgroundColor:"rgba(66, 134, 244,0.7)",
        //    mode:'x',
            position:'average',
        },
      //  events:['click'],
        onHover:(evt) =>{
            var item:any = chart.getElementAtEvent(evt);
            if(item.length> 0){
                console.log(chart.data.datasets[0].data[item[0]._index])
            }
            
        },
        onClick:onCanvasClick,

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

let pause = false;
let counter = 0;
let recursionRunning = false;

interval(1000).pipe(
    map((value) => {
        let random = Math.round(Math.random() + 0.0)
        return random
    }),
    // distinctUntilChanged()
).subscribe(value => {
    let newDate = Date.now();
    let pushObj = { x: newDate, y: value }
    chartData.push(pushObj);
    if (!pause) {
        //check counter
        let updated = updateChart(counter);
        if (updated == false) {
            vData.push(chartData[chartData.length - 1])
            vData.shift();
            chart.update();
        }
        if (updated && !recursionRunning) counter = 0;
        if (recursionRunning) counter++;

    }
    else {
     //   console.log(counter, pushObj);
        counter++;
    }

})

function updateChart(counter) {
    if (counter == 0) return false;
    if (recursionRunning) return true;

    recursionRunning = true;
    return function recursion(counter) {

        vData.push(chartData[chartData.length - 1 - counter])
        vData.shift();
        counter--;
        if (counter <= 0) {
            recursionRunning = false;
        } else {
          //  console.log(counter);
            return recursion(counter)
        }
        if (!recursionRunning) return true;
    }(counter);
}


//*** Button make up */
document.getElementById('zoomOut').addEventListener("click", () => {
    console.log(vData.length, chartData.length);
    vData.unshift(chartData[chartData.length - 1 - vData.length]);
    chart.update();
})

document.getElementById('zoomIn').addEventListener("click", (event) => {
        vData.shift();
        chart.update();
})

document.getElementById('pause').addEventListener("click", () => {
    console.log('pause')
    pause = !pause;
})

// document.getElementById("myChart").onclick = function(evt){
//     var activePoints = chart.getElementAtEvent(event);
//     console.log(activePoints);
// }

//Find specific point value
// document.getElementById('myChart').addEventListener('click', (evt)=>{
//         var activePoints = chart.getElementAtEvent(evt);
//         if(activePoints[0]){
//             const index = activePoints['0']._index;
//            activePoints['0']._model.pointStyle = 'rect';
//            // activePoints['0']._model.pointHoverBackgroundColor='rgb(120,120,10)'
//           let setBackground =  setInterval(()=>{
//            //   console.log(activePoints['0']._view.borderColor);
//             if(activePoints['0']._model.borderColor =  'rgb(244,20,20)' ){
//                 clearInterval(setBackground);
//             }
//                 activePoints['0']._model.backgroundColor = 'rgb(2,20,20)';
//                 activePoints['0']._model.borderColor = 'rgb(244,20,20)';
               
//            },500)

//         }
//     });

function onCanvasClick(evt){
        var activePoints = chart.getElementAtEvent(evt);
        if(activePoints[0]){
            const index = activePoints['0']._index;
           activePoints['0']._model.pointStyle = 'rect';
           // activePoints['0']._model.pointHoverBackgroundColor='rgb(120,120,10)'
          let setBackground =  setInterval(()=>{
           //   console.log(activePoints['0']._view.borderColor);
            if(activePoints['0']._model.borderColor =  'rgb(244,20,20)' ){
                clearInterval(setBackground);
            }
                activePoints['0']._model.backgroundColor = 'rgb(2,20,20)';
                activePoints['0']._model.borderColor = 'rgb(244,20,20)';
              
           },500)
        }
}