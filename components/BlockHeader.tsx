// Section headers styled as blocks in a chain: each shows its own hash and the previous block's.

function hash(input: string) {
  // FNV-1a, expanded to 8 hex chars — decorative, deterministic.
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export default function BlockHeader({
  index,
  title,
  prev,
  kicker,
}: {
  index: number;
  title: string;
  prev: string;
  kicker?: string;
}) {
  const own = hash(prev + title);
  const prevHash = hash(prev);
  return (
    <div className="block-head">
      <div className="block-meta mono" aria-hidden>
        <span className="block-no">BLOCK #{String(index).padStart(2, "0")}</span>
        <span className="block-hash">
          prev <b>0x{prevHash.slice(0, 4)}…{prevHash.slice(-2)}</b>
        </span>
        <span className="block-hash">
          hash <b>0x{own.slice(0, 4)}…{own.slice(-2)}</b>
        </span>
      </div>
      <h2>{title}</h2>
      {kicker && <p className="kicker">{kicker}</p>}
    </div>
  );
}
