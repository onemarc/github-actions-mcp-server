#!/bin/bash

# GitHub Actions MCP Server Setup Script

set -e

echo "🔧 GitHub Actions MCP Server Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm --version) detected"

# Create project structure if it doesn't exist
echo "📂 Setting up project structure..."
mkdir -p src

# Move main TypeScript file to src directory if it exists in root
if [ -f "index.ts" ]; then
    mv index.ts src/
    echo "   Moved index.ts to src/"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo ""
    echo "⚠️  WARNING: GITHUB_TOKEN environment variable is not set!"
    echo "   You need to set this before running the server."
    echo ""
    echo "   To set it:"
    echo "   export GITHUB_TOKEN=your_github_token_here"
    echo ""
    echo "   To create a GitHub token:"
    echo "   1. Go to https://github.com/settings/tokens"
    echo "   2. Generate a new token with these scopes:"
    echo "      - repo (full repository access)"
    echo "      - workflow (update GitHub Action workflows)"
    echo "      - actions:read (read access to GitHub Actions)"
    echo "      - actions:write (write access to GitHub Actions)"
    echo ""
    read -p "   Do you want to set the GITHUB_TOKEN now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "   Enter your GitHub token: " GITHUB_TOKEN
        echo "export GITHUB_TOKEN=$GITHUB_TOKEN" >> ~/.bashrc
        echo "export GITHUB_TOKEN=$GITHUB_TOKEN" >> ~/.zshrc 2>/dev/null || true
        export GITHUB_TOKEN=$GITHUB_TOKEN
        echo "   ✅ GITHUB_TOKEN has been set for this session and saved to shell config"
    fi
else
    echo "✅ GITHUB_TOKEN environment variable is set"
fi

# Build the project
echo "🔨 Building TypeScript..."
npm run build

# Check if build was successful
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the server:"
echo "   npm start"
echo ""
echo "For development with auto-reload:"
echo "   npm run dev"
echo ""
echo "Available tools:"
echo "   - create_workflow       Create new GitHub Actions workflows"
echo "   - list_workflows        List all workflows in a repository"
echo "   - get_workflow          Get workflow details"
echo "   - get_workflow_usage    Get workflow usage statistics"
echo "   - list_workflow_runs    List workflow runs with filtering"
echo "   - get_workflow_run      Get specific workflow run details"
echo "   - get_workflow_run_jobs Get jobs for a workflow run"
echo "   - trigger_workflow      Manually trigger a workflow"
echo "   - cancel_workflow_run   Cancel a running workflow"
echo "   - rerun_workflow        Re-run a completed workflow"
echo ""
echo "📌 See README.md for detailed usage instructions and examples."

# Offer to run a quick test
if [ -n "$GITHUB_TOKEN" ]; then
    echo ""
    read -p "Would you like to run a quick connection test? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📡 Testing GitHub API connection..."
        
        # Simple test using curl if available
        if command -v curl &> /dev/null; then
            HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user)
            if [ "$HTTP_CODE" -eq 200 ]; then
                echo "✅ GitHub API connection successful!"
            else
                echo "❌ GitHub API connection failed (HTTP $HTTP_CODE)"
                echo "   Please check your GITHUB_TOKEN"
            fi
        else
            echo "⚠️  curl not available for testing, but setup is complete"
        fi
    fi
fi

echo ""
echo "Happy automating! 🛠️"