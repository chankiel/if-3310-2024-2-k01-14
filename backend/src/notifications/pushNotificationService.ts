import { urlB64ToUint8Array } from "../utils/urlb64";

export function subscribeUserToPush(registration: ServiceWorkerRegistration) {
    const vapid_private_key: string = process.env.VAPID_PUBLIC_KEY!;
    const applicationServerKey = urlB64ToUint8Array(vapid_private_key);
    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(function(subscription) {
        sendSubscriptionToServer(subscription);
    }).catch(function(err) {
        console.warn("Failed to subscribe the user ", err);
    })
    
}

function sendSubscriptionToServer(subscription: PushSubscription) {
    fetch('/api/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}