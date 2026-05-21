export function SceneLoader() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <p className="text-[10px] uppercase tracking-[0.3em]">Loading 3D model</p>
      </div>
    </div>
  );
}
