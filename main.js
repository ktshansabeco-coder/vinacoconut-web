/**
 * VINACOCONUT - ĐẶC SẢN DỪA VIỆT NAM
 * Vanilla JavaScript ES6+
 * Chức năng:
 * 1. Dữ liệu 6 sản phẩm thực tế với đúng đường dẫn ảnh trong thư mục images/
 * 2. Bộ lọc danh mục sản phẩm (Tất cả, Hũ, Túi, Cookies)
 * 3. Modal Lightbox xem chi tiết sản phẩm + đổi ảnh phụ
 * 4. Tự động tạo link đặt hàng Zalo kèm nội dung tin nhắn tùy biến
 */

const ZALO_PHONE = "0905876567";

// Danh sách sản phẩm chuẩn theo đường dẫn ảnh thực tế
const PRODUCTS_DATA = [
    {
        id: "sp1",
        name: "Dừa Sấy Giòn Hũ Nắp Nhôm 350g",
        category: "hu",
        categoryName: "Dừa Sấy Giòn Hũ",
        weight: "Hũ 350g",
        image: "images/dừa sấy.webp",
        subImages: ["images/dừa sấy.webp", "images/dừa 1.jpg", "images/com-dua.jfif"],
        fallback: "https://placehold.co/600x450/1b5e20/ffffff?text=Dua+Say+Gion+Hu+350g",
        shortDesc: "Vị bùi béo, giòn tan rôm rốp, thiết kế hũ nắp nhôm xé kín khí kèm nhãn hoạt hình dễ thương, cực kỳ tiện bảo quản.",
        fullDesc: "Sản phẩm chủ lực được yêu thích nhất tại Vinacoconut. Từng lát dừa bánh tẻ được bào mỏng vừa ăn, sấy nhiệt thấp giữ trọn hương thơm béo ngậy tự nhiên. Hũ 350g đóng nắp nhôm kín khí giúp dừa luôn giòn tan như mới ra lò.",
        ingredients: "Cơm dừa tươi miền Trung tuyển chọn (92%), đường mía RS tự nhiên (8%), không chất bảo quản.",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Đậy kín nắp nhựa sau khi xé màng nhôm. Bảo quản nơi thoáng mát, tránh nắng."
    },
    {
        id: "sp2",
        name: "Dừa Giòn Đóng Gói Túi Zip Truyền Thống",
        category: "tui",
        categoryName: "Dừa Nướng Túi Tiện Lợi",
        weight: "Túi Zip Đặc Sản",
        image: "images/Dừa Giòn.jfif",
        subImages: ["images/Dừa Giòn.jfif", "images/Dừa Giòn 1.jfif"],
        fallback: "https://placehold.co/600x450/d48806/ffffff?text=Dua+Gion+Tui+Zip",
        shortDesc: "Đặc sản dừa giòn truyền thống Thành Nhân – Vinacoconut đóng túi zip dày dặn, sang trọng, chuẩn quà biếu quê hương.",
        fullDesc: "Mang đậm hương vị truyền thống xứ Quảng, gói dừa giòn túi zip tiện lợi dễ dàng mang theo trong các chuyến du lịch, dã ngoại hoặc làm quà biếu người thân, bạn bè phương xa.",
        ingredients: "100% Cơm dừa già tự nhiên, đường cát trắng tinh luyện vừa đủ tạo độ bóng giòn.",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Vuốt chặt khóa miệng túi zip sau mỗi lần thưởng thức."
    },
    {
        id: "sp3",
        name: "Coconut Chips Xuất Khẩu Cao Cấp",
        category: "hu",
        categoryName: "Dừa Sấy Giòn Hũ",
        weight: "Hũ Nắp Vàng",
        image: "images/coconut.jfif",
        subImages: ["images/coconut.jfif", "images/dừa 1.jpg"],
        fallback: "https://placehold.co/600x450/1b5e20/ffffff?text=Coconut+Chips+Cao+Cap",
        shortDesc: "Dòng Coconut Chips chuẩn nắp vàng sang trọng, đạt chuẩn VSTP, công nghệ sấy thăng hoa ít ngọt dành cho người ăn thanh đạm.",
        fullDesc: "Coconut Chips phiên bản hũ nắp vàng cao cấp được chế biến theo tiêu chuẩn xuất khẩu. Lát dừa mỏng, trắng ngà pha sắc vàng nhẹ, công thức giảm ngọt tối đa giúp tôn lên vị béo nguyên bản của cùi dừa Việt Nam.",
        ingredients: "Cơm dừa hữu cơ chọn lọc (95%), đường mía tự nhiên (5%), muối hồng dịu nhẹ.",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Bảo quản nơi khô ráo, ngon hơn khi dùng kèm trà nóng, sữa chua hoặc ngũ cốc."
    },
    {
        id: "sp4",
        name: "Bánh Dừa Nướng / Cookies Dừa Giòn",
        category: "cookies",
        categoryName: "Bánh Cookies Dừa",
        weight: "Đặc Sản Thưởng Trà",
        image: "images/Cookies-dua-1_4581_anh1.jpg",
        subImages: ["images/Cookies-dua-1_4581_anh1.jpg", "images/com-dua.jfif"],
        fallback: "https://placehold.co/600x450/d48806/ffffff?text=Banh+Cookies+Dua+Nuong",
        shortDesc: "Bánh quy dừa nướng giòn rụm màu hổ phách quyến rũ, thơm lừng bơ sữa và cơm dừa nạo sợi – tuyệt phẩm bên tách trà nóng.",
        fullDesc: "Sự kết hợp hoàn hảo giữa cơm dừa tươi nạo sợi mịn và công thức nướng truyền thống tạo nên những chiếc bánh quy dừa màu hổ phách óng ả. Khi cắn vào giòn tan, hậu vị bùi béo thơm ngát, cực kỳ hợp để nhâm nhi cùng trà xanh hoặc cà phê sáng.",
        ingredients: "Cơm dừa nạo sợi (70%), bột nếp tuyển chọn, đường mía, bơ thực vật cao cấp.",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Tránh gió ẩm trực tiếp, bảo quản kín sau khi mở bao bì."
    },
    {
        id: "sp5",
        name: "Lát Dừa Sấy Giòn Thượng Hạng",
        category: "tui",
        categoryName: "Dừa Nướng Túi Tiện Lợi",
        weight: "Tuyển Chọn Lát Lớn",
        image: "images/dừa 1.jpg",
        subImages: ["images/dừa 1.jpg", "images/Dừa Giòn 1.jfif"],
        fallback: "https://placehold.co/600x450/1b5e20/ffffff?text=Lat+Dua+Thuong+Hang",
        shortDesc: "Tuyển chọn những lát dừa bản lớn uốn lượn tự nhiên, vàng óng ả, không vụn vỡ, giòn rụm từng miếng.",
        fullDesc: "Được phân loại từ phần cùi dừa dày nhất ở giữa trái dừa bánh tẻ. Từng lát dừa uốn cong tự nhiên khi nướng ở nhiệt độ chuẩn, giữ trọn độ bóng của tinh dầu dừa tự nhiên mà không hề gây ngấy.",
        ingredients: "Cơm dừa tươi cắt lát bản lớn (92%), đường mía tự nhiên (8%).",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Bảo quản nơi khô thoáng, khóa kín miệng túi sau khi sử dụng."
    },
    {
        id: "sp6",
        name: "Nia Dừa Giòn Vàng Óng Sấy Mộc",
        category: "tui",
        categoryName: "Dừa Nướng Túi Tiện Lợi",
        weight: "Đóng Gói Theo Yêu Cầu",
        image: "images/dua don.jfif",
        subImages: ["images/dua don.jfif", "images/Dừa Giòn 1.jfif", "images/com-dua.jfif"],
        fallback: "https://placehold.co/600x450/d48806/ffffff?text=Nia+Dua+Gion+Say+Moc",
        shortDesc: "Dừa sấy mộc truyền thống vừa ra lò trên nia tre, cung cấp sỉ & lẻ theo kg cho quán trà, cà phê và đại lý toàn quốc.",
        fullDesc: "Mẻ dừa giòn sấy mộc vừa ra lò với sắc vàng mật ong bắt mắt và hương thơm lan tỏa. Phù hợp cho khách hàng mua số lượng lớn, quán trà đạo, quán cà phê hoặc đóng gói quà tặng sự kiện.",
        ingredients: "Cơm dừa tươi 100%, đường mía RS tự nhiên, không phụ gia công nghiệp.",
        expiry: "06 tháng kể từ ngày sản xuất.",
        storage: "Đựng trong hũ thủy tinh hoặc túi zip kín hơi."
    }
];

