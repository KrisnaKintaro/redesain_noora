function initWelcomeBannerLogic() {
    const btnMulai = document.getElementById("btn-mulai-belajar");
    const programContainer = document.getElementById("program-materi-container");

    if (btnMulai && programContainer) {
        btnMulai.addEventListener("click", () => {
            programContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
}