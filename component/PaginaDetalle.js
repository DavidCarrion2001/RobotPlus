function openPopup(url, title) {
    const popupWidth = 800;
    const popupHeight = 600;
    const left = (screen.width - popupWidth) / 2;
    const top = (screen.height - popupHeight) / 4;
    const popupOptions = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=no,scrollbars=yes`;

    window.open(url, title, popupOptions);
}