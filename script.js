// стекло
const COST_GLASS = 1000;
// цены по толщинам и прозрачное
const COST_GLASS_TRANSPARENT = 1.01 * COST_GLASS;
const transparent = {
	3: COST_GLASS_TRANSPARENT,
	4: 1.05 * COST_GLASS_TRANSPARENT,
	5: 1.1 * COST_GLASS_TRANSPARENT,
	6: 1.15 * COST_GLASS_TRANSPARENT,
	8: 1.2 * COST_GLASS_TRANSPARENT,
	10: 1.25 * COST_GLASS_TRANSPARENT,
	12: 1.3 * COST_GLASS_TRANSPARENT
};
// цены по толщинам и осветленное
const COST_GLASS_CLARIFIED = 1.1 * COST_GLASS;
const clarified = {
	4: 1.05 * COST_GLASS_CLARIFIED,
	6: 1.15 * COST_GLASS_CLARIFIED,
	8: 1.2 * COST_GLASS_CLARIFIED,
	10: 1.25 * COST_GLASS_CLARIFIED,
	12: 1.3 * COST_GLASS_CLARIFIED
};
// цены по толщинам и матовое
const COST_GLASS_MATT = 1.2 * COST_GLASS;
const matt = {
	4: 1.05 * COST_GLASS_MATT,
	6: 1.15 * COST_GLASS_MATT,
	8: 1.2 * COST_GLASS_MATT,
	10: 1.25 * COST_GLASS_MATT
};
// цены по толщинам и серое
const COST_GLASS_GRAY = 1.3 * COST_GLASS;
const gray = {
	4: 1.05 * COST_GLASS_GRAY,
	6: 1.15 * COST_GLASS_GRAY,
	8: 1.2 * COST_GLASS_GRAY,
	10: 1.25 * COST_GLASS_GRAY
};
// зеркало
const COST_MIRROR = 2000;
// цены по толщинам и серебрянное
const COST_MIRROR_SILVER = 1.1 * COST_MIRROR;
const silver = {
	4: 1.05 * COST_MIRROR_SILVER,
	6: 1.15 * COST_MIRROR_SILVER
};
// цены по толщинам и бронзовое
const COST_MIRROR_BRONZE = 1.2 * COST_MIRROR;
const bronze = {
	4: 1.05 * COST_MIRROR_BRONZE,
	6: 1.15 * COST_MIRROR_BRONZE
};
// цены по толщинам и графитное
const COST_MIRROR_GRAPHITE = 1.3 * COST_MIRROR;
const graphite = {
	4: 1.05 * COST_MIRROR_GRAPHITE
};

// цены на методы обработки
const CUTTING = 500;
const POLISHING = 1500;
const FACET = 2000;

// объект рассчетных данных
const orderGlass = {
	typeMaterial: [],
	viewType: [],
	thickness: [],
	width: '',
	height: '',
	diameter: '',
	area: '',
	methodTreatment: [],
	count: 1,
	totalPrice: '',

	getAreaRect() {
		return this.width / 1000 * this.height / 1000;
	},

	getAreaCircle() {
		return 2 * 3.14 * this.diameter / 2000 * this.diameter / 2000;
	},

	getTotalPrice() {
		return this.thickness[1] * this.area + this.methodTreatment[1];
	}

};

// вспомогательная функция. Показ нужных блоков
const enumerationData = (el1, el2, el3, el4, el5, el6, el7) => {
	document.querySelector(el1).classList.remove('invisible');
	document.querySelector(el2).classList.add('invisible');
	document.querySelector(el3).classList.add('invisible');
	document.querySelector(el4).classList.add('invisible');
	document.querySelector(el5).classList.add('invisible');
	document.querySelector(el6).classList.add('invisible');
	document.querySelector(el7).classList.add('invisible');
};

// выбор типа материала из Выбор материла
function viewTypeMaterial() {
	switch (event.target.value) {
		case 'glass':
			document.querySelector('.glass').classList.remove('invisible');
			document.querySelector('.mirror').classList.add('invisible');
			orderGlass.typeMaterial = [ 'стекло', COST_GLASS ];
			break;
		case 'mirror':
			document.querySelector('.mirror').classList.remove('invisible');
			document.querySelector('.glass').classList.add('invisible');
			orderGlass.typeMaterial = [ 'зеркало', COST_MIRROR ];
			break;
		default:
			break;
	}
}

// выбор вида материала из Вида стекла или зеркала
function choiceViewTypeMaterial() {
	switch (event.target.value) {
		case 'transparent':
			enumerationData('.transparent', '.silver', '.bronze', '.graphite', '.gray',
				'.clarified', '.matt');
			orderGlass.viewType = [ 'прозрачное', COST_GLASS_TRANSPARENT ];
			break;
		case 'clarified':
			enumerationData('.clarified', '.transparent', '.silver',
				'.bronze', '.graphite', '.gray', '.matt');
			orderGlass.viewType = [ 'осветленное', COST_GLASS_CLARIFIED ];
			break;
		case 'matt':
			enumerationData('.matt', '.clarified', '.transparent', '.silver',
				'.bronze', '.graphite', '.gray');
			orderGlass.viewType = [ 'матовое', COST_GLASS_MATT ];
			break;
		case 'gray':
			enumerationData('.gray', '.matt', '.clarified', '.transparent', '.silver',
				'.bronze', '.graphite');
			orderGlass.viewType = [ 'серое', COST_GLASS_GRAY ];
			break;
		case 'silver':
			enumerationData('.silver', '.gray', '.matt', '.clarified', '.transparent',
				'.bronze', '.graphite');
			orderGlass.viewType = [ 'серебро', COST_MIRROR_SILVER ];
			break;
		case 'bronze':
			enumerationData('.bronze', '.silver', '.gray', '.matt', '.clarified',
				'.transparent', '.graphite');
			orderGlass.viewType = [ 'бронза', COST_MIRROR_BRONZE ];
			break;
		case 'graphite':
			enumerationData('.graphite', '.bronze', '.silver', '.gray', '.matt',
				'.clarified', '.transparent');
			orderGlass.viewType = [ 'графит', COST_MIRROR_GRAPHITE ];
			break;
		default:
			break;
	}
}

