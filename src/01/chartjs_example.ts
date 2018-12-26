import {Chart} from 'chart.js';

let html = document.getElementById('myChart')
let ctx = html.getContext('2d');
console.log(ctx);


let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            steppedLine: "before",
            data: [0, 1, 1, 0, 0, 1, 1],
            fill:false,
                   }]
    },

    // Configuration options go here
    options: {}
});