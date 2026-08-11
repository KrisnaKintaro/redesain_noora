const totalSoal = 7;
let currentSoal = 1;
let jawabanUser = {}; 

let timerInterval;
let timeLeft = 5 * 60; 

// DATA SIMULASI SOAL (Ditambahin Kunci Jawaban "jawabanBenar")
const dummySoal = [
    { teks: "Waqaf dengan cara sukun mahd dapat dilakukan saat huruf terakhir pada kata tersebut berharakat...", opsi: { A: "Fathah", B: "Kasrah", C: "Dhammah", D: "Semua Benar" }, jawabanBenar: "D" },
    { teks: "Hukum membaca basmalah di awal setiap surat (kecuali At-Taubah) adalah...", opsi: { A: "Wajib", B: "Sunnah Muakkadah", C: "Mubah", D: "Makruh" }, jawabanBenar: "B" },
    { teks: "Apabila ada Nun Sukun atau Tanwin bertemu dengan huruf Ba (ب), maka hukum bacaannya adalah...", opsi: { A: "Ikhfa", B: "Idgham Bighunnah", C: "Iqlab", D: "Idzhar" }, jawabanBenar: "C" },
    { teks: "Huruf Qalqalah ada berapa?", opsi: { A: "3", B: "4", C: "5", D: "6" }, jawabanBenar: "C" },
    { teks: "Panjang bacaan Mad Thabi'i adalah...", opsi: { A: "1 Harakat", B: "2 Harakat", C: "4 Harakat", D: "6 Harakat" }, jawabanBenar: "B" },
    { teks: "Kata بِسْمِ ٱللَّهِ dibaca dengan hukum Tarqiq karena...", opsi: { A: "Didahului Fathah", B: "Didahului Kasrah", C: "Didahului Dhammah", D: "Berada di awal" }, jawabanBenar: "B" },
    { teks: "Huruf Isti'la yang wajib dibaca tebal (Tafkhim) di antaranya adalah...", opsi: { A: "Kha (خ)", B: "Sin (س)", C: "Lam (ل)", D: "Ta (ت)" }, jawabanBenar: "A" }
];

// NAVIGASI SPA & GANTI SESI
function openTask(status) {
    // 1. RENDER DOM TASK (Hancurkan DOM Home)
    window.renderTaskView();

    // 2. Reset semua sesi task jadi hidden dulu
    document.getElementById("task-sesi-1-container").classList.add("hidden");
    document.getElementById("task-sesi-2-container").classList.add("hidden");
    document.getElementById("task-sesi-3-container").classList.add("hidden");

    if (status === 'selesai') {
        // Render data hasil dan tampilkan
        if(Object.keys(jawabanUser).length === 0) {
            jawabanUser = { 1: 'D', 2: 'B', 3: 'A', 4: 'C', 5: 'A', 6: 'B', 7: 'A' };
        }
        renderHasilAkhir();
        document.getElementById("task-sesi-3-container").classList.remove("hidden");
    } else {
        // RESET PENGERJAAN
        jawabanUser = {}; 
        currentSoal = 1;
        clearInterval(timerInterval);

        // Tampilkan persiapan ujian
        document.getElementById("task-sesi-1-container").classList.remove("hidden");
    }
    window.scrollTo(0,0);
}

function closeTaskToHome() {
    // Matikan timer kalau kabur
    clearInterval(timerInterval);
    
    // RENDER ULANG DOM HOME (Hancurkan DOM Task)
    window.renderHomeView();
    
    window.scrollTo(0,0);
}

// SESI 1: MODAL MULAI
function bukaModalMulai() {
    const modal = document.getElementById("modal-mulai");
    const modalBox = document.getElementById("modal-box-mulai");
    modal.classList.remove("hidden");
    setTimeout(() => { modal.classList.remove("opacity-0"); modalBox.classList.remove("scale-95"); }, 10);
}
function tutupModalMulai() {
    const modal = document.getElementById("modal-mulai");
    const modalBox = document.getElementById("modal-box-mulai");
    modal.classList.add("opacity-0"); modalBox.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
}
function pindahKeSesi2() {
    tutupModalMulai();
    document.getElementById("task-sesi-1-container").classList.add("hidden");
    document.getElementById("task-sesi-2-container").classList.remove("hidden");
    window.scrollTo(0,0);
    
    renderSoal();
    startTimer();
}

