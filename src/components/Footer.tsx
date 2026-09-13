import profile from '../data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-mist sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React,
          TypeScript &amp; Three.js.
        </p>
        <p className="flex items-center gap-1.5">
          Designed &amp; developed from Bengaluru, India
        </p>
      </div>
    </footer>
  );
}
