# Healy Mobile App

## Project Overview

Healy is a React Native mobile application built with Expo, TypeScript, and modern React Native features. The project follows Feature-Sliced Design (FSD) architecture and uses various modern libraries for state management, navigation, and UI components.

## Architecture (Feature-Sliced Design)

### Layers

The project follows Feature-Sliced Design methodology with the following layers:

```
src/
├── app/          # Application-wide settings, styles, providers
├── processes/    # Application processes (auth, routing, etc.)
├── pages/        # Page compositions
├── widgets/      # Composite UI blocks
├── features/     # User interactions
├── entities/     # Business entities
└── shared/       # Shared utilities, types, and configurations
```

### Layer Descriptions

#### app/

- Global styles
- Providers
- Store configuration
- App initialization

#### processes/

- Authentication
- Routing
- Data fetching
- State management

#### pages/

- Page compositions
- Layout components
- Route configurations

#### widgets/

- Complex UI components
- Composite blocks
- Independent UI elements

#### features/

- User interactions
- Forms
- Modals
- Feature-specific components

#### entities/

- Business entities
- Data models
- Entity-specific components

#### shared/

- UI kit
- API
- Config
- Utils
- Types

### FSD Rules

1. Each layer can only import from layers below it
2. Features can only import from entities and shared
3. Widgets can only import from features, entities, and shared
4. Pages can only import from widgets, features, entities, and shared
5. Processes can only import from pages, widgets, features, entities, and shared
6. App can import from any layer

## Tech Stack

- React Native (v0.79.3)
- Expo (v53.0.10)
- TypeScript
- React Navigation v7
- Zustand (State Management)
- React Native Reanimated
- Expo SDK 53

## Prerequisites

- Node.js (Latest LTS version)
- Bun or npm/yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- Expo CLI

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd Healy
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Start the development server:

```bash
bun start
# or
npm start
```

### Development Scripts

- `bun start` or `npm start` - Start the Expo development server
- `bun ios` or `npm run ios` - Run on iOS simulator
- `bun android` or `npm run android` - Run on Android emulator
- `bun lint` or `npm run lint` - Run ESLint and Prettier checks
- `bun lint:fix` or `npm run lint:fix` - Fix linting issues automatically
- `bun prebuild` or `npm run prebuild` - Clean and rebuild native code

## Project Structure

```
src/
├── app/          # App-wide configurations and providers
├── navigation/   # Navigation configuration and types
├── screens/      # Screen components
├── shared/       # Shared utilities, hooks, and components
└── widgets/      # Reusable UI components
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Follow the existing project structure
- Use functional components with hooks
- Implement proper type definitions

### State Management

- Use Zustand for global state management
- Keep state as local as possible
- Use React Context for theme and other app-wide states

### Navigation

- Use React Navigation v7
- Define navigation types in the navigation directory
- Keep navigation logic separate from components

### Performance

- Use React Native Reanimated for animations
- Implement proper memoization where needed
- Follow React Native performance best practices

### Testing

- Write unit tests for critical business logic
- Test components in isolation
- Use proper mocking for external dependencies

## Building for Production

### iOS

1. Update version in app.json
2. Run prebuild:

```bash
bun prebuild
```

3. Build using Xcode

### Android

1. Update version in app.json
2. Run prebuild:

```bash
bun prebuild
```

3. Build using Android Studio

## Contributing

1. Create a new branch for your feature
2. Follow the code style guidelines
3. Write tests for new features
4. Submit a pull request

## Troubleshooting

- Clear metro bundler cache: `bun start --clear`
- Reset iOS build: `cd ios && pod install`
- Reset Android build: `cd android && ./gradlew clean`

## License

[Add your license information here]
