import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.silcare.mobile',
  appName: 'silcare',
  webDir: 'www',
  server: {
    androidScheme:'https'
  },
  plugins: {
    pushNotifications: {
    presentationOptions: ["badge", "sound", "alert"],
    },
    },
};

export default config;
