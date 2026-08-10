function initNavbarLogic() {
    // LOGIC MODE MOBILE
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const mobileSidebar = document.getElementById("mobile-sidebar");
    const mobileOverlay = document.getElementById("mobile-overlay");
    const mobileMenuLinks = document.querySelectorAll("#mobile-nav-menu a");

    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                mobileMenuLinks.forEach((item) => {
                    item.className = "flex items-center gap-3 px-4 py-3 text-brand-muted hover:text-brand-dark hover:bg-slate-50 font-medium text-sm rounded-lg border border-transparent transition-all";
                    const icon = item.querySelector("i");
                    if (icon) {
                        icon.className = icon.className.replace("ph-fill", "ph").replace("text-brand-yellow", "");
                    }
                });
                this.className = "flex items-center gap-3 px-4 py-3 bg-brand-yellow/20 text-brand-dark font-bold text-sm rounded-lg border border-brand-yellow/50 transition-all mobile-active-tab";
                const activeIcon = this.querySelector("i");
                if (activeIcon) {
                    activeIcon.className = activeIcon.className.replace("ph", "ph-fill") + " text-brand-yellow";
                }
            });
        });
    }

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

    // LOGIC PILL MENU ACTIVE/INACTIVE (DESKTOP)
    const navMenuLinks = document.querySelectorAll("#nav-menu a");

    navMenuLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            navMenuLinks.forEach((item) => {
                item.className = "flex items-center gap-2 px-4 py-1.5 text-brand-muted hover:text-brand-dark hover:bg-white/50 font-medium text-sm rounded-md border border-transparent transition-all";
                const icon = item.querySelector("i");
                if (icon) {
                    icon.className = icon.className.replace("ph-fill", "ph").replace("text-brand-yellow", "");
                }
            });
            this.className = "flex items-center gap-2 px-4 py-1.5 bg-white text-brand-dark font-semibold text-sm rounded-md shadow-sm border border-slate-200/50 transition-all active-tab";
            const activeIcon = this.querySelector("i");
            if (activeIcon) {
                activeIcon.className = activeIcon.className.replace("ph", "ph-fill") + " text-brand-yellow";
            }
        });
    });
}