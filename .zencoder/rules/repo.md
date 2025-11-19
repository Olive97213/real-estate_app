---
description: Repository Information Overview
alwaysApply: true
---

# React Native Restate Information

## Summary
React Native Restate is a cross-platform real estate application built with Expo. It leverages modern React Native technologies including file-based routing (Expo Router), Appwrite backend integration, NativeWind for styling, and React Navigation for mobile UI patterns. The project supports iOS, Android, and web platforms with TypeScript for type safety.

## Structure
- **app/**: File-based routing structure using Expo Router with main layout and sign-in page
- **lib/**: Shared utilities including Appwrite integration, custom hooks, and global provider
- **constants/**: Centralized data, icons, and images configuration
- **assets/**: App resources including fonts, icons, and images
- **.vscode/**: VS Code workspace settings and recommended extensions
- **Configuration**: Babel, Metro, ESLint, Prettier, and Tailwind CSS setup files

## Language & Runtime
**Language**: TypeScript / JavaScript
**TypeScript Version**: ~5.9.2
**Runtime**: Node.js (via npm)
**React Version**: 19.1.0
**React Native Version**: 0.81.5
**Expo Version**: ~54.0.23
**Build System**: Expo / Metro Bundler

## Dependencies

### Main Dependencies
- **expo** (~54.0.23): Platform for building universal React apps
- **expo-router** (~6.0.14): File-based routing for React Native
- **react-native** (0.81.5): Core React Native framework
- **@react-navigation/native** (~7.1.8): Cross-platform navigation
- **@react-navigation/bottom-tabs** (~7.4.0): Bottom tab navigation pattern
- **appwrite** (~21.4.0): Backend-as-a-service for data and authentication
- **nativewind** (^4.2.1): Utility-first styling with Tailwind CSS for React Native
- **react-native-reanimated** (~4.1.1): Animation library
- **react-native-gesture-handler** (~2.28.0): Gesture handling
- **expo-image** (~3.0.10): Image component with caching
- **@expo/vector-icons** (^15.0.3): Icon library

### Development Dependencies
- **typescript** (~5.9.2): TypeScript compiler
- **eslint** (^9.25.0): Code linting with expo preset
- **prettier-plugin-tailwindcss** (^0.7.1): Tailwind CSS class sorting
- **tailwindcss** (^3.4.18): Styling framework

## Build & Installation

**Installation**:
```bash
npm install
```

**Development Server**:
```bash
npm start
```

**Platform-specific development**:
```bash
npm run android      # Start Android emulator
npm run ios         # Start iOS simulator
npm run web         # Start web development server
```

**Code Quality**:
```bash
npm run lint        # Run ESLint checks
```

**Reset Project**:
```bash
npm run reset-project
```

## Configuration Details

**Babel** (babel.config.js): Configured with expo preset and NativeWind JSX import source transformation

**Metro** (metro.config.js): Expo Metro bundler with NativeWind CSS support

**TypeScript** (tsconfig.json): Strict mode enabled with path aliases (@/* for root imports)

**Styling**: Tailwind CSS via NativeWind with custom configuration (tailwind.config.js)

**New Architecture**: Enabled in app.json for React Native 0.81.5 compatibility

**Code Formatting**: Prettier configured with single quotes, semicolons, 80-character line width, and Tailwind class sorting

## Main Files & Entry Points

- **app.json**: Expo configuration with platform-specific settings (iOS, Android, Web)
- **app/_layout.tsx**: Root layout component with navigation setup
- **app/sign-in.tsx**: Sign-in page component
- **lib/appwrite.ts**: Appwrite client configuration and API initialization
- **lib/global-provider.tsx**: Global state provider for app-wide context
- **lib/useAppwrite.ts**: Custom hook for Appwrite data fetching
- **global.css**: Global NativeWind styles
- **constants/data.ts**: Static data and configuration constants
- **constants/icons.ts**: Icon references and mappings
- **constants/images.ts**: Image asset references

## Project Metadata
- **Version**: 1.0.0
- **Name**: react_native_restate (slug), react-native-restate (scheme)
- **License**: Private
- **Orientation**: Portrait (mobile-first design)
- **New Arch Support**: Enabled
- **Typed Routes**: Enabled (Expo Router experiment)
- **React Compiler**: Enabled (experimental optimization)
