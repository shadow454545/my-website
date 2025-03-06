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
    console.log('Confirm button:', confirmButton);
    
    // Show the confirm button
    confirmButton.classList.remove('hidden');
    console.log('Confirm button hidden class removed');
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

// Shuffle the daily fortune cards with animation
function shuffleDailyCards() {
    console.log('Shuffling daily fortune cards...');
    const cards = document.querySelectorAll('#daily-fortune .tarot-card');
    const cardsArray = Array.from(cards);
    
    // Reset selected cards
    selectedCard = null;
    
    // Hide confirm button
    confirmButton.classList.add('hidden');
    
    // Perform magical shuffle animation
    performMagicalShuffle(cardsArray, '#daily-fortune .tarot-cards', () => {
        setupDailyFortuneCards();
    });
}

// Shuffle the past-present-future cards with animation
function shufflePPTCards() {
    console.log('Shuffling past-present-future cards...');
    const cards = document.querySelectorAll('#past-present-future .tarot-card');
    const cardsArray = Array.from(cards);
    
    // Reset selected cards
    selectedPPTCards = [];
    
    // Hide confirm button
    pptConfirmButton.classList.add('hidden');
    
    // Perform magical shuffle animation
    performMagicalShuffle(cardsArray, '#past-present-future .tarot-cards', () => {
        setupPPTCards();
    });
}

