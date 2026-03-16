  const modal = document.getElementById('signout-modal');

        function toggleModal(show) {
            if (show) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }

        function mockSignOut() {
            // Display a quick message before "signing out"
            const innerContent = modal.querySelector('div');
            innerContent.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">Signing you out...</h2>
                <div class="flex justify-center py-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                </div>
            `;
            setTimeout(() => {
                location.reload();
            }, 1500);
        }

        // Close modal on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggleModal(false);
        });