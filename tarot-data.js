// Tarot card interpretations data
const tarotInterpretationsData = {
    "tarot_interpretations": [
        {
            "fortune_telling": [
                "Watch for new projects and new beginnings", 
                "Prepare to take something on faith", 
                "Something new comes your way; go for it"
            ], 
            "keywords": [
                "freedom", 
                "faith", 
                "inexperience", 
                "innocence"
            ], 
            "meanings": {
                "light": [
                    "Freeing yourself from limitation", 
                    "Expressing joy and youthful vigor", 
                    "Being open-minded", 
                    "Taking a leap of faith", 
                    "Attuning yourself to your instincts", 
                    "Being eager or curious", 
                    "Exploring your potential", 
                    "Embracing innovation and change"
                ], 
                "shadow": [
                    "Being gullible and naive", 
                    "Taking unnecessary risks", 
                    "Failing to be serious when required", 
                    "Being silly or distracted", 
                    "Lacking experience", 
                    "Failing to honor well-established traditions and limits", 
                    "Behaving inappropriately"
                ]
            }, 
            "name": "The Fool", 
            "rank": 0, 
            "suit": "major"
        }, 
        {
            "fortune_telling": [
                "A powerful man may play a role in your day", 
                "Your current situation must be seen as one element of a much larger plan"
            ], 
            "keywords": [
                "capability", 
                "empowerment", 
                "activity"
            ], 
            "meanings": {
                "light": [
                    "Taking appropriate action", 
                    "Receiving guidance from a higher power", 
                    "Becoming a channel of divine will", 
                    "Expressing masculine energy in appropriate and constructive ways", 
                    "Being yourself in every way"
                ], 
                "shadow": [
                    "Inflating your own ego", 
                    "Abusing talents", 
                    "Manipulating or deceiving others", 
                    "Being too aggressive", 
                    "Using cheap illusions to dazzle others", 
                    "Refusing to invest the time and effort needed to master your craft", 
                    "Taking shortcuts"
                ]
            }, 
            "name": "The Magician", 
            "rank": 1, 
            "suit": "major"
        }, 
        {
            "fortune_telling": [
                "A mysterious woman arrives", 
                "A sexual secret may surface", 
                "Someone knows more than he or she will reveal"
            ], 
            "keywords": [
                "intuition", 
                "reflection", 
                "purity", 
                "initiation"
            ], 
            "meanings": {
                "light": [
                    "Listening to your feelings and intuitions", 
                    "Exploring unconventional spirituality", 
                    "Keeping secrets", 
                    "Being receptive", 
                    "Reflecting instead of acting", 
                    "Observing others", 
                    "Preserving purity"
                ], 
                "shadow": [
                    "Being aloof", 
                    "Obsessing on secrets and conspiracies", 
                    "Rejecting guidance from spirit or intuition", 
                    "Revealing all", 
                    "Ignoring gut feelings", 
                    "Refusing to become involved, even when involvement is appropriate"
                ]
            }, 
            "name": "The High Priestess", 
            "rank": 2, 
            "suit": "major"
        }, 
        {
            "fortune_telling": [
                "Pregnancy is in the cards", 
                "An opportunity to be involved in luxurious sexuality is coming", 
                "Beware a tendency toward addiction"
            ], 
            "keywords": [
                "fertility", 
                "productivity", 
                "ripeness", 
                "nurturing"
            ], 
            "meanings": {
                "light": [
                    "Nurturing yourself and others", 
                    "Bearing fruit", 
                    "Celebrating your body", 
                    "Bearing (literal or figurative) children", 
                    "Reveling in luxury", 
                    "Mothering those around you in positive ways", 
                    "Enjoying your sexuality", 
                    "Getting things done"
                ], 
                "shadow": [
                    "Overindulging", 
                    "Being greedy", 
                    "Smothering someone with attention", 
                    "Debilitating someone by being overprotective", 
                    "Inhibiting productivity by obsessing on productivity", 
                    "Being overcome by addictive behavior"
                ]
            }, 
            "name": "The Empress", 
            "rank": 3, 
            "suit": "major"
        }, 
        {
            "fortune_telling": [
                "A father figure arrives", 
                "A new employer or authority figure will give you orders", 
                "Expect discipline or correction in the near future"
            ], 
            "keywords": [
                "authority", 
                "regulation", 
                "direction", 
                "structure"
            ], 
            "meanings": {
                "light": [
                    "Exercising authority", 
                    "Defining limits", 
                    "Directing the flow of work", 
                    "Communicating clear guidelines", 
                    "Being in control of yourself and others", 
                    "Tempering aggressive masculinity with wisdom and experience"
                ], 
                "shadow": [
                    "Micromanaging", 
                    "Crushing the creativity of others with a rigid, iron-fisted approach", 
                    "Insisting on getting your own way", 
                    "Assuming a dictatorial mindset", 
                    "Using overt force to achieve your goals and maintain order"
                ]
            }, 
            "name": "The Emperor", 
            "rank": 4, 
            "suit": "major"
        },
        {
            "fortune_telling": [
                "Victory is a certainty", 
                "Move ahead with all plans", 
                "Beware the jealousy of others"
            ], 
            "keywords": [
                "advancement", 
                "victory", 
                "triumph", 
                "success"
            ], 
            "meanings": {
                "light": [
                    "Breaking through barriers", 
                    "Moving forward with confidence and authority", 
                    "Reaching the pinnacle of success", 
                    "Basking in the glory of achievement", 
                    "Guiding an effort to total victory", 
                    "Establishing yourself as a worthy leader"
                ], 
                "shadow": [
                    "Resting on laurels", 
                    "Riding roughshod over the feelings or expectations of others", 
                    "Focusing more on past successes than future opportunities", 
                    "Failing to rein in impulsive behavior"
                ]
            }, 
            "name": "The Chariot", 
            "rank": 7, 
            "suit": "major"
        },
        {
            "fortune_telling": [
                "Everything's coming up roses (or sunflowers, whatever the case may be)", 
                "Whatever's on your mind, go for it because you can't lose today"
            ], 
            "keywords": [
                "joy", 
                "brilliance", 
                "validation", 
                "attention", 
                "energy"
            ], 
            "meanings": {
                "light": [
                    "Seeing things clearly", 
                    "Experiencing intense joy", 
                    "Celebrating your own successes", 
                    "Knowing you're good at what you do", 
                    "Gaining recognition for your personal genius"
                ], 
                "shadow": [
                    "Being dazzled by your own accomplishments", 
                    "Becoming absorbed in your own self-image", 
                    "Feeling rushed and distracted", 
                    "Exerting yourself to the point of exhaustion", 
                    "Overstating your abilities or misrepresenting your achievements"
                ]
            }, 
            "name": "The Sun", 
            "rank": 19, 
            "suit": "major"
        },
        {
            "fortune_telling": [
                "Winning the lottery", 
                "Getting your heart's desire", 
                "Having everything you ever imagined having"
            ], 
            "keywords": [
                "wholeness", 
                "integration", 
                "totality", 
                "completeness", 
                "fullness"
            ], 
            "meanings": {
                "light": [
                    "Having it all", 
                    "Knowing and loving yourself as completely as possible", 
                    "Seeing the interconnection of all things and people", 
                    "Enhancing your perspective", 
                    "Living life to its fullest", 
                    "Understanding the meaning of life"
                ], 
                "shadow": [
                    "Allowing greed and envy to prevent you from enjoying what you do possess", 
                    "Failing to see the larger design in ordinary events", 
                    "Believing that everything that exists can be touched, counted, or measured", 
                    "Failing to see the divine reflected in those around you"
                ]
            }, 
            "name": "The World", 
            "rank": 21, 
            "suit": "major"
        },
        {
            "fortune_telling": [
                "Someone has the \"hots\" for you", 
                "A new job offer is coming your way", 
                "Walk softly, and carry a big stick"
            ], 
            "keywords": [
                "desire", 
                "inspiration", 
                "vision", 
                "creation", 
                "invention"
            ], 
            "meanings": {
                "light": [
                    "Being inspired", 
                    "Identifying an important goal", 
                    "Being given the opportunity to do whatever you want to do", 
                    "Giving or receiving direction", 
                    "Seeing a solution", 
                    "Creating something new", 
                    "Being aroused, sexually or creatively"
                ], 
                "shadow": [
                    "Failing to take advantage of a great opportunity", 
                    "Being ineffectual or lazy", 
                    "Making an inadequate effort", 
                    "Working toward a goal, but lacking the resources or initiative to achieve success", 
                    "Setting inappropriate goals", 
                    "Failing to take a stand"
                ]
            }, 
            "name": "ace of wands", 
            "rank": 1, 
            "suit": "wands"
        },
        {
            "fortune_telling": [
                "Romance is in the cards",
                "A new relationship or marriage is just around the corner", 
                "Prayers are answered"
            ], 
            "keywords": [
                "intuition", 
                "spirituality", 
                "affection", 
                "motivation"
            ], 
            "meanings": {
                "light": [
                    "Trusting your feelings", 
                    "Opening yourself to spirit", 
                    "Accepting and returning affection", 
                    "Getting in touch with what motivates you", 
                    "Taking advantage of an opportunity to express love to others", 
                    "Listening to the still, small voice"
                ], 
                "shadow": [
                    "Hiding your feelings", 
                    "Spurning an opportunity to love or be loved", 
                    "Numbing yourself to spiritual yearnings", 
                    "Rejecting the counsel of your heart", 
                    "Becoming a puppet of your own emotions", 
                    "Indulging in hysteria or obsession"
                ]
            }, 
            "name": "ace of cups", 
            "rank": 1, 
            "suit": "cups"
        }
    ]
};
