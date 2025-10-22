export default function ClickEvent() {
  const hello = () => {
    alert("Hello World!");
  };
  
  const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
  };

  return (
    <div id="wd-click-event">
      <h4>Click Event</h4>
      <button onClick={hello} className="btn btn-primary me-2" id="wd-hello-world-click">
        Hello World!
      </button>
      <button onClick={() => lifeIs("Good!")} className="btn btn-success me-2" id="wd-life-is-good-click">
        Life is Good!
      </button>
      <button 
        onClick={() => {
          hello();
          lifeIs("Great!");
        }} 
        className="btn btn-info"
        id="wd-life-is-great-click"
      >
        Life is Great!
      </button>
      <hr />
    </div>
  );
}