// SESI 2: TIMER & SOAL
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 5 * 60; // 5 Menit
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu Habis! Jawaban Anda akan otomatis dikumpulkan.");
            pindahKeSesi3();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const display = document.getElementById("timer-display");
    if(!display) return;
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = timeLeft % 60;
    display.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function renderSoal() {
    document.getElementById("current-soal-number").textContent = currentSoal;
    const data = dummySoal[currentSoal - 1];
    document.getElementById("teks-soal").textContent = data.teks;
    
    let optsHtml = "";
    for(let key in data.opsi) {
        let isChecked = jawabanUser[currentSoal] === key ? "checked" : "";
        optsHtml += `
        <label class="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-brand-yellow hover:bg-yellow-50/30 transition-all group">
            <input type="radio" name="jawaban" value="${key}" onchange="markAnswered('${key}')" ${isChecked} class="w-5 h-5 text-brand-yellow focus:ring-brand-yellow border-slate-300">
            <span class="font-semibold text-brand-dark text-sm group-hover:text-yellow-700">${key}. ${data.opsi[key]}</span>
        </label>
        `;
    }
    document.getElementById("options-container").innerHTML = optsHtml;

    const btnPrev = document.getElementById("btn-sebelumnya");
    const btnNext = document.getElementById("btn-selanjutnya");
    const btnSelesai = document.getElementById("btn-selesai-pengerjaan");

    if(btnPrev) btnPrev.style.visibility = (currentSoal === 1) ? "hidden" : "visible";
    if(currentSoal === totalSoal) {
        if(btnNext) btnNext.classList.add("hidden");
        if(btnSelesai) btnSelesai.classList.remove("hidden");
    } else {
        if(btnNext) btnNext.classList.remove("hidden");
        if(Object.keys(jawabanUser).length < totalSoal && btnSelesai) {
            btnSelesai.classList.add("hidden");
        }
    }
    renderGrid();
}

function nextSoal() { if(currentSoal < totalSoal) { currentSoal++; renderSoal(); } }
function prevSoal() { if(currentSoal > 1) { currentSoal--; renderSoal(); } }
function jumpSoal(no) { currentSoal = no; renderSoal(); }

function markAnswered(opsi) {
    jawabanUser[currentSoal] = opsi; 
    if(Object.keys(jawabanUser).length === totalSoal) {
        document.getElementById("btn-selesai-pengerjaan").classList.remove("hidden");
    }
    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById("nav-soal-grid");
    if(!grid) return;
    let gridHTML = "";
    
    for(let i = 1; i <= totalSoal; i++) {
        let isAnswered = jawabanUser[i] ? "bg-brand-yellow font-bold text-brand-dark border-brand-yellow" : "bg-white text-brand-muted border-slate-200 hover:bg-slate-50";
        let isCurrent = (i === currentSoal) ? "ring-2 ring-offset-2 ring-brand-dark border-transparent" : "";
        gridHTML += `<button onclick="jumpSoal(${i})" class="w-full aspect-square flex items-center justify-center rounded-lg border text-sm transition-all ${isAnswered} ${isCurrent}">${i}</button>`;
    }
    grid.innerHTML = gridHTML;
}

// VALIDASI & PINDAH KE HASIL
function cekSelesai() {
    let soalBolong = totalSoal - Object.keys(jawabanUser).length; 

    const modal = document.getElementById("modal-validasi");
    const modalBox = document.getElementById("modal-box-validasi");
    const icon = document.getElementById("modal-icon-validasi");
    const title = document.getElementById("modal-title-validasi");
    const desc = document.getElementById("modal-desc-validasi");
    const btnBatal = document.getElementById("btn-batal-validasi");
    const btnKonfirm = document.getElementById("btn-konfirmasi-validasi");

    if (soalBolong > 0) {
        icon.innerHTML = `<div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5"><i class="ph-fill ph-warning-circle text-5xl text-red-500"></i></div>`;
        title.textContent = "Peringatan!";
        desc.innerHTML = `Terdapat <strong class="text-red-500 text-lg mx-1">${soalBolong}</strong> soal yang belum Anda kerjakan. Mohon selesaikan seluruh soal terlebih dahulu.`;
        
        btnBatal.classList.add("hidden"); 
        btnKonfirm.className = "w-full px-4 py-3 bg-brand-dark text-brand-yellow font-extrabold text-sm rounded-xl hover:bg-slate-800 shadow-sm";
        btnKonfirm.textContent = "Kembali ke Soal";
        btnKonfirm.onclick = tutupModalValidasi; 
    } else {
        icon.innerHTML = `<div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"><i class="ph-fill ph-check-circle text-5xl text-green-500"></i></div>`;
        title.textContent = "Selesaikan PR";
        desc.innerHTML = "Apakah Anda yakin menyelesaikan PR ini?<br>Keputusan ini bersifat permanen.";
        
        btnBatal.classList.remove("hidden");
        btnKonfirm.className = "flex-1 px-4 py-3 bg-brand-yellow text-brand-dark font-extrabold text-sm rounded-xl hover:bg-[#F5D345] shadow-sm";
        btnKonfirm.textContent = "Ya, Selesaikan";
        btnKonfirm.onclick = pindahKeSesi3;
    }

    modal.classList.remove("hidden");
    setTimeout(() => { modal.classList.remove("opacity-0"); modalBox.classList.remove("scale-95"); }, 10);
}

