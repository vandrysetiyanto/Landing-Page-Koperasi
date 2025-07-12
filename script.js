document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current answer
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });

    // Language Switcher
    const langElements = document.querySelectorAll('[data-lang-id], [data-lang-en], [data-lang-placeholder-id], [data-lang-placeholder-en]');
    const langIdButton = document.getElementById('lang-id');
    const langEnButton = document.getElementById('lang-en');

    // Function to set language
    window.setLanguage = function(lang) {
        langElements.forEach(el => {
            if (lang === 'id') {
                if (el.dataset.langId) {
                    el.textContent = el.dataset.langId;
                }
                if (el.dataset.langPlaceholderId && el.tagName === 'INPUT') {
                    el.placeholder = el.dataset.langPlaceholderId;
                }
            } else { // lang === 'en'
                if (el.dataset.langEn) {
                    el.textContent = el.dataset.langEn;
                }
                if (el.dataset.langPlaceholderEn && el.tagName === 'INPUT') {
                    el.placeholder = el.dataset.langPlaceholderEn;
                }
            }
        });

        // Update active class for buttons
        if (lang === 'id') {
            langIdButton.classList.add('lang-active');
            langEnButton.classList.remove('lang-active');
            document.documentElement.lang = 'id';
        } else {
            langIdButton.classList.remove('lang-active');
            langEnButton.classList.add('lang-active');
            document.documentElement.lang = 'en';
        }

        // Store preference in localStorage
        localStorage.setItem('koperasiDigitalLang', lang);
    }

    // Load saved language preference or default to Indonesian
    const savedLang = localStorage.getItem('koperasiDigitalLang') || 'id';
    setLanguage(savedLang);
});