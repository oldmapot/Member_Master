// 立即執行：在 DOM 還沒完全載入前就先決定主題，避免閃爍
(function() {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from') || 'pot';
    document.documentElement.setAttribute('data-brand', from); // 在 html 標籤標記來源
})();

document.addEventListener('DOMContentLoaded', () => {
    const from = document.documentElement.getAttribute('data-brand');
    
    const config = {
        'pot': {
            theme: 'theme-pot',
            icon: 'pot-animation',
            quotes: ["老娘正在準備你的心意...", "別催，老娘正在幫你算點數...", "火鍋滾了，心意也快好了..."]
        },
        'sweet': {
            theme: 'theme-sweet',
            icon: 'pudding-animation',
            quotes: ["正在為你的生活，加入一點甜...", "生活七八分苦？今天必須一點甜。", "遇見你，就是一點甜..."]
        }
    };

    const active = config[from] || config['pot'];
    document.body.classList.add(active.theme);
    
    const textEl = document.getElementById('brand-loading-text');
    if (textEl) textEl.innerText = active.quotes[Math.floor(Math.random() * active.quotes.length)];

    const iconBox = document.getElementById('brand-icon-box');
    if (iconBox) iconBox.innerHTML = `<div class="${active.icon}"></div>`;

    window.closeBrandLoading = () => {
        const mask = document.getElementById('brand-loading-mask');
        if (mask) {
            mask.style.opacity = '0';
            setTimeout(() => mask.style.display = 'none', 400);
        }
    };

    window.openBrandLoading = (customText) => {
        const mask = document.getElementById('brand-loading-mask');
        const textEl = document.getElementById('brand-loading-text');
        if (mask && textEl) {
            textEl.innerText = customText || "載入中...";
            mask.style.display = 'flex';
            mask.style.opacity = '1';
        }
    };
});
