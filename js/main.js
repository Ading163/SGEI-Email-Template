// 当前年份
document.getElementById('currentYear').textContent = new Date().getFullYear();

// 检测是否在微信或其他应用内置浏览器中打开
function checkBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isWeChat = userAgent.indexOf('micromessenger') !== -1;
    const isQQ = userAgent.indexOf('qq/') !== -1;
    const isDingTalk = userAgent.indexOf('dingtalk') !== -1;

    if (isWeChat || isQQ || isDingTalk) {
        // 显示浏览器检测遮罩
        const browserOverlay = document.getElementById('browserOverlay');
        const browserModal = document.getElementById('browserModal');

        browserOverlay.classList.remove('hidden');
        setTimeout(() => {
            browserModal.classList.remove('scale-95', 'opacity-0');
            browserModal.classList.add('scale-100', 'opacity-100');
        }, 10);

        // 阻止用户滚动
        document.body.style.overflow = 'hidden';
    }
}

checkBrowser();

// 关闭浏览器检测模态框
// document.getElementById('closeBrowserModal').addEventListener('click', () => {
//     const browserOverlay = document.getElementById('browserOverlay');
//     const browserModal = document.getElementById('browserModal');

//     browserModal.classList.remove('scale-100', 'opacity-100');
//     browserModal.classList.add('scale-95', 'opacity-0');

