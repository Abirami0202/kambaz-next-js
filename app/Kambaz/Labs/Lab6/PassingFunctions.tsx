export default function PassingFunctions({ theFunction }: { theFunction: () => void }) {
  return (
    <div id="wd-passing-functions">
      <h4>Passing Functions</h4>
      <button onClick={theFunction} className="btn btn-primary">
        Invoke the Function
      </button>
      <hr />
    </div>
  );
}