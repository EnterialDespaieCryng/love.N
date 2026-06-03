document.addEventListener('DOMContentLoaded', function() {

    // === 1. НАСТРОЙКА ДАТЫ ОТНОШЕНИЙ ===
    // 16 декабря 2025 года (в JS месяцы идут с 0, поэтому 11 — это декабрь)
    var relationshipStartDate = new Date(2025, 11, 16, 0, 0, 0); 

    var daysEl = document.getElementById('days');
    var hoursEl = document.getElementById('hours');
    var minutesEl = document.getElementById('minutes');
    var secondsEl = document.getElementById('seconds');

    // Функция для правильного склонения слова "день/дня/дней"
    function getDaysWord(number) {
        var n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return 'дней';
        }
        n %= 10;
        if (n === 1) {
            return 'день';
        }
        if (n >= 2 && n <= 4) {
            return 'дня';
        }
        return 'дней';
    }

    // Вспомогательная функция для расчета прошедших дней
    function getDaysPassed() {
        var now = new Date();
        var difference = now - relationshipStartDate; 
        return Math.floor(difference / (1000 * 60 * 60 * 24));
    }

    function updateLoveTimer() {
        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        var now = new Date();
        var difference = now - relationshipStartDate; 

        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;
    }

    if (daysEl) {
        updateLoveTimer();
        setInterval(updateLoveTimer, 1000);
    }


    // === 2. ПАДАЮЩИЕ СИМВОЛЫ ===
    var heartsContainer = document.getElementById('hearts-container');
    var symbols = ['❤️', '🌸', '💖', '✨', '🌹', '💕'];

    function createFallingSymbol() {
        if (!heartsContainer) return;

        var particle = document.createElement('span');
        particle.classList.add('heart-particle');
        
        particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        var randomX = Math.random() * 100; 
        var randomDelay = Math.random() * 5; 
        var randomDuration = 5 + Math.random() * 5; 
        var randomSize = 14 + Math.random() * 16;
        particle.style.left = randomX + 'vw';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.fontSize = randomSize + 'px';

        heartsContainer.appendChild(particle);

        setTimeout(function() {
            particle.remove();
        }, (randomDuration + randomDelay) * 1000);
    }

    if (heartsContainer) {
        setInterval(createFallingSymbol, 500);
    }


    // === 3. ДИНАМИЧЕСКИЕ ЗАПИСКИ ДЛЯ ЛАПКИ ===
    var noteBtn = document.getElementById('next-note-btn');
    var noteText = document.getElementById('note-text');

    // Массив записок. Внутри одной из них мы оставили метку {DYNAMICS_DAYS}
        var loveNotes = [
        "Настя, ты — самое прекрасное, что случилось со мной в жизни. 💖",
        "Каждая минута рядом с тобой наполнена невероятным теплом и уютом. ☀️",
        "Мне безумно нравится твоя улыбка, твой смех и твои невероятные глаза. 🥰",
        "С тобой я чувствую себя самым счастливым парнем на свете, Лапка. 🌹",
        "Я готов быть рядом с тобой сквозь любые невзгоды и всегда держать тебя за руку. ❤️",
        "Ты — моя маленькая вселенная, моё вдохновение и моя радость! ✨",
        "Сегодня уже {DYNAMICS_DAYS}, как ты делаешь мою жизнь по-настоящему особенной. Поздравляю нас, Лапка! 💕",
        "Если бы за каждую мысль о тебе мне давали по цветочку, наш сайт уже превратился бы в огромный цветущий сад! 🌸🌿",
        "Ты греешь моё сердце даже тогда, когда мы не рядом. Моя самая любимая Лапка. 🐾❤️",
        "Когда я обнимаю тебя, весь мир вокруг затихает. Ты — мой самый уютный и безопасный причал. 🧸💞",
        "Просто хочу напомнить тебе, что ты невероятно ценная, важная и уникальная. Береги себя, моя хорошая. 😘",
        "Кажется, звёзды на небе светят только для того, чтобы соперничать с блеском твоих глаз. Но они всё равно проигрывают. ✨👁️",
        "Я безумно благодарен судьбе за тот день, когда мы встретились. Ты — моё лучшее приключение. 🔐❤️",
        "Моё сердце бьётся чуточку быстрее каждый раз, когда на экране телефона высвечивается сообщение от тебя. 📱💓",
        "Засыпать и просыпаться с мыслями о тебе — моя самая любимая и приятная привычка. Сладких снов или отличного дня, Лапка! 🎀"
    ];


    var currentNoteIndex = -1;

    if (noteBtn && noteText) {
        noteBtn.addEventListener('click', function() {
            noteText.style.opacity = 0;

            setTimeout(function() {
                var nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * loveNotes.length);
                } while (nextIndex === currentNoteIndex);

                currentNoteIndex = nextIndex;
                
                // Берем текст записки
                var rawNote = loveNotes[currentNoteIndex];
                
                // Если в записке есть метка {DYNAMICS_DAYS}, заменяем её на реальное число и правильное слово
                if (rawNote.indexOf('{DYNAMICS_DAYS}') !== -1) {
                    var totalDays = getDaysPassed();
                    var daysString = totalDays + ' ' + getDaysWord(totalDays);
                    rawNote = rawNote.replace('{DYNAMICS_DAYS}', daysString);
                }

                noteText.innerText = rawNote;
                noteText.style.opacity = 1;

                // Красивый взрыв сердечек
                for(var i = 0; i < 10; i++) {
                    createFallingSymbol();
                }
            }, 300);
        });
    }
});
    // === 4. АВТОМАТИЧЕСКОЕ ПОЗДРАВЛЕНИЕ НА ПОЛГОДА ===
    var anniversaryModal = document.getElementById('anniversary-modal');
    var closeAnniversary = document.getElementById('close-anniversary');
    var modalCelebrateBtn = document.getElementById('modal-celebrate-btn');

    // Проверяем дату: полгода будет ровно 16 июня 2026 года
    // (Месяц 5 в JS — это июнь, так как отсчет с нуля)
    var now = new Date();
    var isAnniversaryDay = (now.getFullYear() === 2026 && now.getMonth() === 5 && now.getDate() === 16);

    // ВРЕМЕННЫЙ ТЕСТ: Если хочешь проверить как работает прямо сейчас, не дожидаясь 16 июня,
    // раскомментируй строчку ниже (удали два слэша в начале):
    //isAnniversaryDay = true; 

    if (isAnniversaryDay && anniversaryModal) {
        // Показываем окно через 1.5 секунды после загрузки сайта для красивого эффекта
        setTimeout(function() {
            anniversaryModal.style.display = 'flex';
            setTimeout(function() {
                anniversaryModal.classList.add('show');
            }, 50);

            // Устраиваем праздничный дождь из сердечек!
            var burstInterval = setInterval(createFallingSymbol, 150);
            setTimeout(function() {
                clearInterval(burstInterval);
            }, 3000);
        }, 1500);
    }

    function hideModal() {
        if (!anniversaryModal) return;
        anniversaryModal.classList.remove('show');
        setTimeout(function() {
            anniversaryModal.style.display = 'none';
        }, 500);
    }

    if (closeAnniversary) {
        closeAnniversary.addEventListener('click', hideModal);
    }
    
    if (modalCelebrateBtn) {
        modalCelebrateBtn.addEventListener('click', function() {
            hideModal();
            // Взрыв сердечек при закрытии праздничного окна
            var burstInterval = setInterval(createFallingSymbol, 80);
            setTimeout(function() {
                clearInterval(burstInterval);
            }, 2000);
        });
    }