function tutupModalValidasi() {
    const modal = document.getElementById("modal-validasi");
    const modalBox = document.getElementById("modal-box-validasi");
    modal.classList.add("opacity-0"); modalBox.classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
}

function pindahKeSesi3() {
    clearInterval(timerInterval); // Matiin timer
    tutupModalValidasi();
    
    // RENDER NILAI DAN KARTU EVALUASI
    renderHasilAkhir();

    document.getElementById("task-sesi-2-container").classList.add("hidden");
    document.getElementById("task-sesi-3-container").classList.remove("hidden");
    window.scrollTo(0,0);
}

// SESI 3: RENDER EVALUASI AKHIR
function renderHasilAkhir() {
    let jumlahBenar = 0;
    let htmlRincian = "";

    // Looping seluruh soal dari Array dummySoal
    for (let i = 0; i < totalSoal; i++) {
        const no = i + 1;
        const soal = dummySoal[i];
        
        const kunciJawabanKey = soal.jawabanBenar; // Kunci (A/B/C/D)
        const kunciJawabanTeks = soal.opsi[kunciJawabanKey]; // Teks Kunci
        
        const userJawabanKey = jawabanUser[no]; // Jawaban User (A/B/C/D)
        const userJawabanTeks = userJawabanKey ? soal.opsi[userJawabanKey] : "Tidak Dijawab"; 
        
        const isBenar = (userJawabanKey === kunciJawabanKey);

        if (isBenar) {
            jumlahBenar++;
            htmlRincian += `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden hover:border-emerald-300 transition-colors">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
                <div class="flex justify-between items-start mb-4 pl-2">
                    <span class="bg-slate-100 text-brand-dark font-extrabold w-7 h-7 flex items-center justify-center rounded-md text-xs border border-slate-200">${no}</span>
                    <span class="bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5 tracking-wide"><i class="ph-fill ph-check-circle text-sm"></i> Benar</span>
                </div>
                <p class="text-sm font-semibold text-brand-dark mb-5 pl-2 leading-relaxed">${soal.teks}</p>
                <div class="bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-100 text-xs ml-2">
                    <p class="text-brand-muted mb-1 font-medium">Jawaban Anda & Kunci:</p>
                    <p class="font-bold text-emerald-600 text-sm">${kunciJawabanKey}. ${kunciJawabanTeks}</p>
                </div>
            </div>
            `;
        } else {
            // Tampilan kalau salah atau gak kejawab
            htmlRincian += `
            <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden hover:border-red-300 transition-colors">
                <div class="absolute top-0 left-0 w-1.5 h-full bg-red-400"></div>
                <div class="flex justify-between items-start mb-4 pl-2">
                    <span class="bg-slate-100 text-brand-dark font-extrabold w-7 h-7 flex items-center justify-center rounded-md text-xs border border-slate-200">${no}</span>
                    <span class="bg-red-100 border border-red-200 text-red-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1.5 tracking-wide"><i class="ph-fill ph-x-circle text-sm"></i> Salah</span>
                </div>
                <p class="text-sm font-semibold text-brand-dark mb-5 pl-2 leading-relaxed">${soal.teks}</p>
                <div class="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs flex flex-col gap-3 ml-2">
                    <div>
                        <p class="text-brand-muted mb-1 font-medium">Jawaban Anda:</p>
                        <p class="font-bold text-red-500 line-through text-sm">${userJawabanKey ? userJawabanKey + '. ' + userJawabanTeks : userJawabanTeks}</p>
                    </div>
                    <div class="pt-3 border-t border-slate-200 border-dashed">
                        <p class="text-brand-muted mb-1 font-medium">Kunci Jawaban:</p>
                        <p class="font-bold text-emerald-600 text-sm">${kunciJawabanKey}. ${kunciJawabanTeks}</p>
                    </div>
                </div>
            </div>
            `;
        }
    }

    // Kalkulasi nilai skala 100
    const nilaiAkhir = Math.round((jumlahBenar / totalSoal) * 100);

    // Tembak datanya ke DOM
    document.getElementById("hasil-jumlah-soal").textContent = totalSoal;
    document.getElementById("hasil-jawaban-benar").textContent = jumlahBenar;
    document.getElementById("hasil-nilai-akhir").textContent = nilaiAkhir;
    document.getElementById("hasil-rincian-container").innerHTML = htmlRincian;
}