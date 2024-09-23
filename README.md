# use-geolocation3

Access and monitor a user's geolocation (after they give permission) with useGeolocation.

## Installation

To install the package, use npm:

```bash
pnpm add use-geolocation3

yarn install use-geolocation3

npm install use-geolocation3
```

## Usage

```tsx
import React from "react";
import { useGeolocation } from "use-geolocation3";

const GeolocationComponent: React.FC = () => {
  const {
    loading,
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
    error,
    timestamp,
  } = useGeolocation();

  return (
    <div>
      <h2>Geolocation Information</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {!loading && !error && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Accuracy: {accuracy} meters</p>
          {altitude !== null && <p>Altitude: {altitude} meters</p>}
          {altitudeAccuracy !== null && (
            <p>Altitude Accuracy: {altitudeAccuracy} meters</p>
          )}
          {heading !== null && <p>Heading: {heading} degrees</p>}
          {speed !== null && <p>Speed: {speed} m/s</p>}
          <p>Timestamp: {new Date(timestamp!).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/use-geolocation3
