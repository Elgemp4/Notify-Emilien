let openedWindow;

//Simply skip the waiting and claiming the new clients 
addEventListener("install", (e) => {
    skipWaiting();
})

addEventListener("activate", (e) => {
    clients.claim();
})

//When we receive a message from the page, we show a notification
addEventListener("message", async (e) => {
    openedWindow = e.source;
    console.log(Notification.permission)
    if (Notification.permission === "granted") {
        registration.showNotification("Clique ici pour revenir à l'onglet ouvert !");
    }
})

//When the notification is clicked, focus the web page that launched the notification
addEventListener("notificationclick", (e) => {
    e.notification.close();
    openedWindow.focus();
});