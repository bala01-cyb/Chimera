import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { PlanGenerationProgress } from '@/types/plan.types';

interface PhaseProgressProps {
    progress: PlanGenerationProgress;
}

export function PhaseProgress({ progress }: PhaseProgressProps) {
    const progressPercentage = (progress.currentPhase / progress.totalPhases) * 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    Generating Architecture Plan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{progress.phaseName}</span>
                        <Badge variant="secondary">
                            Phase {progress.currentPhase} of {progress.totalPhases}
                        </Badge>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-sm text-muted-foreground">{progress.phaseDescription}</p>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: progress.totalPhases }, (_, index) => {
                        const phaseNumber = index + 1;
                        const isCompleted = phaseNumber < progress.currentPhase;
                        const isCurrent = phaseNumber === progress.currentPhase;

                        return (
                            <div
                                key={phaseNumber}
                                className={`h-2 rounded-full transition-colors ${isCompleted
                                        ? 'bg-primary'
                                        : isCurrent
                                            ? 'bg-primary/50 animate-pulse'
                                            : 'bg-muted'
                                    }`}
                            />
                        );
                    })}
                </div>

                {progress.estimatedTimeRemaining && (
                    <p className="text-xs text-muted-foreground text-center">
                        Estimated time: {progress.estimatedTimeRemaining}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
