import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation

export default function Quiz({ questions, category, goBack }) {
  // State for current question index
  const [currentQ, setCurrentQ] = useState(0);

  // State to track user score
  const [score, setScore] = useState(0);

  // Countdown timer for each question
  const [timer, setTimer] = useState(20);

  // State to determine when to show the results
  const [showResult, setShowResult] = useState(false);

  // Countdown effect for timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown); // Cleanup timer
    } else {
      handleNext(); // Move to next question when timer runs out
    }
  }, [timer]);

  // Handle answer selection
  const handleAnswer = (option) => {
    if (option === questions[currentQ].answer) {
      setScore(score + 1); // Increase score if correct
    }
    handleNext();
  };

  // Move to next question or end quiz
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimer(20); // Reset timer for next question
    } else {
      setShowResult(true); // Show final score
    }
  };

  return (
    <div style={{ textAlign: "center", width: "100%", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      {/* Quiz title */}
      <h1 style={{ marginBottom: "20px", color: "#333" }}>{category.toUpperCase()} QUIZ</h1>

      {/* Main quiz container with fade-in animation */}
      <motion.div
        key={currentQ} // Ensure animation runs on question change
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!showResult ? (
          <>
            {/* Timer */}
            <p style={{ fontSize: '20px', color: timer <= 5 ? 'red' : '#333', fontWeight: 'bold' }}>
              Time left: {timer}s
            </p>

            {/* Current question */}
            <h3 className="questionText" style={{ margin: "20px 0", color: "#555" }}>{questions[currentQ].question}</h3>

            {/* Answer options */}
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="btn btn-outline-secondary m-2"
                style={{ minWidth: "100px", fontWeight: "500" }}
              >
                {opt}
              </button>
            ))}
          </>
        ) : (
          <>
            {/* Quiz result */}
            <h2 style={{ marginBottom: "10px", color: "#333" }}>
              Your Score: {score}/{questions.length}
            </h2>
            <h3 style={{ marginBottom: "20px", color: score >= 7 ? 'green' : 'red' }}>
              {score >= 7 ? "🎉 You Passed!" : "❌ Try Again"}
            </h3>

            {/* Go back button */}
            <button
              onClick={goBack}
              className="btn btn-dark m-4"
            >
              Go Back
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
