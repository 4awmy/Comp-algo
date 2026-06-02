import React from 'react';
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
 * @param {React.Component} props.BespokeTracer - Tracer component to render
 * @param {string} props.algorithm - Algorithm ID
 * @param {any} props.data - Optional data for the tracer
 */
const ProblemSolver = ({ number, question, BespokeTracer, algorithm, data }) => {
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
        <div style={{ padding: 'var(--space-8)' }}>
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
    </div>
  );
};

export default ProblemSolver;