//     setTimeout(() => {
//         browserOverlay.classList.add('hidden');
//         // 恢复滚动
//         document.body.style.overflow = 'auto';
//     }, 300);
// });

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('py-2', 'shadow-md');
        navbar.classList.remove('py-3', 'shadow-sm');
    } else {
        navbar.classList.add('py-3', 'shadow-sm');
        navbar.classList.remove('py-2', 'shadow-md');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 邮件模板
const emailTemplates = {
    mrtCard: {
        to: "registrykd@segi.edu.my",
        subject: "FOR STUDENT STATUS LETTER (MRT Card)",
        body: "Dear Sir /Madam,\n\nFull Name: \nPassport Number: \nStudent ID: \nI am from China. I would like to request a confirmation letter from SEGi to apply for a student MRT card.\n\nBest Regard,"
    },
    bankCard: {
        to: "registrykd@segi.edu.my",
        subject: "FOR BANK RECOMMENDATION LETTER APPLICATION",
        body: "Dear Sir /Madam,\n\nFull Name: \nPassport Number: \nStudent ID: \nNationality: \nBank Name: \n\nApply for a bank card to apply for recommended credit for paying rent and daily living expenses\n\nBest Regard,"
    },
    studentCard: {
        to: "registrykd@segi.edu.my",
        subject: "Apply for new student id card",
        body: "Dear Sir /Madam,\n\nThe following is my detailed information.\n1. FULL NAME :\n2. PASSPORT :\n\nTHANK YOU FOR HELP"
    }
};

// 模态框相关
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalBody = document.getElementById('modalBody');
let currentTemplateKey = '';

// 打开模态框
function openModal(key) {
    currentTemplateKey = key;
    const template = emailTemplates[key];

    // 填充模态框内容，收件人和主题字段设为只读
    modalBody.innerHTML = `
          <div class="space-y-4">
              <div>
                  <label class="addressee block text-dark/70 mb-2">收件人:</label>
                  <input type="text" value="${template.to}" class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-dark/70" readonly>
              </div>
              <div>
                  <label class="subject block text-dark/70 mb-2">主题:</label>
                  <input type="text" value="${template.subject}" class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-dark/70" readonly>
              </div>
              <div>
                  <label class="content block text-dark/70 mb-2">内容:</label>
                  <textarea rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${template.body}</textarea>
              </div>
              <p class=" text-sm text-accent/80">
                  <i class="fa fa-info-circle"></i> <span class="additional-information"> 请在邮件中补充您的个人信息</span>
              </p>
          </div>
      `;

    // 显示模态框并添加动画
    modal.classList.remove('hidden');
    translateModalContent();
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

// 翻译模态框中动态内容
function translateModalContent() {
    document.querySelector('.confirm-Application-Information').textContent = selectedLanguage.confirmApplicationInformation;
    document.querySelector('.addressee').textContent = selectedLanguage.addressee;
    document.querySelector('.subject').textContent = selectedLanguage.subject;
    document.querySelector('.content').textContent = selectedLanguage.content;
    document.querySelector('.additional-information').textContent = selectedLanguage.AdditionalInformation;
}
// 关闭模态框
function closeModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 发送邮件
function sendEmail() {
    const template = emailTemplates[currentTemplateKey];
    // 获取用户修改后的内容
    const content = document.querySelector('#modalBody textarea').value;
    const mailUrl = `mailto:${template.to}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(content)}`;

    // 尝试在新窗口打开邮件客户端
    window.open(mailUrl, '_blank');
    closeModal();
}

// 事件绑定
document.getElementById('sendMRTCardEmail').addEventListener('click', () => openModal('mrtCard'));
document.getElementById('sendBankCardEmail').addEventListener('click', () => openModal('bankCard'));
document.getElementById('sendStudentCardEmail').addEventListener('click', () => openModal('studentCard'));
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);
document.getElementById('confirmSend').addEventListener('click', sendEmail);

// 点击模态框外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// FAQ手风琴效果
document.querySelectorAll('.faq-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('i');

        // 关闭其他所有FAQ
        document.querySelectorAll('.faq-content').forEach(item => {
            if (item !== content) {
                item.style.maxHeight = null;
                item.style.paddingTop = '0';
            }
        });

        document.querySelectorAll('.faq-toggle i').forEach(i => {
            if (i !== icon) {
                i.style.transform = 'rotate(0deg)';
            }
        });

        // 切换当前FAQ
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.paddingTop = '0';
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.paddingTop = '1rem';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// 默认打开第一个FAQ
if (document.querySelector('.faq-toggle')) {
    document.querySelector('.faq-toggle').click();
}

// 二维码预览功能
const qrcodeModal = document.getElementById('qrcodeModal');
const qrcodeImage = document.getElementById('qrcodeImage');
const previewQrcodeImage = document.getElementById('previewQrcodeImage');

document.getElementById('qrcodeContainer').addEventListener('click', () => {
    // 获取原始图片URL
    const imageUrl = qrcodeImage.src;
    // 设置预览图片
    previewQrcodeImage.src = imageUrl;
    // 显示模态框
    qrcodeModal.classList.remove('hidden');
    // 添加淡入动画
    previewQrcodeImage.classList.add('opacity-0');
    setTimeout(() => {
        previewQrcodeImage.classList.remove('opacity-0');
    }, 10);
});

// 关闭二维码预览
document.getElementById('closeQrcodeModal').addEventListener('click', () => {
    qrcodeModal.classList.add('hidden');
});

// 点击模态框外部关闭
qrcodeModal.addEventListener('click', (e) => {
    if (e.target === qrcodeModal) {
        qrcodeModal.classList.add('hidden');
    }
});

// 获取语言切换按钮
const langSelect = document.getElementById('lang-select');

// 当前语言变量
let currentLanguage = 'en';  // 默认
let selectedLanguage = languages.en;

// 根据系统语言自动选择
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
        currentLanguage = 'zh';
    } else if (browserLang.startsWith('ms')) {
        currentLanguage = 'ms';
    } else {
        currentLanguage = 'en';
    }
    selectedLanguage = languages[currentLanguage];
}

