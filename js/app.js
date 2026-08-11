window.AppTemplates = {};

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("component/navbar.html").then((res) => res.text()),
        fetch("component/home/welcome_banner.html").then((res) => res.text()),
        fetch("component/home/program_dan_materi/program_dan_materi.html").then((res) => res.text()),
        fetch("component/home/statistik_dan_status_pendaftaran.html").then((res) => res.text()),
        fetch("component/home/daftar_program_tersedia.html").then((res) => res.text()),
        fetch("component/home/faq.html").then((res) => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_1_persiapan.html").then((res) => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_2_soal.html").then((res) => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_3_hasil.html").then((res) => res.text()),
    ])
    .then(
        ([nav, welcome, progMateri, stat, daftarProg, faq, sesi1, sesi2, sesi3]) => {
            
            // Simpan semua template ke memori
            window.AppTemplates = { nav, welcome, progMateri, stat, daftarProg, faq, sesi1, sesi2, sesi3 };

            // Suntik Navbar cuma sekali di awal
            document.getElementById("navbar-container").innerHTML = window.AppTemplates.nav;

            // Inisialisasi logika Navbar (cukup dipanggil sekali selamanya)
            initNavbarLogic();

            // Render Halaman Home pertama kali
            window.renderHomeView();
        }
    )
    .catch((err) => console.error("Ada error fetch cuy:", err));
});

// FUNGSI ROUTER (GANTI HALAMAN UTAMA)
window.navigateTo = function(pageName) {
    const appContent = document.getElementById("app-content");

    if (pageName === "Home") {
        window.renderHomeView();
    } 
    else if (pageName === "Programku") {
        // Hancurkan DOM, tampilkan halaman Programku
        appContent.innerHTML = `
            <div class="py-24 text-center animate-pulse">
                <div class="w-24 h-24 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="ph-fill ph-clock text-6xl text-brand-yellow"></i>
                </div>
                <h2 class="text-2xl md:text-3xl font-extrabold text-brand-dark mb-3 tracking-tight">Halaman Programku</h2>
                <p class="text-brand-muted font-medium">Sedang dalam proses pengembangan (Coming Soon).</p>
            </div>
        `;
    } 
    else if (pageName === "Sertifikat ku") {
        // Hancurkan DOM, tampilkan halaman Sertifikat
        appContent.innerHTML = `
            <div class="py-24 text-center animate-pulse">
                <div class="w-24 h-24 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="ph-fill ph-certificate text-6xl text-brand-yellow"></i>
                </div>
                <h2 class="text-2xl md:text-3xl font-extrabold text-brand-dark mb-3 tracking-tight">Sertifikat Saya</h2>
                <p class="text-brand-muted font-medium">Sedang dalam proses pengembangan (Coming Soon).</p>
            </div>
        `;
    }
};

// FUNGSI RENDER VIEW KHUSUS
window.renderHomeView = function() {
    const appContent = document.getElementById("app-content");
    
    // TIMPA SEMUA ISI DOM MENJADI HOME
    appContent.innerHTML = `
        <div id="view-home">
            <div id="welcome-container">${window.AppTemplates.welcome}</div>
            <div id="program-materi-container">${window.AppTemplates.progMateri}</div>
            <div id="statistik-container">${window.AppTemplates.stat}</div>
            <div id="daftar-program-container">${window.AppTemplates.daftarProg}</div>
            <div id="faq-container">${window.AppTemplates.faq}</div>
        </div>
    `;

    // Eksekusi ulang logika JS khusus konten Home (Tanpa initNavbarLogic)
    initWelcomeBannerLogic();
    initProgramMateriLogic();
    initStatistikStatusLogic();
    initDaftarProgramLogic();
    initFaqLogic();

    // Pastikan Navbar menyorot "Home" (penting kalau kita balik ke Home dari halaman lain)
    if(window.updateNavbarActive) window.updateNavbarActive("Home");
};

window.renderTaskView = function() {
    const appContent = document.getElementById("app-content");
    
    // TIMPA SEMUA ISI DOM MENJADI TASK
    appContent.innerHTML = `
        <div id="view-task">
            <div id="task-sesi-1-container" class="hidden">${window.AppTemplates.sesi1}</div>
            <div id="task-sesi-2-container" class="hidden">${window.AppTemplates.sesi2}</div>
            <div id="task-sesi-3-container" class="hidden max-w-4xl mx-auto">${window.AppTemplates.sesi3}</div>
        </div>
    `;
};