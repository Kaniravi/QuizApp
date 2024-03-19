document.addEventListener('DOMContentLoaded', () => {
  const questionFromGame =document.getElementById('question');
  const choices = Array.from(document.getElementsByClassName('choice-text'));
  const progressText = document.getElementById('progressText');
  const progressBarFull = document.getElementById('progressbarfull');
  const scoreText = document.getElementById('score');
  const loader = document.getElementById('loader');
  const game = document.getElementById('game');
  
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score=0;
  let questionCounter = 0;
  let availableQuestions = [];
  
  
  let questions =[];
  fetch("https://opentdb.com/api.php?amount=10")
    .then(res=>{
    
   
      return res.json();
    })
    .then(loadedQuestions =>{
      
      console.log(loadedQuestions.results);
      questions = loadedQuestions.results.map(loadedQuestion=>{
        const formattedQuestion ={
          question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        console.log(answerChoices);
        formattedQuestion.answer = Math.floor(Math.random()*3)+1;
        answerChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);

        answerChoices.forEach((choice,index)=>{
          formattedQuestion["choice"+(index+1)] = choice;
        })
        return formattedQuestion;
      });
     
      
      startGame();
    })
    .catch(error=>{
      console.log("Error fetching questions: ",error);
    });
  
  const correct_bonus = 10;
  const max_questions = 4;
  
  
  startGame = () =>{
    questionCounter = 0;
    score =0;
    availableQuestions =[...questions];
    
    getNewQuestion();
    game.classList.remove('hidden');
     loader.classList.add('hidden');
     console.log('Game shown, Loader hidden');
  
  };
  
  
  getNewQuestion = () => {
    if(availableQuestions.length===0 || questionCounter >= max_questions){
      localStorage.setItem("mostRecentScore",score);
      
      return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question: ${questionCounter}/${max_questions}`;
    console.log((questionCounter/max_questions)*100);
    progressBarFull.style.width =`${(questionCounter /max_questions)*100}%`;

    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionFromGame.innerText = currentQuestion.question;
  
    choices.forEach(choice => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);
    acceptingAnswers=true;
  };
  
  
  
  
  choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
      if(!acceptingAnswers) return;
  
      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      const classToApply = selectedAnswer == currentQuestion.answer ? "correct": "incorrect";
      console.log(classToApply);
      if(classToApply ==='correct'){
        incrementScore(correct_bonus);
      }

      selectedChoice.parentElement.classList.add(classToApply);
      
      setTimeout(()=>{
        selectedChoice.parentElement. classList.remove(classToApply);

        getNewQuestion();
      },1000);
      
    })
  });

  incrementScore = num =>{
    score = score+num;
    scoreText.innerText = score;
  }
  
 
  });
  