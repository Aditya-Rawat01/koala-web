# 🐨 Koala Web (Dashboard + Playground)

This repository contains the web dashboard and interactive playground for Koala, a privacy-first, self-hosted uptime monitoring tool.

The playground is designed to showcase the UI and real-time experience of Koala without requiring a full self-hosted setup.

## ✨ What the Playground Demonstrates

- Real-time SSE event streaming (live updates)
- Live latency line charts and status transitions
- Endpoint monitoring interface and UX
- Developer-first dashboard design

## 🔒 Privacy & How Requests Work

The playground does **not store, log, or persist** any of the endpoints you test.

All monitoring requests in playground mode are:
- Executed directly from your browser
- Not stored on any server
- Not saved in any database
- Not used for analytics or tracking

This means your test endpoints remain local to your session and infrastructure visibility is not retained by the playground.

## ⚠️ Playground Limitations

Since this is a browser-based demo, it has a few intentional limitations:

### 1. CORS Restrictions
Endpoint checks are performed from your browser, so the target API must allow CORS.
If CORS is blocked, requests may fail even if the endpoint is actually healthy.

> Tip: For best results, test endpoints that allow cross-origin requests or use public APIs.

### 2. No Persistent Monitoring Jobs
The playground does **not run background monitoring** or scheduled checks.  
It only demonstrates real-time UI behavior.

### 3. No Email Alerts
Alerting (SMTP) is disabled in playground mode and only available in the self-hosted version.

### 4. Ephemeral Data
All data shown in the playground is temporary and may reset on refresh or new sessions.

### 5. Not Intended for Production Use
The playground is for exploration and UI testing only, not for real infrastructure monitoring.

## 🚀 For Full Self-Hosted Monitoring

To run Koala with:
- Persistent monitoring jobs
- Email alerts (SMTP)
- SQLite storage
- Production-grade uptime tracking

Use the core server repository instead.

> ⚠️ This repository is the web/playground version only.  
> To self-host Koala with alerts and monitoring jobs, use the core server repo.
