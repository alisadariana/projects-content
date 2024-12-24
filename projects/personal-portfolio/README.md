---
title: "Personal Portfolio Website"
description: "A modern portfolio website built with Vue 3, TypeScript, and Tailwind CSS. Features a clean design, dark mode support, and dynamic content loading."
type: "personal"
status: "in-progress"
startDate: "2024-01-15"
tags: ["vue", "typescript", "tailwind"]
slug: "personal-portfolio"
links:
  github: "https://github.com/alisadariana/portfolio"
  live: "https://alisadariana.dev"
visibility: "public"
features:
  - name: "Dynamic Content Loading"
    status: "completed"
    description: "Load content dynamically from markdown files in separate repositories"
  - name: "Dark Mode Support"
    status: "in-progress"
    description: "Automatic and manual dark mode switching with system preference detection"
  - name: "Project Showcase"
    status: "planned"
    description: "Interactive project gallery with detailed case studies"
techStack:
  - category: "Frontend"
    items: ["Vue 3", "TypeScript", "Tailwind CSS", "Vue Router"]
  - category: "Build Tools"
    items: ["Vite", "PostCSS"]
  - category: "Version Control"
    items: ["Git", "GitHub"]
---

# Personal Portfolio Website

## Overview

This portfolio website serves as a showcase of my work and a platform for sharing tutorials and technical content. Built with modern web technologies, it emphasizes clean design, performance, and maintainability.

## Features

### Dynamic Content Management

The website implements a decentralized content management system using separate GitHub repositories for tutorials and projects. This approach allows for:

- Easy content updates through markdown files
- Version control for all content
- Separation of concerns between content and presentation

### Responsive Design

Built with a mobile-first approach using Tailwind CSS, ensuring:

- Optimal viewing experience across all devices
- Consistent styling and spacing
- Efficient development workflow

### Performance Optimization

Several measures are taken to ensure optimal performance:

- Static site generation where possible
- Lazy loading of images and components
- Efficient bundling with Vite

## Technical Details

### Architecture

- Vue 3 with Composition API
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for build tooling

### Content Management

- Markdown-based content
- YAML frontmatter for metadata
- Separate content repositories
- Dynamic content loading

### Future Plans

- Interactive project demos
- Enhanced dark mode support
- Blog section integration
- Performance monitoring dashboard
