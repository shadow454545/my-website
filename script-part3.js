// Animate a card to the magic circle
function animateCardToMagicCircle(cardElement, tarotCard, isReversed, delay, callback) {
    setTimeout(() => {
        const cardRect = cardElement.getBoundingClientRect();
        
        // Create floating card
        const floatingCard = document.createElement('div');
        floatingCard.className = 'floating-card';
        
        // Create front and back of the floating card
        const floatingCardFront = document.createElement('div');
        floatingCardFront.className = 'floating-card-front';
        
        const floatingCardBack = document.createElement('div');
        floatingCardBack.className = 'floating-card-back';
        
        // Add the card image
        const backImg = document.createElement('img');
        backImg.src = cardElement.querySelector('.tarot-card-back img').src;
        backImg.alt = 'Tarot Card Back';
        
        const frontImg = document.createElement('img');
        frontImg.src = `images/tarot/cards/${tarotCard.name}_${tarotCard.rank}_${tarotCard.suit}.webp`;
        frontImg.alt = tarotCard.name;
        frontImg.style.transform = isReversed ? 'rotate(180deg)' : '';
        
        floatingCardFront.appendChild(frontImg);
        floatingCardBack.appendChild(backImg);
        floatingCard.appendChild(floatingCardFront);
        floatingCard.appendChild(floatingCardBack);
        
        // Position the floating card at the selected card's position
        floatingCard.style.position = 'fixed';
        floatingCard.style.left = `${cardRect.left}px`;
        floatingCard.style.top = `${cardRect.top}px`;
        
        // Add the floating card to the magic circle container
        magicCircleContainer.appendChild(floatingCard);
        
        // Animate the card floating to the magic circle
        setTimeout(() => {
            // Move to center of magic circle
            floatingCard.style.left = '50%';
            floatingCard.style.top = '50%';
            floatingCard.style.transform = 'translate(-50%, -50%)';
            floatingCard.style.animation = 'cardFloat 2s forwards, cardGlow 2s infinite alternate';
            
            // After animation completes, call the callback
            setTimeout(() => {
                if (callback) callback();
            }, 2000);
        }, 500);
    }, delay);
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
