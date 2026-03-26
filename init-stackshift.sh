#!/usr/bin/env bash
# ============================================================
# init-stackshift.sh
# Initializes the StackShift monorepo: .NET solution + Next.js
# ============================================================
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$REPO_ROOT/src/backend"
FRONTEND_DIR="$REPO_ROOT/src/frontend"

echo "🚀 StackShift — Project Initialization"
echo "======================================="

# 1. GIT
if [ ! -d "$REPO_ROOT/.git" ]; then
  git init "$REPO_ROOT"
  git -C "$REPO_ROOT" branch -M main
fi

# 2. .GITIGNORE
cat > "$REPO_ROOT/.gitignore" <<'GITIGNORE'
bin/
obj/
*.user
*.suo
.vs/
node_modules/
.next/
dist/
.env
.env.*
GITIGNORE

# 3. BACKEND
echo "🔧 Setting up .NET 10 backend..."
mkdir -p "$BACKEND_DIR"
cd "$BACKEND_DIR"

# Solution (.slnx)
if dotnet new list slnx > /dev/null 2>&1; then
  dotnet new slnx -n StackShift --force
else
  dotnet new sln -n StackShift --force
  # Ensure we move the file even if it was created in a subdir or renamed
  [ -f "StackShift.sln" ] && mv StackShift.sln StackShift.slnx || true
fi

# Projects
dotnet new webapi   -n StackShift.Api            -o StackShift.Api            --force
dotnet new classlib -n StackShift.Application     -o StackShift.Application    --force
dotnet new classlib -n StackShift.Infrastructure  -o StackShift.Infrastructure --force
dotnet new classlib -n StackShift.Domain          -o StackShift.Domain         --force

# References
dotnet add StackShift.Api/StackShift.Api.csproj reference StackShift.Application/StackShift.Application.csproj StackShift.Infrastructure/StackShift.Infrastructure.csproj
dotnet add StackShift.Infrastructure/StackShift.Infrastructure.csproj reference StackShift.Application/StackShift.Application.csproj
dotnet add StackShift.Application/StackShift.Application.csproj reference StackShift.Domain/StackShift.Domain.csproj

# Packages
dotnet add StackShift.Api/StackShift.Api.csproj package MediatR
dotnet add StackShift.Application/StackShift.Application.csproj package MediatR
dotnet add StackShift.Application/StackShift.Application.csproj package FluentValidation.DependencyInjectionExtensions
dotnet add StackShift.Infrastructure/StackShift.Infrastructure.csproj package Microsoft.EntityFrameworkCore
dotnet add StackShift.Infrastructure/StackShift.Infrastructure.csproj package Npgsql.EntityFrameworkCore.PostgreSQL

# 4. FRONTEND
echo "⚛️ Setting up Next.js 15 frontend..."
mkdir -p "$FRONTEND_DIR"
cd "$FRONTEND_DIR"
if [ ! -f "package.json" ]; then
  npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --yes
fi

# 5. WRAP UP
cd "$REPO_ROOT"
touch docs/milestones/.gitkeep infrastructure/k8s/.gitkeep infrastructure/terraform/.gitkeep src/shared/.gitkeep
git add .
git commit -m "chore: initialize StackShift monorepo" || true
echo "✅ Done."
