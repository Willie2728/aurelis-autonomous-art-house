export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0a09] text-[#f5f1e9]" aria-busy="true" aria-label="Loading AURELIS">
      <div className="text-center">
        <span className="mx-auto mb-6 block size-12 animate-spin rounded-full border border-[#c8a968]/20 border-t-[#c8a968]" />
        <p className="eyebrow text-[#c8a968]">Preparing the gallery</p>
      </div>
    </main>
  );
}
