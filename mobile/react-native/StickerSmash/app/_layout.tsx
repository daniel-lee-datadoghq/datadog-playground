import { DdRum, DdSdkReactNative, DdSdkReactNativeConfiguration, SdkVerbosity } from 'expo-datadog';
import { Stack, usePathname, useSegments } from 'expo-router';
import { useEffect } from 'react';

const config = new DdSdkReactNativeConfiguration(
    'pub9c3a15f8f8b50072a97022ea1194897b',
    'test',
    'e5cb79d0-e595-446e-b72c-d66533746777',
    true, // track user interactions such as tapping on a button. You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported.
    true, // track XHR resources.
    true // track errors.
);

// Optional: Select your Datadog website ("US1", "US3", "US5", "EU1", or "US1_FED"). Default is "US1".
config.site = 'US1';
// Optional: Enable or disable native crash reports.
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
config.sessionSamplingRate = 100;
// Optional: Sample tracing integrations for network calls between your app and your backend, for example: 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%.
// You need to specify the hosts of your backends to enable tracing with these backends.
//config.resourceTracingSamplingRate = 80;
//config.firstPartyHosts = ['example.com'];
// Optional: Let the Datadog SDK print internal logs above or equal to the provided level. Default is undefined, which means no logs.
config.verbosity = SdkVerbosity.DEBUG;

DdSdkReactNative.initialize(config);

export default function RootLayout() {
  const pathname = usePathname();
  const segments = useSegments();
  const viewKey = segments.join('/');
  
  useEffect(() => {
    DdRum.startView(viewKey, pathname);
  }, [viewKey, pathname]);
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}