import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { 
  Link as LinkIcon, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Palette, 
  Download, 
  Share2, 
  Info,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Loader2
} from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [url, setUrl] = useState<string>('');

  const handleGenerate = (inputUrl: string) => {
    if (!inputUrl) return;
    // Basic URL validation/formatting
    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    setUrl(formattedUrl);
    setState('processing');
    // Simulate processing time - reduced for better UX
    setTimeout(() => {
      setState('ready');
    }, 1800);
  };

  const handleReset = () => {
    setState('landing');
    setUrl('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {state === 'landing' && (
            <LandingPage key="landing" onGenerate={handleGenerate} />
          )}
          {state === 'processing' && (
            <ProcessingPage key="processing" url={url} onBack={handleReset} />
          )}
          {state === 'ready' && (
            <ReadyPage key="ready" url={url} onReset={handleReset} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// --- Types ---
type AppState = 'landing' | 'processing' | 'ready';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm pb-2 sm:pb-4">
    <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16 sm:h-20">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-slate-900">Showcase</span>
        <div className="hidden md:flex gap-6">
          <a className="text-primary font-semibold tracking-tight" href="#">Docs</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors tracking-tight" href="#">Pricing</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold text-sm active:scale-95 transition-all hover:bg-primary-dim shadow-lg shadow-primary/20">
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="w-full py-12 bg-surface-container-low mt-auto border-t border-outline-variant/10">
    <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 md:px-10 gap-8">
      <p className="text-sm tracking-wide text-on-surface-variant text-center md:text-left leading-relaxed max-w-xs md:max-w-none">
        built by marvelous Ndukwe © 2026<br className="md:hidden" />
        <span className="hidden md:inline"> • </span>
        built for curators and designers
      </p>
      <div className="flex gap-6 sm:gap-8">
        <div className="text-on-surface-variant text-sm tracking-wide flex items-center gap-2 cursor-default opacity-80 hover:opacity-100 transition-opacity">
          <Twitter size={16} /> <span className="hidden sm:inline">Twitter</span>
        </div>
        <div className="text-on-surface-variant text-sm tracking-wide flex items-center gap-2 cursor-default opacity-80 hover:opacity-100 transition-opacity">
          <Facebook size={16} /> <span className="hidden sm:inline">Facebook</span>
        </div>
        <div className="text-on-surface-variant text-sm tracking-wide flex items-center gap-2 cursor-default opacity-80 hover:opacity-100 transition-opacity">
          <Linkedin size={16} /> <span className="hidden sm:inline">LinkedIn</span>
        </div>
      </div>
    </div>
  </footer>
);

const LandingPage: FC<{ onGenerate: (url: string) => void }> = ({ onGenerate }) => {
  const [url, setUrl] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <section className="hero-gradient min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-40 pb-16 sm:pb-20 text-center">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            <Sparkles size={14} />
            <span className="text-[0.625rem] font-black tracking-widest uppercase">Now in Beta</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-on-surface mb-6 sm:mb-8 leading-[1.1]"
          >
            Turn any website into <br className="hidden sm:block" />
            <span className="text-primary">polished showcase</span> images
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Enter a live URL and instantly generate professional, portfolio-ready mockups for desktop, tablet, and mobile.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto w-full relative group px-2 sm:px-0"
          >
            <div className="relative flex items-center p-1.5 sm:p-2 rounded-2xl bg-surface-container-lowest shadow-[0_8px_40px_rgba(0,0,0,0.08)] ring-1 ring-outline-variant/10 focus-within:ring-2 focus-within:ring-primary/40 transition-all duration-500">
              <LinkIcon className="ml-3 sm:ml-4 text-outline/60" size={20} />
              <input 
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent border-none focus:outline-none text-on-surface placeholder:text-outline-variant font-medium text-base sm:text-lg" 
                placeholder="https://yourwebsite.com" 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                onClick={() => onGenerate(url)}
                className="hidden sm:flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-dim active:scale-95 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Generate
              </button>
            </div>
            <button 
              onClick={() => onGenerate(url)}
              className="sm:hidden mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-on-primary font-bold active:scale-95 transition-all duration-300 shadow-lg shadow-primary/10"
            >
              Generate Mockups
            </button>
          </motion.div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm">
            <span className="text-on-surface-variant font-medium">Try these examples:</span>
            <div className="flex flex-wrap justify-center gap-3">
              {['Linear.app', 'Framer.com', 'Stripe.com'].map((site) => (
                <button 
                  key={site}
                  onClick={() => setUrl(`https://${site.toLowerCase()}`)} 
                  className="px-4 py-1.5 rounded-full bg-surface-container-low text-primary font-semibold hover:bg-surface-container-high transition-colors border border-outline-variant/5"
                >
                  {site}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 rounded-xl bg-surface-container overflow-hidden group relative">
            <div className="p-4 sm:p-8 pb-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400/20"></div>
                </div>
                <button 
                  onClick={() => url && onGenerate(url)}
                  className="text-[0.625rem] font-black uppercase tracking-widest text-primary hover:underline"
                >
                  Mockup this view
                </button>
              </div>
              <img 
                alt="Desktop website preview" 
                className="rounded-t-lg shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADNRAlX7KIJH-NsQjK263y4okx1Lnbd2_swLguVqW7Tx-ZnlvN6r9UD3eKk496LsXv0Q5g3bZvGykx26bBbibFzDwslTXb-xuW2fSE6-IabsKBsTuMtyRXo2vC6CndHyjSh1a4uwd2vRbDYn3V5o8kZJASqE89cZYEWxCA2_xqvNFzUbI0DbzatvqACB8Q88WiFGCBKUDusgpMJHsW3jtJBnU-RVzYUTJo2YAWwq9l3EkpJgrpUniEzr45zgCaM2V8b_rKC9DCIhk"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="h-full rounded-xl bg-surface-container-high p-8 flex flex-col items-center justify-center overflow-hidden relative group">
              <button 
                onClick={() => url && onGenerate(url)}
                className="absolute top-4 right-4 z-10 text-[0.625rem] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Generate
              </button>
              <img 
                alt="Mobile mockup" 
                className="h-64 object-contain shadow-xl rotate-6 transition-transform hover:rotate-0 duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-rCSx5sqhnjLAjSZCJymNd9v2jyqj6leKnSUWLYvXOS-kNOoShhxrerWtrnEskJ1V6BLCPF-EPjR-oqVKlfUGM9CzGcyZBJRPVfNiIr_E65ORjx7C3waY_uDrTyDxwZNvzDuqnisldk3UsVkZ-BSr2k_ZNc_DNV9FWyxk36vmuGIfC1FK9hXYzOiscmMv0loX3ue1oEIhFQ_PDabtmkdh8nlXNdw-DNgfI1TPh3zlKryyCzT-pVQyqyLx4jgU1d6iBISnJV0MNvw"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-xl bg-primary p-8 text-on-primary">
              <h3 className="text-xl font-bold mb-2 tracking-tight">Pixel Perfect</h3>
              <p className="text-sm opacity-80 leading-relaxed">High-resolution exports optimized for Twitter, LinkedIn, and Dribbble portfolios.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-on-surface-variant block mb-4">Automation</label>
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-6">Designed for creators who value their time.</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Smartphone className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Multi-Device Sync</h4>
                  <p className="text-on-surface-variant text-sm mt-1">Generate 12+ device formats from a single URL simultaneously.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Palette className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Custom Palettes</h4>
                  <p className="text-on-surface-variant text-sm mt-1">Automatic background extraction based on your website's primary colors.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full aspect-square rounded-xl bg-surface-container-highest flex items-center justify-center p-12">
              <img 
                alt="Code interface" 
                className="rounded-xl shadow-2xl scale-110 -rotate-3" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ZUO-o4YmV3qCHAYXMsp7lnQi-bwas3Qu7ruKBlDwHcXJmoYR69e75_ekt2nM0sNy9G8-QoM85_zMfpidjuL9Qu1mgRyVWDc2HWp9KSwHBY8fVPA_PHiMpWCLwiAlP03srpYJaSu0UT7ylqFSxRs0eoHEkXDZFBSfrLkSbdnMc0bfBup1S_sGr91uloxV_0KR7MPAtTbupyjMkhu6PFAhXsueN-LUqMrVtUV4jnUDJnHWgDOJ7f0ApZBrS4j6OLtYyjNXUbdd1II"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const ProcessingPage: FC<{ url: string, onBack: () => void }> = ({ url, onBack }) => {
  const previewUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=630`;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-40 pb-24 px-6 md:px-10 max-w-7xl mx-auto flex flex-col items-center"
    >
      <div className="text-center mb-16 max-w-2xl">
        <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-medium tracking-wider mb-6 inline-block text-[0.6875rem] uppercase">
          SYSTEM STATUS: ACTIVE
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-4">
          Processing your request...
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          We're generating high-fidelity mockups for <span className="text-primary font-mono">{url}</span>. This will only take a moment.
        </p>
        <button 
          onClick={onBack}
          className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 mx-auto"
        >
          <ChevronRight className="rotate-180" size={16} />
          Cancel and go back
        </button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <h2 className="text-[0.625rem] font-black uppercase tracking-widest text-on-surface-variant mb-8">Generation Pipeline</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
                    <Monitor size={20} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary border-2 border-surface-container-lowest rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-on-background">Desktop (1440px)</span>
                    <span className="text-xs font-semibold text-primary">Processing...</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '66%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 opacity-60">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <Tablet size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-on-background">Tablet (768px)</span>
                    <span className="text-xs font-semibold text-on-surface-variant">Pending</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-6 opacity-60">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <Smartphone size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-on-background">Mobile (375px)</span>
                    <span className="text-xs font-semibold text-on-surface-variant">Pending</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
            <div className="flex gap-4">
              <Info className="text-primary shrink-0" size={20} />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Our engine is rendering your site using a headless browser to ensure pixel-perfect accuracy across all viewports.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative bg-surface-container rounded-xl overflow-hidden min-h-[500px] flex items-center justify-center border border-outline-variant/10">
            <div className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover blur-2xl opacity-40 scale-110" 
                src={previewUrl}
                alt="Processing preview"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10 w-[85%] bg-surface-container-lowest/80 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-white/40">
              <div className="h-10 bg-surface-container-high/50 flex items-center px-4 gap-2 border-b border-outline-variant/10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400/40"></div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-3 bg-primary/20 rounded animate-pulse"></div>
                    <div className="w-20 h-2 bg-outline-variant/20 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-surface-container rounded-lg animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-40 bg-surface-container rounded-lg animate-pulse"></div>
                    <div className="w-full h-40 bg-surface-container rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-on-background/5">
                <div className="bg-surface-container-lowest p-5 rounded-full shadow-lg">
                  <Loader2 className="text-primary animate-spin" size={32} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-[10px] font-mono tracking-widest opacity-80 backdrop-blur-sm z-20">
              CAPTURING: DOM_SNAPSHOT_LATEST<br/>
              RENDER_ENGINE: WEBKIT_V2.4<br/>
              LATENCY: 142MS
            </div>
          </div>
        </div>
      </div>

      {/* Pre-fetch images to speed up ReadyPage */}
      <div className="hidden">
        <img src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900`} referrerPolicy="no-referrer" />
        <img src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1920&viewport.height=1080`} referrerPolicy="no-referrer" />
        <img src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1024&viewport.height=1366`} referrerPolicy="no-referrer" />
        <img src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=390&viewport.height=844`} referrerPolicy="no-referrer" />
        <img src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=412&viewport.height=915`} referrerPolicy="no-referrer" />
      </div>
    </motion.div>
  );
};

