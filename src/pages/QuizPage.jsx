/* eslint-disable */
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQuizByLectureId, QUIZZES } from '../data/quizzes'
import { getLectureById } from '../data/lectures'
import styles from './QuizPage.module.css'

export default function QuizPage() {
  const { id } = useParams()
  const lectureMeta = getLectureById(id)
  const questions = getQuizByLectureId(id)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null) // index of selected option
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Reset quiz state when lecture changes
   
  useEffect(() => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setHasSubmitted(false)
    setScore(0)
    setShowResults(false)
  }, [id])

  if (!lectureMeta) {
    return (
      <div className={styles.container}>
        <div className={styles.noQuiz}>Lecture not found</div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noQuiz}>
          <h3>No quiz questions available for this lecture.</h3>
          <p>You can review the lecture notes or head back to the home page!</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIdx]
  const progressPercent = ((currentIdx) / questions.length) * 100
  const finalProgressPercent = 100

  const handleOptionClick = (idx) => {
    if (hasSubmitted) return
    setSelectedOption(idx)
  }

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return
    
    setHasSubmitted(true)
    if (selectedOption === currentQuestion.answer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1)
      setSelectedOption(null)
      setHasSubmitted(false)
    } else {
      setShowResults(true)
    }
  }

  const handleRetake = () => {
    setCurrentIdx(0)
    setSelectedOption(null)
    setHasSubmitted(false)
    setScore(0)
    setShowResults(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Lecture {parseInt(id)} Quiz</span>
        <h1 className={styles.title}>{lectureMeta.title}</h1>
        <p className={styles.meta}>Test your understanding of the concepts.</p>
      </div>

      {!showResults ? (
        <div className={styles.quizCard}>
          {/* Progress bar */}
          <div className={styles.progress}>
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          
          <div className={styles.progressBarOuter}>
            <div 
              className={styles.progressBarInner} 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <h3 className={styles.questionText}>
            {currentQuestion.question}
          </h3>

          <ul className={styles.optionsList}>
            {currentQuestion.options.map((opt, idx) => {
              // Styling classes based on status
              let itemClass = ''
              let badgeClass = ''

              if (hasSubmitted) {
                if (idx === currentQuestion.answer) {
                  itemClass = styles.optionItemCorrect
                  badgeClass = styles.optionBadgeActive
                } else if (idx === selectedOption) {
                  itemClass = styles.optionItemIncorrect
                } else {
                  itemClass = styles.optionItemDisabled
                }
              } else {
                if (idx === selectedOption) {
                  itemClass = styles.optionItemActive
                  badgeClass = styles.optionBadgeActive
                }
              }

              return (
                <li 
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`${styles.optionItem} ${itemClass}`}
                >
                  <span className={`${styles.optionBadge} ${badgeClass}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </li>
              )
            })}
          </ul>

          {/* Explanation if submitted */}
          {hasSubmitted && (
            <div className={styles.explanationPanel}>
              <h4 className={styles.explanationTitle}>
                <span>💡</span> Explanation
              </h4>
              <p className={styles.explanationText}>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end">
            {!hasSubmitted ? (
              <button 
                onClick={handleSubmit} 
                disabled={selectedOption === null}
                className="btn btn-primary"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="btn btn-primary"
              >
                {currentIdx < questions.length - 1 ? 'Next Question ➔' : 'View Results ➔'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className={styles.quizCard} style={{ textAlign: 'center' }}>
          <div className={styles.progressBarOuter}>
            <div className={styles.progressBarInner} style={{ width: `${finalProgressPercent}%` }} />
          </div>

          <div className={styles.resultsCard}>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreValue}>{score}/{questions.length}</span>
              <span className={styles.scoreLabel}>Correct</span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
              {score === questions.length ? '🎉 Perfect Score!' : score >= questions.length / 2 ? '👍 Good Job!' : '📚 Keep Studying!'}
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              You got {Math.round((score / questions.length) * 100)}% of questions correct.
            </p>

            <div className="flex justify-center gap-16">
              <button onClick={handleRetake} className="btn btn-outline">
                Retake Quiz
              </button>
              <Link to={`/lecture/${id}`} className="btn btn-primary">
                Review Lecture
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer navigation */}
      <div className={styles.navLinks}>
        <Link to="/" className="btn btn-outline">
          ◀ Back to Course Home
        </Link>
        {lectureMeta.hasSection && (
          <Link to={`/section/${id}`} className="btn btn-outline">
            Go to Practice Sheet ▶
          </Link>
        )}
      </div>
    </div>
  )
}
