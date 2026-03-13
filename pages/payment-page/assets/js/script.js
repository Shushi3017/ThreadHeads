let currentStep = 1;
        let checkoutData = { payment: '', name: '', email: '', phone: '', address: '', city: '' };

        window.onload = () => {
            const container = document.getElementById('formContainer');
            setTimeout(() => { container.classList.add('opacity-100'); }, 100);

            const phoneInput = document.getElementById('custPhone');
            const phoneWrapper = document.getElementById('phoneWrapper');
            const phoneError = document.getElementById('phoneError');

            phoneInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = val;

                if (val.length >= 10 || val === "") {
                    phoneWrapper.classList.replace('border-red-500', 'border-gray-300');
                    phoneError.classList.add('hidden');
                } else {
                    phoneWrapper.classList.replace('border-gray-300', 'border-red-500');
                    phoneError.classList.remove('hidden');
                }
            });

            document.getElementById('customerForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                checkoutData.name = fd.get('custName');
                checkoutData.email = fd.get('custEmail');
                checkoutData.phone = fd.get('custPhone');
                nextStep(2);
            });

            document.getElementById('deliveryForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                checkoutData.address = fd.get('address');
                checkoutData.city = fd.get('city');

                const btn = document.getElementById('finalSubmitBtn');
                btn.disabled = true;
                btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;

                setTimeout(() => nextStep(3), 1200);
            });
        };

        function updateStepper(step) {
            const progress = document.getElementById('progressLine');
            progress.style.width = ((step - 1) / 3 * 100) + '%';

            for (let i = 1; i <= 4; i++) {
                const node = document.getElementById(`step${i}Node`).querySelector('.step-circle');
                if (i < step) {
                    node.className = "step-circle w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm ring-4 ring-white";
                    node.innerHTML = "✓";
                } else if (i === step) {
                    node.className = "step-circle w-10 h-10 rounded-full bg-white border-2 border-black text-black flex items-center justify-center font-bold text-sm ring-4 ring-white";
                    node.innerHTML = i;
                } else {
                    node.className = "step-circle w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white transition-all";
                    node.innerHTML = i;
                }
            }
        }

        function nextStep(current, data = null) {
            if (data) checkoutData = { ...checkoutData, ...data };

            const currentView = document.getElementById(`view${current}`);
            const nextView = document.getElementById(`view${current + 1}`);

            if (current === 1) document.getElementById('selectedPayBadge').textContent = checkoutData.payment;
            if (current === 3) {
                document.getElementById('finalPayment').textContent = checkoutData.payment;
                document.getElementById('resName').textContent = checkoutData.name;
                document.getElementById('resPhone').textContent = `+63 ${checkoutData.phone}`;
                document.getElementById('resAddress').textContent = `${checkoutData.address}, ${checkoutData.city}`;
            }

            currentView.classList.replace('active-view', 'hidden-view');
            setTimeout(() => {
                currentView.style.display = 'none';
                nextView.style.display = 'block';
                setTimeout(() => {
                    nextView.classList.replace('hidden-view', 'active-view');
                }, 50);
            }, 400);

            currentStep++;
            updateStepper(currentStep);
        }

        function prevStep(current) {
            const currentView = document.getElementById(`view${current}`);
            const prevView = document.getElementById(`view${current - 1}`);

            currentView.classList.replace('active-view', 'hidden-view');
            setTimeout(() => {
                currentView.style.display = 'none';
                prevView.style.display = 'block';
                setTimeout(() => {
                    prevView.classList.replace('hidden-view', 'active-view');
                }, 50);
            }, 400);

            currentStep--;
            updateStepper(currentStep);
        }