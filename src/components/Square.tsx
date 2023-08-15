export default function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  return (
    <div>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </div>
  );
}
