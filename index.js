const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let pwOne = ""
let pwTwo = ""
let characterString = characters.join()
let onlyLetters = /[a-zA-Z]/g;
let lettersAndNumbers = /[a-zA-Z0-9]/gm;
let symbols = /\W+/gm;

let onlySymbolsCharacters = characterString.match(symbols)
let onlyLettersCharaters = characterString.match(onlyLetters)
let onlyLettersAndNumbersCharacters = characterString.match(lettersAndNumbers)
let symbolsAndLettersCharacters = onlyLettersCharaters + onlySymbolsCharacters
let symbolsAndLettersSet =Array.from(new Set(symbolsAndLettersCharacters))


let slider = document.getElementById("myRange");
let output = document.getElementById("pw--length");

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function constructPws(type){
    let char_set_to_use = []
    if(type === "all"){
        char_set_to_use = characters
    }else if(type === "symbols_and_letters"){
        char_set_to_use = symbolsAndLettersSet
    }else if(type === "numbers_and_letters"){
        char_set_to_use = onlyLettersAndNumbersCharacters
    }else{
        char_set_to_use = onlyLettersCharaters
    }
    
     for(let i = 0; i < slider.value; i++){
        
        let randomIndexOne = Math.floor(Math.random() * char_set_to_use.length)
        let randomIndexTwo = Math.floor(Math.random() * char_set_to_use.length)
        
        pwOne += char_set_to_use[randomIndexOne]
        pwTwo += char_set_to_use[randomIndexTwo]
    }
  
    document.getElementById("pw--one").value = pwOne
    document.getElementById("pw--two").value = pwTwo
    
}

function clearPws(){
    pwOne = ""
    pwTwo = ""
}

function generatePasswords(){
    
    clearPws()
    
    let numbersOk = document.getElementById("numbers--check").checked
    let symbolsOk = document.getElementById("symbols--check").checked
    
    if(numbersOk && symbolsOk){
        
        constructPws("all")
        
    }else if(numbersOk === false && symbolsOk === true){
        
        constructPws("symbols_and_letters")
        
    }else if (numbersOk === true && symbolsOk === false){
        
        constructPws("numbers_and_letters")

    }else{

        constructPws("just_letters")

    }
          
}

function copyPwToClipboard(input){
    
    let inputToCopy = document.getElementById(input.id)
    if(inputToCopy.value != ""){
        navigator.clipboard.writeText(inputToCopy.value)
        let popupMsg = document.getElementById("snackbar");
        popupMsg.className = "show";
        setTimeout(function(){ popupMsg.className = popupMsg.className.replace("show", ""); }, 3000);
    }
    
}