// 更新页面内容
function updateContent() {
    selectedLanguage = languages[currentLanguage];

    document.querySelector('.hero-title').textContent = selectedLanguage.heroTitle;
    document.querySelector('.hero-subtitle').textContent = selectedLanguage.heroSubtitle;
    document.querySelector('.start-button').textContent = selectedLanguage.startButton;
    document.querySelectorAll('.join-button')[0].textContent = selectedLanguage.joinButton;
    document.querySelectorAll('.join-button')[1].textContent = selectedLanguage.joinButton;
    document.querySelector('.server-button').textContent = selectedLanguage.serverButton;
    document.querySelector('.application-Process').textContent = selectedLanguage.applicationProcess;
    document.querySelector('.process-title').textContent = selectedLanguage.processTitle;
    document.querySelector('.process-subtitle').textContent = selectedLanguage.processSubtitle;
    document.querySelector('.step1-title').textContent = selectedLanguage.step1Title;
    document.querySelector('.step1-desc').textContent = selectedLanguage.step1Desc;
    document.querySelector('.step2-title').textContent = selectedLanguage.step2Title;
    document.querySelector('.step2-desc').textContent = selectedLanguage.step2Desc;
    document.querySelector('.step3-title').textContent = selectedLanguage.step3Title;
    document.querySelector('.step3-desc').textContent = selectedLanguage.step3Desc;
    document.querySelector('.service-title').textContent = selectedLanguage.serviceTitle;
    document.querySelectorAll('.apply-Now')[0].textContent = selectedLanguage.applyNow;
    document.querySelectorAll('.apply-Now')[1].textContent = selectedLanguage.applyNow;
    document.querySelectorAll('.apply-Now')[2].textContent = selectedLanguage.applyNow;
    document.querySelector('.service-subtitle').textContent = selectedLanguage.serviceSubtitle;
    document.querySelector('.mrt-card-title').textContent = selectedLanguage.mrtCardTitle;
    document.querySelector('.mrt-card-desc').textContent = selectedLanguage.mrtCardDesc;
    document.querySelector('.bank-card-title').textContent = selectedLanguage.bankCardTitle;
    document.querySelector('.bank-card-desc').textContent = selectedLanguage.bankCardDesc;
    document.querySelector('.student-card-title').textContent = selectedLanguage.studentCardTitle;
    document.querySelector('.student-card-desc').textContent = selectedLanguage.studentCardDesc;
    document.querySelector('.wechat-title').textContent = selectedLanguage.wechatTitle;
    document.querySelector('.wechat-desc').textContent = selectedLanguage.wechatDesc;
    document.querySelectorAll('.wechat-benefit')[0].textContent = selectedLanguage.wechatBenefit1;
    document.querySelectorAll('.wechat-benefit')[1].textContent = selectedLanguage.wechatBenefit2;
    document.querySelectorAll('.wechat-benefit')[2].textContent = selectedLanguage.wechatBenefit3;
    document.querySelector('.faq-title').textContent = selectedLanguage.faqTitle;
    document.querySelector('.faq-subtitle').textContent = selectedLanguage.faqSubtitle;
    document.querySelectorAll('.faq-question')[0].textContent = selectedLanguage.faq1Question;
    document.querySelectorAll('.faq-answer')[0].textContent = selectedLanguage.faq1Answer;
    document.querySelectorAll('.faq-question')[1].textContent = selectedLanguage.faq2Question;
    document.querySelectorAll('.faq-answer')[1].textContent = selectedLanguage.faq2Answer;
    document.querySelectorAll('.faq-question')[2].textContent = selectedLanguage.faq3Question;
    document.querySelectorAll('.faq-answer')[2].textContent = selectedLanguage.faq3Answer;
    document.querySelector('.footer-copyright').innerHTML = selectedLanguage.footerCopyright;
    document.querySelector('.footer-info1').textContent = selectedLanguage.footerInfo1;
    document.querySelector('.footer-info2').textContent = selectedLanguage.footerInfo2;
    document.querySelector('.scan-QR').textContent = selectedLanguage.scanQR;
    document.querySelector('.confirm-button').textContent = selectedLanguage.confirmButton;
    document.querySelector('.cancel-button').textContent = selectedLanguage.cancelButton;
    
    langSelect.value = currentLanguage;
}

// 下拉菜单切换语言
langSelect.addEventListener('change', () => {
    currentLanguage = langSelect.value;
    updateContent();
});
// 页面加载时自动检测语言并更新内容
detectLanguage();
updateContent();