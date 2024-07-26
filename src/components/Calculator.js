import React, { useState, useRef, useEffect } from "react";

const Calculator = () => {
  const [result, setResult] = useState(0);
  const [currentInput, setCurrentInput] = useState("0");
  const [selectedOperator, setSelectedOperator] = useState(null);
  const screenRef = useRef(null);
  const [operatorSymbol, setOperatorSymbol] = useState(null);
  const [history, setHistory] = useState("");
  const [previousValue, setPreviousValue] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateResult();
    } else if (e.key >= "0" && e.key <= "9") {
      appendToCurrentInput(e.key);
    } else if (e.key === "+") {
      setOperator("+");
    } else if (e.key === "-") {
      setOperator("-");
    } else if (e.key === "*") {
      setOperator("*");
    } else if (e.key === "/") {
      setOperator("/");
    } else if (e.key === "Backspace") {
      deleteLastCharacter();
    } else if (e.key === "Escape") {
      clearAll();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentInput, selectedOperator, result, previousValue]);

  function appendToCurrentInput(value) {
    if (value === "." && currentInput.includes(".")) {
      return;
    }
    if (currentInput === "0") {
      setCurrentInput("");
    }
    setCurrentInput((prev) => prev + value);
  }

  function clearAll() {
    setCurrentInput("0");
    setResult(0);
    setSelectedOperator(null);
    setOperatorSymbol(null);
  }

  function setOperator(newOperator) {
    if (currentInput !== "") {
      if (selectedOperator) {
        calculateResult();
      } else {
        setResult(parseFloat(currentInput || "0"));
        setPreviousValue(parseFloat(currentInput));
      }
      setSelectedOperator(newOperator);
      setOperatorSymbol(newOperator);
      setCurrentInput("");
    }
  }

  function calculateResult() {
    if (selectedOperator && currentInput !== "") {
      let updatedResult = result;
      const inputNumber = parseFloat(currentInput);
      if (selectedOperator === "+") {
        updatedResult += inputNumber;
      } else if (selectedOperator === "-") {
        updatedResult -= inputNumber;
      } else if (selectedOperator === "*") {
        updatedResult *= inputNumber;
      } else if (selectedOperator === "/") {
        if (currentInput === "0") {
          alert("It cannot be divided by 0!");
          setOperatorSymbol(null);
          updatedResult = "Undefined";
        } else {
          updatedResult /= inputNumber;
        }
      }
      setResult(updatedResult);
      setCurrentInput(updatedResult.toString());
      setSelectedOperator(null);
      setOperatorSymbol(null);
      setHistory(
        (prevHistory) =>
          `${prevHistory}${previousValue} ${selectedOperator} ${inputNumber} = ${updatedResult}\n`
      );
      setPreviousValue(updatedResult);
    }
  }

  function deleteLastCharacter() {
    if (currentInput !== "0") {
      const updatedInput = currentInput.slice(0, -1);
      if (updatedInput === "") {
        setCurrentInput("0");
      } else {
        setCurrentInput(updatedInput);
      }
    }
  }

  function clearHistory(){
    setHistory("");
  }

  return (
    <div tabIndex="0" className="container">
      <h1 className="headerText">Simple React Calculator</h1>
      <p className="historyText">History</p>
      <i className="bi bi-trash" onClick={clearHistory}></i>
      <p>
        <br />
        <textarea
          className="historyArea"
          value={history}
          readOnly
          style={{
            width: "100%",
            height: "100vh",
            resize: "none",
            outline: "none",
          }}
        />
      </p>
      <div className="calculator card mx-auto">
        <input
          type="text"
          className="calculator-screen z-depth-1"
          value={currentInput}
          disabled
          ref={screenRef}
        />

        <p className="operator-symbol">{operatorSymbol}</p>

        <div className="calculator-keys">
          <button
            type="button"
            className="operator btn btn-info"
            onClick={() => setOperator("+")}
          >
            +
          </button>
          <button
            type="button"
            className="operator btn btn-info"
            onClick={() => setOperator("-")}
          >
            -
          </button>
          <button
            type="button"
            className="operator btn btn-info"
            onClick={() => setOperator("*")}
          >
            &times;
          </button>
          <button
            type="button"
            className="operator btn btn-info"
            onClick={() => setOperator("/")}
          >
            &divide;
          </button>

          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("7")}
          >
            7
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("8")}
          >
            8
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("9")}
          >
            9
          </button>

          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("4")}
          >
            4
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("5")}
          >
            5
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("6")}
          >
            6
          </button>

          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("1")}
          >
            1
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("2")}
          >
            2
          </button>
          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("3")}
          >
            3
          </button>

          <button
            type="button"
            className="btn btn-secondary waves-effect"
            onClick={() => appendToCurrentInput("0")}
          >
            0
          </button>
          <button
            type="button"
            className="decimal function btn btn-secondary"
            onClick={() => appendToCurrentInput(".")}
          >
            .
          </button>
          <button
            type="button"
            className="all-clear function btn btn-danger btn-sm"
            onClick={deleteLastCharacter}
          >
            DEL
          </button>

          <button
            type="button"
            className="delete function btn btn-danger btn-sm"
            onClick={clearAll}
          >
            AC
          </button>

          <button
            type="button"
            className="equal-sign operator btn btn-default"
            onClick={calculateResult}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
