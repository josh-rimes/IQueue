# IQueue

IQueue helps you monitor your place in ticket queues without sitting in front of your screen.  
You can go do chores, and IQueue will notify you when it’s time to come back.

⚠️ **Important disclaimer:**  
IQueue does **not** bypass or automate ticket purchasing. It does not scrape, spoof, or circumvent any protections.  
It works using **user-side signals** (e.g., user-provided status URLs, confirmation emails, or opt-in integrations).  
Always follow the Terms of Service of ticket providers.

---

## Features (MVP)
- User provides a ticket queue URL or status info (manually or via email integration).  
- IQueue periodically checks for updates (with consent).  
- Sends push notifications to your phone when you’re close to the front of the queue.  
- All data handled securely, with minimal storage.

---

## Tech Stack
- **Backend**: Node.js + Express + PostgreSQL  
- **Frontend**: React Native (Expo)  
- **Notifications**: Firebase Cloud Messaging (FCM)

---

## Setup

### Backend Setup

Run the following commands:

``` bash
cd /backend
npm install
npm run dev
```

### Mobile Setup

Run the following commands:

``` bash
cd /mobile/iqueue-mobile
npm install
npx expo start
```

Open the app using Expo Go or an android emulator

---

## Contributing

Fork & clone the repo

Use feature branches (feature/abc)

Submit Pull Requests to Josh Rimes
