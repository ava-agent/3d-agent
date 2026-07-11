export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>3D Agent</span>
          <a
            href="https://github.com/ava-agent/3d-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground/50 hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
          <span>Powered by</span>
          <span className="gradient-text font-medium">Ark Agent Plan</span>
        </div>
      </div>
    </footer>
  );
}
