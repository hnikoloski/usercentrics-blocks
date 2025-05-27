/**
 * Frontend JavaScript for FAQ block
 * Implements WCAG 2.1 accessibility standards
 */
document.addEventListener('DOMContentLoaded', function () {
    const faqContainers = document.querySelectorAll('.usercentrics-faq__container');

    faqContainers.forEach(container => {
        const allowMultiple = container.getAttribute('data-allow-multiple') === 'true';
        const faqToggles = container.querySelectorAll('[data-faq-toggle]');

        // Add keyboard navigation support
        faqToggles.forEach((toggle, index) => {
            // Ensure proper ARIA attributes
            const faqItem = toggle.closest('[data-faq-item]');
            const answer = faqItem.querySelector('.usercentrics-faq__answer');
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            // Set up proper ARIA relationships
            toggle.setAttribute('id', questionId);
            toggle.setAttribute('aria-controls', answerId);
            answer.setAttribute('id', answerId);
            answer.setAttribute('aria-labelledby', questionId);

            // Click handler
            toggle.addEventListener('click', function () {
                handleToggle(toggle, answer, faqToggles, allowMultiple);
            });

            // Keyboard navigation (Enter and Space)
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle(toggle, answer, faqToggles, allowMultiple);
                }

                // Arrow key navigation between FAQ items
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextToggle = faqToggles[index + 1];
                    if (nextToggle) nextToggle.focus();
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevToggle = faqToggles[index - 1];
                    if (prevToggle) prevToggle.focus();
                }

                // Home/End navigation
                if (e.key === 'Home') {
                    e.preventDefault();
                    faqToggles[0].focus();
                }

                if (e.key === 'End') {
                    e.preventDefault();
                    faqToggles[faqToggles.length - 1].focus();
                }
            });
        });
    });

    /**
     * Handle FAQ toggle with accessibility considerations
     */
    function handleToggle(toggle, answer, allToggles, allowMultiple) {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Toggle current item
        toggle.setAttribute('aria-expanded', !isExpanded);
        answer.hidden = isExpanded;

        // Announce state change to screen readers
        const announcement = !isExpanded ? 'expanded' : 'collapsed';
        announceToScreenReader(`FAQ item ${announcement}`);

        // If not allowing multiple open items, close others
        if (!allowMultiple && !isExpanded) {
            allToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherFaqItem = otherToggle.closest('[data-faq-item]');
                    const otherAnswer = otherFaqItem.querySelector('.usercentrics-faq__answer');

                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherAnswer.hidden = true;
                    otherToggle.classList.remove('is-expanded');
                }
            });
        }

        // Update visual state
        if (!isExpanded) {
            toggle.classList.add('is-expanded');
        } else {
            toggle.classList.remove('is-expanded');
        }
    }

    /**
     * Announce changes to screen readers
     */
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}); 