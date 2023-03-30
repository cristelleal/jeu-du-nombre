// Elements du DOM

const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèles de coeurs 

const coeurVide = '<ion-icon name="heart-empty"></ion-icon>' ;
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond (linear background)

const bgFroid = 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)';
const bgTiede = 'linear-gradient(-20deg, #d558c8 0%, #24d292 100%)';
const bgChaud = 'linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)';
const bgBrulant = 'linear-gradient(to top, #f77062 0%, #fe5196 100%)';

const bgLoose = 'background-image: linear-gradient(to right, #a8caba 0%, #5d4157 100%)';
const bgWin = 'background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)';

body.classList.add("bgWin");
body.classList.add("bgLoose");

// PLAY :

const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 5;
    let vies = totalVies;
    console.log(randomNumber);

    // actualisation à chaque essai   
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value);

        if(valeurInput < 0 || valeurInput > 100) 
            return;

        if(valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin;
            message.textContent = `Bravo ! Il s'agit effectivement de ${randomNumber}`;
            rejouerBtn.style.display = "block";   
            essayerBtn.setAttribute("disabled",""); 
        }

        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !!! 🔥🔥🔥";
            }
            else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud ! 🔥";
            }
            else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiède ! 🙃";
            }
            else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid ! 😶";
            }
            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);

    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute('disabled', '');
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = 'block';
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }    
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
                divVies.innerHTML += coeur;
        });
    };

    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    });

};

play();



