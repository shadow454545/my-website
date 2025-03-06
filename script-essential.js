// Current language (default: English)
let currentLang = 'en';

// DOM elements
const languageButtons = document.querySelectorAll('.language-selector button');
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const dailyTitle = document.getElementById('daily-title');
const pptTitle = document.getElementById('ppt-title');
const confirmButton = document.getElementById('confirm-selection');
const pptConfirmButton = document.getElementById('ppt-confirm-selection');
const drawAgainButton = document.getElementById('draw-again');
const pageTitle = document.querySelector('title');
const shuffleButton = document.getElementById('shuffle-button');
const pptShuffleButton = document.getElementById('ppt-shuffle-button');
const shuffleText = document.getElementById('shuffle-text');
const pptShuffleText = document.getElementById('ppt-shuffle-text');
const magicCircleContainer = document.querySelector('.magic-circle-container');
const magicCircle = document.querySelector('.magic-circle');

// Tarot card data
let tarotInterpretations = [];
let selectedCard = null;
let selectedPPTCards = [];
const maxPPTCards = 3;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing page...');
    initPage();
});

function initPage() {
    console.log('Initializing page...');
    
    // Load tarot interpretations
    loadTarotInterpretations();
    
    // Set up the cards
    setupDailyFortuneCards();
    setupPPTCards();
    
    // Update page text
    updatePageText();
    
    // Check if it's a mobile device
    checkMobileAndAdjustLayout();
    
    // Add event listeners
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-lang'));
        });
    });
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            showPage(pageId);
            // Refresh cards when switching tabs
            if (pageId === 'daily-fortune') {
                setupDailyFortuneCards();
            } else if (pageId === 'past-present-future') {
                setupPPTCards();
            }
        });
    });
    
    confirmButton.addEventListener('click', showDailyResult);
    pptConfirmButton.addEventListener('click', showPPTResult);
    drawAgainButton.addEventListener('click', resetCards);
    shuffleButton.addEventListener('click', shuffleDailyCards);
    pptShuffleButton.addEventListener('click', shufflePPTCards);
    
    // Listen for window resize to adjust layout
    window.addEventListener('resize', checkMobileAndAdjustLayout);
    
    console.log('Page initialized successfully');
}

// Check if it's a mobile device and adjust layout accordingly
function checkMobileAndAdjustLayout() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Convert to circle layout for mobile
        const dailyCardsContainer = document.querySelector('#daily-fortune .tarot-cards');
        const pptCardsContainer = document.querySelector('#past-present-future .tarot-cards');
        
        dailyCardsContainer.classList.add('mobile-circle-layout');
        pptCardsContainer.classList.add('mobile-circle-layout');
    } else {
        // Remove circle layout for desktop
        const dailyCardsContainer = document.querySelector('#daily-fortune .tarot-cards');
        const pptCardsContainer = document.querySelector('#past-present-future .tarot-cards');
        
        dailyCardsContainer.classList.remove('mobile-circle-layout');
        pptCardsContainer.classList.remove('mobile-circle-layout');
    }
}

// Load tarot interpretations from the tarotInterpretationsData variable
function loadTarotInterpretations() {
    console.log('Loading tarot interpretations...');
    tarotInterpretations = tarotInterpretationsData.tarot_interpretations;
    console.log(`Loaded ${tarotInterpretations.length} tarot interpretations`);
}

// Set up the daily fortune cards
function setupDailyFortuneCards() {
    console.log('Setting up daily fortune cards...');
    const tarotCardsContainer = document.querySelector('#daily-fortune .tarot-cards');
    tarotCardsContainer.innerHTML = '';
    
    // Create an array of card numbers 1-10 and shuffle it
    const cardNumbers = Array.from({length: 10}, (_, i) => i + 1);
    shuffleArray(cardNumbers);
    
    // Create 10 cards with unique back images
    for (let i = 0; i < 10; i++) {
        const card = createTarotCard(cardNumbers[i], i);
        tarotCardsContainer.appendChild(card);
    }
    console.log('Daily fortune cards set up successfully');
}

