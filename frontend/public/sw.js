self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.title;
  const body = data.body;
  const icon = data.icon;
  const url = data.data.url;

  const notificationOptions = {
      body: body,
      icon: icon,
      data: {
          url: url,
      },
  };

  event.waitUntil(
      self.registration.showNotification(title, notificationOptions)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
      clients.openWindow(event.notification.data.url)
  );
});
