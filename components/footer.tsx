"use client";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold uppercase tracking-[0.28em]">JMV Vision</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
            Intelligence mode et casting premium pour les équipes créatives de demain.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.24em] text-white/45">
          <a href="#" className="transition hover:text-white">
            Confidentialité
          </a>
          <a href="#models" className="transition hover:text-white">
            Casting
          </a>
          <a href="#studios" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
