import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from "./components/Quiz";
import { quizData } from "./components/data";

export default function App() {
  const [category, setCategory] = useState(null);

  return (
    <div style={{ 
      backgroundColor: "#EDF7F6", 
      height: "100vh", 
      margin: 0, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "column",
      padding: "20px"
    }}>
      {!category ? (
        <>
          <h1 style={{ marginBottom: "20px", color: "#333" }}>Choose a Quiz</h1>
          <div>
            {Object.keys(quizData).map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)} 
                style={{ margin: "5px", padding: "10px 20px" }}
                className="btn btn-dark"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <Quiz 
          questions={quizData[category]} 
          category={category} 
          goBack={() => setCategory(null)} 
        />
      )}
    </div>
  );
}
