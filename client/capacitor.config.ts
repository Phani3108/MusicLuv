/**
 * Capacitor configuration for the MusicLuv mobile shell.
 *
 * Capacitor is opt-in: this file lives committed but no native projects
 * (`ios/`, `android/`) ship in the repo. Run locally to add them:
 *
 *   cd client
 *   npm install -D @capacitor/core @capacitor/cli
 *   npm install @capacitor/ios @capacitor/android
 *   npm install @capacitor/haptics @capacitor/status-bar @capacitor/keyboard
 *   npx cap add ios
 *   npx cap add android
 *   npm run build && npx cap sync
 *   npx cap open ios   # or android
 *
 * The web bundle is the source of truth — `webDir: 'dist'` points at
 * Vite's output. `npx cap sync` copies the latest dist into the native
 * shells before each build. No native code is needed for v1.
 */
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.musicluv",
  appName: "MusicLuv",
  webDir: "dist",
  // Schemes used for OAuth redirects (Supabase magic link / Stripe checkout
  // return). Both iOS + Android need to register `musicluv://` to receive
  // app-link callbacks while we still proxy through the web build.
  server: {
    androidScheme: "https",
    // For local development against a tunnel: uncomment + replace with
    // your dev URL, e.g. https://abc123.ngrok-free.app
    // url: "https://your-tunnel.ngrok-free.app",
  },
  ios: {
    // Use the safe-area-aware viewport — our CSS already pads against
    // env(safe-area-inset-*) so the home indicator + Dynamic Island
    // don't overlap content.
    contentInset: "always",
    // Prevent unnecessary scroll bounce on the WKWebView's outer doc
    // — individual scrollables can opt back in.
    scrollEnabled: false,
    // Status bar style is overridden at runtime via @capacitor/status-bar
    // plugin; this default matches our dark gradient bg.
    backgroundColor: "#060816",
  },
  android: {
    backgroundColor: "#060816",
    // Allow audio recording in the WebView. Mic permission is also
    // declared in AndroidManifest.xml when @capacitor/android is added.
    allowMixedContent: false,
  },
  plugins: {
    // Splash screen shown briefly during cold start so users don't see
    // the white flash before the React tree mounts.
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: "#060816",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    // Status bar style — match the dark theme.
    StatusBar: {
      backgroundColor: "#060816",
      style: "DARK",
    },
    // Keyboard handling — push the layout up when keyboard opens (so
    // chat input + login forms aren't hidden).
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
