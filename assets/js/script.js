let store;
const main = document.querySelector('main');
const clock = document.getElementById('time');
const startBtn = document.getElementById('start');

const getLocalStorage = async() => {
    store = await localStorage.scores || [];
}

getLocalStorage();

let qI = -1;
let clockId;
let time = 60;

const handleClock = () => {
    time--;
    if(time<1) {
        time = 0;

        endGame();
    }
    clock.innerHTML = time;
};

const handleAns = ans => {
    if(questions[qI].C != ans) {
        time -= 10;
    }

   if(time) handleQuestions();
}

const handleQuestions = () => {
    qI++;
    
    if(qI==questions.length) return endGame();
    

    let {Q,A} = questions[qI];

    main.innerHTML = `<h1>${Q}</h1><div id = "ansDiv"></div>`;

    A.forEach(ans => {
        ansDiv.innerHTML+=`<button onclick="handleAns('${ans}')">${ans}</button>`
    });
    
};

const startQuiz = () => {
    clockId = setInterval(handleClock,1000);
    handleQuestions();
};

startBtn.onclick = startQuiz;

const endGame = () => {
    clearInterval(clockId);
    main.innerHTML= `
        <h2>All Done</h2>
        <h4>Your Final Score: ${time}</h4>
        <input id="inputInitials" placeholder="Enter Initials" /> 
        <button onclick="handleSubmit()"> Submit </button>`
};

const handleSubmit=()=>{
    store.push({initials: inputInitials.value, score: time});
    localStorage.scores = JSON.stringify(store);

    main.innerHTML = '';
}