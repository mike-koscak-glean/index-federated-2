import { motion } from 'framer-motion';
import './StepIndicator.css';

interface Props {
  currentStep: number;
  totalSteps: number;
  labels: string[];
  onNext: () => void;
  onBack: () => void;
  onGoTo: (step: number) => void;
}

export function StepIndicator({ currentStep, totalSteps, labels, onNext, onBack, onGoTo }: Props) {
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={onBack} disabled={currentStep === 0}>
        ← Back
      </button>

      <div className="stepper-dots">
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            className={`stepper-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
            onClick={() => onGoTo(i)}
            title={`${i} · ${labels[i]}`}
          >
            {i === currentStep && (
              <motion.span
                className="stepper-dot-ring"
                layoutId="dot-ring"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <span className="stepper-label">
        Step {currentStep} · {labels[currentStep]}
      </span>

      <button className="stepper-btn stepper-btn-primary" onClick={onNext} disabled={currentStep === totalSteps - 1}>
        Next →
      </button>
    </div>
  );
}
