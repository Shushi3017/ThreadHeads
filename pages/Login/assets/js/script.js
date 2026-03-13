  const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        const errorMessage = document.getElementById('errorMessage');
        const loginBtn = document.getElementById('loginBtn');
        const togglePassword = document.getElementById('togglePassword');
        const eyePath = document.getElementById('eyePath');
        const eyeSlash = document.getElementById('eyeSlash');

        // SVG Path definitions for toggle
        const openEyePath = "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z";
        const closedEyePath = "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24";

        // Toggle Password Visibility
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            if (isPassword) {
                // Show eye (making password readable)
                eyePath.setAttribute('d', openEyePath);
                eyeSlash.classList.add('hidden');
            } else {
                // Slash eye (hiding password)
                eyePath.setAttribute('d', closedEyePath);
                eyeSlash.classList.remove('hidden');
            }
        });

        // Hide errors when user starts fixing input
        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('input', () => {
                errorMessage.classList.add('hidden');
            });
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;
const users = JSON.parse(localStorage.getItem('app_users')) || [];

const matchedUser = users.find(user =>  user.email === email && user.pass === password);

if  (matchedUser) {
loginBtn.innerText = "Success...";
localStorage.setItem("logged_in_user", JSON.stringify(matchedUser));

setTimeout(() => {
    loginBtn.innerText = "Login";
    window.location.href = "/ThreadHeads/pages/shopPage/index.html";

}, 2000);
}else{
errorMessage.classList.remove('hidden');
errorMessage.classList.add('animate-bounce');
setTimeout(() => {
errorMessage.classList.remove('animate-bounce');
}, 500);
}

        

        });