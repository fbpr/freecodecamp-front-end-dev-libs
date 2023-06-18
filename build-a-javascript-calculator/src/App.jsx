import { useState } from 'react';
import './App.css';

function App() {
  const [initNum, setInitNum] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const clear = () => {
    setInitNum('0');
    setFormula('');
  };

  const handleOperator = (e) => {
    const o = e.target.value;
    
    if (evaluated) {
      setInitNum(o);
      setFormula(initNum + o);
      setEvaluated(false);
    } else {
      setInitNum(o);
      setFormula(
        initNum === '0'
          ? initNum.slice(0, -1) + o
          : isNaN(initNum)
          ? o === "-" 
            ? formula + o             
            : formula.replace(/[x/+-]+$/, "") + o
          : formula + o
      );
    }
  };
  const handleNumber = (e) => {
    const v = e.target.value;

    if (evaluated) {
      setInitNum(v);
      setFormula(v !== '0' ? v : '');
      setEvaluated(false);
    } else {
      setInitNum(initNum === '0' || isNaN(initNum) ? v : initNum + v);
      setFormula(initNum === '0' ? initNum.slice(0, -1) + v : formula + v);
    }
  };

  const handleEval = (e) => {
    const eq = e.target.value;
    let exp = formula;
    
    if (isNaN(formula[formula.length - 1])) {
      exp = exp.slice(0, -1);
    }

    const answer = String(eval(exp.replace(/x/g, '*').replace(/‑/g, '-')));
    if (!evaluated) {
      setInitNum(initNum === '0' ? String(NaN) : answer);
      setFormula(initNum === '0' ? String(NaN) : exp + eq + answer);
      setEvaluated(true);
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setInitNum('0.');
      setFormula('0.');
      setEvaluated(false);
    } else {
      setInitNum(initNum === '0' || isNaN(initNum) ? "0." : formula.includes('.') ? initNum : initNum + ".");
      setFormula(initNum === '0' ? formula !== "" ? formula + "." : "0." : formula + ".");
    }
  }
  return (
    <>
      <div>
        <div className="calculator">
          <div className="formula">{formula}</div>
          <div className="output" id="display">
            {initNum}
          </div>
          <div>
            <button
              className="jumbo"
              id="clear"
              value="AC"
              style={{ background: 'rgb(172, 57, 57)' }}
              onClick={clear}
            >
              AC
            </button>
            <button
              id="divide"
              value="/"
              style={{ background: 'rgb(102, 102, 102)' }}
              onClick={handleOperator}
            >
              /
            </button>
            <button
              id="multiply"
              value="x"
              style={{ background: 'rgb(102, 102, 102)' }}
              onClick={handleOperator}
            >
              x
            </button>
            <button id="seven" value="7" onClick={handleNumber}>
              7
            </button>
            <button id="eight" value="8" onClick={handleNumber}>
              8
            </button>
            <button id="nine" value="9" onClick={handleNumber}>
              9
            </button>
            <button
              id="subtract"
              value="-"
              style={{ background: 'rgb(102, 102, 102)' }}
              onClick={handleOperator}
            >
              -
            </button>
            <button id="four" value="4" onClick={handleNumber}>
              4
            </button>
            <button id="five" value="5" onClick={handleNumber}>
              5
            </button>
            <button id="six" value="6" onClick={handleNumber}>
              6
            </button>
            <button
              id="add"
              value="+"
              style={{ background: 'rgb(102, 102, 102)' }}
              onClick={handleOperator}
            >
              +
            </button>
            <button id="one" value="1" onClick={handleNumber}>
              1
            </button>
            <button id="two" value="2" onClick={handleNumber}>
              2
            </button>
            <button id="three" value="3" onClick={handleNumber}>
              3
            </button>
            <button
              className="jumbo"
              id="zero"
              value="0"
              onClick={handleNumber}
            >
              0
            </button>
            <button id="decimal" value="." onClick={handleDecimal}>
              .
            </button>
            <button
              id="equals"
              value="="
              style={{
                background: 'rgb(0, 68, 102)',
                position: 'absolute',
                height: '130px',
                bottom: '5px',
              }}
              onClick={handleEval}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
