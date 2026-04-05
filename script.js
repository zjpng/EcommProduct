document.addEventListener('DOMContentLoaded', () => {

    // Product definitions mapping to their IDs
    const products = {
        'setA': { price: 99.00, qty: 0, name: 'Radiansome 100 Ritual Kit' },
        'setB': { price: 488.00, qty: 0, name: 'Expert RIMAN Ritual' }
    };

    // Product Data for Modals
    const productDetails = {
        'setA': {
            title: 'Set A: Radiansome 100 Ritual Experience Kit',
            images: [
                './asset/riman/seta_new1.png',
                './asset/riman/seta_new2.png',
                './asset/riman/SetA.jpg',
                './asset/riman/setA.webp'
            ],
            youtubeId: 'X8tspAXYESI',
            markdownHTML: `
                <div class="markdown-body">
                    <p>The Radiansome 100 Ritual Experience Kit is a comprehensive 5-piece travel-sized skincare set from the Advanced Radiansome line. It is designed to deliver radiant, healthy skin with maximum benefits, using "Microfluidizer" technology to create tiny particles that sink deep into the skin.</p>
                    
                    <h3>Included Items & Benefits</h3>
                    <ul>
                        <li><strong>Active Clean-Up Powder:</strong> A gentle powder-to-foam cleanser that exfoliates and deep cleanses.</li>
                        <li><strong>Radiansome™ 100 Essential Toner:</strong> A hydrating foundation that instantly strengthens the skin barrier.</li>
                        <li><strong>Radiansome™ 100 Ampoule:</strong> A concentrated "rescue" treatment boosting glow and elasticity.</li>
                        <li><strong>Radiansome™ 100 Cream:</strong> Locks in hydration with a silky texture for a "glass skin" finish.</li>
                        <li><strong>Vieton Oil Mist:</strong> A dual-phase mist that soothes parched skin and offers a luminous glow.</li>
                    </ul>

                    <h3>Core Advantages</h3>
                    <ul>
                        <li>100% natural ingredients, sustainably sourced from Jeju Island.</li>
                        <li>Microfluidizer Technology ensures enhanced, fast-acting absorption.</li>
                        <li>Cruelty-free formulation.</li>
                    </ul>
                </div>
            `
        },
        'setB': {
            title: 'Set B: Expert RIMAN Ritual (8 Items)',
            images: [
                './asset/riman/setB.jpg',
                './asset/riman/setB_2.jpg',
                './asset/riman/setB_3.jpg',
                './asset/riman/setB_4.jpg'
            ],
            youtubeId: 'AvPYocYsxYg',
            markdownHTML: `
                <div class="markdown-body">
                    <p>The Expert RIMAN Ritual is the complete INCELLDERM 8-piece collection, crafted to hydrate, lift, firm, and protect while aggressively combating visible signs of aging. Formulated with Jeju Lava Energy Water, Giant ByungPool Centella Asiatica, and 24K gold.</p>

                    <h3>All 8 Items in the Set</h3>
                    <ul>
                        <li><strong>ICD Dermatology Cream:</strong> A density-lifting cream that supports firm, resilient skin. Infused with deep hydration for moisture elasticity and a radiant, healthy glow.</li>
                        <li><strong>ICD Dermatology First Package:</strong> The core 2-step duo — a hydrating Booster serum that layers dewy hydration, and a glow Serum that restores moisture balance and firms skin.</li>
                        <li><strong>ICD Calming Balance Gel:</strong> A soothing gel with Damask rose flower water that revitalizes dry skin. Formulated with 99.99% pure 24K gold to maintain balanced hydration.</li>
                        <li><strong>ICD Two-Phase Oil Mist:</strong> A rich mist combining moisturizing oils and vitamins. The perfect oil-water blend instantly hydrates while boosting natural radiance.</li>
                        <li><strong>ICD Cleansing Powder Wash:</strong> A plant-derived powder cleanser with papain enzyme that gently exfoliates dead skin cells, leaving clear, refined skin.</li>
                        <li><strong>ICD Moisture Cleansing Oil:</strong> A gentle oil cleanser with 76% plant-derived oils that melts away makeup and impurities without irritation.</li>
                        <li><strong>ICD Multi Stick Balm:</strong> A multi-use hydrating stick with camellia seed oil that minimizes fine lines and delivers a luxurious, dewy glow.</li>
                        <li><strong>ICD Daily Aqua BB Cream:</strong> A skincare-infused BB cream with buildable, dewy coverage that evens skin tone without caking — the K-beauty "glass skin" finish.</li>
                    </ul>

                    <h3>Core Ingredients & Technology</h3>
                    <ul>
                        <li><strong>Jeju Lava Energy Water:</strong> Water filtered through volcanic bedrock, rich in rare natural minerals.</li>
                        <li><strong>Giant ByungPool (Centella Asiatica):</strong> Sourced from Jeju Island for exceptional moisturizing and antioxidant effects.</li>
                        <li><strong>24K Gold (in Balance Gel):</strong> Revitalizes and brightens damaged skin.</li>
                        <li><strong>Papain Enzyme:</strong> Plant-derived gentle exfoliation for clear skin tone.</li>
                        <li><strong>Camellia Seed Oil:</strong> Deep nourishment and luxury hydration.</li>
                    </ul>
                </div>
            `
        }
    };

    // UI Elements
    const cartSummary = document.getElementById('cart-summary');
    const totalText = document.getElementById('total-text').querySelector('strong');
    const modalTotal = document.getElementById('modal-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const productModal = document.getElementById('product-modal');
    const productModalBody = document.getElementById('product-modal-body');

    const closeModalBtns = document.querySelectorAll('.close-modal');
    const googleFormBtn = document.getElementById('google-form-btn'); 

    // Base URL of the google form
    const baseFormUrl = 'https://forms.gle/YUM5S5cd6CSrTLUE8';

    function updateCart() {
        let total = 0;
        let totalItems = 0;
        let summaryParams = [];

        for (const [id, prod] of Object.entries(products)) {
            total += prod.price * prod.qty;
            totalItems += prod.qty;

            const card = document.querySelector(`.product-card[data-id="${id}"]`);
            if (card) {
                card.querySelector('.qty-display').textContent = prod.qty;
            }

            if (prod.qty > 0) {
                summaryParams.push(`${prod.qty}x ${prod.name}`);
            }
        }

        const formattedTotal = `$${total.toFixed(2)}`;
        totalText.textContent = formattedTotal;
        modalTotal.textContent = formattedTotal;

        if (totalItems > 0) {
            cartSummary.classList.add('visible');
        } else {
            cartSummary.classList.remove('visible');
        }

        googleFormBtn.href = baseFormUrl;
    }

    // Attach Event Listeners to Product Cards (For Details Modal AND Cart Quantities)
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.getAttribute('data-id');
        const btnInc = card.querySelector('.increment');
        const btnDec = card.querySelector('.decrement');

        // Quantity Handlers
        btnInc.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            products[id].qty++;
            updateCart();
        });

        btnDec.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent opening modal
            if (products[id].qty > 0) {
                products[id].qty--;
                updateCart();
            }
        });

        // Open Product Details Modal
        card.addEventListener('click', () => {
            const data = productDetails[id];
            
            // Build Images Carousel HTML
            let imagesHTML = '';
            data.images.forEach(img => {
                imagesHTML += `<img src="${img}" alt="Product Image">`;
            });

            // Optional YouTube Embed HTML (Fallback Link to solve Error 153)
            let youtubeHTML = '';
            if (data.youtubeId) {
                youtubeHTML = `
                    <div class="youtube-fallback-container" style="margin-top: 20px; text-align: center;">
                        <a href="https://www.youtube.com/watch?v=${data.youtubeId}" target="_blank" style="display: block; position: relative;">
                            <img src="https://img.youtube.com/vi/${data.youtubeId}/maxresdefault.jpg" alt="Watch Video Tutorial" style="width: 100%; border-radius: var(--border-radius); box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: white; padding: 15px 30px; border-radius: 40px; font-weight: bold; font-size: 1.1rem;">
                                ▶ Watch on YouTube
                            </div>
                        </a>
                        <p style="margin-top: 10px; font-size: 0.85rem; color: var(--text-light);">Click above to view the official routine without playback restrictions.</p>
                    </div>
                `;
            }

            // Inject Content
            productModalBody.innerHTML = `
                <div class="product-details-container">
                    <h2>${data.title}</h2>
                    <div class="carousel">
                        ${imagesHTML}
                    </div>
                    ${data.markdownHTML}
                    ${youtubeHTML}
                </div>
            `;

            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Modal behavior for Checkout
    checkoutBtn.addEventListener('click', () => {
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    // Close Modals Logic
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Figure out which modal to close by traversing up
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                
                // If closing product modal, empty it to stop youtube playback
                if (modal.id === 'product-modal') {
                    productModalBody.innerHTML = '';
                }
            }
            
            // Re-check if any other active modal is open before reverting scroll
            if (!document.querySelector('.modal-overlay.active')) {
                document.body.style.overflow = '';
            }
        });
    });

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                if (overlay.id === 'product-modal') {
                    productModalBody.innerHTML = '';
                }

                if (!document.querySelector('.modal-overlay.active')) {
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });

            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
});
