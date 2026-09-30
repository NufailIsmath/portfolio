// A stylised phone showing a Clean ID-style identity screen. Pure CSS/SVG, no screenshots.

function PseudoQR() {
  // Deterministic QR-like pattern (decorative only).
  const n = 17;
  let s = 7;
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      const finder = (x < 5 && y < 5) || (x > n - 6 && y < 5) || (x < 5 && y > n - 6);
      if (!finder && s % 3 === 0) cells.push([x, y]);
    }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={x + 1.5} y={y + 1.5} width="2" height="2" fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox={`-0.5 -0.5 ${n + 1} ${n + 1}`} className="qr" aria-hidden>
      {cells.map(([x, y]) => (
        <rect key={`${x}.${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
      {finder(0, 0)}
      {finder(n - 5, 0)}
      {finder(0, n - 5)}
    </svg>
  );
}

export default function PhoneMockup() {
  return (
    <div className="phone" aria-label="Illustration of the Clean ID mobile app identity screen" role="img">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="ph-status mono">
          <span>9:41</span>
          <span>●●● ▮</span>
        </div>
        <div className="ph-hello">
          <span className="muted small">Welcome back</span>
          <strong>Your Clean ID</strong>
        </div>
        <div className="ph-idcard">
          <div>
            <span className="ph-chip">KYC verified ✓</span>
            <strong className="mono">CID-7F3A-21C9</strong>
            <span className="small">Smart wallet · 0x9c4e…a71b</span>
          </div>
          <PseudoQR />
        </div>
        <div className="ph-row">
          <div className="ph-tile">
            <span className="small muted">Assets</span>
            <strong>3 deeds</strong>
          </div>
          <div className="ph-tile">
            <span className="small muted">Wallets</span>
            <strong>2 linked</strong>
          </div>
        </div>
        <div className="ph-list">
          <span className="small muted">Recent activity</span>
          <div className="ph-item">
            <i className="ok" />
            <span>Deed #2041 transferred</span>
          </div>
          <div className="ph-item">
            <i />
            <span>Wallet connected</span>
          </div>
          <div className="ph-item">
            <i />
            <span>Profile shared via QR</span>
          </div>
        </div>
        <div className="ph-tabs" aria-hidden>
          <span className="on" />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
