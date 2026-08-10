function initProgramMateriLogic() {
    // DATA SIMULASI PROGRAM & MATERI
    const apiDataProgram = [
        {
            id: "prog-1", type: "teori", name: "Quranic Arabic Level 1", desc: "Hanya Kelas Teori",
            materi: {
                teori: [
                    { judul: "Pekan 1 - Pengantar Hukum Mim", tanggal: "Senin, 10 Agustus 2026 - 09:00 WIB" },
                    { judul: "Pekan 2 - Mim Sakinah (Ikhfa)", tanggal: "Senin, 17 Agustus 2026 - 09:00 WIB" },
                    { judul: "Ujian Tengah Program (Teori)", tanggal: "Senin, 24 Agustus 2026 - 09:00 WIB" }
                ],
                praktik: []
            }
        },
        {
            id: "prog-2", type: "praktik", name: "Tahsin & Tajwid Praktik", desc: "Hanya Kelas Praktik",
            materi: {
                teori: [],
                praktik: [
                    { judul: "Praktik 1 - Makharijul Huruf", tanggal: "Selasa, 11 Agustus 2026 - 13:00 WIB" },
                    { judul: "Praktik 2 - Sifatul Huruf", tanggal: "Selasa, 18 Agustus 2026 - 13:00 WIB" }
                ]
            }
        },
        {
            id: "prog-3", type: "both", name: "Bahasa Arab Komprehensif", desc: "Kelas Teori & Praktik",
            materi: {
                teori: [{ judul: "Pekan 1 - Pengenalan Isim", tanggal: "Rabu, 12 Agustus 2026 - 08:00 WIB" }],
                praktik: [{ judul: "Praktik 1 - Hiwar Dasar", tanggal: "Kamis, 13 Agustus 2026 - 15:30 WIB" }]
            }
        }
    ];

    const dropdownBtn = document.getElementById("dropdown-program-btn");
    const dropdownMenu = document.getElementById("dropdown-program-menu");
    const programTitleDisplay = document.getElementById("program-title-display");
    const selectedProgramLabel = document.getElementById("selected-program-label");
    const tabContainer = document.getElementById("tab-container");
    const tabTeori = document.getElementById("tab-teori");
    const tabPraktik = document.getElementById("tab-praktik");
    const classListContainer = document.getElementById("class-list-container");
    const overlayBlur = document.getElementById("pr-ujian-overlay");
    const contentReal = document.getElementById("pr-ujian-content");
    const displayClassName = document.getElementById("display-class-name");
    const displayClassDate = document.getElementById("display-class-date");

    let activeProgramData = null;

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", () => dropdownMenu.classList.toggle("hidden"));

        dropdownMenu.innerHTML = "";
        apiDataProgram.forEach((program) => {
            const btn = document.createElement("button");
            btn.className = "w-full text-left px-4 py-3 text-sm hover:bg-slate-50 border-b border-slate-100 transition-colors";
            btn.innerHTML = `<span class="block font-bold text-brand-dark">${program.name}</span><span class="text-xs text-brand-muted">${program.desc}</span>`;
            
            btn.addEventListener("click", () => {
                activeProgramData = program;
                programTitleDisplay.textContent = program.name;
                programTitleDisplay.classList.remove("text-brand-yellow");
                selectedProgramLabel.textContent = program.name;
                dropdownMenu.classList.add("hidden");
                tabContainer.classList.remove("hidden");
                
                tabTeori.classList.add("hidden");
                tabPraktik.classList.add("hidden");
                tabTeori.className = "flex-1 text-brand-muted font-medium text-xs py-2 rounded-md transition-all";
                tabPraktik.className = "flex-1 text-brand-muted font-medium text-xs py-2 rounded-md transition-all";
                
                if (program.type === "teori" || program.type === "both") {
                    tabTeori.classList.remove("hidden");
                    tabTeori.classList.add("bg-brand-yellow", "text-brand-dark", "font-bold", "shadow-sm");
                }
                if (program.type === "praktik" || program.type === "both") {
                    tabPraktik.classList.remove("hidden");
                    if (program.type === "praktik") {
                        tabPraktik.classList.add("bg-brand-yellow", "text-brand-dark", "font-bold", "shadow-sm");
                    }
                }
                renderClassList(program.type === "praktik" ? "praktik" : "teori");
            });
            dropdownMenu.appendChild(btn);
        });
    }

    function renderClassList(listType) {
        if (!classListContainer) return;
        classListContainer.innerHTML = "";
        overlayBlur.classList.remove("hidden");
        setTimeout(() => overlayBlur.classList.remove("opacity-0"), 10);
        contentReal.classList.remove("opacity-100");
        contentReal.classList.add("opacity-0");

        if (!activeProgramData) return;
        const items = activeProgramData.materi[listType] || [];

        items.forEach((cls) => {
            const btn = document.createElement("button");
            btn.className = "w-full text-left p-3 text-brand-muted text-sm font-medium hover:bg-slate-50 hover:text-brand-dark rounded-md transition-colors border-l-[3px] border-transparent class-item-btn";
            btn.textContent = cls.judul;

            btn.addEventListener("click", () => {
                document.querySelectorAll(".class-item-btn").forEach((b) => {
                    b.className = "w-full text-left p-3 text-brand-muted text-sm font-medium hover:bg-slate-50 hover:text-brand-dark rounded-md transition-colors border-l-[3px] border-transparent class-item-btn";
                });
                btn.className = "w-full text-left p-3 bg-slate-50 border-l-[3px] border-brand-yellow rounded-r-md text-sm font-semibold text-brand-dark transition-colors class-item-btn";
                
                overlayBlur.classList.add("opacity-0");
                setTimeout(() => overlayBlur.classList.add("hidden"), 300);
                contentReal.classList.remove("opacity-0");
                contentReal.classList.add("opacity-100");
                
                displayClassName.textContent = cls.judul;
                displayClassDate.textContent = cls.tanggal;
                
                const tabPrBtn = document.getElementById("tab-pr-btn");
                if (tabPrBtn) tabPrBtn.click();
            });
            classListContainer.appendChild(btn);
        });
    }

    if (tabTeori) {
        tabTeori.addEventListener("click", () => {
            tabTeori.className = "flex-1 bg-brand-yellow text-brand-dark font-bold text-xs py-2 rounded-md shadow-sm transition-all";
            tabPraktik.className = "flex-1 text-brand-muted font-medium text-xs py-2 hover:text-brand-dark transition-all";
            renderClassList("teori");
        });
    }

    if (tabPraktik) {
        tabPraktik.addEventListener("click", () => {
            tabPraktik.className = "flex-1 bg-brand-yellow text-brand-dark font-bold text-xs py-2 rounded-md shadow-sm transition-all";
            tabTeori.className = "flex-1 text-brand-muted font-medium text-xs py-2 hover:text-brand-dark transition-all";
            renderClassList("praktik");
        });
    }

    // LOGIC DATA PR & UJIAN
    const tabPrBtn = document.getElementById("tab-pr-btn");
    const tabUjianBtn = document.getElementById("tab-ujian-btn");
    const taskListContainer = document.getElementById("task-list-container");

    const taskData = [
        { type: "PR", title: "Tugas Pemahaman Hukum Mim", deadline: "15 Agustus 2026", status: "belum", score: null },
        { type: "PR", title: "Hafalan Praktik", deadline: "10 Agustus 2026", status: "selesai", score: 95 },
        { type: "Ujian", title: "Ujian Tengah Program (Teori)", deadline: "30 Agustus 2026", status: "belum", score: null },
        { type: "Ujian", title: "Pre-Test Kemampuan Awal", deadline: "1 Agustus 2026", status: "selesai", score: 100 },
    ];

    function renderTasks(tabType) {
        if (!taskListContainer) return;
        taskListContainer.innerHTML = "";
        const filteredTasks = taskData.filter((task) => task.type === tabType);

        if (filteredTasks.length === 0) {
            taskListContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <i class="ph-fill ph-file-dashed text-4xl text-slate-300 mb-2"></i>
                    <p class="text-sm text-brand-muted font-medium">Belum ada ${tabType} untuk kelas ini.</p>
                </div>`;
            return;
        }

        filteredTasks.forEach((task) => {
            let statusBadge, actionUI, borderClass, onClickEvent;
            
            if (task.status === "selesai") {
                borderClass = "border-green-200 hover:border-green-400 bg-green-50/30 cursor-pointer";
                onClickEvent = `onclick="openTask('selesai')"`; 
                statusBadge = `<span class="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded mb-1 inline-flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> Selesai</span>`;
                actionUI = `<div class="flex flex-col items-end"><span class="text-[10px] text-brand-muted font-bold uppercase tracking-wider mb-1">Nilai Akhir</span><span class="text-xl font-extrabold text-green-600 leading-none">${task.score}</span></div>`;
            } else {
                borderClass = "border-slate-200 hover:border-brand-yellow bg-white";
                onClickEvent = ``; 
                statusBadge = `<span class="text-[10px] bg-brand-yellow/20 text-yellow-700 font-bold px-2 py-0.5 rounded mb-1 inline-block">${task.type}</span>`;
                actionUI = `<button onclick="openTask('belum')" class="px-5 py-2.5 bg-brand-yellow text-brand-dark text-xs font-bold rounded-lg hover:bg-[#F5D345] shadow-sm transition-transform hover:scale-105 active:scale-95">Kerjakan</button>`; // <--- INI PENTING
            }

            taskListContainer.insertAdjacentHTML("beforeend", `
                <!-- Selipin onClickEvent di div card ini -->
                <div ${onClickEvent} class="p-4 border ${borderClass} rounded-xl shadow-sm transition-all flex justify-between items-center">
                    <div>
                        ${statusBadge}
                        <h4 class="font-bold text-brand-dark text-sm mt-1">${task.title}</h4>
                        <p class="text-xs text-brand-muted mt-1 flex items-center gap-1">
                            <i class="ph ph-calendar-blank"></i> Batas: ${task.deadline}
                        </p>
                    </div>
                    ${actionUI}
                </div>
            `);
        });
    }

    if (tabPrBtn && tabUjianBtn) {
        tabPrBtn.addEventListener("click", () => {
            tabPrBtn.className = "px-8 py-3 text-sm font-bold text-brand-dark border-b-2 border-brand-yellow transition-colors focus:outline-none";
            tabUjianBtn.className = "px-8 py-3 text-sm font-medium text-brand-muted hover:text-brand-dark border-b-2 border-transparent transition-colors focus:outline-none";
            renderTasks("PR");
        });

        tabUjianBtn.addEventListener("click", () => {
            tabUjianBtn.className = "px-8 py-3 text-sm font-bold text-brand-dark border-b-2 border-brand-yellow transition-colors focus:outline-none";
            tabPrBtn.className = "px-8 py-3 text-sm font-medium text-brand-muted hover:text-brand-dark border-b-2 border-transparent transition-colors focus:outline-none";
            renderTasks("Ujian");
        });
    }
}