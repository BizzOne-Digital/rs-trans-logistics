import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070B12] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. Let us help you get back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-shine bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition-all">
            Back to Home
          </Link>
          <Link href="/contact" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:bg-white/5">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
