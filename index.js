import { round } from "./utils.js";
const button = document.querySelectorAll('button');
const form = document.querySelector('.form')
const bigin = document.querySelector('.bigin')

const handlerSubmit = function (evt) {
  evt.preventDefault()
  let monsterDommage = -round(5, 10)
  let yourDommage =''
  const yourLife = document.querySelector('.stat-life[name="yourLife"]')
  const monsterLife = document.querySelector('.stat-life[name="monsterLife"]')
  const restMonsterLife = monsterLife.getAttribute('value')
  const restYourLife = yourLife.getAttribute('value')
  let newLifeYour = ''
  let newLifeMonster =''

  console.log(evt.target.value)
  if (evt.target.getAttribute('name') === 'bigin') {
    bigin.classList.add('bigin--off')
    form.classList.remove('form--off')
  }
  else if (evt.target.getAttribute('name') === 'heal') {
    newLifeYour = +restYourLife + monsterDommage + 10
    yourLife.setAttribute('value', newLifeYour)
    yourLife.nextElementSibling.textContent = newLifeYour + '%'
    newLifeYour =''
  }
  else if (evt.target.getAttribute('name') === 'attack' || 
    evt.target.getAttribute('name') === 'specialAttack' ) {
      let dommage = ''
      evt.target.getAttribute('name') === 'attack'? 
      dommage = round(3, 10) : dommage = round(10, 20)
      newLifeYour = +restYourLife + monsterDommage
      newLifeMonster = +restMonsterLife - dommage
      yourLife.setAttribute('value', newLifeYour)
      yourLife.nextElementSibling.textContent = newLifeYour + '%'
      monsterLife.setAttribute('value', newLifeMonster)
      monsterLife.nextElementSibling.textContent = newLifeMonster + '%'
      newLifeYour =''
  }
 
  else if (evt.target.getAttribute('name') === 'giveUp') {
    bigin.classList.remove('bigin--off')
    form.classList.add('form--off')
    yourLife.setAttribute('value', 100)
    yourLife.nextElementSibling.textContent = 100 + '%'
    monsterLife.setAttribute('value', 100)
    monsterLife.nextElementSibling.textContent = 100 + '%'
  }
}

for (let input of button) {
    input.addEventListener('click', handlerSubmit)
}
let observe = new MutationObserver(mutationRecords => {
  for (let mutate of mutationRecords) {
    if (mutate.target.previousElementSibling.getAttribute('value') <= 0 )  {
      let winner = ''
      mutate.target.previousElementSibling.getAttribute('name') === 'monsterLife' ? winner = "monster" : winner = 'you'
      const confirm =  window.confirm(winner + + ' ' + ' gagné')
      if( confirm) {
        const yourLife = document.querySelector('.stat-life[name="yourLife"]')
        const monsterLife = document.querySelector('.stat-life[name="monsterLife"]')
        yourLife.setAttribute('value', 100)
        yourLife.nextElementSibling.textContent = 100 + '%'
        monsterLife.setAttribute('value', 100)
        monsterLife.nextElementSibling.textContent = 100 + '%'
    }
    }
  }
})
observe.observe(document.querySelector('.stat'), {childList: true, subtree: true})