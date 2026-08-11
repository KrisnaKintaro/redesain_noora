window.initProgramkuLogic = function() {
    const container = document.getElementById("programku-list-container");
    if(!container) return;
    
    container.innerHTML = ""; // Kosongin loading
    
    window.mockStatusData.forEach((item, index) => {
        
        // Cek apakah statusnya sukses (Diterima / Lulus)
        const isSukses = item.status === 'diterima' || item.badgeText === 'Lulus';

        // Badge warna solid
        let solidBadgeColor = isSukses 
            ? 'bg-emerald-500 text-white' 
            : 'bg-red-500 text-white';

        // EFEK HOVER TOMBOL DINAMIS
        let hoverButtonClass = isSukses
            ? 'hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600' // Kalau sukses -> Hijau
            : 'hover:bg-red-50 hover:border-red-500 hover:text-red-600';             // Kalau gagal -> Merah

        container.insertAdjacentHTML("beforeend", `
            <div class="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
                <div class="flex justify-between items-start gap-4 mb-6">
                    <div>
                        <h3 class="font-bold text-brand-dark text-lg leading-tight mb-1">${item.judul}</h3>
                        <p class="text-xs text-brand-muted">${item.subJudul || ''}</p>
                    </div>
                    <span class="${solidBadgeColor} text-[11px] font-bold px-5 py-1.5 rounded-full text-center min-w-max tracking-wide shadow-sm">${item.badgeText}</span>
                </div>
                
                <div class="border-t border-slate-100 pt-4 mb-6 flex-1">
                    <table class="text-sm text-brand-muted">
                        <tr><td class="py-1 pr-4 font-semibold text-brand-dark">Angkatan</td><td>: ${item.gelombang}</td></tr>
                        <tr><td class="py-1 pr-4 font-semibold text-brand-dark">Kuota</td><td>: ${item.kuota}</td></tr>
                    </table>
                </div>

                <!-- TOMBOL DETAIL DENGAN EFEK HOVER DINAMIS -->
                <button onclick="window.renderDetailStatusPendaftaran(${index}, 'Programku')" class="w-full py-2.5 rounded-full border border-slate-300 text-brand-dark font-bold text-sm transition-colors focus:outline-none shadow-sm ${hoverButtonClass}">
                    Detail Status Program
                </button>
            </div>
        `);
    });
};