// Set up the past-present-future cards
function setupPPTCards() {
    console.log('Setting up past-present-future cards...');
    const tarotCardsContainer = document.querySelector('#past-present-future .tarot-cards');
    tarotCardsContainer.innerHTML = '';
    
    // Create an array of card numbers 1-10 and shuffle it
    const cardNumbers = Array.from({length: 10}, (_, i) => i + 1);
    shuffleArray(cardNumbers);
    
    // Create 10 cards with unique back images
    for (let i = 0; i < 10; i++) {
        const card = createTarotCard(cardNumbers[i], i, true);
        tarotCardsContainer.appendChild(card);
    }
    console.log('Past-present-future cards set up successfully');
}

// Shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create a tarot card element
function createTarotCard(cardNumber, index, isPPT = false) {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.index = index;
    
    const cardInner = document.createElement('div');
    cardInner.className = 'tarot-card-inner';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'tarot-card-front';
    
    const cardBack = document.createElement('div');
    cardBack.className = 'tarot-card-back';
    
    const backImg = document.createElement('img');
    backImg.src = `images/tarot/back_img/Celestial Interstellar ${cardNumber}.webp`;
    backImg.alt = 'Tarot Card Back';
    
    cardBack.appendChild(backImg);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    // Add click event listener
    card.addEventListener('click', () => {
        if (isPPT) {
            handlePPTCardClick(card);
        } else {
            handleDailyCardClick(card);
        }
    });
    
    return card;
}

// Handle daily fortune card click
function handleDailyCardClick(card) {
    console.log('Daily fortune card clicked');
    const cards = document.querySelectorAll('#daily-fortune .tarot-card');
    
    // Deselect all cards
    cards.forEach(c => c.classList.remove('selected'));
    
    // Select the clicked card
    card.classList.add('selected');
    selectedCard = parseInt(card.dataset.index);
    
    console.log('Card selected:', selectedCard);
    
    // Show the confirm button
    confirmButton.classList.remove('hidden');
}

// Handle past-present-future card click
function handlePPTCardClick(card) {
    console.log('Past-present-future card clicked');
    const index = parseInt(card.dataset.index);
    
    // Check if the card is already selected
    const isSelected = card.classList.contains('selected');
    
    if (isSelected) {
        // Deselect the card
        card.classList.remove('selected');
        selectedPPTCards = selectedPPTCards.filter(i => i !== index);
    } else if (selectedPPTCards.length < maxPPTCards) {
        // Select the card
        card.classList.add('selected');
        selectedPPTCards.push(index);
    }
    
    // Show the confirm button if 3 cards are selected
    if (selectedPPTCards.length === maxPPTCards) {
        pptConfirmButton.classList.remove('hidden');
    } else {
        pptConfirmButton.classList.add('hidden');
    }
    
    console.log('Selected PPT cards:', selectedPPTCards);
}

// Shuffle the daily fortune cards
function shuffleDailyCards() {
    console.log('Shuffling daily fortune cards...');
    
    // Reset selected cards
    selectedCard = null;
    
    // Hide confirm button
    confirmButton.classList.add('hidden');
    
    // Simple shuffle animation
    const cards = document.querySelectorAll('#daily-fortune .tarot-card');
    cards.forEach(card => {
        card.classList.add('shuffle-up');
        setTimeout(() => {
            card.classList.remove('shuffle-up');
        }, 800);
    });
    
    // After animation, set up new cards
    setTimeout(() => {
        setupDailyFortuneCards();
    }, 800);
}

// Shuffle the past-present-future cards
function shufflePPTCards() {
    console.log('Shuffling past-present-future cards...');
    
    // Reset selected cards
    selectedPPTCards = [];
    
    // Hide confirm button
    pptConfirmButton.classList.add('hidden');
    
    // Simple shuffle animation
    const cards = document.querySelectorAll('#past-present-future .tarot-card');
    cards.forEach(card => {
        card.classList.add('shuffle-up');
        setTimeout(() => {
            card.classList.remove('shuffle-up');
        }, 800);
    });
    
    // After animation, set up new cards
    setTimeout(() => {
        setupPPTCards();
    }, 800);
}

