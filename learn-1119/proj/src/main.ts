import { sayHello } from './greet';
import { descount } from './descount';


function showHello (divName: string, name: string, price: number) {
	const elt = document.getElementById(divName);
	setTimeout(() => {
		elt.innerText = sayHello(name) + '  ' + descount(price)
	}, 500)
}

showHello('greeting', 'TypeScript', 100);
