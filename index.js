// import math from 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.4.1/math.js';
const display = document.getElementById('display')
let isOpen = 0
let formula = []
// row 1
const deg = document.getElementById('deg') //
const factorial = document.getElementById('x!')
const openPar = document.getElementById('(')
const closedPar = document.getElementById(')')
const percent = document.getElementById('%')
const AC = document.getElementById('AC')

// row 2
const sin = document.getElementById('sin')
const ln = document.getElementById('ln')
const seven = document.getElementById('7')
const eight = document.getElementById('8')
const nine = document.getElementById('9')
const divide = document.getElementById('divide')

// row 3
const cos = document.getElementById('cos')
const log = document.getElementById('log')
const four = document.getElementById('4')
const five = document.getElementById('5')
const six = document.getElementById('6')
const times = document.getElementById('times')

// row 4
const tan = document.getElementById('tan')
const root = document.getElementById('root') // 
const one = document.getElementById('1')
const two = document.getElementById('2')
const three = document.getElementById('3')
const subtraction = document.getElementById('subtraction')

// row 5
const exp = document.getElementById('exp')
const power = document.getElementById('power')
const zero = document.getElementById('0')
const decimal = document.getElementById('decimal')
const equal = document.getElementById('equal')
const plus = document.getElementById('plus')

const numbers = new Set(['1','2','3','4','5','6','7','8','9','0','.'])
const notValidStarters = new Set(['!','%','/','x','-','E','+',')'])
const operations = new Set(['/','x','-','+'])
const functions = new Set(['s','c','!','%','ln','lo','t','**',''])

deg.addEventListener('click',()=>{
    isOpen = 0
    display.innerHTML = 0

})
factorial.addEventListener('click',()=>{
    displayStr('!')
})

openPar.addEventListener('click',()=>{
    isOpen += 1
    displayStr('(')
})

closedPar.addEventListener('click',()=>{
    isOpen -= 1
    displayStr(')')
})

percent.addEventListener('click',()=>{
    displayStr('%')
})

AC.addEventListener('click',()=>{
    if (display.innerHTML != 0){
        if(display.innerHTML.length == 1){
            display.innerHTML = 0
        }else{
            display.innerHTML = display.innerHTML.slice(0,-1) 
        }
    }
})

sin.addEventListener('click',()=>{
    isOpen += 1
    displayStr('sin(')
})

ln.addEventListener('click',()=>{
    isOpen += 1
    displayStr('ln(')
})

seven.addEventListener('click',()=>{
    displayStr('7')
})


eight.addEventListener('click',()=>{
    displayStr('8')
})

nine.addEventListener('click',()=>{
    displayStr('9')
})

divide.addEventListener('click',()=>{
    displayStr('/')
})

cos.addEventListener('click',()=>{
    isOpen += 1
    displayStr('cos(')
})

log.addEventListener('click',()=>{
    isOpen += 1
    displayStr('log(')
})

four.addEventListener('click',()=>{
    displayStr('4')
})


five.addEventListener('click',()=>{
    displayStr('5')
})

six.addEventListener('click',()=>{
    displayStr('6')
})

times.addEventListener('click',()=>{
    displayStr('*')
})

tan.addEventListener('click',()=>{
    isOpen += 1
    displayStr('tan(')
})

root.addEventListener('click',()=>{
    isOpen += 1
    displayStr('sqrt(')
})

one.addEventListener('click',()=>{
    displayStr('1')
})


two.addEventListener('click',()=>{
    displayStr('2')
})

three.addEventListener('click',()=>{
    displayStr('3')
})

subtraction.addEventListener('click',()=>{
    displayStr('-')
})


exp.addEventListener('click',()=>{
    displayStr('E')
})

power.addEventListener('click',()=>{
    displayStr('^')
    
})

zero.addEventListener('click',()=>{
    displayStr('0')
})

decimal.addEventListener('click',()=>{
    displayStr('.')
    
})

plus.addEventListener('click',()=>{
    displayStr('+')
})

equal.addEventListener('click',async ()=>{
    await solve(display.innerHTML).then(res => {
        console.log(res)
    })

})



function displayStr(str){
    console.log(display.innerHTML.slice(-1))
    if(operations.has(str) && (operations.has(display.innerHTML.slice(-1)) || 
    display.innerHTML.slice(-1)) == '('){
        return 
    }
    if(display.innerHTML == 0 || display.innerHTML == 'ERROR' || display.innerHTML == 'undefined'){
        display.innerHTML = str
    }else{
        display.innerHTML += str
    }
}
async function solve(str){
    if (notValidStarters.has(str[0]) || operations.has(str.slice(-1)) || str.slice(-1) == '('){
        return 'ERROR'
    }
    for(let i = 0;i<isOpen;i++){
        str += ')'
    }
    str = str.replace('+','%2B')
    console.log(str)
    isOpen = 0
    console.log(str)
    url = `http://api.mathjs.org/v4/?expr=${str}&precision=6`
    await fetch(url)
    .then(res => res.json())
    .then(data => {console.log(data)
        display.innerHTML = data  })

}