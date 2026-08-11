window.switchTabSertifikat = function(tab) {
    const btnRapor = document.getElementById("tab-rapor");
    const btnSerti = document.getElementById("tab-sertifikat");
    const thAksi = document.getElementById("th-aksi");
    
    // Switch Class
    const classAktif = "px-8 py-2.5 text-sm font-bold rounded-md transition-all bg-white text-brand-dark shadow-sm border border-slate-200/50";
    const classPasif = "px-8 py-2.5 text-sm font-medium text-brand-muted hover:text-brand-dark rounded-md transition-all border border-transparent";
    
    if (tab === 'rapor') {
        btnRapor.className = classAktif;
        btnSerti.className = classPasif;
        thAksi.textContent = "Aksi Rapor";
        if(window.renderTableData) window.renderTableData(window.mockDataRapor, 'rapor');
    } else {
        btnSerti.className = classAktif;
        btnRapor.className = classPasif;
        thAksi.textContent = "Aksi Sertifikat";
        if(window.renderTableData) window.renderTableData(window.mockDataSertifikat, 'sertifikat');
    }
};