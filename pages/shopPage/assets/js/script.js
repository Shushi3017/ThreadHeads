

      
      const products = [];
        const types = [
            { cat: 'Hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&h=800&q=80', min: 1500, max: 3500 },
            { cat: 'Bags', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&h=800&q=80', min: 2500, max: 6000 },
            { cat: 'Watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&h=800&q=80', min: 8500, max: 25000 }
        ];

        for (let i = 0; i < 100; i++) {
            const type = types[i % types.length];
            products.push({
                id: i + 1,
                name: `DBTK ${type.cat.toUpperCase()} ${String(Math.floor(i / 3) + 1).padStart(2, '0')}`,
                price: Math.floor(Math.random() * (type.max - type.min + 1)) + type.min,
                category: type.cat,
                image: `${type.img}&sig=${i}`
            });
        }

        let cart = [];
        let selectedProductId = null;

        function renderProducts(items) {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = items.map((p, index) => `
                <div class="group cursor-pointer animate-reveal" onclick="openProduct(${p.id})" style="animation-delay: ${Math.min(index * 0.05, 1)}s">
                    <div class="relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-6 rounded-[32px] transition-all duration-700 group-hover:shadow-2xl">
                        <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                    </div>
                    <div class="px-2">
                        <p class="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-1.5">${p.category}</p>
                        <h3 class="font-black text-sm mb-1 uppercase tracking-tight italic leading-tight">${p.name}</h3>
                        <p class="text-black font-black text-xs">₱${p.price.toLocaleString()}.00</p>
                    </div>
                </div>
            `).join('');
            document.getElementById('itemCount').innerText = `${items.length} ITEMS AVAILABLE`;
        }

        function filterCategory(category) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.cat === category));
            const filtered = category === 'All' ? products : products.filter(p => p.category === category);
            document.getElementById('pageHeading').innerText = category === 'All' ? 'All Items' : category;
            renderProducts(filtered);
            showPage('shop');
        }

        function openProduct(id) {
            selectedProductId = id;
            const product = products.find(p => p.id === id);
            document.getElementById('modalImg').src = product.image;
            document.getElementById('modalTitle').innerText = product.name;
            document.getElementById('modalPrice').innerText = `₱${product.price.toLocaleString()}.00`;

            document.querySelector('input[name="qty"][value="1"]').checked = true;
            document.querySelector('input[name="size"][value="S"]').checked = true;
            toggleOthers(false);

            const modal = document.getElementById('modalOverlay');
            modal.classList.replace('opacity-0', 'opacity-100');
            modal.classList.remove('pointer-events-none');
            document.getElementById('modalContent').classList.replace('translate-y-12', 'translate-y-0');
        }

        function toggleOthers(show) {
            const wrapper = document.getElementById('customQtyWrapper');
            if (show) {
                wrapper.classList.add('active');
                document.getElementById('customQtyInput').focus();
            } else {
                wrapper.classList.remove('active');
            }
        }

        function showPage(page) {
            document.getElementById('shopPage').classList.toggle('hidden', page !== 'shop');
            document.getElementById('cartPage').classList.toggle('hidden', page !== 'cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.getElementById('addToCartBtn').addEventListener('click', () => {
            const product = products.find(p => p.id === selectedProductId);
            const size = document.querySelector('input[name="size"]:checked').value;
            const qtyRadio = document.querySelector('input[name="qty"]:checked').value;
            let qty = parseInt(qtyRadio);

            if (qtyRadio === 'Others') {
                qty = parseInt(document.getElementById('customQtyInput').value) || 1;
            }

            cart.push({ ...product, size, quantity: qty });
            updateCartUI();
            closeProduct();
            showPage('cart');
        });

        function updateCartUI() {
            const list = document.getElementById('cartList');
            const badge = document.getElementById('cartBadge');
            badge.innerText = cart.length;
            badge.classList.toggle('hidden', cart.length === 0);
            document.getElementById('cartCountTitle').innerText = cart.length;

            const subtotal = cart.reduce((acc, p) => acc + (p.price * p.quantity), 0);
            document.getElementById('cartSubtotal').innerText = `₱${subtotal.toLocaleString()}.00`;

            if (cart.length === 0) {
                list.innerHTML = `<div class="py-32 text-center font-black text-zinc-200 uppercase tracking-[0.5em] italic">Your bag is empty</div>`;
                return;
            }

            list.innerHTML = cart.map((p, i) => `
                <div class="flex items-center justify-between py-10 group animate-reveal">
                    <div class="flex items-center gap-8">
                        <div class="w-24 h-32 bg-zinc-50 rounded-2xl overflow-hidden shadow-sm">
                            <img src="${p.image}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h4 class="text-sm font-black uppercase italic tracking-tight">${p.name}</h4>
                            <p class="text-xs font-bold text-zinc-400 mt-1 uppercase">${p.size} / QTY: ${p.quantity}</p>
                            <p class="text-lg font-black mt-2">₱${(p.price * p.quantity).toLocaleString()}</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${i})" class="text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-red-500 transition-colors">Remove</button>
                </div>
            `).join('');
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function closeProduct() {
            const modal = document.getElementById('modalOverlay');
            modal.classList.replace('opacity-100', 'opacity-0');
            modal.classList.add('pointer-events-none');
            document.getElementById('modalContent').classList.replace('translate-y-0', 'translate-y-12');
        }

        function toggleSearch() {
            const o = document.getElementById('searchOverlay');
            const hidden = o.classList.contains('opacity-0');
            if (hidden) {
                o.classList.remove('opacity-0', 'pointer-events-none');
                o.classList.add('opacity-100');
                document.getElementById('searchInput').focus();
            } else {
                o.classList.remove('opacity-100');
                o.classList.add('opacity-0', 'pointer-events-none');
            }
        }

        document.getElementById('profileBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('profileDropdown').classList.toggle('hidden-state');
            document.getElementById('profileDropdown').classList.toggle('visible-state');
        });

        document.getElementById('closeModal').addEventListener('click', closeProduct);
        document.getElementById('cartBtn').addEventListener('click', () => showPage('cart'));

        renderProducts(products);
        const currentUser = JSON.parse(localStorage.getItem('logged_in_user'));
if (currentUser) { 

document.getElementById('userName').textContent = currentUser.first;

}
