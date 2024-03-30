const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const soundBtn = document.getElementById('sound')
const copyBtn = document.getElementById('copy')
const loader = document.getElementById("loader");
let apiQuotes = [];
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuots array
  const Quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank replace it with 'unknow'
  if (!Quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = Quote.author;
  }
  // Check Quote Length to determine styling
  if (Quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = Quote.text;
  removeLoadingSpinner();
}
async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
soundBtn.addEventListener('click',()=>{
  let utterance = new SpeechSynthesisUtterance(`${quoteText.textContent}`);
  speechSynthesis.speak(utterance)})
copyBtn.addEventListener('click',()=>{
  navigator.clipboard.writeText(quoteText.textContent)
})
// On Load
getQuotesFromAPI();