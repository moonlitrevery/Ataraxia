import { StatusBar } from 'expo-status-bar'
import { Linking } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'
import inject from './src/inject'

// o instagram serve uma versão pior do site pra UA de webview
const ua =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1'

// só o frame principal: iframes e blob:/data: precisam carregar dentro senão quebra embed e upload
function shouldLoad(req: ShouldStartLoadRequest) {
  if (!req.isTopFrame || !/^https?:/.test(req.url)) return true
  if (/(^|\.)(cdn)?instagram\.com$/.test(new URL(req.url).hostname)) return true
  Linking.openURL(req.url)
  return false
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar style="light" />
        <WebView
          source={{ uri: 'https://www.instagram.com/?variant=following' }}
          userAgent={ua}
          sharedCookiesEnabled
          allowsBackForwardNavigationGestures
          pullToRefreshEnabled
          onShouldStartLoadWithRequest={shouldLoad}
          injectedJavaScript={inject}
          style={{ backgroundColor: '#000' }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
