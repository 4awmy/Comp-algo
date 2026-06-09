/* eslint-disable */
import React, { useState, useMemo } from 'react';
import VisualStage from '../../ui/Premium/VisualStage';
import styles from './Bespoke.module.css';

const GcdRaceTracer = ({ style }) => {
  const [m, setM] = useState(60);
  const [n, setN] = useState(24);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = useMemo(() => {
    const s = [];
    
    // Euclid steps
    let eM = m;
    let eN = n;
    const eSteps = [{ m: eM, n: eN, r: eM % eN, action: 'Initial' }];
    while (eN !== 0) {
      const r = eM % eN;
      eM = eN;
      eN = r;
      eSteps.push({ m: eM, n: eN, r: eM % eN, action: eN === 0 ? 'Done' : 'Mod' });
    }

    // Brute force (Consecutive Integer Checking) steps
    const bM = m;
    const bN = n;
    let t = Math.min(bM, bN);
    const bSteps = [];
    while (t > 0) {
      const mDiv = bM % t === 0;
      const nDiv = bN % t === 0;
      bSteps.push({ t, mDiv, nDiv, action: (mDiv && nDiv) ? 'Found' : 'Check' });
      if (mDiv && nDiv) break;
      t--;
    }

    const totalSteps = Math.max(eSteps.length, bSteps.length);
    for (let i = 0; i < totalSteps; i++) {
      s.push({
        euclid: eSteps[Math.min(i, eSteps.length - 1)],
        brute: bSteps[Math.min(i, bSteps.length - 1)],
        step: i
      });
    }
    return s;
  }, [m, n]);

  const current = steps[currentStepIdx] || steps[0];

  return (
    <VisualStage style={style} 
      title="GCD Algorithm Race: Euclid vs. Brute Force"
      description={`Step ${currentStepIdx + 1}: ${current.euclid.action === 'Done' && current.brute.action === 'Found' ? 'Both finished.' : 'Comparing iterations.'}`}
      actions={
        <div className={styles.tracerActions}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="number" className={styles.peasantInput} 
              value={m} onChange={e => {setM(Number(e.target.value)); setCurrentStepIdx(0);}} 
            />
            <input 
              type="number" className={styles.peasantInput} 
              value={n} onChange={e => {setN(Number(e.target.value)); setCurrentStepIdx(0);}} 
            />
          </div>
          <div className={styles.stepControls}>
            <button className={`${styles.btnOutline} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
            <button className={`${styles.btnPrimary} ${styles.btnSm}`} onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className={styles.gridTwoCol} style={{ width: '100%', padding: '1rem' }}>
        {/* Euclid Side */}
        <div className={styles.infoCard} style={{ borderLeft: '4px solid var(--accent-blue)' }}>
          <h4 style={{ textAlign: 'center' }}>Euclid's Algorithm</h4>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '6rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>m</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--text-primary)' }}>{current.euclid.m}</div>
            </div>
            <div style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', opacity: 0.5 }}>/</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>n</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--text-primary)' }}>{current.euclid.n}</div>
            </div>
            <div style={{ fontSize: 'var(--text-xl)', color: 'var(--text-muted)', opacity: 0.5 }}>=</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>rem</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{current.euclid.r}</div>
            </div>
          </div>
          <div className={`badge ${current.euclid.action === 'Done' ? 'badge-green' : 'badge-blue'}`} style={{ alignSelf: 'center' }}>
            {current.euclid.action === 'Done' ? 'GCD FOUND: ' + current.euclid.m : 'Iterating...'}
          </div>
        </div>

        {/* Brute Force Side */}
        <div className={styles.infoCard} style={{ borderLeft: '4px solid var(--accent-purple)' }}>
          <h4 style={{ textAlign: 'center', color: 'var(--accent-purple)' }}>Brute Force (Consecutive)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '6rem' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Checking t =</div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--text-primary)' }}>{current.brute.t}</div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '10px' }}>
              <span style={{ color: current.brute.mDiv ? 'var(--color-success)' : 'var(--color-error)' }}>{m} % t == 0: {current.brute.mDiv ? 'YES' : 'NO'}</span>
              <span style={{ color: current.brute.nDiv ? 'var(--color-success)' : 'var(--color-error)' }}>{n} % t == 0: {current.brute.nDiv ? 'YES' : 'NO'}</span>
            </div>
          </div>
          <div className={`badge ${current.brute.action === 'Found' ? 'badge-green' : 'badge-blue'}`} style={{ alignSelf: 'center' }}>
            {current.brute.action === 'Found' ? 'GCD FOUND: ' + current.brute.t : 'Scanning Down...'}
          </div>
        </div>
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '1rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
        Notice: Euclid's finds the answer in {steps.filter(s => s.euclid.action !== 'Done').length + 1} steps, while Brute Force takes {currentStepIdx + 1} checks (and counting).
      </div>
    </VisualStage>
  );
};

export default GcdRaceTracer;
