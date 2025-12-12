export interface ArchitecturePlan {
    id: string;
    userId: string;
    title: string;
    description: string;
    projectDescription: string;
    phases: PlanPhase[];
    techStack: TechStack;
    recommendations: Recommendation[];
    timeline: string;
    createdAt: number;
    updatedAt: number;
}

export interface PlanPhase {
    id: string;
    name: string;
    duration: string;
    status: 'pending' | 'in-progress' | 'completed';
    description: string;
    deliverables: string[];
}

export interface TechStack {
    backend: string[];
    frontend: string[];
    database: string[];
    deployment: string[];
    other: string[];
}

export interface Recommendation {
    id: string;
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
}

export interface PlanGenerationProgress {
    currentPhase: number;
    totalPhases: number;
    phaseName: string;
    phaseDescription: string;
    estimatedTimeRemaining: string;
    status: 'idle' | 'generating' | 'completed' | 'error';
    error?: string;
}
