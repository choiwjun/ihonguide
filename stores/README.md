# Stores

This directory contains Zustand stores for managing application state.

## Available Stores

### 1. Diagnosis Store (`diagnosisStore.ts`)

Manages diagnosis questionnaire state and progress.

```tsx
import { useDiagnosisStore } from '@/stores';

function DiagnosisComponent() {
  const { answers, currentStep, setAnswer, nextStep } = useDiagnosisStore();

  const handleAnswer = (answer: DiagnosisAnswer) => {
    setAnswer(answer);
    nextStep();
  };

  return (
    <div>
      <p>Step {currentStep} of {totalSteps}</p>
      {/* Your diagnosis UI */}
    </div>
  );
}
```

### 2. Calculator Store (`calculatorStore.ts`)

Manages child support calculator input and results.

```tsx
import { useCalculatorStore } from '@/stores';

function CalculatorComponent() {
  const {
    parent1Income,
    setParent1Income,
    getInput,
    result,
  } = useCalculatorStore();

  const handleCalculate = () => {
    const input = getInput();
    // Perform calculation with input
  };

  return (
    <div>
      <input
        type="number"
        value={parent1Income}
        onChange={(e) => setParent1Income(Number(e.target.value))}
      />
      {result && <ResultDisplay result={result} />}
    </div>
  );
}
```

### 3. Adultery Simulator Store (`adulterySimulatorStore.ts`)

Manages adultery lawsuit simulator state, including input data and calculation results.

```tsx
import { useAdulterySimulatorStore } from '@/stores';
import type { AdulterySimulatorInput } from '@/types/adulterySimulator';

function AdulterySimulatorComponent() {
  const { input, result, isLoading, error, setInput, calculate, reset } =
    useAdulterySimulatorStore();

  const handleSubmit = (formData: AdulterySimulatorInput) => {
    setInput(formData);
    calculate();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div>
      {/* Input Form */}
      <SimulatorForm onSubmit={handleSubmit} />

      {/* Loading State */}
      {isLoading && <LoadingSpinner />}

      {/* Error State */}
      {error && <ErrorMessage message={error} />}

      {/* Results */}
      {result && (
        <div>
          <h2>소송 가능성: {result.feasibility.score}점</h2>
          <p>추천: {result.feasibility.recommendation}</p>

          {/* Requirements Check */}
          <h3>성립 요건 충족도</h3>
          <ul>
            <li>혼인 관계: {result.requirements.maritalBondExists ? '✓' : '✗'}</li>
            <li>고의성: {result.requirements.intentionalAct ? '✓' : '✗'}</li>
            <li>혼인 인식: {result.requirements.knowledgeOfMarriage ? '✓' : '✗'}</li>
            <li>인과관계: {result.requirements.causalRelation ? '✓' : '✗'}</li>
          </ul>

          {/* Compensation Estimate */}
          <h3>위자료 예상</h3>
          <p>
            {result.compensation.estimatedMin.toLocaleString()}원 ~{' '}
            {result.compensation.estimatedMax.toLocaleString()}원
          </p>

          {/* Warnings and Recommendations */}
          <h3>경고사항</h3>
          <ul>
            {result.warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>

          <h3>권고사항</h3>
          <ul>
            {result.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>

          <button onClick={handleReset}>다시 계산하기</button>
        </div>
      )}
    </div>
  );
}
```

## Store Actions

### Adultery Simulator Store Actions

| Action | Description | Parameters |
|--------|-------------|------------|
| `setInput` | Sets the simulator input data | `input: AdulterySimulatorInput` |
| `calculate` | Runs the simulation calculation | None |
| `setError` | Sets or clears error message | `error: string \| null` |
| `reset` | Resets all state to initial values | None |

### Adultery Simulator Store State

| State | Type | Description |
|-------|------|-------------|
| `input` | `AdulterySimulatorInput \| null` | Current simulator input |
| `result` | `AdulterySimulatorResult \| null` | Calculation result |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message if any |

## Testing

All stores include comprehensive test coverage. Run tests with:

```bash
# Test all stores
npm test -- stores/

# Test specific store
npm test -- stores/adulterySimulatorStore.test.ts
```

## Best Practices

1. **Reset on unmount**: Call `reset()` when components unmount to prevent memory leaks
2. **Error handling**: Always check for `error` state before using results
3. **Loading states**: Display loading indicators when `isLoading` is true
4. **Type safety**: Use TypeScript types from `@/types` directory
5. **Selective subscription**: Only subscribe to the state you need to avoid unnecessary re-renders

```tsx
// ❌ Bad - subscribes to entire store
const store = useAdulterySimulatorStore();

// ✅ Good - only subscribes to needed values
const { result, error } = useAdulterySimulatorStore(
  (state) => ({ result: state.result, error: state.error })
);
```
