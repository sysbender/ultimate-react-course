export function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list.</em>
      </footer>
    );
  }
  const itemNum = items.length;
  const packedNum = items.filter((item) => item.packed).length;
  const progress = Math.round((100 * packedNum) / itemNum);
  return (
    <footer className="stats">
      <em>
        {progress === 100
          ? "You got everything. Done"
          : `
        You have ${itemNum} items on your list, and you already packed 
        ${packedNum}( ${progress}%)`}
      </em>
    </footer>
  );
}
