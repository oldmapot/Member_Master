// 第一階段：立即判斷主題 (不等待 DOM)
(function() {
    const params = new URLSearchParams(window.location.search);
    window.currentBrand = params.get('from') || 'pot';
    // 立即在 html 標籤加上 class，讓 CSS 能瞬間反應
    document.documentElement.className = (window.currentBrand === 'sweet') ? 'theme-sweet' : 'theme-pot';
})();

// 第二階段：當畫面載入後，填入對應的圖案與文字
document.addEventListener('DOMContentLoaded', () => {
    const from = window.currentBrand;
    const config = {
        'pot': {
            icon: 'pot-animation',
            quotes: ["老娘正在準備你的心意...", "火鍋滾了，心意也快好了..."]
        },
        'sweet': {
            icon: 'pudding-animation',
            quotes: ["正在為您的生活，加入一點甜...", "遇見你，就是一點甜..."]
        }
    };

    const active = config[from] || config['pot'];
    
    // 填入動畫圖案
    const iconBox = document.getElementById('brand-icon-box');
    if (iconBox) iconBox.innerHTML = `<div class="${active.icon}"></div>`;

    // 填入隨機文案
    const textEl = document.getElementById('brand-loading-text');
    if (textEl) textEl.innerText = active.quotes[Math.floor(Math.random() * active.quotes.length)];

    // 全域控制函數
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