// Show the daily fortune result
function showDailyResult() {
    console.log('Showing daily fortune result...');
    if (selectedCard === null) return;
    
    // Get a random tarot card
    const randomCard = getRandomTarotCard();
    const isReversed = Math.random() < 0.5;
    
    // Show the magic circle
    magicCircleContainer.classList.add('active');
    
    // After a delay, hide the magic circle and show the result
    setTimeout(() => {
        // Hide the magic circle
        magicCircleContainer.classList.remove('active');
        
        // Prepare the result page
        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = '';
        
        // Create the card result element
        const cardResult = document.createElement('div');
        cardResult.className = 'card-result';
        
        // Create the card image element
        const cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        
        // Create the card info element
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';
        
        // Create the card name element
        const cardName = document.createElement('h2');
        cardName.className = 'card-name';
        
        // Create the card position element
        const cardPosition = document.createElement('p');
        cardPosition.className = 'card-position';
        
        // Create the card meaning element
        const cardMeaning = document.createElement('div');
        cardMeaning.className = 'card-meaning';
        
        // Add the elements to the card result
        cardInfo.appendChild(cardName);
        cardInfo.appendChild(cardPosition);
        cardInfo.appendChild(cardMeaning);
        cardResult.appendChild(cardImage);
        cardResult.appendChild(cardInfo);
        resultContainer.appendChild(cardResult);
        
        // Show the result page
        showPage('result-page');
        
        // Update the result content
        updateResultContent(randomCard, isReversed);
    }, 3000);
}

// Show the past-present-future result
function showPPTResult() {
    console.log('Showing past-present-future result...');
    if (selectedPPTCards.length !== maxPPTCards) return;
    
    // Get 3 random tarot cards without duplicates
    const selectedCards = getRandomTarotCardsWithoutDuplicates(3);
    
    const pastCard = selectedCards[0];
    const presentCard = selectedCards[1];
    const futureCard = selectedCards[2];
    
    const pastReversed = Math.random() < 0.5;
    const presentReversed = Math.random() < 0.5;
    const futureReversed = Math.random() < 0.5;
    
    // Show the magic circle
    magicCircleContainer.classList.add('active');
    
    // After a delay, hide the magic circle and show the result
    setTimeout(() => {
        // Hide the magic circle
        magicCircleContainer.classList.remove('active');
        
        // Create the PPT result container
        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = '';
        
        const pptResult = document.createElement('div');
        pptResult.className = 'ppt-result';
        
        // Past card
        const pastCardElement = createPPTCardElement(
            pastCard, 
            pastReversed, 
            translations[currentLang].positions.past
        );
        pptResult.appendChild(pastCardElement);
        
        // Present card
        const presentCardElement = createPPTCardElement(
            presentCard, 
            presentReversed, 
            translations[currentLang].positions.present
        );
        pptResult.appendChild(presentCardElement);
        
        // Future card
        const futureCardElement = createPPTCardElement(
            futureCard, 
            futureReversed, 
            translations[currentLang].positions.future
        );
        pptResult.appendChild(futureCardElement);
        
        resultContainer.appendChild(pptResult);
        
        // Show the result page
        showPage('result-page');
    }, 3000);
}

