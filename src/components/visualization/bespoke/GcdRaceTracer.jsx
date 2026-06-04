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
          <div className="flex gap-2">
            <input 
              type="number" className="input input-sm input-bordered w-20" 
              value={m} onChange={e => {setM(Number(e.target.value)); setCurrentStepIdx(0);}} 
            />
            <input 
              type="number" className="input input-sm input-bordered w-20" 
              value={n} onChange={e => {setN(Number(e.target.value)); setCurrentStepIdx(0);}} 
            />
          </div>
          <div className={styles.stepControls}>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}>Prev</button>
            <button className="btn btn-primary btn-sm" onClick={() => setCurrentStepIdx(Math.min(steps.length - 1, currentStepIdx + 1))}>Next</button>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-8 w-full p-4">
        {/* Euclid Side */}
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
          <h4 className="text-center font-bold text-blue-400">Euclid's Algorithm</h4>
          <div className="flex justify-around items-center h-24">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">m</div>
              <div className="text-2xl font-bold text-white">{current.euclid.m}</div>
            </div>
            <div className="text-xl text-muted-foreground opacity-50">/</div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">n</div>
              <div className="text-2xl font-bold text-white">{current.euclid.n}</div>
            </div>
            <div className="text-xl text-muted-foreground opacity-50">=</div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">rem</div>
              <div className="text-2xl font-bold text-accent-cyan">{current.euclid.r}</div>
            </div>
          </div>
          <div className={`badge ${current.euclid.action === 'Done' ? 'badge-success' : 'badge-ghost'} self-center`}>
            {current.euclid.action === 'Done' ? 'GCD FOUND: ' + current.euclid.m : 'Iterating...'}
          </div>
        </div>

        {/* Brute Force Side */}
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <h4 className="text-center font-bold text-amber-400">Brute Force (Consecutive)</h4>
          <div className="flex flex-col items-center justify-center h-24">
            <div className="text-xs text-muted-foreground mb-1">Checking t =</div>
            <div className="text-3xl font-bold text-white">{current.brute.t}</div>
            <div className="flex gap-4 mt-2 text-[10px]">
              <span className={current.brute.mDiv ? 'text-green-400' : 'text-red-400'}>60 % t == 0: {current.brute.mDiv ? 'YES' : 'NO'}</span>
              <span className={current.brute.nDiv ? 'text-green-400' : 'text-red-400'}>24 % t == 0: {current.brute.nDiv ? 'YES' : 'NO'}</span>
            </div>
          </div>
          <div className={`badge ${current.brute.action === 'Found' ? 'badge-success' : 'badge-ghost'} self-center`}>
            {current.brute.action === 'Found' ? 'GCD FOUND: ' + current.brute.t : 'Scanning Down...'}
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-4 text-xs text-muted-foreground italic">
        Notice: Euclid's finds the answer in {steps.filter(s => s.euclid.action !== 'Done').length + 1} steps, while Brute Force takes {currentStepIdx + 1} checks (and counting).
      </div>
    </VisualStage>
  );
};

export default GcdRaceTracer;
