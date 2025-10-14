export default async function AddPathParameters({ 
  params 
}: { 
  params: Promise<{ a: string; b: string }> 
}) {
  const { a, b } = await params;
  
  return (
    <div id="wd-add">
      <h4>Add Path Parameters</h4>
      {a} + {b} = {parseInt(a) + parseInt(b)}
    </div>
  );
}