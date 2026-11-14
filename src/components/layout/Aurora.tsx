/** Fixed ambient background: drifting light, a faint Swiss grid and film grain. Pure CSS. */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__blob aurora__blob--a" />
      <div className="aurora__blob aurora__blob--b" />
      <div className="aurora__blob aurora__blob--c" />
      <div className="aurora__grid" />
      <div className="aurora__noise" />
    </div>
  );
}
