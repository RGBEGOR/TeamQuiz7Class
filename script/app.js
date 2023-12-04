const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 25),
	new Result("Ваш уровень выше среднего", 35),
	new Result("Поздравляем теперь посчитайте сколько баллов набрали", 38)
];


const questions = 
[
	
	new Question(" В коком году официально началась Вторая Мировая Война и где ", 
	[
		new Answer('Германия 1939', 0),
		new Answer("Англия 1940  ", 0),
		new Answer("Сербия 1914", 0),
		new Answer("Польша 1939", 1)
	]),
	new Question("Сколько по времени официально шла столетняя война?", 
	[
		new Answer('116 лет', 1),
		new Answer("100 лет", 0),
		new Answer("200 лет", 0),
		new Answer("150 лет", 0)
	]),
	new Question("Сколько официально шла первая мировая война ", 
	[
		new Answer('один год ', 0),
		new Answer("6 лет", 0),
		new Answer(" 5 лет ", 0),
		new Answer(" 4 года", 1)
	]),
	new Question("Какой правитель Вавилона прославился  жестокими даже суровыми законами  ", 
	[
		new Answer('Дарий ', 0),
		new Answer("Хамурапи", 1),
		new Answer("Ашурбанипал", 0),
		new Answer("Калигула", 0)
	]),
	new Question("Вечный город так римляне называли город...", 
	[
		new Answer(' Рим ', 1),
		new Answer("Париж ", 0),
		new Answer("Барселона ", 0),
		new Answer("Милан", 0)

	]),
	new Question(" К Восточным славянам не относились", 
	[
		new Answer('Беларусы ', 0),
		new Answer("Чехи", 1),
		new Answer("Украинцы ", 0),
		new Answer("Русские", 0)
	]),
	new Question("Сколько официально крестовых походов соврешили народы Европы в защиту храма Господня в Иерусалиме", 
	[
		new Answer('6', 0),
		new Answer("7", 0),
		new Answer("8", 1),
		new Answer("5", 0)
	]),
	new Question("Какая страна Северной Европы во второй мировой войне капитулировала в течении 24 часов и здалась Германии", 
	[
		new Answer('Нидерланды', 0),
		new Answer("Дания ", 1),
		new Answer("Франция", 0),
		new Answer("Италия", 0)
	]),
	new Question(" В свое время Священная римская империя а позже и Пруссия это на самом деле названия современной страны ", 
	[
		new Answer('Германия', 1),
		new Answer("Австрия", 0),
		new Answer("Франция", 0),
		new Answer("нет ответа", 0)
	]),
	new Question("Когда США сбросила бомбы Малыш и Толстяк на Японские города?", 
	[
		new Answer('в 1944', 0),
		new Answer("в 1943", 0),
		new Answer("в 1945", 1),
		new Answer("в 1946", 0)
	]),


	new Question("Какую страну больше всего боялись Японцы во второй мировой Войне они боялись ей проиграть", 
	[
		new Answer('КИТАЙ ', 0),
		new Answer("АНГЛИЯ ", 0),
		new Answer("США ", 0),
		new Answer("СССР", 1)
	]),
	new Question("Кто автор и главный создатель первой атамной бомбы в истории", 
	[
		new Answer('Р.Опенгеймер', 1),
		new Answer("Силард", 0),
		new Answer("Энштейн", 0),
		new Answer("Гровс", 0)
	]),
	new Question("Самая влиятельная империя эпохи 18-19 века , Лев морей и океанов", 
	[
		new Answer('Испанеская Империя', 0),
		new Answer("Французская империя ", 0),
		new Answer("Российская Империя ", 0),
		new Answer("Британская империя", 1)
	]),
	new Question("Великая королева  Англии и Ирландии из династии Тюдоров, Младшая из двух выживших дочерей Генриха VIII, ", 
	[
		new Answer('Езабелла', 0),
		new Answer("Елизавета 1", 1),
		new Answer("Мария Стюарт", 0),
		new Answer("Антуанетта Мария Бурбонская", 0)
	]),
	new Question("Какая страна впервые применила отравляющий газ в первой мировой войне как факт применения биологического оружия", 
	[
		new Answer('Иприт Германия ', 1),
		new Answer("Бутан Англия", 0),
		new Answer("Уран Россия", 0),
		new Answer("Ционит США", 0)

	]),


	new Question("Какая единственная  страна во второй мировой войне не капитулировала  Гитлеровской Германии и продолжала борьбу за существование ", 
	[
		new Answer('Франция', 0),
		new Answer("Англия  ", 1),
		new Answer("Испания ", 0),
		new Answer("Греция", 0)
	]),
	new Question("Ахеменидская динсатия Персидкой имперрии это династия какой  современной страны?", 
	[
		new Answer('Ирана', 1),
		new Answer("Ирака", 0),
		new Answer("Турции", 0),
		new Answer("Египта", 0)
	]),
	new Question("Прьмьер министр Великобритании во втрой мировой войне был никто иной как?", 
	[
		new Answer('Ну как его', 0),
		new Answer("Рузвельт", 0),
		new Answer("Сталин", 0),
		new Answer("Черчиль", 1)
	]),
	new Question("Самый известный преидент в истории США на момент Второй мировой войны организатор ООН  и ярый сторонник антиколониализма ", 
	[
		new Answer('Черчиль ', 0),
		new Answer("Рузвелт", 1),
		new Answer("Сталин", 0),
		new Answer("Трумен", 0)
	]),
	new Question("Он известен своим жестоким  и противоречивым нравом как личность   но при нем СССР одержала победу во второй Мировой войне ", 
	[
		new Answer(' Сталин ', 1),
		new Answer("Черчиль", 0),
		new Answer("Рузвельт", 0),
		new Answer("Франко", 0)

	]),

	new Question("Кордовский халифат это на самом дела страна...", 
	[
		new Answer('Франция', 0),
		new Answer("Испания ", 1),
		new Answer("Марокко", 0),
		new Answer("Алжир", 0)
	]),
	new Question("Кореной народ в переводе пёстрый, разный;  кельтские племена, составлявшие основное население Британии с VIII века до н. э. по V век н. э.", 
	[
		new Answer('Бритты', 1),
		new Answer("Пикты", 0),
		new Answer("Ирландцы", 0),
		new Answer("Римляне", 0)
	]),
	new Question("Это норманнские народы, морские разбойники, выходцы из Скандинавии, совершавшие в 9–11 вв. походы протяженностью до 8000 км", 
	[
		new Answer('Англосаксы', 0),
		new Answer("Бретонцы", 0),
		new Answer("Галлы", 0),
		new Answer("Викинги", 1)
	]),
	new Question("Как называють кунсткамеры для содержания евреев и славян в неволе и далнейшего их уничтожения", 
	[
		new Answer('Кунсткамеры ', 0),
		new Answer("Концлагери", 1),
		new Answer("Тюрьмы", 0),
		new Answer("не знаю", 0)
	]),
	new Question("Какая страна на момент второй мировой войны была одной из самых силнейших в мире но програла Германии в 1940 году", 
	[
		new Answer(' Франция', 1),
		new Answer("Испания", 0),
		new Answer("Италия", 0),
		new Answer("Германия", 0)

	]),

	new Question("это религиозное учение,по предположению проповедником Заратуштрой распространившееся в 1-м тысячелетии до н. э. ", 
	[
		new Answer('Зороастризм', 1),
		new Answer("Анимизм", 0),
		new Answer("Манихейство", 0),
		new Answer("Конфуцианство", 0)
	]),

	new Question(" в 1812 году произошла битва при Бородино а что за битва произошла в 1805 году изменившая мышление Русского солдала в войне против Наполеона", 
	[
		new Answer('Тулон', 0),
		new Answer("Ауштерлиц", 1),
		new Answer("Милан", 0),
		new Answer("Москва", 0)
	]),
	new Question("Первые столицы Арабского халифата   - города ...", 
	[
		new Answer('Пайкенд и Варахша, ', 0),
		new Answer("Самарканд и Варахша,", 0),
		new Answer("Багдат Дамаск", 1),
		new Answer("Хорасан и Мавераннахр", 0)

	]),

	new Question(" Эта империя существовала  с 962 по 1806 год и называлась?.", 
	[
		new Answer('Франция', 0),
		new Answer("Священная Римская Империя ", 1),
		new Answer("Римская империя", 0),
		new Answer("Италия", 0)
	]),
	new Question("Этот российский император никогда не обявлял никаких войн в истории Росиии его называют император Миротворец", 
	[
		new Answer('Александр 3', 1),
		new Answer("Александр Македрнский ", 0),
		new Answer("Александр 1", 0),
		new Answer("Людовик 15 ", 0)
	]),
	new Question("Этот правитель России стал первым императором в истории династии Романовых одержав победу в Северной войне 1720 года", 
	[
		new Answer('Николай 2', 0),
		new Answer("Карл 12", 0),
		new Answer("Петр 3", 0),
		new Answer("Петр 1", 1)
	]),
	new Question("Эта дата считается датой основания германского королевства. ", 
	[
		new Answer('980 год ', 0),
		new Answer("919 год", 1),
		new Answer("1050 год", 0),
		new Answer("843 год", 0)
	]),
	new Question("Что всегда говорил Отто фон Бисмарк и давал наставления Германии ", 
	[
		new Answer('Не воюйте с Россией ', 1),
		new Answer("Не воюйте на три фронта ", 0),
		new Answer("Убивайте всех", 0),
		new Answer("Франция должна быть уничтожена", 0)

	]),

	new Question(" Этот правитель не знал себе роавных в боях Итальянской и Автсрийской компаниях завоевал Египет и Сирию  но проиграл Англичанам", 
	[
		new Answer('Цезарь ', 0),
		new Answer("Наполеон ", 1),
		new Answer("Дарий", 0),
		new Answer("Георг 3", 0)
	]),
	new Question("Это фашисткий диктатор  и после второй мировой  войны продолжал на протяжении 30 лет править этой страной ", 
	[
		new Answer('Испанией', 1),
		new Answer("Италией", 0),
		new Answer("Францией", 0),
		new Answer("Аргентина", 0)
	]),
	new Question("Этот негласный клич и прозвище ДУЧИ  ноисл известный фашист..", 
	[
		new Answer('Гитлер', 0),
		new Answer("Царь", 0),
		new Answer("Франко", 0),
		new Answer("Мусолинни", 1)
	]),
	new Question("Эта страна  в Месопотоамии известна своими кровожадными завоеваниями и жесткоки казнями в древности", 
	[
		new Answer('Вавилония ', 0),
		new Answer("Ассирия", 1),
		new Answer("Персия", 0),
		new Answer("Греция", 0)
	]),
	new Question("Какая Империя была самая большая по площади составляя более 41 мл кв км  и самой большой цельной колониальной империей ", 
	[
		new Answer('Российская империя ', 1),
		new Answer("Британская империя", 0),
		new Answer("Монгольская империи я", 0),
		new Answer("США", 0)

	]),
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



