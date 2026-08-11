window.mockStatusData = [
    {
        id: "prog-1", // ID INI HARUS SAMA DENGAN ID DI PROGRAM & MATERI
        status: "diterima",
        judul: "Quranic Arabic Level 1",
        subJudul: "(Kelas Intensif)",
        badgeText: "Diterima",
        badgeColor: "bg-green-100 text-green-700",
        labelTipe: "Pengumuman:",
        pesanHtml: "Selamat! Anda berhasil lolos seleksi. Silakan ikuti kelas wajib dan kelas praktik sesuai jadwal yang telah ditentukan. <strong class='text-brand-dark font-extrabold'>Senin 2025, 11:00WIB</strong>",
        // Data Detail
        gelombang: "-",
        jadwal: "12 Oktober 2025 - 12 Oktober 2025",
        kuota: "137 Peserta",
        teori: "Teori (Rabu 12:30 WIB)",
        praktik: "B08 (Senin 11:00WIB WIB)"
    },
    {
        id: "prog-99", 
        status: "ditolak",
        judul: "Tafkhim & Tarqiq - Angkatan 3 - 2025",
        subJudul: "(Tafkhim & Tarqiq)",
        badgeText: "Ditolak",
        badgeColor: "bg-red-400 text-white",
        labelTipe: "Pengumuman:",
        pesanHtml: "Mohon Maaf, anda belum bisa melanjutkan pada program ini.",
        // Data Detail
        gelombang: "-",
        jadwal: "12 Oktober 2025 - 12 Oktober 2025",
        kuota: "137 Peserta",
        teori: "Teori (Rabu 12:30WIB)",
        praktik: "B01 (Kamis 09:00WIB WIB)"
    }
];

function initStatistikStatusLogic() {
    const valTotalProgram = document.getElementById("val-total-program");
    const valTerdaftarProgram = document.getElementById("val-terdaftar-program");
    const valTidakLolos = document.getElementById("val-tidak-lolos");
    const statusListContainer = document.getElementById("status-list-container");

    if (valTotalProgram && statusListContainer) {
        valTotalProgram.textContent = "6";
        valTerdaftarProgram.textContent = "6";
        valTidakLolos.textContent = "0";

        statusListContainer.innerHTML = "";
        window.mockStatusData.forEach((item, index) => {
            let subJudulRender = item.subJudul ? `<br><span class="text-[11px] font-medium text-brand-muted">${item.subJudul}</span>` : "";
            
            // ONCLICK PANGGIL FUNGSI RENDER DI APP.JS
            statusListContainer.insertAdjacentHTML("beforeend", `
                <div onclick="window.renderDetailStatusPendaftaran(${index})" class="cursor-pointer border border-slate-200 rounded-lg p-4 bg-white hover:border-brand-yellow/50 transition-colors shadow-sm">
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