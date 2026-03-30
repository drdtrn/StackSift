# StackSift

> **AI-Powered SRE & Log-Analysis Platform**
> Built for the LIFE Fellows AI Engineering Capstone — Cohort 2026

[![.NET](https://img.shields.io/badge/.NET-10.0-purple?logo=dotnet)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=nextdotjs)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

### Figma Wireframes
| Project | URL |
|---------|-----|
| StackSift | https://www.figma.com/make/ybDIrt1q4CQcqhjgkHMW70/UI-Mockup-for-StackSift?t=ZAyVpA04Nbu9r2Te-20&fullscreen=1&preview-route=%2Fdashboard |

---

## 👥 Team

| Name | Role |
|------|------|
| **Dardan** | DevOps Lead / Fullstack |
| **Jona** | Product Lead / Frontend |
| **Albin** | BackEnd Lead  |

---

## 🧱 Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | .NET 10 / C# 13 |
| Architecture | Clean Architecture (Api → Infrastructure → Application → Domain) |
| CQRS | MediatR |
| Validation | FluentValidation |
| ORM | Entity Framework Core |
| Database | PostgreSQL 16 + pgvector |
| Search | Elasticsearch 8.12 |
| Cache | Redis |
| Messaging | RabbitMQ |
| Auth | Keycloak (OIDC/OAuth2) |

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State | TanStack Query v5 |
| Validation | Zod |
| Workspace | pnpm |

### Infrastructure
| Tool | Purpose |
|------|---------|
| Docker Compose | Local development orchestration |
| Kubernetes + Helm | Production deployment |
| Terraform | Cloud IaC |
| Prometheus + Grafana | Metrics & dashboards |
| Uptime Kuma | Uptime monitoring |

---

## 📁 Project Structure

```
StackSift/
├── docs/
│   ├── ai-log.md           # AI Engineering session log
│   └── milestones/         # Capstone deliverables
├── infrastructure/
│   ├── docker/             # Docker Compose configs
│   ├── k8s/                # Helm charts & K8s manifests
│   └── terraform/          # Cloud IaC
├── src/
│   ├── backend/            # .NET 10 Clean Architecture solution
│   ├── frontend/           # Next.js 15 App Router
│   └── shared/             # Shared types / contracts
├── .cursorrules            # Architecture guardrails
├── pnpm-workspace.yaml     # pnpm monorepo config
└── init-stackshift.sh      # Project initialization script
```

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- .NET 10 SDK
- Node.js 20+ & pnpm 9+

### 1. Initialize the project
```bash
chmod +x init-stackshift.sh
./init-stackshift.sh
```

### 2. Start the infrastructure
```bash
cd infrastructure/docker
docker compose up -d
```

### 3. Run the backend
```bash
cd src/backend
dotnet run --project StackSift.Api
```

### 4. Run the frontend
```bash
cd src/frontend
pnpm dev
```

### Services (local)
| Service | URL |
|---------|-----|
| API | http://localhost:5000 |
| Frontend | http://localhost:3000 |
| Keycloak | http://localhost:8080 |
| RabbitMQ UI | http://localhost:15672 |
| Grafana | http://localhost:3001 |
| Uptime Kuma | http://localhost:3002 |
| Elasticsearch | http://localhost:9200 |
| Prometheus | http://localhost:9090 |

---

## 🗓️ 12-Week Roadmap

| Week | Milestone | Focus |
|------|-----------|-------|
| 1 | **Foundation** | Monorepo setup, Docker infra, Keycloak auth |
| 2 | **Core Backend** | Clean Architecture scaffolding, EF Core, DB migrations |
| 3 | **Log Ingestion** | Elasticsearch integration, log indexing pipeline |
| 4 | **AI Layer** | pgvector RAG setup, OpenAI/Ollama integration |
| 5 | **Frontend Shell** | Next.js app, auth flow, layout system |
| 6 | **Log Dashboard** | Real-time log explorer, search & filter UI |
| 7 | **SRE Alerts** | Prometheus alerting, SignalR notifications |
| 8 | **AI Chat** | Natural language log querying with RAG |
| 9 | **RBAC** | Keycloak roles → API authorization |
| 10 | **K8s Deploy** | Helm charts, staging environment |
| 11 | **Performance** | Load testing, caching, optimization |
| 12 | **Capstone Demo** | Final polish, documentation, presentation |

---

## 📄 Documentation

- [AI Engineering Log](docs/ai-log.md)
- [Architecture Guardrails](.cursorrules)

---

## 📜 License

MIT — See [LICENSE](LICENSE)
