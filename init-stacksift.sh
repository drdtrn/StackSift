#!/usr/bin/env bash
# ============================================================
# init-stackshift.sh
# Initializes the StackSift monorepo: .NET solution + Next.js
# ============================================================
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$REPO_ROOT/src/backend"
FRONTEND_DIR="$REPO_ROOT/src/frontend"

echo "🚀 StackSift — Project Initialization"
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
  dotnet new slnx -n StackSift --force
else
  dotnet new sln -n StackSift --force
  # Ensure we move the file even if it was created in a subdir or renamed
  [ -f "StackSift.sln" ] && mv StackSift.sln StackSift.slnx || true
fi

# Projects
dotnet new webapi   -n StackSift.Api            -o StackSift.Api            --force
dotnet new classlib -n StackSift.Application     -o StackSift.Application    --force
dotnet new classlib -n StackSift.Infrastructure  -o StackSift.Infrastructure --force
dotnet new classlib -n StackSift.Domain          -o StackSift.Domain         --force

# References
dotnet add StackSift.Api/StackSift.Api.csproj reference StackSift.Application/StackSift.Application.csproj StackSift.Infrastructure/StackSift.Infrastructure.csproj
dotnet add StackSift.Infrastructure/StackSift.Infrastructure.csproj reference StackSift.Application/StackSift.Application.csproj
dotnet add StackSift.Application/StackSift.Application.csproj reference StackSift.Domain/StackSift.Domain.csproj

# Packages
dotnet add StackSift.Api/StackSift.Api.csproj package MediatR
dotnet add StackSift.Application/StackSift.Application.csproj package MediatR
dotnet add StackSift.Application/StackSift.Application.csproj package FluentValidation.DependencyInjectionExtensions
dotnet add StackSift.Infrastructure/StackSift.Infrastructure.csproj package Microsoft.EntityFrameworkCore
dotnet add StackSift.Infrastructure/StackSift.Infrastructure.csproj package Npgsql.EntityFrameworkCore.PostgreSQL

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
git commit -m "chore: initialize StackSift monorepo" || true
echo "✅ Done."
