window.AppTemplates = {};
window.asalHalamanDetail = "Home"; // Nyimpen asal halaman sblm masuk detail

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("component/navbar.html").then(res => res.text()),
        fetch("component/home/welcome_banner.html").then(res => res.text()),
        fetch("component/home/program_dan_materi/program_dan_materi.html").then(res => res.text()),
        fetch("component/home/statistik_dan_status_pendaftaran.html").then(res => res.text()),
        fetch("component/home/daftar_program_tersedia.html").then(res => res.text()),
        fetch("component/home/faq.html").then(res => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_1_persiapan.html").then(res => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_2_soal.html").then(res => res.text()),
        fetch("component/home/program_dan_materi/task/sesi_3_hasil.html").then(res => res.text()),
        fetch("component/home/detail_pendaftaran/detail_diterima.html").then(res => res.text()),
        fetch("component/home/detail_pendaftaran/detail_ditolak.html").then(res => res.text()),
        // FETCH FILE BARU
        fetch("component/programku/programku.html").then(res => res.text()),
    ])
    .then(
        ([nav, welcome, progMateri, stat, daftarProg, faq, sesi1, sesi2, sesi3, detailDiterima, detailDitolak, programku]) => {
            window.AppTemplates = { nav, welcome, progMateri, stat, daftarProg, faq, sesi1, sesi2, sesi3, detailDiterima, detailDitolak, programku };

            document.getElementById("navbar-container").innerHTML = window.AppTemplates.nav;
            initNavbarLogic();
            window.renderHomeView();
        }
    )
    .catch((err) => console.error("Ada error fetch cuy:", err));
});

window.navigateTo = function(pageName) {
    const appContent = document.getElementById("app-content");
    if (pageName === "Home") {
        window.renderHomeView();
    } else if (pageName === "Programku") {
        appContent.innerHTML = window.AppTemplates.programku;
        if(window.initProgramkuLogic) window.initProgramkuLogic();
    } else if (pageName === "Sertifikat ku") {
        appContent.innerHTML = `<div class="py-24 text-center animate-pulse"><div class="w-24 h-24 bg-brand-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6"><i class="ph-fill ph-certificate text-6xl text-brand-yellow"></i></div><h2 class="text-2xl md:text-3xl font-extrabold text-brand-dark mb-3 tracking-tight">Sertifikat Saya</h2><p class="text-brand-muted font-medium">Sedang dalam proses pengembangan (Coming Soon).</p></div>`;
    }
};

window.renderHomeView = function() {
    const appContent = document.getElementById("app-content");
    appContent.innerHTML = `<div id="view-home"><div id="welcome-container">${window.AppTemplates.welcome}</div><div id="program-materi-container">${window.AppTemplates.progMateri}</div><div id="statistik-container">${window.AppTemplates.stat}</div><div id="daftar-program-container">${window.AppTemplates.daftarProg}</div><div id="faq-container">${window.AppTemplates.faq}</div></div>`;
    
    initWelcomeBannerLogic(); initProgramMateriLogic(); initStatistikStatusLogic(); initDaftarProgramLogic(); initFaqLogic();
    if(window.updateNavbarActive) window.updateNavbarActive("Home");
};

window.renderTaskView = function() {
    const appContent = document.getElementById("app-content");
    appContent.innerHTML = `<div id="view-task"><div id="task-sesi-1-container" class="hidden">${window.AppTemplates.sesi1}</div><div id="task-sesi-2-container" class="hidden">${window.AppTemplates.sesi2}</div><div id="task-sesi-3-container" class="hidden max-w-4xl mx-auto">${window.AppTemplates.sesi3}</div></div>`;
};

window.renderDetailStatusPendaftaran = function(index, asalHalaman = "Home") {
    window.asalHalamanDetail = asalHalaman; // Simpan asalnya dari mana (Home / Programku)

    const data = window.mockStatusData[index]; 
    const appContent = document.getElementById("app-content");

    if (data.status === 'diterima') {
        appContent.innerHTML = window.AppTemplates.detailDiterima;
        
        document.getElementById("detail-judul-terima").textContent = data.judul + " " + (data.subJudul || "");
        document.getElementById("val-prog-terima").textContent = data.judul;
        document.getElementById("val-gel-terima").textContent = data.gelombang;
        document.getElementById("val-jadwal-terima").textContent = data.jadwal;
        document.getElementById("val-kuota-terima").textContent = data.kuota;
        document.getElementById("val-teori-terima").textContent = data.teori;
        document.getElementById("val-praktik-terima").textContent = data.praktik;

        document.getElementById("materi-injection-point").innerHTML = window.AppTemplates.progMateri;
        initProgramMateriLogic();
        if(window.selectProgramById) window.selectProgramById(data.id);

    } else {
        appContent.innerHTML = window.AppTemplates.detailDitolak;
        
        document.getElementById("detail-judul-tolak").textContent = data.judul + " " + (data.subJudul || "");
        document.getElementById("val-prog-tolak").textContent = data.judul;
        document.getElementById("val-gel-tolak").textContent = data.gelombang;
        document.getElementById("val-jadwal-tolak").textContent = data.jadwal;
        document.getElementById("val-kuota-tolak").textContent = data.kuota;
        document.getElementById("val-teori-tolak").textContent = data.teori;
        document.getElementById("val-praktik-tolak").textContent = data.praktik;
    }
    window.scrollTo(0,0);
};

// FUNGSI BALIK YG PINTER
window.kembaliDariDetail = function() {
    // Balik ke halaman sebelumnya (Home atau Programku)
    window.navigateTo(window.asalHalamanDetail);
};