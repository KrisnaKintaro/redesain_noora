window.mockStatusData = [
    {
        id: "prog-1",
        status: "diterima",
        judul: "Quranic Arabic Level 1 - 2026",
        subJudul: "Quranic Arabic Level 1",
        badgeText: "Diterima",
        badgeColor: "bg-emerald-100 text-emerald-700",
        labelTipe: "Pengumuman:",
        pesanHtml: "Selamat! Anda berhasil lolos seleksi. Silakan ikuti kelas wajib dan kelas praktik.",
        gelombang: "Angkatan 4",
        jadwal: "12 Okt 2026 - 12 Des 2026",
        kuota: "200 Peserta",
        teori: "Teori (Rabu 12:30 WIB)",
        praktik: "B08 (Senin 11:00 WIB)"
    },
    {
        id: "prog-99", 
        status: "ditolak",
        judul: "Tafkhim & Tarqiq - Angkatan 3",
        subJudul: "Tafkhim & Tarqiq",
        badgeText: "Ditolak",
        badgeColor: "bg-red-100 text-red-700",
        labelTipe: "Pengumuman:",
        pesanHtml: "Mohon Maaf, anda belum bisa melanjutkan pada program ini.",
        gelombang: "Angkatan 3",
        jadwal: "12 Okt 2026 - 12 Nov 2026",
        kuota: "137 Peserta",
        teori: "Teori (Rabu 12:30 WIB)",
        praktik: "B01 (Kamis 09:00 WIB)"
    },
    {
        id: "prog-3",
        status: "diterima",
        judul: "Mudud - Angkatan 3 - 2026",
        subJudul: "Mudud",
        badgeText: "Diterima",
        badgeColor: "bg-emerald-100 text-emerald-700",
        labelTipe: "Pengumuman:",
        pesanHtml: "Selamat! Anda berhasil lolos seleksi. Semangat belajarnya!",
        gelombang: "Angkatan 3",
        jadwal: "10 Ags 2026 - 10 Okt 2026",
        kuota: "121 Peserta",
        teori: "Teori (Senin 08:00 WIB)",
        praktik: "B02 (Selasa 09:00 WIB)"
    },
    {
        id: "prog-4",
        status: "diterima", // Kita pakai status diterima biar nampilin materi
        judul: "Qaidah Nuraniyah",
        subJudul: "Qaidah Nuraniyah",
        badgeText: "Lulus",
        badgeColor: "bg-emerald-100 text-emerald-700",
        labelTipe: "Pengumuman:",
        pesanHtml: "Alhamdulillah, Anda telah lulus pada program ini dengan nilai memuaskan.",
        gelombang: "Angkatan 4",
        jadwal: "1 Jan 2026 - 1 Mar 2026",
        kuota: "100 Peserta",
        teori: "Teori (Jumat 13:00 WIB)",
        praktik: "B13 (Senin 08:00 WIB)"
    }
];

function initStatistikStatusLogic() {
    const valTotalProgram = document.getElementById("val-total-program");
    const valTerdaftarProgram = document.getElementById("val-terdaftar-program");
    const valTidakLolos = document.getElementById("val-tidak-lolos");
    const statusListContainer = document.getElementById("status-list-container");

    if (valTotalProgram && statusListContainer) {
        valTotalProgram.textContent = "4";
        valTerdaftarProgram.textContent = "3";
        valTidakLolos.textContent = "1";

        statusListContainer.innerHTML = "";
        
        window.mockStatusData.forEach((item, index) => {
            let subJudulRender = item.subJudul ? `<br><span class="text-[11px] font-medium text-brand-muted">${item.subJudul}</span>` : "";
            
            // PARAMETER KEDUA ('Home') DITAMBAHIN BIAR TAU ASALNYA
            statusListContainer.insertAdjacentHTML("beforeend", `
                <div onclick="window.renderDetailStatusPendaftaran(${index}, 'Home')" class="cursor-pointer border border-slate-200 rounded-lg p-4 bg-white hover:border-brand-yellow/50 transition-colors shadow-sm">
                    <div class="flex justify-between items-start mb-2 gap-2">
                        <span class="text-sm font-bold text-brand-dark leading-tight">${item.judul} ${subJudulRender}</span>
                        <span class="${item.badgeColor} text-[10px] font-extrabold px-2 py-0.5 rounded-full text-center min-w-max tracking-wide">${item.badgeText}</span>
                    </div>
                    <span class="bg-red-400 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm inline-block mb-2">${item.labelTipe}</span>
                    <p class="text-xs text-brand-muted leading-relaxed">${item.pesanHtml}</p>
                </div>
            `);
        });
    }
}