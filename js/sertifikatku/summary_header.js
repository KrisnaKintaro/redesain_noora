window.initSummaryHeader = function() {
    const elRapor = document.getElementById("count-rapor");
    const elSerti = document.getElementById("count-sertifikat");
    
    // Ambil panjang data dari variabel global (kalo ada)
    if (elRapor && window.mockDataRapor) elRapor.textContent = window.mockDataRapor.length;
    if (elSerti && window.mockDataSertifikat) elSerti.textContent = window.mockDataSertifikat.length;
};