let tryWords = document.querySelectorAll('.try .word');
let trys = document.querySelectorAll(".try > div:not(.won,.buttons");
let words = ["food","car","mohamed","khalid"]
let checkWord = words[parseInt(Math.random() *4)]
let countTrys = 1;
let countHint = 3;
const won = document.querySelector('.won')
insertInput(checkWord.length)

let hint = document.querySelector('.hint')
hint.addEventListener("click",(el)=>{
    giveHint(countTrys)
})

let check = document.querySelector("button")
check.addEventListener("click",(el)=>{
    checkCorrect(countTrys)
})
function insertInput(size){
    tryWords.forEach((el,index)=>{
        for(let i = 1; i <= size;i++){
            let input = document.createElement("input")
            input.setAttribute("type","text")
            input.setAttribute("maxlength","1")
            input.id = `guess-${index + 1}-letter-${i}`
            el.append(input)
        }
        if(index !== 0){
            trys[index].classList.add("opc-40")
            
        }
    })
    tryWords[0].children[0].focus()

    // disable all Input Except First One
    const inputInDisabledDiv = document.querySelectorAll(".opc-40 input")
    inputInDisabledDiv.forEach((input)=>{
        input.disabled = true;
    })

    const inputs = document.querySelectorAll('input')
    
    inputs.forEach((input,index)=>{
        input.addEventListener('input',(e)=>{
            input.value = input.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus()
        })

        input.addEventListener('keydown',(e)=>{
            
            if(e.key === "ArrowRight"){
                const nextInput = index + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus()
            }
            if(e.key === "ArrowLeft"){
                const nextInput = index - 1;
                if(nextInput >= 0) inputs[nextInput].focus()
            }
        })
    })

    
}

function checkCorrect(){
    let success = true;

    for(let i = 1; i <= checkWord.length;i++){
        const input = document.querySelector(`#guess-${countTrys}-letter-${i}`)
        const letter = input.value.toLowerCase();
        const actualLetter =  checkWord[i - 1];

        if(letter === actualLetter){
            input.classList.add("correct-place")
        }else if(checkWord.includes(letter) && letter !== ""){
            input.classList.add("false-place")
            success = false;
        }else{
            input.classList.add("false")
            success = false;

        }
    }
    if(success){
        trys.forEach((el)=>{
            el.classList.add("opc-40")
        })
        console.log(success)
        check.classList.add("disable")
        check.disabled = true;
        hint.classList.add("disable")
        hint.disabled = true;

        won.innerHTML = `you won the word is <span>${checkWord}</span>`
    }else{
        // delete disable for next try
        if(countTrys >= 6){
            trys.forEach((el)=>{
                el.classList.add("opc-40")
            })
            check.classList.add("disable")
            check.disabled = true;
            hint.classList.add("disable")
            hint.disabled = true;
            won.innerHTML = `you lose the word is <span>${checkWord}</span>`
        }else{
            trys.forEach((el)=>{
                el.classList.add("opc-40")
            })

            for(let i = 1; i <= checkWord.length; i++){
                const input = document.querySelector(`#guess-${countTrys}-letter-${i}`)
                input.disabled = true;
            }

            trys[countTrys].classList.remove("opc-40")
            countTrys++;
            for(let i = 1; i <= checkWord.length; i++){
                const input = document.querySelector(`#guess-${countTrys}-letter-${i}`)
                input.disabled = false;
            }
            
        }
    }
    
     
}

function giveHint(){
    if(countHint > 0){
        countHint--;
        document.querySelector('.hint span').innerHTML = `${countHint}&nbsp`;
    }
    if(countHint === 0){
        document.querySelector('.hint').disabled = true;
        document.querySelector('.hint').classList.add("disable")
    }
    const validInput = document.querySelectorAll('input:not([disabled]')
    
    const emptyInput = Array.from(validInput).filter((input)=>{
        return input.value === ''
    })
    console.log(emptyInput)

    if(emptyInput.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyInput.length);
        const randomInput = emptyInput[randomIndex];
        const indexToFill = Array.from(validInput).indexOf(randomInput)

        if(indexToFill !== -1){
            randomInput.value = checkWord[indexToFill].toUpperCase()
        }
    }
}
document.addEventListener('keyup',handleBackSpace)
function handleBackSpace(event){
    if(event.key === "Backspace"){
        const input = document.querySelectorAll('input:not([disabled]');
        const currentIndex = Array.from(input).indexOf(document.activeElement)

        if(currentIndex > 0){
            const currentInput = input[currentIndex]
            const previosInput = input[currentIndex - 1]
            currentInput.innerHTML = '';
            previosInput.innerHTML =''
            previosInput.focus()
        }
    }
}