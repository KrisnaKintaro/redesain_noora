document.addEventListener("DOMContentLoaded", () => {
    // FETCHING SEMUA KOMPONEN KE MASTER
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
        ([navData, welcomeData, programData, statistikData, daftarProgramData, faqData, sesi1, sesi2, sesi3]) => {
            
            // Suntik Data ke DOM
            document.getElementById("navbar-container").innerHTML = navData;
            document.getElementById("welcome-container").innerHTML = welcomeData;
            document.getElementById("program-materi-container").innerHTML = programData;
            document.getElementById("statistik-container").innerHTML = statistikData;
            document.getElementById("daftar-program-container").innerHTML = daftarProgramData;
            document.getElementById("faq-container").innerHTML = faqData;
            document.getElementById("task-sesi-1-container").innerHTML = sesi1;
            document.getElementById("task-sesi-2-container").innerHTML = sesi2;
            document.getElementById("task-sesi-3-container").innerHTML = sesi3;

            initNavbarLogic();
            initWelcomeBannerLogic();
            initProgramMateriLogic();
            initStatistikStatusLogic();
            initDaftarProgramLogic();
            initFaqLogic();
        }
    )
    .catch((err) => console.error("Ada error fetch cuy:", err));
});