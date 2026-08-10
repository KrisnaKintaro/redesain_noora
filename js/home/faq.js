function initFaqLogic() {
    const faqListContainer = document.getElementById("faq-list-container");
    if (faqListContainer) {
        const apiDataFaq = [
            { question: "Apa itu Noora - Quran?", answer: "Noora - Quran adalah platform digital yang didedikasikan untuk memfasilitasi pembelajaran Al-Quran yang terstruktur, mulai dari tajwid, tahsin, hingga pemahaman bahasa Arab secara komprehensif." },
            { question: "Bagaimana cara daftar di Noora - Quran?", answer: "Anda dapat mendaftar dengan memilih program yang tersedia di atas, klik tombol 'Lihat Selengkapnya', dan ikuti petunjuk pendaftaran yang muncul. Setelah itu tunggu hasil seleksinya di menu Status Pendaftaranmu." },
            { question: "Apakah kelas dilakukan secara online atau offline?", answer: "Saat ini, sebagian besar kelas teori dilakukan secara online via zoom/gmeet, sedangkan kelas praktik bisa disesuaikan apakah hybrid atau full online sesuai dengan program yang Anda ikuti." },
            { question: "Bagaimana jika saya tidak lolos seleksi program?", answer: "Jangan berkecil hati. Anda masih bisa mendaftar di program lain atau menunggu pembukaan angkatan (batch) selanjutnya. Histori penolakan bisa dilihat di kotak statistik." }
        ];

        faqListContainer.innerHTML = "";
        apiDataFaq.forEach((faq, index) => {
            faqListContainer.insertAdjacentHTML("beforeend", `
                <div class="border border-slate-200 rounded-lg overflow-hidden transition-all bg-slate-50/50 hover:border-brand-yellow/50 group">
                    <button onclick="toggleFaq('faq-ans-${index}', this)" class="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none">
                        <span class="font-semibold text-brand-dark text-sm pr-4 group-hover:text-yellow-700 transition-colors">${faq.question}</span>
                        <i class="ph-bold ph-caret-down text-brand-muted transition-transform duration-300 transform icon-caret group-hover:text-yellow-600"></i>
                    </button>
                    <div id="faq-ans-${index}" class="hidden px-5 pb-4 pt-1 text-xs text-brand-muted leading-relaxed border-t border-slate-100/80 bg-white">
                        ${faq.answer}
                    </div>
                </div>
            `);
        });
    }
}

window.toggleFaq = function(ansId, btnElement) {
    const ansElement = document.getElementById(ansId);
    const iconElement = btnElement.querySelector('.icon-caret');
    if (ansElement.classList.contains('hidden')) {
        ansElement.classList.remove('hidden');
        iconElement.classList.replace('ph-caret-down', 'ph-caret-up');
    } else {
        ansElement.classList.add('hidden');
        iconElement.classList.replace('ph-caret-up', 'ph-caret-down');
    }
};