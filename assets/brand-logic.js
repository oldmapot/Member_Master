document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from') || 'pot';
    
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

    // 關閉 Loading 的全域函數
    window.closeBrandLoading = () => {
        const mask = document.getElementById('brand-loading-mask');
        if (mask) {
            mask.style.opacity = '0';
            setTimeout(() => mask.style.display = 'none', 400);
        }
    };

    // 開啟 Loading 的全域函數 (用於店員端提交時)
    window.openBrandLoading = (customText) => {
        const mask = document.getElementById('brand-loading-mask');
        if (mask) {
            if (customText) document.getElementById('brand-loading-text').innerText = customText;
            mask.style.display = 'flex';
            mask.style.opacity = '1';
        }
    };
});
