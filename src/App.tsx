import { useState, useCallback, useEffect, Component, type ReactNode, type ErrorInfo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StepIndicator } from './components/StepIndicator';
import { Scene0 } from './scenes/Scene0';
import { Scene1 } from './scenes/Scene1';
import { SceneFedProblem } from './scenes/SceneFedProblem';
import { Scene2 } from './scenes/Scene2';
import { Scene4B1 } from './scenes/Scene4B1';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';
import { Scene8 } from './scenes/Scene8';
import { SceneKnowsData } from './scenes/SceneKnowsData';
import { SceneKnowsPeople } from './scenes/SceneKnowsPeople';
import { SceneKnowsProcesses } from './scenes/SceneKnowsProcesses';
import { Scene9 } from './scenes/Scene9';
import './App.css';
import './scenes/scenes.css';

class SceneErrorBoundary extends Component<
  { children: ReactNode; resetKey: number },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Scene render error:', error, info);
  }

  componentDidUpdate(prev: { resetKey: number }) {
    if (prev.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const TOTAL_STEPS = 13;

const STEP_LABELS = [
  'Question',
  'Federated',
  'Fed Problem',
  'Index',
  'Search Gap',
  'Agent + Glean',
  'MCP + Glean',
  'Search Win',
  'Beyond Search',
  'Knows Your Data',
  'Knows Your People',
  'Knows Your Processes',
  'Full Picture',
];

const scenes = [Scene0, Scene1, SceneFedProblem, Scene2, Scene4B1, Scene5, Scene6, Scene7, Scene8, SceneKnowsData, SceneKnowsPeople, SceneKnowsProcesses, Scene9];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (step: number) => {
      if (step < 0 || step >= TOTAL_STEPS || step === currentStep) return;
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    [currentStep],
  );

  const next = useCallback(() => goTo(currentStep + 1), [goTo, currentStep]);
  const back = useCallback(() => goTo(currentStep - 1), [goTo, currentStep]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, back]);

  const SceneComponent = scenes[currentStep];

  return (
    <div className="app">
      <div className="scene-viewport">
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            className="scene-wrapper"
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={{
              enter: (d: number) => ({
                x: d >= 0 ? '60%' : '-60%',
                opacity: 0,
                scale: 0.95,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
              exit: (d: number) => ({
                x: d >= 0 ? '-40%' : '40%',
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
              }),
            }}
          >
            <SceneErrorBoundary resetKey={currentStep}>
              <SceneComponent />
            </SceneErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </div>

      <StepIndicator
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        labels={STEP_LABELS}
        onNext={next}
        onBack={back}
        onGoTo={goTo}
      />
    </div>
  );
}
