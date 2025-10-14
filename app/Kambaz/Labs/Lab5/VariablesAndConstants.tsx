/* eslint-disable prefer-const */
/* eslint-disable no-var */
export default function VariablesAndConstants() {
  var functionScoped = 2;  // Keep as var - this is teaching the difference!
  const blockScoped = 5;  // Changed from let to const
  const constant1 = functionScoped - blockScoped;
  
  return (
    <div id="wd-variables-and-constants">
      <h4>Variables and Constants</h4>
      functionScoped = {functionScoped}<br/>
      blockScoped = {blockScoped}<br/>
      constant1 = {constant1}
      <hr/>
    </div>
  );
}