import { interval } from 'rxjs';
import { select } from 'd3-selection';


interval(1000).subscribe(value => console.log(value));



 let me = select('body');
console.log(me);