// выбор толщины материала
function choiceThickness() {
	if (event.target.type === 'radio') {
		document.querySelector('.formula').classList.remove('invisible');
		switch (event.target.name) {
			case 'transparent':
				orderGlass.thickness = [ event.target.value, transparent[event.target.value] ];
				break;
			case 'clarified':
				orderGlass.thickness = [ event.target.value, clarified[event.target.value] ];
				break;
			case 'matt':
				orderGlass.thickness = [ event.target.value, matt[event.target.value] ];
				break;
			case 'gray':
				orderGlass.thickness = [ event.target.value, gray[event.target.value] ];
				break;
			case 'silver':
				orderGlass.thickness = [ event.target.value, silver[event.target.value] ];
				break;
			case 'bronze':
				orderGlass.thickness = [ event.target.value, bronze[event.target.value] ];
				break;
			case 'graphite':
				orderGlass.thickness = [ event.target.value, graphite[event.target.value] ];
				break;
			default:
				break;
		}
	}
}

// показать окошка для рассчета площадей
function viewDimensions() {
	switch (event.target.value) {
		case 'rect':
			document.querySelector('.rect').classList.remove('invisible');
			document.querySelector('.circle').classList.add('invisible');
			break;
		case 'circle':
			document.querySelector('.circle').classList.remove('invisible');
			document.querySelector('.rect').classList.add('invisible');
			break;
		default:
			break;
	}
}

// взять ширину, длинну или диаметер
function takeSize() {
	if (event.target.name === 'width') {
		orderGlass.height = document.querySelector('[name="height"]').value;
		orderGlass.width = document.querySelector('[name="width"]').value;
		orderGlass.area = orderGlass.getAreaRect();
	}
	if (event.target.name === 'diam') {
		orderGlass.diameter = document.querySelector('[name="diam"]').value;
		orderGlass.area = orderGlass.getAreaCircle();
	}
	document.querySelector('.treatment').classList.remove('invisible');
}

// выбор метода обработки. Вывод общей суммы
function choiceMethodTreatment() {
	switch (event.target.id) {
		case 'tr1':
			orderGlass.methodTreatment = [ 'резка', CUTTING ];
			break;
		case 'tr2':
			orderGlass.methodTreatment = [ 'полировка', POLISHING ];
			break;
		case 'tr3':
			orderGlass.methodTreatment = [ 'полировка', FACET ];
			break;
		default:
			break;
	}
	orderGlass.totalPrice = orderGlass.getTotalPrice();
	document.querySelector('.total').classList.remove('invisible');
	// показали общую сумму
	document.querySelector('.display').innerHTML = `${ orderGlass.totalPrice.toFixed(2) }  EUR`;
}

// добавление и удаление количества заказов
let count = 1;

function add() {
	count++;
	document.querySelector('.show').value = count;
	orderGlass.count = count;
	let sum = count * orderGlass.totalPrice;
	document.querySelector('.display').innerHTML = `${ sum.toFixed(2) }  EUR`;
}

function minus() {
	count--;
	document.querySelector('.show').value = count;
	orderGlass.count = count;
	let sum = count * orderGlass.totalPrice;
	document.querySelector('.display').innerHTML = `${ sum.toFixed(2) }  EUR`;
}

// вывод всех показателей для производителя
document.querySelector('.testBtn').addEventListener('click', () => {
	document.querySelector('.tablo').innerHTML =
		`
	<ul>
		<li>Выбор материала: ${ orderGlass.typeMaterial[0] } --> (сумма ${ orderGlass.typeMaterial[1] })</li>
		<li>Вид стекла / зеркала: ${ orderGlass.viewType[0] } --> (сумма ${ orderGlass.viewType[1] })</li>
		<li>Толщина стекла / зеркала: ${ orderGlass.thickness[0] }мм --> (сумма ${ orderGlass.typeMaterial[1] })</li>
		<li>Площадь продукта: ${ orderGlass.area } м2</li>
		<li>Размеры: длинна - ${ orderGlass.height } мм , ширина - ${ orderGlass.width }мм, диаметр - ${ orderGlass.diameter }мм</li>
		<li>Обработка: ${ orderGlass.methodTreatment[0] } --> (сумма ${ orderGlass.methodTreatment[1] })</li>
		<li>Количество изделий: ${ orderGlass.count }</li>
		<li>Общая сумма: ${ orderGlass.count * orderGlass.totalPrice } EUR</li>
 </ul>
		`;
	console.log(orderGlass);
});
