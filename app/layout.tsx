import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
// import { GeistSans, GeistMono } from 'geist/font';
import './globals.css'; // your tailwind setup
// import ContactPage from './contact'; // ✅ ContactPage imported
import Contact from './contact/page'


export const metadata = {
  title: 'CyberMind',
  description: 'AI-Powered Cybersecurity Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-black text-white`}> */}
        <body className="bg-black text-white font-sans antialiased">
          {/* ======= HEADER ======= */}
          <header className="bg-gray-900 p-6 flex items-center justify-between shadow-md fixed w-full z-10">
            <Link href="/" className="text-2xl font-bold text-green-400">
              CyberMind
            </Link>

            <nav className="flex gap-6 text-sm items-center ">
              <a href="#about" className="text-white hover:text-green-400">About</a>
              <SignedIn>
              <a href="#contact" className="text-white hover:text-green-400">Contact</a>

              </SignedIn>
              
              <SignedOut>
                <SignInButton mode="modal">
                  <span className="cursor-pointer text-white hover:text-green-400">Sign In</span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <span className="cursor-pointer text-white hover:text-green-400">Sign Up</span>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <SignOutButton>
                  <button className="text-white hover:text-red-400 px-3 py-1 rounded border border-red-500">
                    Sign Out
                  </button>
                </SignOutButton>

                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'ring-2 ring-green-400',
                    },
                  }}
                />
              </SignedIn>
            </nav>
          </header>

          {/* ======= PAGE CONTENT ======= */}
          <main className="p-6">
            <SignedOut>
             {children}
            </SignedOut>
            

            {/* Optional: Render ContactPage for signed-in users */}
            <SignedIn>
              <div className="mt-10">
                {/* <ContactPage /> */}
                <Contact/>
                {children}
              </div>
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