// Create a PPT card element for the result
function createPPTCardElement(card, isReversed, position) {
    const cardElement = document.createElement('div');
    cardElement.className = 'ppt-card fade-in';
    
    const cardTitle = document.createElement('div');
    cardTitle.className = 'ppt-card-title';
    cardTitle.textContent = position;
    
    const cardImage = document.createElement('div');
    cardImage.className = 'ppt-card-image';
    
    const img = document.createElement('img');
    img.src = `images/tarot/cards/${card.name}_${card.rank}_${card.suit}.webp`;
    img.alt = card.name;
    img.style.transform = isReversed ? 'rotate(180deg)' : '';
    
    const cardName = document.createElement('div');
    cardName.className = 'ppt-card-name';
    cardName.textContent = `${card.name} (${translations[currentLang].cardPosition[isReversed ? 'reversed' : 'upright']})`;
    
    const cardMeaning = document.createElement('div');
    cardMeaning.className = 'ppt-card-meaning';
    
    // Get the meaning based on position
    const meaningKey = isReversed ? 'shadow' : 'light';
    const meanings = card.meanings[meaningKey];
    
    // Get a random meaning
    const randomIndex = Math.floor(Math.random() * meanings.length);
    cardMeaning.textContent = meanings[randomIndex];
    
    // Add keywords if available
    if (card.keywords && card.keywords.length > 0) {
        const keywordsDiv = document.createElement('div');
        keywordsDiv.className = 'card-keywords';
        keywordsDiv.innerHTML = `<strong>Keywords:</strong> ${card.keywords.join(', ')}`;
        cardMeaning.appendChild(document.createElement('br'));
        cardMeaning.appendChild(keywordsDiv);
    }
    
    // Add fortune telling if available
    if (card.fortune_telling && card.fortune_telling.length > 0) {
        const fortuneDiv = document.createElement('div');
        fortuneDiv.className = 'card-fortune';
        fortuneDiv.innerHTML = `<strong>Fortune:</strong> ${card.fortune_telling[0]}`;
        cardMeaning.appendChild(document.createElement('br'));
        cardMeaning.appendChild(fortuneDiv);
    }
    
    cardImage.appendChild(img);
    cardElement.appendChild(cardTitle);
    cardElement.appendChild(cardImage);
    cardElement.appendChild(cardName);
    cardElement.appendChild(cardMeaning);
    
    return cardElement;
}

// Update the result content for daily fortune
function updateResultContent(card, isReversed) {
    const cardImage = document.querySelector('.card-image');
    const cardName = document.querySelector('.card-name');
    const cardPosition = document.querySelector('.card-position');
    const cardMeaning = document.querySelector('.card-meaning');
    
    // Clear previous content
    cardImage.innerHTML = '';
    cardMeaning.innerHTML = '';
    
    // Create the card image
    const img = document.createElement('img');
    img.src = `images/tarot/cards/${card.name}_${card.rank}_${card.suit}.webp`;
    img.alt = card.name;
    img.style.transform = isReversed ? 'rotate(180deg)' : '';
    
    // Update the card info
    cardName.textContent = card.name;
    cardPosition.textContent = translations[currentLang].cardPosition[isReversed ? 'reversed' : 'upright'];
    
    // Get the meaning based on position
    const meaningKey = isReversed ? 'shadow' : 'light';
    const meanings = card.meanings[meaningKey];
    
    // Add each meaning as a paragraph
    meanings.forEach(meaning => {
        const p = document.createElement('p');
        p.textContent = meaning;
        cardMeaning.appendChild(p);
    });
    
    // Add keywords if available
    if (card.keywords && card.keywords.length > 0) {
        const keywordsTitle = document.createElement('h3');
        keywordsTitle.textContent = 'Keywords';
        keywordsTitle.className = 'card-section-title';
        cardMeaning.appendChild(keywordsTitle);
        
        const keywordsP = document.createElement('p');
        keywordsP.textContent = card.keywords.join(', ');
        keywordsP.className = 'card-keywords';
        cardMeaning.appendChild(keywordsP);
    }
    
    // Add fortune telling if available
    if (card.fortune_telling && card.fortune_telling.length > 0) {
        const fortuneTitle = document.createElement('h3');
        fortuneTitle.textContent = 'Fortune Telling';
        fortuneTitle.className = 'card-section-title';
        cardMeaning.appendChild(fortuneTitle);
        
        const fortuneList = document.createElement('ul');
        fortuneList.className = 'card-fortune-list';
        
        card.fortune_telling.forEach(fortune => {
            const li = document.createElement('li');
            li.textContent = fortune;
            fortuneList.appendChild(li);
        });
        
        cardMeaning.appendChild(fortuneList);
    }
    
    // Add the image to the container
    cardImage.appendChild(img);
    
    // Add fade-in animation
    cardImage.classList.add('fade-in');
    cardName.classList.add('fade-in');
    cardPosition.classList.add('fade-in');
    cardMeaning.classList.add('fade-in');
}

