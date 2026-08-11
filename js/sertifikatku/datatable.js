// STATE DATATABLE
window.dtState = {
    data: [],        // Data asli semua
    filtered: [],    // Data setelah di-search/sort
    page: 1,         // Halaman aktif
    limit: 10,       // Tampil per halaman
    sortBy: 'id',    // Kolom yg lagi di-sort
    sortDir: 'asc',  // Arah sort ('asc' atau 'desc')
    type: 'rapor'    // 'rapor' atau 'sertifikat'
};

// DUMMY DATA DIPERBANYAK BUAT TES PAGINATION (Total 15 Data)
window.mockDataRapor = Array.from({length: 15}, (_, i) => ({
    id: i + 1, 
    program: i % 2 === 0 ? `Qaidah Nuraniyah Angkatan ${i+1}` : `Tajwid Dasar Angkatan ${i+1}`, 
    kategori: i % 2 === 0 ? "Qaidah Nuraniyah" : "Tajwid", 
    status: i % 3 === 0 ? "Tidak Lulus" : "Lulus", 
    nilai: { absensi: 10, kp: 8, pr: 8.5 + (i/10), utpt: 13.9, utpp: 13.3, uapt: 20, uapp: 18.8, akhir: 92.5 - i }
}));

window.mockDataSertifikat = Array.from({length: 15}, (_, i) => ({
    id: i + 1, 
    program: i % 2 === 0 ? `Qaidah Nuraniyah Angkatan ${i+1}` : `Tajwid Dasar Angkatan ${i+1}`, 
    kategori: i % 2 === 0 ? "Qaidah Nuraniyah" : "Tajwid", 
    status: i % 3 === 0 ? "Tidak Lulus" : "Lulus"
}));

// INISIALISASI
window.renderTableData = function(dataArray, type) {
    window.dtState.data = dataArray;
    window.dtState.filtered = [...dataArray];
    window.dtState.type = type;
    window.dtState.page = 1;
    
    const searchInput = document.getElementById('dt-search');
    if(searchInput) searchInput.value = ""; 
    
    window.dtApplySortAndFilter();
};

