if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Desktop erkannt, Weiterleitung zu 'mobileLink.html'
    window.location.href = 'pages/mobileLink.html';
}