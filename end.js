document.addEventListener('DOMContentLoaded', () => {

const username = document.getElementById('username');
const saveScoreBtn  =document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const max_high = 5;


finalScore.innerText = mostRecentScore;


username.addEventListener('keyup',()=>{
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e)=>{
  e.preventDefault();
  console.log("Clicked");

  const score ={
    score: mostRecentScore,
    name:username.value
  };
  highScore.push(score);
  highScore.sort((a,b)=>b.score-a.score);
  highScore.splice(max_high);

  localStorage.setItem("highScore",JSON.stringify(highScore));
  window.location.assign('/');
}
})