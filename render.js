// Logic for the UI
document.addEventListener('DOMContentLoaded', () => {
  const challengeText = document.getElementById('challenge-text');
  const difficultySpan = document.getElementById('difficulty');
  const pointsSpan = document.getElementById('points');
  const newChallengeBtn = document.getElementById('new-challenge-btn');
  const closeBtn = document.getElementById('close-btn');

  // Function to update the UI with a new challenge
  const displayNewChallenge = async () => {
    // Use the 'api' object exposed from preload.js
    const challenge = await window.api.getDailyChallenge();

    challengeText.textContent = challenge.challenge;
    difficultySpan.textContent = `Difficulty: ${challenge.difficulty}`;
    pointsSpan.textContent = `Points: ${challenge.points}`;
  };

  // Event Listeners
  newChallengeBtn.addEventListener('click', displayNewChallenge);
  
  closeBtn.addEventListener('click', () => {
    // Use the 'api' object to send a close signal
    window.api.closeApp();
  });
});
