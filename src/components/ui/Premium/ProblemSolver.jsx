import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * ProblemSolver component for the interactive workbook flow.
 * Displays a problem number, question, and optionally a bespoke tracer.
 * 
 * Uses inline styles and design system variables to remain self-contained 
 * and follow project constraints.
 * 
 * @param {Object} props
 * @param {number|string} props.number - Problem number
 * @param {string} props.question - Markdown question text
 * @param {string} props.answer - Markdown answer text
 * @param {Array} props.explanation - Array of explanation step objects { step, text }
 * @param {React.Component} props.BespokeTracer - Tracer component to render
 * @param {string} props.algorithm - Algorithm ID
 * @param {any} props.data - Optional data for the tracer
 */
const ProblemSolver = ({ number, question, answer, explanation, BespokeTracer, data }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="card" style={{ 
      overflow: 'hidden', 
      margin: 'var(--space-8) 0',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      animation: 'fadeInUp var(--transition-base)'
    }}>
      <div style={{ 
        padding: 'var(--space-8)', 
        borderBottom: '1px solid var(--border-subtle)', 
        background: 'var(--bg-elevated)', 
        display: 'flex', 
        gap: 'var(--space-6)',
        alignItems: 'flex-start'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: 'var(--accent-blue)', 
          color: 'white', 
          borderRadius: 'var(--radius-lg)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: 'var(--text-2xl)',
          fontWeight: '800', 
          flexShrink: 0,
          boxShadow: 'var(--shadow-sm)'
        }}>
          {number}
        </div>
        <div style={{ 
          flex: 1, 
          fontSize: 'var(--text-lg)',
          lineHeight: '1.6',
          fontWeight: '500',
          color: 'var(--text-primary)',
          paddingTop: 'var(--space-1)'
        }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {question}
          </ReactMarkdown>
        </div>
      </div>
      
      {BespokeTracer && (
        <div style={{ padding: 'var(--space-8) var(--space-8) 0 var(--space-8)' }}>
          <div style={{ 
            background: 'var(--bg-elevated)', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-subtle)', 
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <BespokeTracer data={data} />
          </div>
        </div>
      )}

      <div style={{ padding: 'var(--space-8)', borderTop: BespokeTracer ? 'none' : 'none' }}>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: showSolution ? 'var(--bg-elevated)' : 'var(--accent-blue)',
            color: showSolution ? 'var(--text-primary)' : 'white',
            border: '1px solid var(--border-subtle)',
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: 'var(--text-sm)',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span>{showSolution ? 'Hide Solution' : 'View Correct Solution'}</span>
          <span>{showSolution ? '▲' : '▼'}</span>
        </button>

        {showSolution && (
          <div style={{ 
            marginTop: 'var(--space-6)',
            padding: 'var(--space-6)',
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            animation: 'fadeInUp 0.3s ease'
          }}>
            {answer && (
              <div style={{
                padding: 'var(--space-6)',
                background: 'rgba(59, 130, 246, 0.04)',
                borderLeft: '4px solid var(--accent-blue)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                marginBottom: 'var(--space-6)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-primary)'
              }}>
                <div style={{ 
                  fontWeight: '700', 
                  marginBottom: 'var(--space-3)', 
                  color: 'var(--accent-blue)', 
                  textTransform: 'uppercase', 
                  fontSize: '11px', 
                  letterSpacing: '0.05em' 
                }}>
                  Correct Answer
                </div>
                <div style={{ lineHeight: '1.6' }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                </div>
              </div>
            )}

            {explanation && Array.isArray(explanation) && explanation.length > 0 && (
              <div style={{ marginTop: 'var(--space-6)' }}>
                <div style={{ 
                  fontWeight: '700', 
                  marginBottom: 'var(--space-4)', 
                  color: 'var(--text-secondary)', 
                  textTransform: 'uppercase', 
                  fontSize: '11px', 
                  letterSpacing: '0.05em' 
                }}>
                  Detailed Step-by-Step Explanation
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {explanation.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        {step.step || (idx + 1)}
                      </div>
                      <div style={{ 
                        fontSize: 'var(--text-sm)', 
                        color: 'var(--text-secondary)', 
                        lineHeight: '1.6', 
                        paddingTop: '2px',
                        flex: 1 
                      }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.text}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolver;