// Perform a magical shuffle animation on cards
function performMagicalShuffle(cards, containerSelector, callback) {
    console.log('Performing magical shuffle animation...');
    // Get the shuffle animation container
    const shuffleContainer = document.querySelector('.shuffle-animation-container');
    const magicCircle = document.querySelector('.shuffle-magic-circle');
    const particleContainer = document.querySelector('.particle-container');
    const runeContainer = document.querySelector('.rune-container');
    const flashEffect = document.querySelector('.flash-effect');
    
    // Clear any existing elements
    particleContainer.innerHTML = '';
    runeContainer.innerHTML = '';
    
    // Hide the original cards first
    const cardsContainer = document.querySelector(containerSelector);
    cardsContainer.style.visibility = 'hidden';
    
    // Hide the shuffle button
    const shuffleButtonContainer = document.querySelector(`${containerSelector.split(' ')[0]} .shuffle-button-container`);
    if (shuffleButtonContainer) {
        shuffleButtonContainer.style.visibility = 'hidden';
    }
    
    // Show the shuffle animation container
    shuffleContainer.classList.add('active');
    
    // Create shuffle card elements
    const shuffleCards = [];
    const cardTrails = [];
    
    // Get the container dimensions for positioning
    const containerRect = document.querySelector(containerSelector).getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create shuffle cards based on the original cards
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        
        // Create shuffle card
        const shuffleCard = document.createElement('div');
        shuffleCard.className = 'shuffle-card';
        shuffleCard.style.left = `${cardRect.left}px`;
        shuffleCard.style.top = `${cardRect.top}px`;
        
        const shuffleCardInner = document.createElement('div');
        shuffleCardInner.className = 'shuffle-card-inner';
        
        const shuffleCardBack = document.createElement('div');
        shuffleCardBack.className = 'shuffle-card-back';
        
        // Get the card back image
        const backImg = document.createElement('img');
        backImg.src = card.querySelector('.tarot-card-back img').src;
        backImg.alt = 'Tarot Card Back';
        
        shuffleCardBack.appendChild(backImg);
        shuffleCardInner.appendChild(shuffleCardBack);
        shuffleCard.appendChild(shuffleCardInner);
        
        // Add to the shuffle container
        shuffleContainer.appendChild(shuffleCard);
        shuffleCards.push(shuffleCard);
        
        // Create card trails (3 per card)
        for (let i = 0; i < 3; i++) {
            const trail = document.createElement('div');
            trail.className = 'card-trail';
            trail.style.left = `${cardRect.left}px`;
            trail.style.top = `${cardRect.top}px`;
            trail.style.opacity = '0';
            
            shuffleContainer.appendChild(trail);
            cardTrails.push({
                element: trail,
                card: shuffleCard
            });
        }
    });
    
    // Animation sequence using requestAnimationFrame for smoother animation
    let startTime = null;
    const animationDuration = 3000; // 3 seconds total
    
    // Phase timings (in percentage of total duration)
    const phases = {
        scatter: 0.3,    // 0% - 30%
        rotate: 0.7,     // 30% - 70%
        particles: 0.5,  // 50% point
        converge: 1.0    // 70% - 100%
    };
    
    // Create runes
    const runes = [];
    for (let i = 0; i < 10; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        rune.style.left = `${Math.random() * 100}%`;
        rune.style.top = `${Math.random() * 100}%`;
        runeContainer.appendChild(rune);
        runes.push(rune);
    }
    
    // Animation function
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        // 1. Scatter phase (0% - 30%)
        if (progress <= phases.scatter) {
            const scatterProgress = progress / phases.scatter;
            
            shuffleCards.forEach((card, index) => {
                // Random direction for each card
                const angle = (index / shuffleCards.length) * Math.PI * 2;
                const distance = 150 * scatterProgress;
                const x = centerX + Math.cos(angle) * distance - 60; // Adjust for card width
                const y = centerY + Math.sin(angle) * distance - 100; // Adjust for card height
                
                // Move card with slight rotation
                card.style.left = `${x}px`;
                card.style.top = `${y}px`;
                card.style.transform = `rotate(${(index % 2 === 0 ? 1 : -1) * 15 * scatterProgress}deg)`;
                
                // Update trails
                cardTrails.forEach((trail, trailIndex) => {
                    if (trail.card === card) {
                        const delay = trailIndex * 0.1;
                        const trailProgress = Math.max(0, scatterProgress - delay);
                        if (trailProgress > 0) {
                            trail.element.style.opacity = `${0.3 * trailProgress}`;
                            trail.element.style.left = `${x - (trailIndex * 5)}px`;
                            trail.element.style.top = `${y - (trailIndex * 5)}px`;
                        }
                    }
                });
            });
        }
        
        // 2. Rotate phase (30% - 70%)
        if (progress > phases.scatter && progress <= phases.rotate) {
            const rotateProgress = (progress - phases.scatter) / (phases.rotate - phases.scatter);
            
            shuffleCards.forEach((card, index) => {
                // Circular motion around the center
                const speed = 1 + (index % 3) * 0.2; // Slightly different speeds
                const angle = (index / shuffleCards.length) * Math.PI * 2 + rotateProgress * Math.PI * 2 * speed;
                const radius = 150 + Math.sin(rotateProgress * Math.PI) * 50; // Pulsing radius
                const x = centerX + Math.cos(angle) * radius - 60;
                const y = centerY + Math.sin(angle) * radius - 100;
                
                // Move card with rotation following the circle
                card.style.left = `${x}px`;
                card.style.top = `${y}px`;
                card.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
                
                // Update trails with reduced opacity
                cardTrails.forEach((trail, trailIndex) => {
                    if (trail.card === card) {
                        const delay = trailIndex * 0.05;
                        const trailAngle = angle - delay;
                        const trailX = centerX + Math.cos(trailAngle) * radius - 60;
                        const trailY = centerY + Math.sin(trailAngle) * radius - 100;
                        
                        trail.element.style.opacity = `${0.2 - trailIndex * 0.05}`;
                        trail.element.style.left = `${trailX}px`;
                        trail.element.style.top = `${trailY}px`;
                    }
                });
                
                // Show runes under cards during rotation
                if (rotateProgress > 0.2) {
                    runes.forEach((rune, runeIndex) => {
                        const runeOpacity = Math.min(1, (rotateProgress - 0.2) * 3);
                        rune.style.opacity = `${runeOpacity}`;
                    });
                }
            });
            
            // 3. Particle effect at midpoint (50%)
            if (progress >= phases.particles && progress <= phases.particles + 0.05) {
                // Create particles
                if (progress === phases.particles) {
                    createParticles(particleContainer, 50);
                }
                
                // Flash runes
                runes.forEach(rune => {
                    rune.style.boxShadow = '0 0 20px rgba(100, 150, 255, 0.8)';
                });
            } else if (progress > phases.particles + 0.05) {
                // Reset rune glow
                runes.forEach(rune => {
                    rune.style.boxShadow = '0 0 10px rgba(100, 150, 255, 0.8)';
                });
            }
        }
        
        // 4. Converge phase (70% - 100%)
        if (progress > phases.rotate) {
            const convergeProgress = (progress - phases.rotate) / (1 - phases.rotate);
            
            // Hide trails
            cardTrails.forEach(trail => {
                trail.element.style.opacity = `${0.2 * (1 - convergeProgress)}`;
            });
            
            // Hide runes
            runes.forEach(rune => {
                rune.style.opacity = `${1 - convergeProgress}`;
            });
            
            // Converge cards to center
            shuffleCards.forEach((card, index) => {
                const delay = index * 0.02;
                const cardProgress = Math.min(1, convergeProgress / (1 - delay));
                
                if (cardProgress > 0) {
                    // Move to center with reducing rotation
                    const x = centerX - 60 + (Math.random() * 20 - 10) * (1 - cardProgress);
                    const y = centerY - 100 + (Math.random() * 20 - 10) * (1 - cardProgress);
                    const rotation = (index % 2 === 0 ? 1 : -1) * 360 * (1 - cardProgress);
                    
                    card.style.left = `${x}px`;
                    card.style.top = `${y}px`;
                    card.style.transform = `rotate(${rotation}deg)`;
                    
                    // Reduce size slightly as they converge
                    card.style.transform = `rotate(${rotation}deg) scale(${0.9 + 0.1 * cardProgress})`;
                }
            });
            
            // Final flash at the end
            if (convergeProgress > 0.9) {
                flashEffect.classList.add('active');
            }
        }
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete
            setTimeout(() => {
                // Clean up
                shuffleCards.forEach(card => card.remove());
                cardTrails.forEach(trail => trail.element.remove());
                particleContainer.innerHTML = '';
                runeContainer.innerHTML = '';
                flashEffect.classList.remove('active');
                shuffleContainer.classList.remove('active');
                
                // Make the original cards container visible again
                cardsContainer.style.visibility = 'visible';
                
                // Show the shuffle button again
                if (shuffleButtonContainer) {
                    shuffleButtonContainer.style.visibility = 'visible';
                }
                
                // Execute callback
                if (callback) callback();
            }, 500);
        }
    }
    
    // Start animation
    requestAnimationFrame(animate);
}

