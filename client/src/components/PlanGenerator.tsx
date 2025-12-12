import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Download, Save } from 'lucide-react';
import { generateArchitecturePlan } from '@/lib/aiService';
import { savePlan } from '@/lib/planService';
import { generatePlanPDF } from '@/lib/pdfService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { ArchitecturePlan, PlanGenerationProgress } from '@/types/plan.types';
import { PlanDisplay } from './PlanDisplay';
import { PhaseProgress } from './PhaseProgress';

export function PlanGenerator() {
    const [projectDescription, setProjectDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState<PlanGenerationProgress | null>(null);
    const [generatedPlan, setGeneratedPlan] = useState<ArchitecturePlan | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();

    const handleGenerate = async () => {
        if (!projectDescription.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a project description',
                variant: 'destructive',
            });
            return;
        }

        setIsGenerating(true);
        setGeneratedPlan(null);
        setProgress(null);

        try {
            const plan = await generateArchitecturePlan(projectDescription, (prog) => {
                setProgress(prog);
            });
            setGeneratedPlan(plan);
            toast({
                title: 'Success',
                description: 'Architecture plan generated successfully!',
            });
        } catch (error) {
            console.error('Error generating plan:', error);
            toast({
                title: 'Error',
                description: 'Failed to generate architecture plan. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = () => {
        if (generatedPlan) {
            generatePlanPDF(generatedPlan);
            toast({
                title: 'Success',
                description: 'PDF downloaded successfully!',
            });
        }
    };

    const handleSavePlan = async () => {
        if (!user) {
            toast({
                title: 'Authentication Required',
                description: 'Please sign in to save your plan',
                variant: 'destructive',
            });
            return;
        }

        if (!generatedPlan) return;

        setIsSaving(true);
        try {
            await savePlan(user.uid, generatedPlan);
            toast({
                title: 'Success',
                description: 'Plan saved to your account!',
            });
        } catch (error) {
            console.error('Error saving plan:', error);
            toast({
                title: 'Error',
                description: 'Failed to save plan. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        Generate Architecture Plan
                    </CardTitle>
                    <CardDescription>
                        Describe your project requirements and let AI generate a comprehensive software architecture plan
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="project-description" className="text-sm font-medium">
                            Project Description
                        </label>
                        <Textarea
                            id="project-description"
                            placeholder="Example: I need to build a real-time chat application with user authentication, message history, file sharing, and video calls. The app should support 10,000+ concurrent users and be deployed on AWS..."
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            rows={8}
                            className="resize-none"
                            disabled={isGenerating}
                        />
                    </div>

                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating || !projectDescription.trim()}
                        className="w-full"
                        size="lg"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating Plan...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate Architecture Plan
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {progress && isGenerating && (
                <PhaseProgress progress={progress} />
            )}

            {generatedPlan && (
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download as PDF
                        </Button>
                        <Button
                            onClick={handleSavePlan}
                            disabled={isSaving || !user}
                            variant="outline"
                            className="flex-1"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {user ? 'Save to Account' : 'Sign in to Save'}
                                </>
                            )}
                        </Button>
                    </div>

                    <PlanDisplay plan={generatedPlan} />
                </div>
            )}
        </div>
    );
}
