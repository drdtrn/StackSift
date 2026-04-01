# M1 — Product Definition Document
**Project:** StackSift — AI-Powered SRE & Log-Analysis Platform
**Epic:** EPIC-01 · Product Foundation
**Status:** Document — Reviewed
**Generated with:** Claude (Anthropic) — see AI Log below
**Date:** 2026-04-01

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Target Users & Personas](#2-target-users--personas)
3. [Jobs-to-be-Done (JTBD)](#3-jobs-to-be-done-jtbd)
4. [Competitive Analysis](#4-competitive-analysis)
5. [The Business Model & Pricing](#5-the-business-model--pricing)
6. [Access Levels](#6-access-levels)
7. [Multi-Tenancy — How Isolation Works](#7-multi-tenancy--how-isolation-works)
8. [Hypothesis-Driven Framing](#8-hypothesis-driven-framing)
9. [MoSCoW Prioritization](#9-moscow-prioritization)
10. [MVP Scope by Discipline](#10-mvp-scope-by-discipline)

---

## 1. Problem Statement

### The Core Pain

When a production server breaks at 2am, a solo developer or small engineering team faces a brutal problem: hundreds or thousands of raw log lines, no clear narrative, and the clock ticking.

The real question is never "what is the error?" — that's visible. The real question is **"why did it happen, in what order, and how do I fix it permanently?"** Answering that today requires:

- Manually scanning log files over SSH or a basic dashboard
- Cross-referencing multiple error types to infer causation
- Googling unfamiliar stack traces
- Recalling from memory whether this happened before and how it was resolved

**Average time to root cause: 45 minutes to 3 hours.** Often in the middle of the night. Often by the one person who cannot afford to be unavailable.

### Why Existing Solutions Don't Solve It

Enterprise observability platforms — Datadog, New Relic, Coralogix — do solve this problem, but for the wrong customer. They are priced at $500–$5,000/month and require dedicated DevOps staff to configure and maintain. A solo developer running a SaaS product on a $20/month VPS cannot justify that spend, and a 4-person startup cannot spare an engineer-week to configure the ELK stack.

**The gap:** there is no tool that sits at the intersection of *affordable*, *zero-config*, and *AI-powered root cause analysis* for small technical teams. StackSift fills that gap.

### Who Suffers Most

The pain is sharpest for developers who:

- Run production systems but have no dedicated infrastructure or SRE role
- Cannot afford multiple hours of downtime — even a 1-hour outage can mean lost revenue, churn, and reputational damage
- Have logs already (everything logs) but no system to *understand* them
- Would benefit enormously from expert-level incident analysis but cannot hire that expertise

---

## 2. Target Users & Personas

### Persona A — "The Solo Architect"

| Attribute | Detail |
|---|---|
| **Who they are** | A developer who built and operates their own product. Could be an indie SaaS maker, a freelancer managing client servers, or a bootcamp grad running their first production app. |
| **Technical level** | Competent full-stack developer. Not a dedicated DevOps or SRE engineer. |
| **Infrastructure** | Typically Render, Hetzner, DigitalOcean, or a home server. 1–3 services in production. |
| **Current state** | Has logs. Has no system to read them. Falls back to SSH and manual grep during incidents. |
| **Willingness to pay** | $0–$19/month. Will pay for peace of mind, not features. |
| **Key frustration** | "I spend more time debugging than building. And the worst part is, I've seen this error before — I just can't remember how I fixed it." |
| **What they need from StackSift** | An automated first responder that tells them what broke, why, and what to do — in plain English — in under 60 seconds. |

### Persona B — "The Small Team"

| Attribute | Detail |
|---|---|
| **Who they are** | A startup with 2–8 engineers. Has staging and production environments, multiple services, real users, real uptime expectations. |
| **Technical level** | Has engineers who understand observability but no one whose *job* it is. |
| **Infrastructure** | AWS, GCP, or a mix of managed services. 3–10 services. Might have basic CloudWatch or Sentry, but nothing comprehensive. |
| **Current state** | Knows they *should* have proper observability. Every attempt to configure ELK or set up Datadog gets deprioritized. |
| **Willingness to pay** | $79/month as a team. Will pay for something that requires zero ongoing maintenance. |
| **Key frustration** | "We keep having incidents that take hours to diagnose. We know we should set up proper logging, but we never finish the project." |
| **What they need from StackSift** | A platform that is production-ready on day one, requires no dedicated ops work, and gives the whole team visibility into system health. |

### Who StackSift Is NOT For

- Enterprise companies with 50+ engineers or dedicated SRE teams
- Organizations with large compliance requirements (SOC 2, HIPAA, etc.) that need vendor-managed data residency guarantees
- Teams already invested in Datadog, Splunk, or similar platforms with existing integrations

---

## 3. Jobs-to-be-Done (JTBD)

JTBD framing describes the *progress* users are trying to make, not just the features they want. Each job is framed as: *"When [situation], I want to [motivation], so I can [outcome]."*

### Functional Jobs

**JTBD-F1 — Rapid Root Cause Identification**
> "When my production system throws errors, I want to understand the root cause in under two minutes, so I can fix it before users notice or before it gets worse."

*This is the primary job. Everything else in StackSift exists to support this moment.*

**JTBD-F2 — Institutional Memory for Incidents**
> "When I'm debugging an error, I want to know if I've seen this before and how I resolved it, so I don't have to solve the same problem twice."

*Today this lives in Slack history, personal notes, or nowhere at all. StackSift's vector-search over past resolved incidents solves this directly.*

**JTBD-F3 — Proactive Anomaly Detection**
> "When my system starts behaving abnormally (before users report it), I want to be alerted immediately with context, so I can respond before the problem escalates."

*Alert rules + real-time anomaly detection. Users should never hear about incidents from their customers first.*

**JTBD-F4 — Zero-Config Infrastructure Monitoring**
> "When I start a new project or onboard a new service, I want observability set up in under 15 minutes without code changes, so I can focus on building rather than configuring."

*The Go agent addresses this. Drop a config file, run the binary, done.*

**JTBD-F5 — Client-Facing Transparency**
> "When I manage infrastructure for clients, I want to give them read-only visibility into system health, so I look professional and they feel confident without requiring my involvement."

*The Viewer role + health dashboard. A direct monetizable feature for the freelancer persona.*

### Emotional Job

**JTBD-E1 — Confidence Under Pressure**
> "When something breaks in production, I want to feel in control and competent, so I'm not panicking or second-guessing myself in front of users, teammates, or clients."

*The emotional job that underlies all functional jobs. Experienced engineers feel this too — StackSift gives you the feeling of having a senior SRE colleague on call at 2am.*

---

## 4. Competitive Analysis

The table below compares StackSift to its closest competitive alternatives across dimensions most relevant to our target users.

| | **StackSift** | **OneUptime** | **Coralogix** | **Rootly** | **Datadog** |
|---|---|---|---|---|---|
| **Primary target user** | Solo devs, small teams (1–8) | Solo devs, small teams | Mid-market engineering teams | Enterprise incident management | Enterprise / mid-market |
| **Starting price** | Free; $19/mo Indie | Free (self-host); ~$15/mo cloud | ~$90/mo (usage-based) | ~$50/user/mo | ~$15/host/mo (adds up fast) |
| **AI root cause analysis** | ✅ Core feature (GPT-4o-mini + vector search over past incidents) | ❌ Not offered | ⚠️ AI-powered anomaly detection; no root cause explanation | ⚠️ AI-assisted incident summaries (no log analysis) | ⚠️ Watchdog anomaly detection; no plain-English root cause |
| **Self-host option** | 🔜 Planned (agent is open-source) | ✅ Full self-host available | ❌ SaaS only | ❌ SaaS only | ❌ SaaS only |
| **Setup time** | < 15 min (agent drop-in) | < 30 min | Hours (complex pipeline config) | Hours (requires PagerDuty/Slack integration setup) | Days (full-feature setup) |
| **Log retention (free)** | 7 days | 7 days | Not offered free | N/A | N/A |
| **Multi-user / RBAC** | ✅ Admin / Engineer / Viewer | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Past incident recall** | ✅ Vector search over resolved incidents | ❌ | ❌ | ⚠️ Manual retrospectives | ❌ |
| **Best for** | Developer who needs a first responder | Developer who wants uptime monitoring | Team that needs powerful log search | Team with an on-call rotation | Team with a dedicated ops function |

### Key Competitive Insight

No competitor at the sub-$100/month price point offers AI-generated root cause analysis grounded in the user's own incident history. StackSift's most defensible differentiator is the combination of: (1) plain-English root cause explanation, (2) similarity search over *your* past incidents, and (3) a setup experience accessible to non-DevOps developers.

OneUptime is the most direct overlap on price and audience, but its focus is uptime monitoring rather than log analysis and AI diagnosis.

---

## 5. The Business Model & Pricing

### Pricing Tiers

**Free ($0/month)**
- 1 project
- 7-day log retention
- 10 AI analyses/month
- → *Enough to get hooked*

**Indie ($19/month)**
- 5 projects
- 30-day log retention
- 100 AI analyses/month
- → *The solo dev tier*

**Team ($79/month)**
- Unlimited projects
- 90-day log retention
- Unlimited AI analyses
- Multiple users
- → *The small team tier*

### Cost Structure to Watch

OpenAI API costs money. Each AI analysis costs roughly $0.005–$0.02 depending on log context length. At scale, AI analysis costs are the main variable cost. Rate-limit the free tier aggressively. Consider caching identical analyses — same error pattern = same answer.

### Growth Loop

When it works, users tell their dev friends "this tool just told me in 10 seconds what took me an hour to find." That's a word-of-mouth product. Build a shareable incident report page (public URL for a specific incident + its AI explanation) — that's the viral loop.

---

## 6. Access Levels

StackSift uses three role levels within every Organization:

| Role | Permissions |
|---|---|
| **Admin** | Everything: billing, invite/remove users, delete projects, see all data |
| **Engineer** | Create projects, configure alerts, ingest logs, run AI analysis, acknowledge alerts |
| **Viewer** | Read-only: view dashboards, browse logs, see incidents — no changes |

**Practical use case:** You're a freelancer. You create an org. You add your client as a Viewer so they can see the health dashboard. They feel confident, you look professional, they never touch anything they shouldn't.

---

## 7. Multi-Tenancy — How Isolation Works

Every user belongs to an Organization. Every piece of data — projects, logs, incidents, alerts — is tagged with an `OrganizationId`. When you query anything, the system automatically filters by your organization. You literally cannot see another customer's logs.

If you invite a teammate, they see everything in your org. If you have a client, you can create a separate org for them.

This is the standard B2B SaaS pattern — the same model Slack, Linear, and Vercel use.

---

## 8. Hypothesis-Driven Framing

Each hypothesis follows the format: *"If we build X, then users will Y, and we will measure Z."*

### H1 — The Core Value Hypothesis

> **If** we deliver an AI-generated root cause explanation within 10 seconds of an alert firing, **then** solo developers and small teams will choose StackSift over manual log review and cheaper alternatives, **and we will measure** free-to-paid conversion rate, time-on-site during incidents, and qualitative user feedback ("it told me the exact problem").

**Risk:** The AI explanation quality may be too generic without sufficient log context. Mitigation: invest heavily in prompt engineering and log context enrichment from day one.

### H2 — The Activation Hypothesis

> **If** a user can go from sign-up to live logs streaming in under 15 minutes using the Go agent, **then** they will reach their "aha moment" (seeing a real incident analyzed) within their first week, **and we will measure** time-to-first-log (target: < 15 min) and 7-day retention rate.

**Risk:** Running an unknown binary on a production server is a trust barrier. Mitigation: open-source the agent from launch.

### H3 — The Retention Hypothesis

> **If** StackSift surfaces past similar incidents when a new incident fires, **then** users will experience compounding value the longer they use the product (it gets smarter about *their* system), **and we will measure** 30-day and 90-day retention, and number of AI analyses run per user per month.

**Risk:** Users with low incident frequency will not build enough history to see the benefit. Mitigation: consider seeding vector DB with common patterns for new users.

### H4 — The Growth Hypothesis

> **If** we build a shareable public incident report page (public URL with AI explanation), **then** users will share it with colleagues and social networks during/after an incident, **and we will measure** referral traffic from shared incident URLs and sign-ups attributed to them.

**Risk:** Users may not want to share production incident details publicly. Mitigation: make sharing opt-in and redact sensitive log content by default.

### H5 — The Pricing Hypothesis

> **If** we limit the free tier to 10 AI analyses/month, **then** power users (those who have incidents regularly) will hit the limit and upgrade to Indie ($19/mo), **and we will measure** free tier AI analysis exhaustion rate and free-to-Indie conversion.

---

## 9. MoSCoW Prioritization

> **"If your Must Have list has more than 5–7 items, you have not been ruthless enough. Cut again."**
>
> **Your MVP = everything in Must Have. Nothing more.**

### Must Have *(MVP — ship nothing else first)*

1. **Log ingestion** — Accept logs via HTTP push (API key) and the Go agent (file-tail)
2. **Live log dashboard** — Real-time feed of incoming logs, color-coded by severity, updating via WebSockets
3. **AI incident analysis** — One-click root cause explanation from GPT-4o-mini within 10 seconds of clicking "Analyze"
4. **Alert rules** — Error count threshold over a time window fires an incident + email notification
5. **User auth & organizations** — Google SSO, OrganizationId-based multi-tenancy isolation, Admin/Engineer/Viewer roles

### Should Have *(Sprint 2 — high value, not blocking launch)*

- Slack notification channel for alerts
- Log Explorer with full-text search (Elasticsearch-backed)
- Vector search over past resolved incidents (pgvector similarity)
- In-app real-time notifications (toast + badge on alert fire)
- 30-day log retention enforcement and automated cleanup
- Email notifications

### Could Have *(Post-launch — nice to have)*

- Shareable public incident report page (viral loop feature)
- Regex-based alert rule conditions
- Dashboard sparkline graphs for log volume over time
- Multiple notification channels per alert rule
- Agent binary open-sourced with public documentation
- Telegram bot integration

### Won't Have *(Out of scope for v1)*

- Enterprise SSO (SAML / Okta)
- SOC 2 / HIPAA compliance features
- Custom log parsing pipelines
- Mobile app
- On-premise / self-hosted full platform (agent only)
- SLA / uptime monitoring (not our core job)

---

## 10. MVP Scope by Discipline

The sections below define the minimum buildable slice for each team. Nothing outside these lists ships in the MVP.

### 10.1 Frontend MVP

| # | Feature | Notes |
|---|---|---|
| 1 | **Sign-in page** (Google SSO) | Keycloak redirect; no custom auth UI beyond the button |
| 2 | **Create project flow** | Name a project, copy API key and agent install snippet |
| 3 | **Live log dashboard** | Real-time feed via SignalR/WebSocket; severity color-coding; active alert badge |
| 4 | **Incident detail view** | Log entries for the incident + "Analyze with AI" button + AI result display |
| 5 | **Alert rule builder** (basic) | Form: metric, threshold, window, email recipient — no wizard needed at MVP |

*Everything else — Log Explorer search UI, user management screen, billing page — is post-MVP.*

### 10.2 Backend MVP

| # | Feature | Notes |
|---|---|---|
| 1 | **Log ingest endpoint** (`POST /api/v1/logs/ingest`) | Accepts batches; validates API key; publishes to RabbitMQ |
| 2 | **Elasticsearch indexing worker** | Hangfire consumer; writes logs to ES with OrganizationId tag |
| 3 | **Alert rule evaluation worker** | Checks rules against incoming log batches; creates Alert + Incident on match |
| 4 | **AI analysis endpoint** | Pulls incident context → OpenAI Embeddings → GPT-4o-mini → stores AiAnalysis entity |
| 5 | **SignalR broadcast** | Pushes new logs and alert events to connected frontend clients in real-time |
| 6 | **Email notification** | Sends alert email via SMTP/SendGrid when an incident is created |

*pgvector similarity search, Slack integration, and log retention cleanup are post-MVP.*

### 10.3 DevOps MVP

| # | Feature | Notes |
|---|---|---|
| 1 | **Docker Compose stack** | API, worker, Elasticsearch, RabbitMQ, PostgreSQL, Keycloak — all local-runnable |
| 2 | **Go agent binary** | Tails log files; ships log batches to ingest endpoint; single YAML config |
| 3 | **CI pipeline** | Build + unit test on every PR (GitHub Actions); block merge on failure |
| 4 | **Environment config** | `.env.example` with all required variables documented; no secrets in repo |
| 5 | **Single-command deploy** | `docker compose up` brings the full stack up; documented in README |

*Kubernetes, auto-scaling, managed cloud deployment, and monitoring of StackSift itself are post-MVP.*

---

*Document path: `docs/milestones/M1-product-definition.md`*
*Generated by AI (Claude) per EPIC-01 requirements — reviewed and modified by team.*
