import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      let newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory, newMode]);
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      let newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
}
