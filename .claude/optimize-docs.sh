#!/bin/bash

# Claude Code Optimization Documentation Workflow
# Moves generated optimization docs to dedicated branch for GitHub viewing

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current commit SHA
COMMIT_SHA=$(git rev-parse --short HEAD)
COMMIT_MSG=$(git log -1 --pretty=format:"%s")

echo -e "${BLUE}🚀 Setting up optimization documentation for commit ${COMMIT_SHA}${NC}"

# Check if optimization docs exist
if [ ! -f "OPTIMIZATION_SUMMARY.md" ] && [ ! -f "AUDIO_OPTIMIZATION.md" ] && [ ! -d "docs/optimizations" ]; then
    echo -e "${YELLOW}⚠️  No optimization documentation found${NC}"
    echo "Expected files: OPTIMIZATION_SUMMARY.md, AUDIO_OPTIMIZATION.md, or docs/optimizations/"
    exit 1
fi

# Create/switch to optimization-docs branch
echo -e "${BLUE}📋 Switching to optimization-docs branch${NC}"
git checkout -B optimization-docs

# Create docs directory if it doesn't exist
mkdir -p docs/optimizations

# Move and rename files
if [ -f "OPTIMIZATION_SUMMARY.md" ]; then
    echo -e "${GREEN}📝 Moving OPTIMIZATION_SUMMARY.md${NC}"
    mv OPTIMIZATION_SUMMARY.md docs/optimizations/optimization-${COMMIT_SHA}.md
    
    # Add commit reference to the file
    sed -i "1s/^/# 🚀 Optimization Summary\n\n> **Associated Commit:** [\`${COMMIT_SHA}\`](..\/..\/commit\/${COMMIT_SHA}) - \"${COMMIT_MSG}\"  \n> **Date:** $(date '+%B %d, %Y')  \n\n/" docs/optimizations/optimization-${COMMIT_SHA}.md
fi

if [ -f "AUDIO_OPTIMIZATION.md" ]; then
    echo -e "${GREEN}🎵 Moving AUDIO_OPTIMIZATION.md${NC}"
    mv AUDIO_OPTIMIZATION.md docs/optimizations/audio-optimization-${COMMIT_SHA}.md
    
    # Add commit reference to the file
    sed -i "1s/^/# 🎵 Audio Optimization Guide\n\n> **Associated Commit:** [\`${COMMIT_SHA}\`](..\/..\/commit\/${COMMIT_SHA}) - \"${COMMIT_MSG}\"  \n> **Date:** $(date '+%B %d, %Y')  \n\n/" docs/optimizations/audio-optimization-${COMMIT_SHA}.md
fi

# If docs/optimizations already exists, rename files
if [ -f "docs/optimizations/OPTIMIZATION_SUMMARY.md" ]; then
    mv docs/optimizations/OPTIMIZATION_SUMMARY.md docs/optimizations/optimization-${COMMIT_SHA}.md
fi

if [ -f "docs/optimizations/AUDIO_OPTIMIZATION.md" ]; then
    mv docs/optimizations/AUDIO_OPTIMIZATION.md docs/optimizations/audio-optimization-${COMMIT_SHA}.md
fi

# Add and commit documentation
echo -e "${BLUE}💾 Committing optimization documentation${NC}"
git add docs/
git commit -m "📚 Optimization documentation for commit ${COMMIT_SHA}

Documentation for optimization work in commit ${COMMIT_SHA}:
- ${COMMIT_MSG}

Files documented:
$(ls docs/optimizations/*${COMMIT_SHA}.md | sed 's/^/- /')

View on GitHub for rich markdown rendering with commit links."

# Switch back to main and clean up
echo -e "${BLUE}🧹 Cleaning main branch${NC}"
git checkout main

# Remove any remaining docs from main
if [ -f "OPTIMIZATION_SUMMARY.md" ] || [ -f "AUDIO_OPTIMIZATION.md" ] || [ -d "docs/optimizations" ]; then
    rm -f OPTIMIZATION_SUMMARY.md AUDIO_OPTIMIZATION.md
    rm -rf docs/
    git add -A
    git commit --amend --no-edit
fi

echo -e "${GREEN}✅ Documentation workflow complete!${NC}"
echo -e "${BLUE}📖 View your optimization docs at:${NC}"
echo -e "   https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/blob/optimization-docs/docs/optimizations/optimization-${COMMIT_SHA}.md"

# Optional: Push both branches
read -p "Push both branches to GitHub? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🚀 Pushing to GitHub${NC}"
    git push origin main
    git push origin optimization-docs
    echo -e "${GREEN}✅ Pushed to GitHub!${NC}"
fi