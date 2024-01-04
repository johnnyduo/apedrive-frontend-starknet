export function randomHash(nChar: number) {
  let nBytes = Math.ceil((nChar = (+nChar || 8) / 2));
  let u = new Uint8Array(nBytes);
  window.crypto.getRandomValues(u);
  let zpad = (str: string) => '00'.slice(str.length) + str;
  let a = Array.prototype.map.call(u, (x) => zpad(x.toString(16)));
  let str = a.join('').toLowerCase();
  if (nChar % 2) str = str.slice(1);
  return str;
}

export function randomPk(): `0x${string}` {
  return `0x${randomHash(64)}`;
}
