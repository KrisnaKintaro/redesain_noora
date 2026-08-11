window.renderUpdateProfil = function() {
    const appContent = document.getElementById("app-content");
    appContent.innerHTML = window.AppTemplates.formUpdateProfil;
    window.scrollTo(0,0);
};

window.renderUpdatePassword = function() {
    const appContent = document.getElementById("app-content");
    appContent.innerHTML = window.AppTemplates.formUpdatePassword;
    window.scrollTo(0,0);
};