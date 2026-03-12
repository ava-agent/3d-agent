export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="text-sm text-muted-foreground">
          3D Agent
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
          <span>Powered by</span>
          <span className="gradient-text font-medium">GLM-4</span>
        </div>
      </div>
    </footer>
  );
}
