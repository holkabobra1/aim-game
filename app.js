const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let interval

const colors = ['#FFFF00', '#CC9933', '#996633', '#993300', '#CC0000', '#FF0033', '#990033', '#996666', '#993366', '#CC0099', '#FF00FF', '#990099', '#CC00FF', '#9900FF', '#330099', '#000099', '#0033CC', '#336699','#FFFF00', '#0099CC', '#006666', '#00FFFF', '#009966', '#00CC66', '#00FF66', '#336633', '#33CC33', '#339900', '#99CC33', '#999900', '#000000', '#9900FF', '#330099', '#000099', '#0033CC', '#336699']

let time = 0
let score = 0
let mistakes = 0

startBtn.addEventListener('click', (event) => {
   event.preventDefault() //отменяем поведение по умолчанию
   screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      //получаем число из строки из атрибута каждой кнопки
      time = parseInt(event.target.getAttribute('data-time')); 
      screens[1].classList.add('up')
      startGame()
   }
})


function listener(event) {
   if (event.target.classList.contains('circle')) {
      score++
      event.target.remove()
      createRandomCircle()
   } else {
      mistakes++
   }
}

let decreaseTime = function() {
   if (time === 0) {
      finishGame()
   } else {
      let current = --time
      if (current < 10) {
         current = `0${current}`
      } 
      setTime(current)
   }
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`
}

function startGame() {
   board.addEventListener('click', listener)
   score = 0
   mistakes = 0
   interval = setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTime(time)
}

function finishGame() {
   clearInterval(interval)
   timeEl.parentNode.classList.add('hide')
   board.innerHTML = 
   `<div>
      <h2 class="zagolovok">Ваш счет: <span class="primary">${score}</span></h2>
      <h4 class="zagolovok">Промахов: <span class="mistakes">${mistakes}</span></h4>
      <h2><a href="#" class="start" id="start2">Играть снова</a></h2>
   </div>
   `
   board.removeEventListener('click', listener)

   const start2 = document.querySelector('#start2')
   start2.addEventListener('click', event => {
      event.preventDefault()
      screens[1].classList.remove('up')
   })
}

function createRandomCircle() {
   const circle = document.createElement('div')
   const size = getRandomNumber(5, 60)
   const {width, height} = board.getBoundingClientRect()
   const x = getRandomNumber(0, width-size)
   const y = getRandomNumber(0, height-size)

   circle.classList.add('circle')
   circle.style.width = `${size}px`
   circle.style.height = `${size}px`
   circle.style.top = `${y}px`
   circle.style.left = `${x}px`
   setColor(circle)

   if (document.querySelector('.zagolovok')) {
      board.innerHTML = ''
      document.querySelector('.hide').classList.remove('hide')
   }

   board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor() {
   const index = Math.floor(Math.random()*colors.length) 
   return colors[index]
}

function setColor(element) {
   const color = getRandomColor()
   element.style.backgroundColor = color
}