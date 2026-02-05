# Adultery Lawsuit Simulator Components

## Overview

This directory contains components for the adultery lawsuit simulator feature, which helps users assess the feasibility of filing a lawsuit against a third party involved in adultery.

## Components

### AdulterySimulatorForm

Input form component that collects user information including:
- Marital status and duration
- Adultery type and circumstances
- Evidence collection
- Family impact assessment
- Lawsuit goals

**Location:** `components/simulator/AdulterySimulatorForm.tsx`

### AdulterySimulatorResult

Result display component that shows comprehensive analysis including:

1. **Feasibility Assessment** - Score (0-100), recommendation level, strengths/weaknesses
2. **Requirements Check** - Four legal requirements validation with overall status
3. **Evidence Assessment** - Reliability rating, legal issues, additional evidence needed
4. **Compensation Estimate** - Min/max/average amounts with calculation factors
5. **Procedure Information** - Estimated duration, costs, and step-by-step process
6. **Risk Assessment** - Risk level with detailed items
7. **Warnings & Recommendations** - Important notices and actionable advice

**Location:** `components/simulator/AdulterySimulatorResult.tsx`

## Design System

Both components follow the **Light Transparency Design System**:
- Glass card effect with `bg-white/65` and `backdrop-blur-[16px]`
- Rounded corners (`rounded-2xl`)
- Subtle shadows and borders
- Responsive mobile-first layout
- Korean labels and content

## Color Coding

### Recommendation Levels
- **Proceed** (green): Strong case for lawsuit
- **Consider** (yellow): Viable with evidence reinforcement
- **Not Recommended** (orange): Weak case, postponement advised
- **Not Feasible** (red): Insufficient grounds

### Reliability Levels
- **Strong** (green): Solid evidence
- **Moderate** (yellow): Acceptable evidence
- **Weak** (red): Insufficient evidence

### Risk Levels
- **Low** (green): Minimal concerns
- **Medium** (yellow): Moderate concerns
- **High** (red): Significant concerns

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- WCAG AA color contrast compliance
- Print-friendly layout

## Usage Example

```tsx
import { AdulterySimulatorForm, AdulterySimulatorResult } from '@/components/simulator';
import { simulateAdulteryLawsuit } from '@/lib/simulator/adultery';
import { useState } from 'react';

export default function AdulterySimulator() {
  const [result, setResult] = useState(null);

  const handleSubmit = (input) => {
    const simulationResult = simulateAdulteryLawsuit(input);
    setResult(simulationResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div>
      {!result ? (
        <AdulterySimulatorForm
          onSubmit={handleSubmit}
          isSubmitting={false}
        />
      ) : (
        <AdulterySimulatorResult
          result={result}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
```

## Testing

Test files are located alongside components:
- `AdulterySimulatorResult.test.tsx` - 9 test cases covering all major features

Run tests:
```bash
npm test -- components/simulator/AdulterySimulatorResult.test.tsx
```

## Types

All TypeScript types are defined in:
- `types/adulterySimulator.ts`

## Currency Formatting

Korean won amounts are formatted using `formatCurrency()` utility:
- Example: `20000000` → `"20,000,000원"`

## Print Support

The result component includes print-specific styling:
- `print:` utility classes hide interactive elements
- `print:break-before-page` for proper pagination
- Optimized spacing for print output

## Future Enhancements

- [ ] Export to PDF functionality
- [ ] Share result via link
- [ ] Save simulation history
- [ ] Comparison with similar cases
- [ ] Expert review request integration
