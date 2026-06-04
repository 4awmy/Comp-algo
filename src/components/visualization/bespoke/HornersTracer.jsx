import { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const POLYNOMIAL = [3, 2, -1, 4]; // 3x^3 + 2x^2 - x + 4
const X_VALUE = 2;

/**
 * HornersTracer - Visualizes polynomial evaluation using Horner's Rule.
 * Formula: P(x) = (...((a_n*x + a_n-1)*x + a_n-2)*x + ... + a_0)
 */
const HornersTracer = ({ style }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    const coeffs = [...POLYNOMIAL].reverse(); // [a_n, ..., a_0]
    let result = coeffs[0];

    s.push({
      coeff: coeffs[0],
      coeffIdx: POLYNOMIAL.length - 1,
      prevResult: 0,
      operation: `Initial value: p = a_3`,
      currentResult: result,
      description: `Start with the leading coefficient a_3 = ${coeffs[0]}.`
    });

    for (let i = 1; i < coeffs.length; i++) {
      const prev = result;
      result = prev * X_VALUE + coeffs[i];
      const power = coeffs.length - 1 - i;
      
      s.push({
        coeff: coeffs[i],
        coeffIdx: power,
        prevResult: prev,
        operation: `p = (${prev} * ${X_VALUE}) + ${coeffs[i]}`,
        currentResult: result,
        description: `Multiply previous result by x=${X_VALUE} and add the next coefficient a_${power} = ${coeffs[i]}.`
      });
    }

    return s;
  }, []);

  const step = steps[currentStepIdx];

  const actions = (
    <div className={styles.controls}>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(0)} disabled={currentStepIdx === 0}>Reset</button>
      <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))} disabled={currentStepIdx === 0}>Prev</button>
      <button className="btn btn-primary btn-sm" onClick={() => setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1))} disabled={currentStepIdx === steps.length - 1}>Next Step</button>
    </div>
  );

  return (
    <VisualStage style={style} 
      title={`Horner's Rule Evaluation (x = ${X_VALUE})`}
      description={step.description}
      actions={actions}
    >
      <div className={styles.tracerContainer}>
        <div className={styles.hornersGrid}>
          {steps.map((s, idx) => {
            const isActive = idx === currentStepIdx;
            const isProcessed = idx <= currentStepIdx;

            return (
              <div 
                key={idx} 
                className={`${styles.hornerStep} ${isActive ? styles.active : ''}`}
                style={{ opacity: isProcessed ? 1 : 0.3 }}
              >
                <span className={styles.label}>a_{s.coeffIdx} = {s.coeff}</span>
                <div className={styles.mathOperation}>{s.operation}</div>
                <div className={styles.resultValue}>{s.currentResult}</div>
              </div>
            );
          })}
        </div>

        <div className={styles.stepInfo}>
          <p className={styles.description}>
            Final Result: <b>P({X_VALUE}) = {steps[steps.length - 1].currentResult}</b>
          </p>
        </div>
      </div>
    </VisualStage>
  );
};

export default HornersTracer;
