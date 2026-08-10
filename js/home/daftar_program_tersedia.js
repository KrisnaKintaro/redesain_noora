function initDaftarProgramLogic() {
    const availableProgramsContainer = document.getElementById("available-programs-container");
    if (availableProgramsContainer) {
        const apiDataAvailablePrograms = [
            { id: "new-prog-1", title: "testing nih (Tajwid Advance)", startDate: "08 Agustus 2026 10:25", endDate: "31 Agustus 2026 10:25", description: "Program lanjutan untuk memperdalam ilmu tajwid dengan praktik intensif bersama pengajar bersertifikat. Peserta akan difokuskan pada penguasaan makharijul huruf dan sifatul huruf secara mendalam agar bacaan semakin tartil dan sesuai sanad." },
            { id: "new-prog-2", title: "Bahasa Arab Dasar - Angkatan 4", startDate: "15 September 2026 08:00", endDate: "15 Desember 2026 10:00", description: "Kelas dasar bagi pemula yang ingin memahami kaidah bahasa Arab dari nol. Cocok untuk semua kalangan. Materi meliputi pengenalan isim, fi'il, huruf, serta penyusunan kalimat (jumlah mufeedah) untuk percakapan sehari-hari." },
            { id: "new-prog-3", title: "Hafalan Quran Intensif (Juz 30)", startDate: "01 Oktober 2026 16:00", endDate: "31 Desember 2026 17:30", description: "Program khusus hafalan Juz 30 (Juz 'Amma) dengan metode tikrar dan setoran rutin. Didampingi oleh musyrif berpengalaman untuk memastikan kelancaran dan kekuatan hafalan (mutqin) kamu selama masa karantina." },
            { id: "new-prog-4", title: "Fiqih Ibadah Praktis", startDate: "10 November 2026 19:30", endDate: "10 Januari 2027 21:00", description: "Membahas tata cara ibadah sehari-hari sesuai sunnah, mulai dari thaharah (bersuci), wudhu, mandi junub, hingga tata cara shalat wajib dan shalat sunnah lengkap dengan penjelasan dalil-dalil shohih." }
        ];

        availableProgramsContainer.innerHTML = "";
        apiDataAvailablePrograms.forEach((prog) => {
            availableProgramsContainer.insertAdjacentHTML("beforeend", `
                <div class="border border-slate-200 rounded-xl p-5 bg-white hover:border-brand-yellow hover:shadow-md transition-all flex flex-col self-start group">
                    <h4 class="font-bold text-brand-dark text-base mb-1.5 group-hover:text-yellow-600 transition-colors">${prog.title}</h4>
                    <div class="flex items-start gap-1.5 text-[11px] font-medium text-brand-muted mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <i class="ph-fill ph-calendar-blank text-brand-yellow text-sm mt-0.5"></i>
                        <span>${prog.startDate} <br> <span class="text-slate-400">s/d</span> ${prog.endDate}</span>
                    </div>
                    <div class="text-xs text-brand-muted leading-relaxed mb-5">
                        <strong class="text-brand-dark block mb-1 uppercase tracking-wide text-[10px]">Deskripsi Program</strong>
                        <p id="desc-${prog.id}" class="line-clamp-2 transition-all duration-300">${prog.description}</p>
                    </div>
                    <button onclick="toggleDeskripsi('${prog.id}', this)" class="mt-auto text-xs font-bold text-brand-dark hover:text-yellow-600 flex items-center gap-1 w-max transition-colors focus:outline-none">
                        <span class="btn-text">Lihat Selengkapnya</span> 
                        <i class="ph-bold ph-caret-down transform transition-transform duration-300 icon-caret"></i>
                    </button>
                </div>
            `);
        });
    }
}

// Fungsi harus nempel di window biar onclick di HTML bisa manggil ini
window.toggleDeskripsi = function (id, btnElement) {
    const descElement = document.getElementById(`desc-${id}`);
    const btnText = btnElement.querySelector(".btn-text");
    const btnIcon = btnElement.querySelector(".icon-caret");
    if (descElement.classList.contains("line-clamp-2")) {
        descElement.classList.remove("line-clamp-2");
        btnText.textContent = "Sembunyikan";
        btnIcon.classList.replace("ph-caret-down", "ph-caret-up");
    } else {
        descElement.classList.add("line-clamp-2");
        btnText.textContent = "Lihat Selengkapnya";
        btnIcon.classList.replace("ph-caret-up", "ph-caret-down");
    }
};