import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, Database, Server, Globe, Package, Shield, Zap } from 'lucide-react';
import type { ArchitecturePlan } from '@/types/plan.types';

interface PlanDisplayProps {
    plan: ArchitecturePlan;
}

export function PlanDisplay({ plan }: PlanDisplayProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'destructive';
            case 'medium':
                return 'default';
            case 'low':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const getCategoryIcon = (category: string) => {
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('security')) return <Shield className="w-4 h-4" />;
        if (lowerCategory.includes('scalability')) return <Zap className="w-4 h-4" />;
        if (lowerCategory.includes('database')) return <Database className="w-4 h-4" />;
        if (lowerCategory.includes('deployment')) return <Globe className="w-4 h-4" />;
        return <Package className="w-4 h-4" />;
    };

    return (
        <div className="space-y-6">
            {/* Plan Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Estimated Timeline: {plan.timeline}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Server className="w-5 h-5" />
                        Technology Stack
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {plan.techStack.backend.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.techStack.backend.map((tech, index) => (
                                    <Badge key={index} variant="secondary">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.techStack.frontend.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.techStack.frontend.map((tech, index) => (
                                    <Badge key={index} variant="secondary">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.techStack.database.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Database</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.techStack.database.map((tech, index) => (
                                    <Badge key={index} variant="secondary">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.techStack.deployment.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Deployment</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.techStack.deployment.map((tech, index) => (
                                    <Badge key={index} variant="secondary">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {plan.techStack.other.length > 0 && (
                        <div>
                            <h4 className="font-semibold mb-2 text-sm">Other</h4>
                            <div className="flex flex-wrap gap-2">
                                {plan.techStack.other.map((tech, index) => (
                                    <Badge key={index} variant="secondary">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Architecture Phases */}
            <Card>
                <CardHeader>
                    <CardTitle>Architecture Phases</CardTitle>
                    <CardDescription>7-phase implementation roadmap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {plan.phases.map((phase, index) => (
                        <div key={phase.id} className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">
                                            Phase {index + 1}: {phase.name}
                                        </h4>
                                        <Badge variant="outline">{phase.duration}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{phase.description}</p>

                                    {phase.deliverables.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-xs font-semibold mb-1">Deliverables:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                {phase.deliverables.map((deliverable, idx) => (
                                                    <li key={idx} className="text-sm text-muted-foreground">{deliverable}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {index < plan.phases.length - 1 && <Separator />}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Recommendations */}
            {plan.recommendations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                        <CardDescription>Best practices and optimization suggestions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {['high', 'medium', 'low'].map((priority) => {
                            const recs = plan.recommendations.filter(r => r.priority === priority);
                            if (recs.length === 0) return null;

                            return (
                                <div key={priority} className="space-y-3">
                                    <h4 className="font-semibold capitalize">{priority} Priority</h4>
                                    <div className="space-y-3">
                                        {recs.map((rec) => (
                                            <div key={rec.id} className="flex gap-3 p-3 rounded-lg border bg-card">
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {getCategoryIcon(rec.category)}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {rec.category}
                                                        </Badge>
                                                        <h5 className="font-semibold text-sm">{rec.title}</h5>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
