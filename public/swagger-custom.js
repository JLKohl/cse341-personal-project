window.addEventListener('load', function () {

    setTimeout(() => {

        const topbar = document.querySelector('.topbar');

        if (!topbar) return;

        const logoutButton = document.createElement('button');

        logoutButton.innerText = 'Logout';
        logoutButton.style.marginLeft = '20px';
        logoutButton.style.padding = '6px 12px';
        logoutButton.style.cursor = 'pointer';

        logoutButton.onclick = function () {
            window.location.href = '/auth/logout';
        };

        topbar.appendChild(logoutButton);

    }, 800);

});