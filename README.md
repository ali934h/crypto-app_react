# Crypto App React

A dynamic cryptocurrency application built using React, Tailwind CSS, and Vite, providing users with the ability to view and analyze cryptocurrency data including prices, market caps, and volumes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)

## Features

- Cryptocurrency Listing: Browse and view details of various cryptocurrencies.
- Search Functionality: Search for specific cryptocurrencies by name.
- Detailed Charts: View detailed charts for price, market cap, and volume trends.
- Responsive UI: Utilizes Tailwind CSS for a responsive and modern user interface.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

Node.js (v14.0.0 or higher)
npm (v6.0.0 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ali934h/crypto-app_react.git
cd crypto-app_react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will start the Vite development server.

## Usage

- Open your browser and navigate to `http://localhost:3101` (or the port displayed in your terminal).
- Use the interface to browse, search, and analyze cryptocurrencies.

## Project Structure

The project is organized as follows:

```perl
crypto-app_react/
│
├── src/
│   ├── assets/
│   │   ├── css/                    # Tailwind CSS input and output files
│   │   │   ├── inputTailwind.css
│   │   │   └── outputTailwind.css
│   │   ├── imgs/                   # Images used in the application
│   │       └── icons/              # Icons used in the application
│   │           └── bitcoin.svg
│   ├── components/                 # React components
│   │   ├── Chart.jsx
│   │   ├── CoinRow.jsx
│   │   ├── CryptoTable.jsx
│   │   ├── Loader.jsx
│   │   ├── Pagination.jsx
│   │   ├── Search.jsx
│   │   └── SvgGenerate.jsx
│   ├── constants/                  # Constants used in the application
│   │   ├── ApiToken.js
│   │   ├── Columns.js
│   │   └── CurrencySymbol.js
│   ├── layouts/                    # Layout components
│   │   └── Layout.jsx
│   ├── App.jsx                     # Main App component
│   └── main.jsx                    # Main entry point for the application
│
├── index.html                      # Main HTML file
├── package.json                    # Node.js package configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.js                  # Vite configuration
```

## Scripts

The following scripts are defined in package.json:

- `npm run dev`: Start the Vite development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint to analyze the code for potential errors.
- `npm run tailwind`: Compile Tailwind CSS in watch mode.

## Dependencies

- Core:
  - `react`: JavaScript library for building user interfaces.
  - `react-dom`: Entry point of the DOM-related rendering paths.
- UI and Styling:
  - `tailwindcss`: Utility-first CSS framework.
  - `react-icons`: Collection of popular icons for React.
  - `recharts`: Library for building charts in React.
- Development:
  - `@vitejs/plugin-react`: Vite plugin to handle React projects.
  - `eslint`: Linter for identifying and fixing code quality issues.
  - `prettier-plugin-tailwindcss`: Integrates Prettier with Tailwind CSS.
  - `vite`: Modern front-end tooling
