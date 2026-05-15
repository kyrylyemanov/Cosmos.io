document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Перемикання вкладок
    const switchTab = (activeTab, inactiveTab, showForm, hideForm) => {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        showForm.classList.remove('hidden');
        hideForm.classList.add('hidden');
        // Очищаємо помилки при переході
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('input').forEach(el => el.classList.remove('input-error'));
    };

    tabLogin.addEventListener('click', () => switchTab(tabLogin, tabRegister, formLogin, formRegister));
    tabRegister.addEventListener('click', () => switchTab(tabRegister, tabLogin, formRegister, formLogin));

    // Функція валідації
    const validateForm = (form) => {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            const errorContainer = input.parentElement.querySelector('.error-message');
            
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('input-error');
                errorContainer.textContent = 'Будь ласка, заповніть це поле';
                errorContainer.classList.add('show');
            } else {
                input.classList.remove('input-error');
                errorContainer.classList.remove('show');
            }

            // Прибираємо помилку, коли користувач починає вводити текст
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                errorContainer.classList.remove('show');
            });
        });

        return isValid;
    };

    // Обробка відправки
    [formLogin, formRegister].forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                alert('Успішно! Космос чекає на вас.');
            }
        });
    });
});