import { useState } from 'react';

function App() {
  const [input, setInput] = useState("");

  const handleClick = (val) => {
    if (val === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Hiba");
      }
    } else if (val === "C") {
      setInput("");
    } else {
      setInput(input + val);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Számológép</h2>
      <input value={input} readOnly />
      <div>
        {["1","2","3","+","4","5","6","-","7","8","9","*","0","C","=","/"].map(btn => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
