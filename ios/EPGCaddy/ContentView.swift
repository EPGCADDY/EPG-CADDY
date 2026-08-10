import SwiftUI

struct ContentView: View {
    private let appURL = URL(string: "https://epg-caddy.vercel.app")!

    var body: some View {
        WebView(url: appURL)
            .ignoresSafeArea()
    }
}
