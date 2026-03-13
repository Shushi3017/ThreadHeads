



// Shared Toggle Password Logic
        function togglePass(inputId, pathId, slashId) {
            const input = document.getElementById(inputId);
            const path = document.getElementById(pathId);
            const slash = document.getElementById(slashId);
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';

            const openPath = "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z";
            const closedPath = "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24";

            if (isPassword) {
                path.setAttribute('d', openPath);
                slash.classList.add('hidden');
            } else {
                path.setAttribute('d', closedPath);
                slash.classList.remove('hidden');
            }
        }

        // Logic: Store and Auth
        const getUsers = () => JSON.parse(localStorage.getItem('app_users') || '[]');

        // Registration Logic
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newUser = {
                first: document.getElementById('regFirst').value,
                last: document.getElementById('regLast').value,
                email: document.getElementById('regEmail').value,
                pass: document.getElementById('regPass').value
            };
            const users = getUsers();
const emailExists = users.some(user => user.email === newUser.email);

            if (emailExists) {
                alert("Email already registered. Please use a different email.");
                return;
            }

            users.push(newUser);
            localStorage.setItem('app_users', JSON.stringify(users));

            // Success animation or feedback
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerText = "Registered!";
            setTimeout(() => {
                btn.innerText = "Join Us!";
                window.location.href = "/ThreadHeads/pages/Login/index.html"; 
            
            }, 2000);
        });

        // Login Logic
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value || "daryldixon@gmail.com";
            const pass = document.getElementById('loginPassword').value;
            const errorMsg = document.getElementById('loginError');

            const users = getUsers();
            // Check against registered users OR the default placeholder
            const found = users.find(u => u.email === email && u.pass === pass) ||
                (email === "daryldixon@gmail.com" && pass === "password123");

            if (found) {
                const btn = e.target.querySelector('button[type="submit"]');
                btn.innerText = "Welcome back...";
                errorMsg.classList.add('hidden');
            } else {
                errorMsg.classList.remove('hidden');
                errorMsg.classList.add('animate-bounce');
                setTimeout(() => errorMsg.classList.remove('animate-bounce'), 1000);
            }
        });

        // Clear error when typing
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                document.getElementById('loginError').classList.add('hidden');
            });
        });