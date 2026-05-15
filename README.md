## Features

### Characters Tab
- Infinite scroll list of all characters powered by `useInfiniteQuery`
- Each card shows avatar, name, status badge (Alive / Dead / Unknown), species, and last known location
- **Search bar** with 300 ms debounce — searches as you type without hammering the API
- **Filter chips** for status (All / Alive / Dead / Unknown) and gender (All / Male / Female / Genderless)
- Tap any card for a full **Character Detail screen** with hero image, all fields, and episode appearances
- Favourite toggle on every card — heart icon saves to SQLite instantly

### Episodes Tab
- All episodes paginated and **grouped by season** via `SectionList`
- Tap any episode card to lazy-load the full cast as circular avatars
- Season headers are sticky while scrolling

### Locations Tab
- All locations with infinite scroll and debounced search
- Each row shows name, type badge, and dimension tag
- Tap to expand and reveal resident character avatars (lazy-fetched)

### Favourites Tab
- **100 % offline** — reads entirely from the Redux store persisted in SQLite
- No network request is ever made on this tab
- Remove individual favourites or clear all with one tap
- "Available offline" indicator

### 🌐 No-Internet Screen
- Entire App detect network loss via `NetInfo`
- A full-screen "No Connection" overlay is shown with a gradient background
- Disappears automatically when connectivity is restored
- Favourites tab remains fully functional even with no connection

### Extra Feature
- **Animated header** slides off-screen as you scroll down and snaps back on scroll up — implemented with `Animated.Value` + `translateY`, zero libraries
- **Skeleton loaders** with a shimmer pulse animation on every list and detail screen while data fetches
- **Progressive image loading** — blurred low-res placeholder fades to full image on load
- **Empty states** with contextual icon, heading, and hint text
- **Error fallback screens** with a retry button and friendly messaging
- `React.lazy` + `Suspense` for screen-level code splitting on all tabs
- Every file under 200 lines
- Entire App detect network loss via `NetInfo`
- Write 2 Unit Test for useDebonce hook and favouriteSlice

---

## Tech Stack
 
### Core
- `react-native`
- `typescript`
### Navigation
- `@react-navigation/native`
- `@react-navigation/bottom-tabs`
- `@react-navigation/native-stack`
### Data Fetching & Caching
- `@tanstack/react-query`
- `axios`
### State Management & Persistence
- `@reduxjs/toolkit`
- `react-redux`
- `redux-persist`
- `react-native-sqlite-2`
### UI & Animation
- `react-native-vector-icons`
- `react-native-linear-gradient`
- `react-native-safe-area-context`
- `react-native-screens`
### Testing
- `@testing-library/react-hooks`
- `@testing-library/react-native`
- `jest`
---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/PoojaR-Training/DemoPracticalRickMorty
cd RickMortyApp
```

### 2. Install JavaScript dependencies

```bash
npm install
```

### 3. iOS — install native pods

```bash
cd ios && pod install && cd ..
```

### 4. Android — link vector icons

Open `android/app/build.gradle` and add the following line at the **very bottom** of the file (outside all blocks):

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 5. iOS — vector icons (no extra step)

CocoaPods handles font bundling automatically during `pod install`.

### 6. Android — linear gradient native module

The `react-native-linear-gradient` package auto-links on React Native 0.60+. No manual step needed. If you see a build error, run:

```bash
cd android && ./gradlew clean && cd ..
```

### 7. Verify TypeScript

```bash
npm run type-check
```

There should be zero errors before you run the app.

---

## Running the App

Start the Metro bundler in one terminal:

```bash
npm start
```

Then in a second terminal, build and launch on your target platform:

```bash
# iOS simulator (default device)
npm run ios

# iOS — specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"

# Android emulator / connected device
npm run android
```

> **Android emulator tip:** make sure an AVD is running in Android Studio before `npm run android`, or connect a physical device with USB debugging enabled.

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage report
npm test -- --coverage
```
---
