function initStatistikStatusLogic() {
    const valTotalProgram = document.getElementById("val-total-program");
    const valTerdaftarProgram = document.getElementById("val-terdaftar-program");
    const valTidakLolos = document.getElementById("val-tidak-lolos");
    const statusListContainer = document.getElementById("status-list-container");

    if (valTotalProgram && statusListContainer) {
        const apiDataDashboard = {
            statistik: { total: 6, terdaftar: 6, tidakLolos: 0 },
            statusPendaftaran: [
                {
                    judul: "Mad Thabii - Angkatan 2 - 2025",
                    subJudul: null, badgeText: "Diterima", badgeColor: "bg-green-100 text-green-700",
                    labelTipe: "Pengumuman:", pesanHtml: "Selamat! Anda berhasil lolos seleksi. Silakan ikuti kelas wajib dan kelas praktik sesuai jadwal yang telah ditentukan. <strong class='text-brand-dark font-extrabold'>Senin 2025, 11:00WIB</strong>",
                },
                {
                    judul: "Tafkhim & Tarqiq - Angkatan 3 - 2025",
                    subJudul: "(Tafkhim & Tarqiq)", badgeText: "Pemilihan Kelas Praktek", badgeColor: "bg-brand-yellow/30 text-yellow-700",
                    labelTipe: "Pengumuman:", pesanHtml: "Selamat! Anda telah berhasil mendaftar pada program di Noora - Quran. Silakan ikuti tahapan selanjutnya.",
                },
            ],
        };

        valTotalProgram.textContent = apiDataDashboard.statistik.total;
        valTerdaftarProgram.textContent = apiDataDashboard.statistik.terdaftar;
        valTidakLolos.textContent = apiDataDashboard.statistik.tidakLolos;

        statusListContainer.innerHTML = "";
        apiDataDashboard.statusPendaftaran.forEach((item) => {
            let subJudulRender = item.subJudul ? `<br><span class="text-[11px] font-medium text-brand-muted">${item.subJudul}</span>` : "";
            statusListContainer.insertAdjacentHTML("beforeend", `
                <div class="border border-slate-200 rounded-lg p-4 bg-white hover:border-brand-yellow/50 transition-colors shadow-sm">
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