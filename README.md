# 🍽️ Mess Billing & Meal Management

[![Expo](https://img.shields.io/badge/Expo-54.0.12-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)

A modern, user-friendly React Native application for managing mess/cafeteria billing and meal planning. Built with Expo and TypeScript, featuring an intuitive calendar interface and offline-first architecture.

![App Demo](assets/images/app-demo.gif)

## 🎯 Features

- 📱 **Cross-Platform**: Works seamlessly on iOS and Android
- 📅 **Interactive Calendar**: Visual meal planning interface
- 💰 **Billing Management**: Track and manage meal expenses
- 🔄 **Offline Support**: Full functionality without internet
- 🎨 **Dynamic Theming**: Supports light/dark mode
- 📊 **Reports & Analytics**: Monthly expense summaries
- 🔔 **Reminders**: Meal schedule notifications
- 👥 **Multi-user Support**: Different roles and permissions

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (v7 or newer)
- [Expo Go](https://expo.dev/go) app for iOS/Android

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madhav-15/Mess_Billing.git
   cd Mess_Billing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open on your device:
   - Scan the QR code with Expo Go (Android)
   - Scan the QR code with Camera app (iOS)

---

## Hacktoberfest 2025 - Maintainer’s Goals

This repository is participating in **Hacktoberfest 2025**! Our goals for the event:

- Encourage new contributors to get familiar with React Native and AsyncStorage
- Offer a friendly space for making meaningful contributions like bug fixes, feature enhancements, and UI improvements
- Grow a helpful community around meal planning apps

---

## 🏗️ Project Structure

```
Mess_Billing/
├── app/                   # Main application screens
│   ├── _layout.tsx       # Root layout configuration
│   ├── modal.tsx         # Modal screen components
│   └── (tabs)/           # Tab-based navigation screens
│       ├── index.tsx     # Home screen
│       └── explore.tsx   # Explore/search screen
├── assets/               # Static assets
│   └── images/          # Image assets
├── components/           # Reusable components
│   ├── Calendar.tsx     # Calendar component
│   ├── themed-*.tsx     # Theme-aware components
│   └── ui/              # UI components
├── constants/           # App-wide constants
│   └── theme.ts        # Theme configuration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── scripts/            # Build and maintenance scripts
```

### Key Components

- `Calendar.tsx`: Interactive calendar with meal planning interface
- `themed-text.tsx`: Text component with theme support
- `store.tsx`: State management and persistence logic
- `use-theme-color.ts`: Custom hook for theme management

## 🤝 Contributing

We love your input! We want to make contributing as easy and transparent as possible. Please see our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### Getting Started with Development

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Run tests and linting
   ```bash
   npm run lint
   ```
5. Commit your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. Push to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

### Code Style

- Use TypeScript for type safety
- Follow the existing code structure
- Write meaningful commit messages (using [Conventional Commits](https://www.conventionalcommits.org/))
- Add comments for complex logic
- Update documentation as needed

## 🎉 Hacktoberfest 2025

We're excited to participate in Hacktoberfest 2025! Here's how you can contribute:

### Beginner-friendly Issues

- UI/UX improvements
- Documentation updates
- Bug fixes
- Test coverage
- New features

### How to Participate

1. Look for issues labeled `hacktoberfest` and `good-first-issue`
2. Comment on the issue you want to work on
3. Fork and clone the repository
4. Make your changes
5. Submit a Pull Request

Your PR will be reviewed and merged if it meets our quality standards.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for the core framework
- All our contributors who make this project better every day

---

Made with ❤️ by the Mess Billing team




<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->