// Create particle effects
function createParticles(container, count) {
    console.log('Creating particles...');
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around the center
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const x = 50 + Math.cos(angle) * distance;
        const y = 50 + Math.sin(angle) * distance;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color (blue to purple hues)
        const hue = 220 + Math.random() * 60;
        particle.style.backgroundColor = `hsla(${hue}, 80%, 70%, 0.8)`;
        
        // Add to container
        container.appendChild(particle);
        
        // Animate particle
        const duration = 1000 + Math.random() * 1000;
        const targetX = x + (Math.random() * 200 - 100);
        const targetY = y + (Math.random() * 200 - 100);
        
        // Use requestAnimationFrame for smooth animation
        let startTime = null;
        
        function animateParticle(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Move particle outward
            const currentX = x + (targetX - x) * progress;
            const currentY = y + (targetY - y) * progress;
            
            particle.style.left = `${currentX}%`;
            particle.style.top = `${currentY}%`;
            
            // Fade out
            particle.style.opacity = `${1 - progress}`;
            
            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
}

// Show the daily fortune result with animation
function showDailyResult() {
    console.log('Showing daily fortune result...');
    if (selectedCard === null) return;
    
    // Get the selected card element
    const selectedCardElement = document.querySelector(`#daily-fortune .tarot-card[data-index="${selectedCard}"]`);
    const selectedCardRect = selectedCardElement.getBoundingClientRect();
    
    // Get a random tarot card
    const randomCard = getRandomTarotCard();
    const isReversed = Math.random() < 0.5;
    
    // Show the magic circle
    magicCircleContainer.classList.add('active');
    
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
    backImg.src = selectedCardElement.querySelector('.tarot-card-back img').src;
    backImg.alt = 'Tarot Card Back';
    
    const frontImg = document.createElement('img');
    frontImg.src = `images/tarot/cards/${randomCard.name}_${randomCard.rank}_${randomCard.suit}.webp`;
    frontImg.alt = randomCard.name;
    frontImg.style.transform = isReversed ? 'rotate(180deg)' : '';
    
    floatingCardFront.appendChild(frontImg);
    floatingCardBack.appendChild(backImg);
    floatingCard.appendChild(floatingCardFront);
    floatingCard.appendChild(floatingCardBack);
    
    // Position the floating card at the selected card's position
    floatingCard.style.position = 'fixed';
    floatingCard.style.left = `${selectedCardRect.left}px`;
    floatingCard.style.top = `${selectedCardRect.top}px`;
    
    // Add the floating card to the magic circle container
    magicCircleContainer.appendChild(floatingCard);
    
    // Animate the card floating to the magic circle
    setTimeout(() => {
        // Move to center of magic circle
        floatingCard.style.left = '50%';
        floatingCard.style.top = '50%';
        floatingCard.style.transform = 'translate(-50%, -50%)';
        floatingCard.style.animation = 'cardFloat 2s forwards, cardGlow 2s infinite alternate';
        
        // After card animation completes, slow down and stop the magic circle
        setTimeout(() => {
            magicCircle.style.animation = 'slowRotateStop 3s forwards';
            
            // After magic circle stops, show the result
            setTimeout(() => {
                // Hide the magic circle and remove the floating card
                magicCircleContainer.classList.remove('active');
                floatingCard.remove();
                magicCircle.style.animation = 'rotateCircle 10s linear infinite';
                
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
        }, 2000);
    }, 500);
}

// Show the past-present-future result with animation
function showPPTResult() {
    console.log('Showing past-present-future result...');
    if (selectedPPTCards.length !== maxPPTCards) return;
    
    // Get the selected card elements
    const selectedCardElements = selectedPPTCards.map(index => 
        document.querySelector(`#past-present-future .tarot-card[data-index="${index}"]`)
    );
    
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
    
    // Create and animate floating cards one by one
    animateCardToMagicCircle(selectedCardElements[0], pastCard, pastReversed, 0, () => {
        animateCardToMagicCircle(selectedCardElements[1], presentCard, presentReversed, 1000, () => {
            animateCardToMagicCircle(selectedCardElements[2], futureCard, futureReversed, 1000, () => {
                // After all cards are animated, slow down and stop the magic circle
                setTimeout(() => {
                    magicCircle.style.animation = 'slowRotateStop 3s forwards';
                    
                    // After magic circle stops, show the result
                    setTimeout(() => {
                        // Hide the magic circle and remove any floating cards
                        magicCircleContainer.classList.remove('active');
                        magicCircleContainer.querySelectorAll('.floating-card').forEach(card => card.remove());
                        magicCircle.style.animation = 'rotateCircle 10s linear infinite';
                        
                        // Create the PPT result container
                        const resultContainer = document.querySelector('.result-container');
                        resultContainer.innerHTML = '';
                        
                        const pptResult = document.createElement('div');
                        pptResult.className = 'ppt-result';
                        
                        // Past card
                        const pastCardElement = createPPTCardElement(
                            pastCard,