// FUNGSI SEARCH, SORT & RENDER
window.dtApplySortAndFilter = function() {
    // 1. Jalankan Filter Search
    const keyword = document.getElementById('dt-search').value.toLowerCase();
    window.dtState.filtered = window.dtState.data.filter(item => {
        return item.program.toLowerCase().includes(keyword) || 
               item.kategori.toLowerCase().includes(keyword) ||
               item.status.toLowerCase().includes(keyword);
    });

    // 2. Jalankan Sorting
    window.dtState.filtered.sort((a, b) => {
        let valA = a[window.dtState.sortBy];
        let valB = b[window.dtState.sortBy];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return window.dtState.sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return window.dtState.sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    // Update Ikon Panah Sort
    ['id', 'program', 'status'].forEach(col => {
        const icon = document.getElementById(`sort-icon-${col}`);
        if (icon) {
            icon.className = "ph ml-1 " + (window.dtState.sortBy === col 
                ? (window.dtState.sortDir === 'asc' ? 'ph-caret-up text-brand-dark' : 'ph-caret-down text-brand-dark') 
                : 'ph-caret-up-down text-slate-400');
        }
    });

    window.dtRenderRows();
};

// HOOK EVENT HTML
window.dtSearch = function() { window.dtState.page = 1; window.dtApplySortAndFilter(); };
window.dtChangeEntries = function() { window.dtState.limit = parseInt(document.getElementById('dt-show-entries').value); window.dtState.page = 1; window.dtRenderRows(); };
window.dtSort = function(column) {
    if (window.dtState.sortBy === column) window.dtState.sortDir = window.dtState.sortDir === 'asc' ? 'desc' : 'asc';
    else { window.dtState.sortBy = column; window.dtState.sortDir = 'asc'; }
    window.dtApplySortAndFilter();
};
window.dtChangePage = function(page) { window.dtState.page = page; window.dtRenderRows(); };

// RENDER BARIS TABEL
window.dtRenderRows = function() {
    const tbody = document.getElementById("table-body-dokumen");
    if (!tbody) return;

    const start = (window.dtState.page - 1) * window.dtState.limit;
    const end = start + window.dtState.limit;
    const paginatedData = window.dtState.filtered.slice(start, end);

    let html = "";
    paginatedData.forEach((item) => {
        let statusBadge = item.status === 'Lulus' ? 'bg-emerald-500' : 'bg-red-500';
        
        // Pilihan Tombol Tergantung Tipe Tab
        let tombolAksi = window.dtState.type === 'rapor' 
            ? `<div class="flex justify-center gap-2">
                 <button onclick="window.unduhPDF(${item.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm focus:outline-none flex gap-1 items-center transition-colors"><i class="ph-bold ph-download-simple"></i> Unduh</button>
                 <button onclick="window.bukaModalNilai(${item.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm focus:outline-none flex gap-1 items-center transition-colors"><i class="ph-bold ph-eye"></i> Lihat Nilai</button>
               </div>`
            : `<div class="flex justify-center gap-2">
                 <button onclick="window.unduhPDF(${item.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm focus:outline-none flex gap-1 items-center transition-colors"><i class="ph-bold ph-download-simple"></i> Unduh</button>
               </div>`;

        html += `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="py-4 px-5 text-brand-dark font-medium">${item.id}</td>
                <td class="py-4 px-5"><p class="font-bold text-brand-dark mb-1 text-sm">${item.program}</p><span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">${item.kategori}</span></td>
                <td class="py-4 px-5"><span class="${statusBadge} text-white text-xs font-bold px-3 py-1 rounded shadow-sm">${item.status}</span></td>
                <td class="py-4 px-5">${tombolAksi}</td>
            </tr>`;
    });

    if (paginatedData.length === 0) html = `<tr><td colspan="4" class="text-center py-6 text-brand-muted font-medium">Data tidak ditemukan</td></tr>`;
    tbody.innerHTML = html;

    // Update Info & Pagination
    const total = window.dtState.filtered.length;
    document.getElementById("table-info-entries").textContent = `Showing ${total === 0 ? 0 : start + 1} to ${Math.min(end, total)} of ${total} entries`;
    
    // Render Kotak Pagination
    const container = document.getElementById("dt-pagination");
    const totalPages = Math.ceil(total / window.dtState.limit) || 1;
    let pagHtml = "";
    const prevDis = window.dtState.page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer';
    const nextDis = window.dtState.page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer';

    pagHtml += `<button onclick="window.dtChangePage(${window.dtState.page - 1})" class="px-3 py-1.5 bg-white text-brand-muted text-xs font-semibold transition-colors focus:outline-none ${prevDis}" ${window.dtState.page === 1 ? 'disabled' : ''}>Previous</button>`;
    for(let i=1; i<=totalPages; i++) {
        if(i === window.dtState.page) pagHtml += `<button class="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold border-l border-r border-blue-700 focus:outline-none">${i}</button>`;
        else pagHtml += `<button onclick="window.dtChangePage(${i})" class="px-3 py-1.5 bg-white text-brand-muted text-xs font-semibold hover:bg-slate-50 border-l border-slate-200 transition-colors focus:outline-none">${i}</button>`;
    }
    pagHtml += `<button onclick="window.dtChangePage(${window.dtState.page + 1})" class="px-3 py-1.5 bg-white text-brand-muted text-xs font-semibold border-l border-slate-200 transition-colors focus:outline-none ${nextDis}" ${window.dtState.page === totalPages ? 'disabled' : ''}>Next</button>`;
    container.innerHTML = pagHtml;
};

// ===================================
// FUNGSI MODAL & PDF GENERATOR
// ===================================
window.bukaModalNilai = function(id) {
    const data = window.dtState.data.find(d => d.id === id);
    if(!data || !data.nilai) return;
    const n = data.nilai;
    
    document.getElementById("modal-nilai-program").textContent = data.program;
    document.getElementById("val-absensi").textContent = n.absensi; document.getElementById("val-nakp").textContent = n.kp; document.getElementById("val-pr").textContent = n.pr;
    document.getElementById("val-utpt").textContent = n.utpt; document.getElementById("val-utpp").textContent = n.utpp; document.getElementById("val-uapt").textContent = n.uapt;
    document.getElementById("val-uapp").textContent = n.uapp; document.getElementById("val-akhir").textContent = n.akhir;

    const modal = document.getElementById("modal-nilai");
    const modalBox = document.getElementById("modal-box-nilai");
    modal.classList.remove("hidden");
    setTimeout(() => { modal.classList.remove("opacity-0"); modalBox.classList.remove("scale-95"); }, 10);
};

window.tutupModalNilai = function() {
    const modal = document.getElementById("modal-nilai");
    const modalBox = document.getElementById("modal-box-nilai");
    modal.classList.add("opacity-0"); modalBox.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
};

// SAKTI: LANGSUNG DOWNLOAD KE PDF
window.unduhPDF = function(id) {
    const data = window.dtState.data.find(d => d.id === id);
    const type = window.dtState.type; // rapor atau sertifikat
    
    // Panggil jsPDF dari CDN window
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Bikin Header PDF
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // Warna Brand Dark
    doc.text(`Data ${type === 'rapor' ? 'Rapor Nilai' : 'Sertifikat'}`, 14, 25);
    
    // Bikin Sub-header PDF
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); 
    doc.text(`Program: ${data.program}`, 14, 35);
    doc.text(`Kategori: ${data.kategori}`, 14, 42);
    doc.text(`Status Kelulusan: ${data.status}`, 14, 49);

    // Kalo Rapor, gambar tabel AutoTable
    if(type === 'rapor' && data.nilai) {
        const n = data.nilai;
        doc.autoTable({
            startY: 55,
            theme: 'grid',
            headStyles: { fillColor: [37, 99, 235] }, // Biru
            head: [['Komponen Penilaian', 'Nilai yang Diperoleh']],
            body: [
                ['Absensi (KP + KT)', n.absensi],
                ['Nilai Akhir KP', n.kp],
                ['PR', n.pr],
                ['UTP Teori', n.utpt],
                ['UTP Praktik', n.utpp],
                ['UAP Teori', n.uapt],
                ['UAP Praktik', n.uapp],
                [{ content: 'NILAI AKHIR', styles: { fontStyle: 'bold' } }, { content: n.akhir, styles: { fontStyle: 'bold' } }],
            ],
        })
    } else {
        // Kalo Sertifikat, kasih teks pernyataan doang
        doc.setFontSize(14);
        doc.setTextColor(30, 41, 59); 
        doc.text(`Menyatakan bahwa yang bersangkutan telah sah menyelesaikan program`, 14, 70);
        doc.text(`dan dinyatakan ${data.status.toUpperCase()} dari Noora Quran.`, 14, 78);
    }
    
    // Save file ke device user
    doc.save(`${type}_${data.program.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}