// Hàm tạo URL Zalo kèm lời nhắn đặt hàng soạn sẵn
function buildZaloOrderUrl(messageText) {
    const encodedMsg = encodeURIComponent(messageText);
    return `https://zalo.me/${ZALO_PHONE}?text=${encodedMsg}`;
}

// Render danh sách sản phẩm ra lưới
function renderProducts(filterKey = "all") {
    const gridEl = document.getElementById("productGrid");
    if (!gridEl) return;

    const filteredList = filterKey === "all"
        ? PRODUCTS_DATA
        : PRODUCTS_DATA.filter(item => item.category === filterKey);

    gridEl.innerHTML = filteredList.map(product => {
        const prefilledMsg = `Xin chào Vinacoconut! Tôi muốn đặt mua sản phẩm: "${product.name}". Nhờ shop tư vấn giá và phí giao hàng giúp tôi nhé!`;
        const zaloUrl = buildZaloOrderUrl(prefilledMsg);

        return `
            <article class="product-card" data-category="${product.category}">
                <div class="product-img-wrap">
                    <span class="natural-badge">100% Tự Nhiên</span>
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="product-img"
                         loading="lazy"
                         onerror="this.onerror=null;this.src='${product.fallback}';">
                    <span class="weight-badge">${product.weight}</span>
                </div>
                <div class="product-body">
                    <span class="product-cat-tag">${product.categoryName}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-summary">${product.shortDesc}</p>
                    <div class="product-actions">
                        <button type="button" class="btn-card-detail" data-id="${product.id}">
                            Xem Chi Tiết
                        </button>
                        <a href="${zaloUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-zalo">
                            <span>Đặt Qua Zalo</span>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    // Gắn sự kiện mở Modal cho các nút "Xem Chi Tiết"
    gridEl.querySelectorAll(".btn-card-detail").forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.getAttribute("data-id");
            openProductModal(productId);
        });
    });
}

// Xử lý mở Modal chi tiết sản phẩm
function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(item => item.id === productId);
    if (!product) return;

    const modalEl = document.getElementById("productModal");
    const mainImgEl = document.getElementById("modalMainImg");
    const subImagesContainer = document.getElementById("modalSubImages");
    const categoryEl = document.getElementById("modalCategory");
    const titleEl = document.getElementById("modalTitle");
    const descEl = document.getElementById("modalDesc");
    const ingredientsEl = document.getElementById("modalIngredients");
    const expiryEl = document.getElementById("modalExpiry");
    const storageEl = document.getElementById("modalStorage");
    const zaloBtnEl = document.getElementById("modalZaloBtn");

    mainImgEl.src = product.image;
    mainImgEl.alt = product.name;
    mainImgEl.onerror = function () {
        this.onerror = null;
        this.src = product.fallback;
    };

    categoryEl.textContent = product.categoryName;
    titleEl.textContent = product.name;
    descEl.textContent = product.fullDesc;
    ingredientsEl.textContent = product.ingredients;
    expiryEl.textContent = product.expiry;
    storageEl.textContent = product.storage;

    const zaloMessage = `Chào Vinacoconut! Tôi vừa xem chi tiết "${product.name}" trên website và muốn đặt hàng sản phẩm này. Tư vấn giúp tôi nhé!`;
    zaloBtnEl.href = buildZaloOrderUrl(zaloMessage);

    // Render ảnh thu nhỏ (thumbnails) nếu sản phẩm có nhiều góc chụp
    if (product.subImages && product.subImages.length > 1) {
        subImagesContainer.innerHTML = product.subImages.map((imgSrc, idx) => `
            <img src="${imgSrc}" 
                 alt="${product.name} - ảnh ${idx + 1}" 
                 class="modal-thumb ${idx === 0 ? 'active' : ''}"
                 onerror="this.onerror=null;this.src='${product.fallback}';">
        `).join("");

        subImagesContainer.querySelectorAll(".modal-thumb").forEach(thumb => {
            thumb.addEventListener("click", () => {
                subImagesContainer.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
                thumb.classList.add("active");
                mainImgEl.src = thumb.src;
            });
        });
    } else {
        subImagesContainer.innerHTML = "";
    }

    modalEl.classList.add("open");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

// Đóng Modal
function closeProductModal() {
    const modalEl = document.getElementById("productModal");
    if (!modalEl) return;
    modalEl.classList.remove("open");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Khởi tạo toàn bộ sự kiện khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    // 1. Render toàn bộ sản phẩm lúc mới vào trang
    renderProducts("all");

    // 2. Sự kiện Filter Tabs
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const selectedCategory = btn.getAttribute("data-filter");
            renderProducts(selectedCategory);
        });
    });

    // 3. Sự kiện đóng Modal (Nút X, click ra ngoài nền đen, phím ESC)
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalOverlay = document.getElementById("productModal");

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeProductModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closeProductModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProductModal();
        }
    });

    // 4. Sự kiện Form Đặt Hàng chuyển tiếp qua Zalo
    const orderForm = document.getElementById("zaloOrderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("customerName").value.trim();
            const phone = document.getElementById("customerPhone").value.trim();
            const address = document.getElementById("customerAddress").value.trim();
            const product = document.getElementById("productSelect").value;
            const qty = document.getElementById("productQty").value.trim();
            const note = document.getElementById("customerNote").value.trim();

            const orderSummary = [
                "🥥 ĐƠN ĐẶT HÀNG MỚI - VINACOCONUT",
                "-----------------------------",
                `👤 Khách hàng: ${name}`,
                `📞 Số điện thoại: ${phone}`,
                `📍 Địa chỉ nhận: ${address}`,
                `🛒 Sản phẩm: ${product}`,
                `📦 Số lượng: ${qty}`,
                note ? `📝 Ghi chú: ${note}` : "",
                "-----------------------------",
                "Nhờ Vinacoconut xác nhận đơn hàng giúp tôi nhé!"
            ].filter(Boolean).join("\n");

            const targetZaloUrl = buildZaloOrderUrl(orderSummary);
            window.open(targetZaloUrl, "_blank", "noopener,noreferrer");
        });
    }

    // 5. Menu Mobile Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mainNav = document.getElementById("mainNav");

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        mainNav.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 6. Hiệu ứng Header khi cuộn trang
    const headerEl = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            headerEl.classList.add("scrolled");
        } else {
            headerEl.classList.remove("scrolled");
        }
    });
});