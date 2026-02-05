import { describe, it, expect, beforeEach } from 'vitest';
import { useAdulterySimulatorStore } from './adulterySimulatorStore';
import type { AdulterySimulatorInput } from '@/types/adulterySimulator';

describe('adulterySimulatorStore', () => {
  beforeEach(() => {
    useAdulterySimulatorStore.getState().reset();
  });

  describe('initial state', () => {
    it('should have null input by default', () => {
      const { input } = useAdulterySimulatorStore.getState();
      expect(input).toBeNull();
    });

    it('should have null result by default', () => {
      const { result } = useAdulterySimulatorStore.getState();
      expect(result).toBeNull();
    });

    it('should not be loading by default', () => {
      const { isLoading } = useAdulterySimulatorStore.getState();
      expect(isLoading).toBe(false);
    });

    it('should have null error by default', () => {
      const { error } = useAdulterySimulatorStore.getState();
      expect(error).toBeNull();
    });
  });

  describe('setInput', () => {
    const mockInput: AdulterySimulatorInput = {
      maritalStatus: 'married',
      marriageDuration: 5,
      hasChildren: true,
      childrenAges: [8, 10],
      adulteryType: 'physical',
      knewMaritalStatus: true,
      duration: 6,
      frequency: 'frequent',
      evidences: [
        {
          type: 'messages',
          reliability: 'high',
          acquisitionMethod: 'legal',
          description: '카카오톡 대화 내용',
        },
      ],
      familyImpact: {
        emotionalDistress: 4,
        financialLoss: 5000000,
        socialImpact: 3,
      },
      goal: 'compensation',
      expectedCompensation: 20000000,
    };

    it('should set input', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      const { input } = useAdulterySimulatorStore.getState();
      expect(input).toEqual(mockInput);
    });

    it('should clear error when setting input', () => {
      // Set error first
      useAdulterySimulatorStore.getState().setError('test error');
      expect(useAdulterySimulatorStore.getState().error).toBe('test error');

      // Set input should clear error
      useAdulterySimulatorStore.getState().setInput(mockInput);
      expect(useAdulterySimulatorStore.getState().error).toBeNull();
    });
  });

  describe('setError', () => {
    it('should set error message', () => {
      useAdulterySimulatorStore.getState().setError('test error');
      expect(useAdulterySimulatorStore.getState().error).toBe('test error');
    });

    it('should clear error with null', () => {
      useAdulterySimulatorStore.getState().setError('test error');
      useAdulterySimulatorStore.getState().setError(null);
      expect(useAdulterySimulatorStore.getState().error).toBeNull();
    });
  });

  describe('calculate', () => {
    const mockInput: AdulterySimulatorInput = {
      maritalStatus: 'married',
      marriageDuration: 5,
      hasChildren: true,
      childrenAges: [8, 10],
      adulteryType: 'physical',
      knewMaritalStatus: true,
      duration: 6,
      frequency: 'frequent',
      evidences: [
        {
          type: 'messages',
          reliability: 'high',
          acquisitionMethod: 'legal',
          description: '카카오톡 대화 내용',
        },
        {
          type: 'photos',
          reliability: 'high',
          acquisitionMethod: 'legal',
          description: '함께 찍은 사진',
        },
      ],
      familyImpact: {
        emotionalDistress: 4,
        financialLoss: 5000000,
        socialImpact: 3,
      },
      goal: 'compensation',
      expectedCompensation: 20000000,
    };

    it('should set error if input is null', () => {
      useAdulterySimulatorStore.getState().calculate();
      const { error } = useAdulterySimulatorStore.getState();
      expect(error).toBe('입력 데이터가 없습니다.');
    });

    it('should calculate result successfully', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result, error, isLoading } = useAdulterySimulatorStore.getState();

      expect(error).toBeNull();
      expect(isLoading).toBe(false);
      expect(result).not.toBeNull();
      expect(result).toHaveProperty('feasibility');
      expect(result).toHaveProperty('requirements');
      expect(result).toHaveProperty('evidenceAssessment');
      expect(result).toHaveProperty('compensation');
      expect(result).toHaveProperty('procedure');
      expect(result).toHaveProperty('risks');
      expect(result).toHaveProperty('warnings');
      expect(result).toHaveProperty('recommendations');
    });

    it('should validate requirements correctly', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.requirements.maritalBondExists).toBe(true);
      expect(result?.requirements.intentionalAct).toBe(true);
      expect(result?.requirements.knowledgeOfMarriage).toBe(true);
      expect(result?.requirements.causalRelation).toBe(true);
      expect(result?.requirements.overallMet).toBe(true);
    });

    it('should assess evidence reliability', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.evidenceAssessment).toBeDefined();
      expect(result?.evidenceAssessment.overallReliability).toBeOneOf([
        'strong',
        'moderate',
        'weak',
      ]);
    });

    it('should calculate compensation estimate', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.compensation).toBeDefined();
      expect(result?.compensation.estimatedMin).toBeGreaterThan(0);
      expect(result?.compensation.estimatedMax).toBeGreaterThan(
        result?.compensation.estimatedMin || 0
      );
      expect(result?.compensation.averageAmount).toBeGreaterThan(0);
      expect(result?.compensation.factors).toBeInstanceOf(Array);
    });

    it('should provide procedure information', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.procedure).toBeDefined();
      expect(result?.procedure.estimatedDuration).toBeDefined();
      expect(result?.procedure.estimatedCost).toBeDefined();
      expect(result?.procedure.steps).toBeInstanceOf(Array);
      expect(result?.procedure.steps.length).toBeGreaterThan(0);
    });

    it('should analyze risks', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.risks).toBeDefined();
      expect(result?.risks.level).toBeOneOf(['low', 'medium', 'high']);
      expect(result?.risks.items).toBeInstanceOf(Array);
    });

    it('should generate warnings', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.warnings).toBeInstanceOf(Array);
      expect(result?.warnings.length).toBeGreaterThan(0);
    });

    it('should generate recommendations', () => {
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result } = useAdulterySimulatorStore.getState();

      expect(result?.recommendations).toBeInstanceOf(Array);
      expect(result?.recommendations.length).toBeGreaterThan(0);
    });

    it('should clear error on successful calculation', () => {
      // Set error first
      useAdulterySimulatorStore.getState().setError('previous error');

      // Calculate should clear the error
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();

      expect(useAdulterySimulatorStore.getState().error).toBeNull();
    });
  });

  describe('reset', () => {
    it('should reset all state to initial values', () => {
      const mockInput: AdulterySimulatorInput = {
        maritalStatus: 'married',
        marriageDuration: 5,
        hasChildren: true,
        childrenAges: [8, 10],
        adulteryType: 'physical',
        knewMaritalStatus: true,
        duration: 6,
        frequency: 'frequent',
        evidences: [
          {
            type: 'messages',
            reliability: 'high',
            acquisitionMethod: 'legal',
            description: 'test evidence',
          },
        ],
        familyImpact: {
          emotionalDistress: 4,
          financialLoss: 5000000,
          socialImpact: 3,
        },
        goal: 'compensation',
      };

      // Set some state
      useAdulterySimulatorStore.getState().setInput(mockInput);
      useAdulterySimulatorStore.getState().calculate();
      useAdulterySimulatorStore.getState().setError('test error');

      // Reset
      useAdulterySimulatorStore.getState().reset();

      // Check all state is back to initial
      const state = useAdulterySimulatorStore.getState();
      expect(state.input).toBeNull();
      expect(state.result).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle input without children', () => {
      const inputWithoutChildren: AdulterySimulatorInput = {
        maritalStatus: 'married',
        marriageDuration: 3,
        hasChildren: false,
        adulteryType: 'physical',
        knewMaritalStatus: true,
        duration: 4,
        frequency: 'occasional',
        evidences: [
          {
            type: 'messages',
            reliability: 'medium',
            acquisitionMethod: 'legal',
            description: 'test',
          },
        ],
        familyImpact: {
          emotionalDistress: 3,
          financialLoss: 2000000,
          socialImpact: 2,
        },
        goal: 'compensation',
      };

      useAdulterySimulatorStore.getState().setInput(inputWithoutChildren);
      useAdulterySimulatorStore.getState().calculate();

      const { result, error } = useAdulterySimulatorStore.getState();
      expect(error).toBeNull();
      expect(result).not.toBeNull();
    });

    it('should handle weak evidence', () => {
      const weakEvidenceInput: AdulterySimulatorInput = {
        maritalStatus: 'married',
        marriageDuration: 5,
        hasChildren: true,
        childrenAges: [10],
        adulteryType: 'suspected',
        knewMaritalStatus: false,
        duration: 1,
        frequency: 'once',
        evidences: [
          {
            type: 'witness',
            reliability: 'low',
            acquisitionMethod: 'legal',
            description: 'weak witness statement',
          },
        ],
        familyImpact: {
          emotionalDistress: 2,
          financialLoss: 0,
          socialImpact: 1,
        },
        goal: 'compensation',
      };

      useAdulterySimulatorStore.getState().setInput(weakEvidenceInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result, error } = useAdulterySimulatorStore.getState();
      expect(error).toBeNull();
      expect(result).not.toBeNull();
      expect(result?.feasibility.recommendation).toBeOneOf([
        'not_recommended',
        'not_feasible',
      ]);
    });

    it('should handle illegal evidence', () => {
      const illegalEvidenceInput: AdulterySimulatorInput = {
        maritalStatus: 'married',
        marriageDuration: 5,
        hasChildren: true,
        childrenAges: [8],
        adulteryType: 'physical',
        knewMaritalStatus: true,
        duration: 6,
        frequency: 'frequent',
        evidences: [
          {
            type: 'messages',
            reliability: 'high',
            acquisitionMethod: 'illegal',
            description: '불법 해킹으로 얻은 메시지',
          },
        ],
        familyImpact: {
          emotionalDistress: 4,
          financialLoss: 5000000,
          socialImpact: 3,
        },
        goal: 'compensation',
      };

      useAdulterySimulatorStore.getState().setInput(illegalEvidenceInput);
      useAdulterySimulatorStore.getState().calculate();

      const { result, error } = useAdulterySimulatorStore.getState();
      expect(error).toBeNull();
      expect(result).not.toBeNull();
      expect(result?.evidenceAssessment.legalIssues.length).toBeGreaterThan(0);
      expect(result?.risks.level).toBeOneOf(['medium', 'high']);
    });
  });
});
