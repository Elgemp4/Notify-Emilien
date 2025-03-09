//Registering the service worker
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js");
}
//The current service worker registration
let registration;
//The id of the current the timeout for this page
let closePageTimeoutId;

//Define the registration variable
navigator.serviceWorker.ready.then(reg => {
    registration = reg;
})

//When the window is blurred, start a 5 seconds timeout before sending message to service worker
addEventListener("blur", (e) => {
    closePageTimeoutId = setTimeout(() => {
        if(registration != null){
            registration.active.postMessage("blured");
        }
        closePageTimeoutId = null;
    }, 5000)
})

//When the window is focused back cancel the timeout if there is one
addEventListener("focus", (e) => {
    if(closePageTimeoutId != null){
        clearTimeout(closePageTimeoutId);
    }
})

//Request the permission if it isn't granted
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

//Gets the notify me button and send a notification when it's clicked
const $notifyMe = document.querySelector(".notify-me");
$notifyMe.addEventListener("click", (e) => {
    e.preventDefault();
    if(Notification.permission === "granted"){
        Notification.requestPermission();
        new Notification("Notifications activée !")
    }
})