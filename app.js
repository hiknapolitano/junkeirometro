var factor;

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

function mulberry32(a) {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}


function generateFactor() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var seed = cyrb128(today);
    var rand = mulberry32(seed[0]);
    var min = 1.2;
    var max = 10.0;

    factor = rand * (max - min) + min;
    console.log("seed: " + seed);
    console.log("rand: " + rand);
    console.log("factor: " + factor.toString());
    console.log("today is : " + today.toString());
    document.querySelector("#factor").textContent = "Hoje, um minuto de Junkeira é equivalente a: " + factor.toFixed(2) + " minutos, portanto...";
}

function inputHandler(e){
    result.textContent = "minutos junkeirosos equivalem a " + (e.target.value * factor).toFixed(2) + " minutos"; 
}

var result;
var imgNum;
window.onload = function() {
   generateFactor();

   document.querySelector("#inputnumber").addEventListener("input", inputHandler);
   imgNum = Math.floor(Math.random() * (9 - 1) + 1);
   document.querySelector("#junksimage").src = "imgs/" + imgNum + ".png"
   result = document.querySelector("#conversion");
   result.textContent = "minutos junkeirosos equivalem a " + (15 * factor).toFixed(2) + " minutos"; 

  };
