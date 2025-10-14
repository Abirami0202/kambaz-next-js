export default function VariableTypes() {
  const numberVariable = 123;  // Changed from let
  const floatingPointNumber = 234.345;  // Changed from let
  const stringVariable = 'Hello World!';  // Changed from let
  const booleanVariable = true;  // Changed from let
  const isNumber = typeof numberVariable;  // Changed from let
  const isString = typeof stringVariable;  // Changed from let
  const isBoolean = typeof booleanVariable;  // Changed from let
  
  return (
    <div id="wd-variable-types">
      <h4>Variable Types</h4>
      numberVariable = {numberVariable}<br/>
      floatingPointNumber = {floatingPointNumber}<br/>
      stringVariable = {stringVariable}<br/>
      booleanVariable = {booleanVariable + ""}<br/>
      isNumber = {isNumber}<br/>
      isString = {isString}<br/>
      isBoolean = {isBoolean}
      <hr/>
    </div>
  );
}