// Get a random tarot card
function getRandomTarotCard() {
    const randomIndex = Math.floor(Math.random() * tarotInterpretations.length);
    return tarotInterpretations[randomIndex];
}

// Get random tarot cards without duplicates
function getRandomTarotCardsWithoutDuplicates(count) {
    const selectedCards = [];
    const usedNames = new Set();
    
    while (selectedCards.length < count) {
        const randomCard = getRandomTarotCard();
        
        // Check if this card name is already used
        if (!usedNames.has(randomCard.name)) {
            selectedCards.push(randomCard);
            usedNames.add(randomCard.name);
        }
    }
    
    return selectedCards;
}

// Reset the cards
function resetCards() {
    // Determine which page to return to based on the current result
    const isPPTResult = document.querySelector('.ppt-result') !== null;
    const returnPage = isPPTResult ? 'past-present-future' : 'daily-fortune';
    
    // Reset selected cards
    selectedCard = null;
    selectedPPTCards = [];
    
    // Reset the card displays
    setupDailyFortuneCards();
    setupPPTCards();
    
    // Hide confirm buttons
    confirmButton.classList.add('hidden');
    pptConfirmButton.classList.add('hidden');
    
    // Clear the result container
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = '';
    
    // Show the appropriate page
    showPage(returnPage, true);
    
    // Make sure the correct menu item is active
    menuItems.forEach(item => {
        if (item.getAttribute('data-page') === returnPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Show a specific page
function showPage(pageId, skipReset = false) {
    // Update menu items
    menuItems.forEach(item => {
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update pages
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    // If we're showing a card selection page and not skipping reset
    if ((pageId === 'daily-fortune' || pageId === 'past-present-future') && !skipReset) {
        // Clear the result container to prevent issues when switching between reading types
        const resultContainer = document.querySelector('.result-container');
        resultContainer.innerHTML = '';
        
        // Only reset if we're not already on a card selection page
        if (!document.getElementById(pageId).classList.contains('active')) {
            // Reset selected cards
            selectedCard = null;
            selectedPPTCards = [];
            
            // Reset the card displays
            setupDailyFortuneCards();
            setupPPTCards();
            
            // Hide confirm buttons
            confirmButton.classList.add('hidden');
            pptConfirmButton.classList.add('hidden');
        }
    }
}

// Set the language
function setLanguage(lang) {
    if (lang === currentLang) return;
    
    // Update active button
    languageButtons.forEach(button => {
        if (button.getAttribute('data-lang') === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    currentLang = lang;
    document.documentElement.lang = lang;
    updatePageText();
}

// Update all text elements based on current language
function updatePageText() {
    const texts = translations[currentLang];
    
    // Update page title
    pageTitle.textContent = texts.title;
    
    // Update menu items - preserve the magic ball icon
    const dailyFortuneMenuItem = menuItems[0];
    
    // Always recreate the structure to ensure the icon is preserved
    dailyFortuneMenuItem.innerHTML = `<span class="menu-icon">🔮</span><span>${texts.dailyFortune}</span>`;
    
    // Update the Past-Present-Future menu item with star icon
    const pptMenuItem = menuItems[1];
    pptMenuItem.innerHTML = `<span class="menu-icon">⭐</span><span>${texts.pastPresentFuture}</span>`;
    
    // Update page titles
    dailyTitle.textContent = texts.dailyTitle;
    pptTitle.textContent = texts.pptTitle;
    
    // Update buttons
    confirmButton.textContent = texts.confirmButton;
    pptConfirmButton.textContent = texts.confirmButton;
    drawAgainButton.textContent = texts.drawAgain;
    shuffleText.textContent = texts.shuffleButton;
    pptShuffleText.textContent = texts.shuffleButton;
    
    // Update result page if it's visible
    if (document.getElementById('result-page').classList.contains('active')) {
        const cardPosition = document.querySelector('.card-position');
        if (cardPosition.textContent.includes('Upright') || cardPosition.textContent.includes('正位') || cardPosition.textContent.includes('正位置')) {
            cardPosition.textContent = texts.cardPosition.upright;
        } else {
            cardPosition.textContent = texts.cardPosition.reversed;
        }
    }
}
