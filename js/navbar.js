window.updateNavbarActive = function(targetText) {
    const navMenuLinks = document.querySelectorAll("#nav-menu a");
    const mobileMenuLinks = document.querySelectorAll("#mobile-nav-menu a");

    // 1. Update Tab Desktop
    navMenuLinks.forEach((item) => {
        const icon = item.querySelector("i");
        if (item.textContent.trim() === targetText) {
            item.className = "flex items-center gap-2 px-4 py-1.5 bg-white text-brand-dark font-semibold text-sm rounded-md shadow-sm border border-slate-200/50 transition-all active-tab";
            if (icon) {
                icon.classList.remove("ph");
                icon.classList.add("ph-fill", "text-brand-yellow");
            }
        } else {
            item.className = "flex items-center gap-2 px-4 py-1.5 text-brand-muted hover:text-brand-dark hover:bg-white/50 font-medium text-sm rounded-md border border-transparent transition-all";
            if (icon) {
                icon.classList.remove("ph-fill", "text-brand-yellow");
                icon.classList.add("ph");
            }
        }
    });

    // 2. Update Tab Mobile
    mobileMenuLinks.forEach((item) => {
        const icon = item.querySelector("i");
        if (item.textContent.trim() === targetText) {
            item.className = "flex items-center gap-3 px-4 py-3 bg-brand-yellow/20 text-brand-dark font-bold text-sm rounded-lg border border-brand-yellow/50 transition-all mobile-active-tab";
            if (icon) {
                icon.classList.remove("ph");
                icon.classList.add("ph-fill", "text-brand-yellow");
            }
        } else {
            item.className = "flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-dark hover:bg-slate-50 font-medium text-sm rounded-lg border border-transparent transition-all";
            if (icon) {
                icon.classList.remove("ph-fill", "text-brand-yellow");
                icon.classList.add("ph");
            }
        }
    });
};

function initNavbarLogic() {
    // LOGIC MENU KLIK (ROUTER)
    const navMenuLinks = document.querySelectorAll("#nav-menu a");
    const mobileMenuLinks = document.querySelectorAll("#mobile-nav-menu a");

    function handleNavClick(e) {
        e.preventDefault();
        const pageName = this.textContent.trim(); 
        
        // 1. Ubah warna tombol aktif
        window.updateNavbarActive(pageName);
        
        // 2. Minta app.js buat ngehancurin dan ganti DOM
        if(window.navigateTo) {
            window.navigateTo(pageName);
        }

        // Kalau di mode mobile, tutup sidebar otomatis abis diklik
        const mobileSidebar = document.getElementById("mobile-sidebar");
        const mobileOverlay = document.getElementById("mobile-overlay");
        if (mobileSidebar && !mobileSidebar.classList.contains("-translate-x-full")) {
            mobileSidebar.classList.add("-translate-x-full");
            mobileOverlay.classList.add("opacity-0");
            setTimeout(() => mobileOverlay.classList.add("hidden"), 300);
        }
    }

    navMenuLinks.forEach((link) => link.addEventListener("click", handleNavClick));
    mobileMenuLinks.forEach((link) => link.addEventListener("click", handleNavClick));


    // LOGIC BUKA TUTUP MOBILE
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const mobileSidebar = document.getElementById("mobile-sidebar");
    const mobileOverlay = document.getElementById("mobile-overlay");

    if (mobileMenuBtn && mobileSidebar) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileOverlay.classList.remove("hidden");
            setTimeout(() => {
                mobileOverlay.classList.remove("opacity-0");
                mobileSidebar.classList.remove("-translate-x-full");
            }, 10);
        });

        const closeSidebar = () => {
            mobileSidebar.classList.add("-translate-x-full");
            mobileOverlay.classList.add("opacity-0");
            setTimeout(() => {
                mobileOverlay.classList.add("hidden");
            }, 300);
        };

        closeSidebarBtn.addEventListener("click", closeSidebar);
        mobileOverlay.addEventListener("click", closeSidebar);
    }

    // LOGIC DROPDOWN PROFIL
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");
    const profileCaret = document.getElementById("profile-caret");

    if (profileBtn && profileDropdown && profileCaret) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("hidden");
            profileCaret.classList.toggle("rotate-180");
        });

        window.addEventListener("click", (e) => {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add("hidden");
                profileCaret.classList.remove("rotate-180");
            }
        });
    }
}