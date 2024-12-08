import { useEffect } from "react";
import { API_URL } from "../constant";
import { useAuth } from "../contexts/AuthContext";

export default function useNotification() {
    const { currentId, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const requestNotificationPermission = async () => {
                const permission = await Notification.requestPermission();
                console.log("Coba notif");
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                } else if (permission === "denied") {
                    console.log("Notification permission denied.");
                    alert("Notification permission was denied. To enable notifications, please change your browser settings.");
                } else {
                    console.log("Notification permission dismissed.");
                }
            };

            if (Notification.permission === "default") {
                requestNotificationPermission();
            } else if (Notification.permission === "denied") {
                alert("You have previously denied notifications. Please enable them in your browser settings to receive updates.");
            } else {
                console.log("Notification permission already granted.");
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const handleServiceWorker = async () => {
            if ("serviceWorker" in navigator) {
                try {
                    const register = await navigator.serviceWorker.register("/sw.js");
                    console.log("Service Worker registered successfully:", register);

                    const VAPID_PUBLIC_KEY = "BDRB4CRl5Vi_fjIXQQVuDKhysUQq0Yb8YAcFvKaF4WaYBmKyH89KUnU8bOYPojbJCjhQI8it-8w9nxBCAyb9yy8";
                    // const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY as string;

                    const subscription = await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: VAPID_PUBLIC_KEY,
                    });

                    console.log("Push subscription successful:", subscription.getKey('p256dh'));

                    const subscriptionWithUserId = {
                        subscription: subscription,
                        user_id: currentId,
                    };

                    console.log("Push subscription successful with user id:", subscriptionWithUserId);

                    const res = await fetch(`${API_URL}/subscribe`, {
                        method: "POST",
                        body: JSON.stringify(subscriptionWithUserId),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!res.ok) {
                        throw new Error("Failed to subscribe to push notifications");
                    }

                    const data = await res.json();
                    console.log("Server response:", data);
                } catch (error) {
                    console.error("Error during service worker registration or push subscription:", error);
                }
            }
        };

        if (isAuthenticated) handleServiceWorker();
    }, [currentId, isAuthenticated]);

};