const ReadyPage: FC<{ url: string, onReset: () => void }> = ({ url, onReset }) => {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  const getScreenshotUrl = (width: number, height: number) => {
    return `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=${width}&viewport.height=${height}&viewport.deviceScaleFactor=2`;
  };

  const downloadImage = async (width: number, height: number, filename: string) => {
    try {
      const imageUrl = getScreenshotUrl(width, height);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, `${filename}.png`);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(getScreenshotUrl(width, height), '_blank');
    }
  };

  const downloadAllAsZip = async () => {
    setIsDownloadingAll(true);
    const zip = new JSZip();
    const devices = [
      { name: 'laptop-mockup', width: 1440, height: 900 },
      { name: 'desktop-mockup', width: 1920, height: 1080 },
      { name: 'tablet-mockup', width: 1024, height: 1366 },
      { name: 'ios-mockup', width: 390, height: 844 },
      { name: 'android-mockup', width: 412, height: 915 },
      { name: 'full-showcase', width: 2560, height: 1440 },
      { name: 'social-preview', width: 1200, height: 630 },
    ];

    try {
      const fetchPromises = devices.map(async (device) => {
        const imageUrl = getScreenshotUrl(device.width, device.height);
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        zip.file(`${device.name}.png`, blob);
      });

      await Promise.all(fetchPromises);
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'website-mockups.zip');
    } catch (error) {
      console.error('Failed to generate ZIP:', error);
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const shareImage = async (width: number, height: number, title: string) => {
    const imageUrl = getScreenshotUrl(width, height);
    try {
      if (navigator.share) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'mockup.png', { type: 'image/png' });
        await navigator.share({
          title: title,
          text: `Check out this mockup of ${url}`,
          files: [file],
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await navigator.clipboard.writeText(imageUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="pt-32 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto min-h-screen overflow-x-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
        <div className="space-y-3 text-center md:text-left">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-[0.625rem] uppercase tracking-widest">
            Ready for export
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-on-surface leading-tight">
            Your Showcase <br className="sm:hidden" /> is Ready
          </h1>
          <p className="text-primary font-mono text-xs sm:text-sm truncate max-w-[280px] sm:max-w-md mx-auto md:mx-0 opacity-70">
            {url}
          </p>
        </div>
        <button 
          onClick={downloadAllAsZip}
          disabled={isDownloadingAll}
          className="group relative flex items-center justify-center gap-3 bg-on-surface text-surface px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-on-surface/10 hover:bg-on-surface/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {isDownloadingAll ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />}
          <span className="relative z-10">{isDownloadingAll ? 'Generating ZIP...' : 'Download All (ZIP)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Laptop Mockup - 16:10 Aspect Ratio */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl overflow-hidden group shadow-sm border border-outline-variant/5">
          <div className="p-4 sm:p-12 pb-0 bg-slate-50 aspect-[16/10] flex items-end justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(77,74,213,0.1),transparent)] pointer-events-none"></div>
            <div className="relative w-full max-w-4xl transform group-hover:-translate-y-2 transition-transform duration-700 ease-out">
              <div className="bg-slate-900 p-1.5 rounded-t-2xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] ring-1 ring-white/10">
                <div className="h-7 bg-slate-900 rounded-t-xl flex items-center px-4 gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="flex-1 flex justify-center pr-10">
                    <div className="bg-white/5 px-3 py-0.5 rounded text-[10px] text-white/40 font-mono truncate max-w-[200px]">
                      {url.replace(/^https?:\/\//, '')}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-100 overflow-hidden rounded-b-sm relative min-h-[200px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-primary/20 animate-spin" size={24} />
                  </div>
                  <img 
                    className="w-full h-full object-cover object-top relative z-10" 
                    src={getScreenshotUrl(1440, 900)}
                    alt={`Laptop preview of ${url}`}
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">Laptop Showcase</h3>
              <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 sm:mt-1">1440 × 900px • MacBook Pro 14"</p>
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button 
                onClick={() => shareImage(1440, 900, 'Laptop Mockup')}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all active:scale-95"
                title="Share"
              >
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => downloadImage(1440, 900, 'laptop-mockup')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-on-primary font-bold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-primary hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/10"
              >
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Monitor Mockup */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl overflow-hidden group flex flex-col shadow-sm border border-outline-variant/5">
          <div className="flex-grow p-4 sm:p-10 bg-slate-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(77,74,213,0.05)_0%,transparent_100%)] pointer-events-none"></div>
            <div className="relative w-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
              <div className="bg-slate-900 p-1.5 rounded-xl shadow-2xl ring-1 ring-white/10">
                <div className="bg-slate-100 overflow-hidden rounded-lg relative min-h-[150px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-primary/20 animate-spin" size={20} />
                  </div>
                  <img 
                    className="w-full aspect-[16/9] object-cover object-top relative z-10" 
                    src={getScreenshotUrl(1920, 1080)}
                    alt={`Monitor preview of ${url}`}
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                  />
                </div>
              </div>
              {/* Monitor Stand */}
              <div className="w-16 h-4 bg-slate-800 mx-auto mt-0.5 rounded-b-lg"></div>
              <div className="w-24 h-1 bg-slate-700 mx-auto rounded-full"></div>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white flex-shrink-0">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">Desktop Monitor</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 sm:mt-1 mb-4 sm:mb-6">Studio Display • 1920 × 1080</p>
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => shareImage(1920, 1080, 'Desktop Mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-surface font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-95"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(1920, 1080, 'desktop-mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-primary font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/10"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tablet Mockup - 3:4 Aspect Ratio */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl overflow-hidden group flex flex-col shadow-sm border border-outline-variant/5">
          <div className="flex-grow p-10 bg-slate-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(77,74,213,0.05)_0%,transparent_100%)] pointer-events-none"></div>
            <div className="relative w-full max-w-[280px] transform group-hover:scale-105 transition-transform duration-700 ease-out">
              <div className="bg-slate-900 p-2.5 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] ring-1 ring-white/10">
                <div className="bg-slate-100 overflow-hidden rounded-[1.8rem] relative min-h-[150px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-primary/20 animate-spin" size={20} />
                  </div>
                  <img 
                    className="w-full h-full object-cover object-top relative z-10" 
                    src={getScreenshotUrl(1024, 1366)}
                    alt={`Tablet preview of ${url}`}
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white flex-shrink-0">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">Tablet Showcase</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 sm:mt-1 mb-4 sm:mb-6">iPad Pro 12.9" • 1024 × 1366</p>
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => shareImage(1024, 1366, 'Tablet Mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-surface font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-95"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(1024, 1366, 'tablet-mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-primary font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/10"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Mockup - 9:19.5 Aspect Ratio */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl overflow-hidden group flex flex-col shadow-sm border border-outline-variant/5">
          <div className="flex-grow p-10 bg-slate-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(-45deg,rgba(77,74,213,0.05)_0%,transparent_100%)] pointer-events-none"></div>
            <div className="relative w-[180px] transform group-hover:rotate-2 group-hover:translate-y-[-4px] transition-transform duration-700 ease-out">
              <div className="bg-slate-900 p-2 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.2)] ring-1 ring-white/10 relative">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 border border-white/5"></div>
                <div className="bg-slate-100 overflow-hidden rounded-[2.2rem] relative min-h-[150px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-primary/20 animate-spin" size={20} />
                  </div>
                  <img 
                    className="w-full h-full object-cover object-top relative z-10" 
                    src={getScreenshotUrl(390, 844)}
                    alt={`Mobile preview of ${url}`}
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white flex-shrink-0">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">iOS Mobile</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 sm:mt-1 mb-4 sm:mb-6">iPhone 15 Pro • 390 × 844</p>
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => shareImage(390, 844, 'iOS Mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-surface font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-95"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(390, 844, 'ios-mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-primary font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/10"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Android Mockup */}
        <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl overflow-hidden group flex flex-col shadow-sm border border-outline-variant/5">
          <div className="flex-grow p-10 bg-slate-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(77,74,213,0.05)_0%,transparent_100%)] pointer-events-none"></div>
            <div className="relative w-[180px] transform group-hover:-rotate-2 group-hover:translate-y-[-4px] transition-transform duration-700 ease-out">
              <div className="bg-slate-800 p-2 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.2)] ring-1 ring-white/10 relative">
                {/* Punch hole camera */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20 border border-white/10"></div>
                <div className="bg-slate-100 overflow-hidden rounded-[2.2rem] relative min-h-[150px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="text-primary/20 animate-spin" size={20} />
                  </div>
                  <img 
                    className="w-full h-full object-cover object-top relative z-10" 
                    src={getScreenshotUrl(412, 915)}
                    alt={`Android preview of ${url}`}
                    referrerPolicy="no-referrer"
                    onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                    style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white flex-shrink-0">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">Android Mobile</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mt-0.5 sm:mt-1 mb-4 sm:mb-6">Pixel 8 Pro • 412 × 915</p>
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => shareImage(412, 915, 'Android Mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-surface font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-95"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(412, 915, 'android-mockup')}
                className="flex-1 flex items-center justify-center gap-2 text-on-primary font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-primary-dim transition-all active:scale-95 shadow-md shadow-primary/10"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Mockup Layout - Combined View */}
        <div className="md:col-span-12 bg-surface-container-lowest rounded-3xl overflow-hidden group shadow-2xl shadow-black/5 border border-outline-variant/10">
          <div className="p-2 sm:p-16 bg-slate-950 relative overflow-hidden min-h-[300px] sm:min-h-[600px] flex items-center justify-center">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(77,74,213,0.2),transparent_70%)]"></div>
            
            <div className="relative w-full max-w-5xl flex items-center justify-center scale-[0.95] xs:scale-100 sm:scale-100 transition-transform duration-700">
              {/* Laptop in center */}
              <div className="relative z-20 w-3/4 transform group-hover:scale-[1.02] transition-transform duration-1000">
                <div className="bg-slate-800 p-1 rounded-t-xl shadow-2xl ring-1 ring-white/20">
                  <div className="bg-slate-100 aspect-[16/10] overflow-hidden rounded-sm">
                    <img 
                      className="w-full h-full object-cover object-top" 
                      src={getScreenshotUrl(1440, 900)}
                      alt="Full mockup laptop"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-b-xl w-[105%] -ml-[2.5%] shadow-xl"></div>
              </div>

              {/* Tablet behind left */}
              <div className="absolute left-0 bottom-10 z-10 w-1/3 transform -translate-x-1/4 group-hover:-translate-x-1/3 transition-transform duration-1000">
                <div className="bg-slate-800 p-1.5 rounded-[2rem] shadow-2xl ring-1 ring-white/20">
                  <div className="bg-slate-100 aspect-[3/4] overflow-hidden rounded-[1.8rem]">
                    <img 
                      className="w-full h-full object-cover object-top" 
                      src={getScreenshotUrl(1024, 1366)}
                      alt="Full mockup tablet"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile in front right */}
              <div className="absolute right-0 bottom-0 z-30 w-[18%] transform translate-x-1/4 group-hover:translate-x-1/3 transition-transform duration-1000">
                <div className="bg-slate-800 p-1 rounded-[2.5rem] shadow-2xl ring-1 ring-white/20">
                  <div className="bg-slate-100 aspect-[9/19.5] overflow-hidden rounded-[2.2rem]">
                    <img 
                      className="w-full h-full object-cover object-top" 
                      src={getScreenshotUrl(390, 844)}
                      alt="Full mockup mobile"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-8">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-black text-on-surface tracking-tight">Full Device Showcase</h3>
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-md">A combined high-resolution mockup of your entire digital presence, optimized for high-end displays.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => shareImage(2560, 1440, 'Full Device Showcase Mockup')}
                className="flex items-center justify-center gap-3 text-on-surface font-bold px-8 py-4 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-[0.98]"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(2560, 1440, 'full-showcase')}
                className="flex items-center justify-center gap-3 bg-primary text-on-primary font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all active:scale-[0.98]"
              >
                <Download size={20} />
                <span>Export 4K</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Page Scroll Mockup */}
        <div className="md:col-span-12 bg-surface-container-lowest rounded-3xl overflow-hidden group border border-outline-variant/10 shadow-sm">
          <div className="p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-8 border-b border-outline-variant/5">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-black text-on-surface tracking-tight">Full Page Scroll</h3>
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed max-w-md">The entire website from top to bottom, captured in a single high-resolution vertical mockup.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => shareImage(1440, 4000, 'Full Page Mockup')}
                className="flex items-center justify-center gap-3 text-on-surface font-bold px-8 py-4 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-[0.98]"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(1440, 4000, 'full-page')}
                className="flex items-center justify-center gap-3 bg-primary text-on-primary font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dim transition-all active:scale-[0.98]"
              >
                <Download size={20} />
                <span>Export Full</span>
              </button>
            </div>
          </div>
          <div className="bg-slate-50 p-6 sm:p-12 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-outline-variant/10 max-h-[600px] overflow-y-auto scrollbar-hide group-hover:shadow-primary/5 transition-shadow">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 pointer-events-none">
                  <Loader2 className="text-primary/20 animate-spin" size={32} />
                </div>
                <img 
                  className="w-full relative z-10" 
                  src={`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=4000&fullPage=true`}
                  alt="Full page preview"
                  referrerPolicy="no-referrer"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 0.8s ease-in-out' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm overflow-hidden group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-xl font-black">Bento Showcase</h4>
                <p className="text-xs text-on-surface-variant">A modern grid layout for your portfolio.</p>
              </div>
              <button 
                onClick={() => downloadImage(1920, 1080, 'bento-showcase')}
                className="p-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all"
              >
                <Download size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 h-[300px]">
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-outline-variant/5 transform group-hover:-translate-y-1 transition-transform">
                <img src={getScreenshotUrl(1440, 900)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="bg-slate-100 rounded-2xl overflow-hidden border border-outline-variant/5 transform group-hover:translate-x-1 transition-transform">
                  <img src={getScreenshotUrl(390, 844)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="bg-slate-100 rounded-2xl overflow-hidden border border-outline-variant/5 transform group-hover:translate-y-1 transition-transform">
                  <img src={getScreenshotUrl(1024, 1366)} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-3xl p-8 text-on-primary flex flex-col justify-between shadow-xl shadow-primary/20">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-black mb-2 leading-tight">Ready for the spotlight.</h4>
              <p className="text-sm opacity-80 leading-relaxed">Your website has been transformed into a professional visual asset.</p>
            </div>
            <button 
              onClick={() => shareImage(2560, 1440, 'Showcase Collection')}
              className="mt-8 w-full py-4 bg-white text-primary font-bold rounded-2xl hover:bg-opacity-90 transition-all active:scale-[0.98]"
            >
              Share Collection
            </button>
          </div>
        </div>

        {/* Social Preview - 1.91:1 Aspect Ratio */}
        <div className="md:col-span-12 bg-surface-container-lowest rounded-3xl overflow-hidden group flex flex-col md:flex-row border border-outline-variant/10 shadow-sm">
          <div className="md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <span className="text-primary font-black tracking-widest text-[0.625rem] uppercase mb-4">Sharing Ready</span>
            <h3 className="text-xl sm:text-2xl font-black text-on-surface mb-2">Social Preview</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm mb-8 leading-relaxed">Perfectly cropped for Twitter and LinkedIn feed previews. Ensure your site looks professional when shared across the web.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => shareImage(1200, 630, 'Social Preview Mockup')}
                className="flex items-center gap-2 text-on-surface font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all active:scale-[0.98]"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
              <button 
                onClick={() => downloadImage(1200, 630, 'social-preview')}
                className="flex items-center gap-2 bg-surface-container-low text-on-surface font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-surface-container-high transition-all active:scale-[0.98]"
              >
                <Download size={18} />
                <span>PNG</span>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 h-56 sm:h-auto bg-surface-container-high flex items-center justify-center p-6 sm:p-10">
            <div className="w-full aspect-[1.91/1] bg-slate-100 rounded-lg shadow-lg overflow-hidden relative min-h-[120px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="text-primary/20 animate-spin" size={24} />
              </div>
              <img 
                className="w-full h-full object-fill object-top opacity-0 group-hover:scale-105 transition-all duration-700 relative z-10" 
                src={getScreenshotUrl(1200, 630)}
                alt={`Social preview of ${url}`}
                referrerPolicy="no-referrer"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 p-6 sm:p-12 bg-surface-container-lowest rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 border border-outline-variant/10 shadow-sm">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-black mb-3">Want more customization?</h2>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">Adjust device colors, background gradients, and shadow intensity to match your brand's unique style perfectly.</p>
        </div>
        <button 
          onClick={onReset}
          className="w-full md:w-auto bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-10 py-4 rounded-2xl font-bold transition-all active:scale-[0.98] border border-outline-variant/5"
        >
          Go back to Editor
        </button>
      </div>
    </motion.div>
  );
}



