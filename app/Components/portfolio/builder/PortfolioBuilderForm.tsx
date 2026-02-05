"use client";

import { Form } from "@/components/ui/form";

import { FormStepper } from "./FormStepper";
import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";
import { usePortfolioForm } from "./hooks/usePortfolioForm";
import { STEPS } from "./constants";
import {
    TemplateStep,
    BasicInfoStep,
    SkillsStep,
    ProjectsStep,
    ExperienceStep,
    SocialLinksStep,
} from "./steps";

import type { Portfolio, PortfolioTemplate } from "@/lib/types";

interface PortfolioBuilderFormProps {
    existingPortfolio?: Portfolio;
    templates: PortfolioTemplate[];
    userId: string;
}

export function PortfolioBuilderForm({
    existingPortfolio,
    templates,
    userId,
}: PortfolioBuilderFormProps) {
    const {
        form,
        currentStep,
        setCurrentStep,
        isSaving,
        handleSave,
        handlePreview,
        isGeneratingPreview,
        nextStep,
        prevStep,
        usedPlatforms,
        projectsFieldArray,
        experienceFieldArray,
        socialLinksFieldArray,
    } = usePortfolioForm({ existingPortfolio, userId });

    return (
        <div className="space-y-8 w-full">
            {/* Header */}
            <FormHeader
                isEditing={!!existingPortfolio}
                isSaving={isSaving}
                formData={form.getValues()}
                onSaveDraft={() => handleSave(false)}
                onPublish={() => handleSave(true)}
                onPreview={handlePreview}
                isGeneratingPreview={isGeneratingPreview}
            />

            {/* Main Content: Stepper (left) + Form (right) */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Stepper (1/4 width) */}
                <div className="w-full lg:w-1/4 min-w-[200px]">
                    <div className="lg:sticky lg:top-24">
                        <FormStepper
                            steps={STEPS}
                            currentStep={currentStep}
                            onStepClick={setCurrentStep}
                        />
                    </div>
                </div>

                {/* Right Content - Form (3/4 width) */}
                <div className="flex-1">
                    <Form {...form}>
                        <form className="space-y-6">
                            {/* Step 1: Template Selection */}
                            {currentStep === 1 && (
                                <TemplateStep form={form} templates={templates} />
                            )}

                            {/* Step 2: Basic Info */}
                            {currentStep === 2 && <BasicInfoStep form={form} />}

                            {/* Step 3: Skills */}
                            {currentStep === 3 && <SkillsStep form={form} />}

                            {/* Step 4: Projects */}
                            {currentStep === 4 && (
                                <ProjectsStep form={form} fieldArray={projectsFieldArray} />
                            )}

                            {/* Step 5: Experience */}
                            {currentStep === 5 && (
                                <ExperienceStep form={form} fieldArray={experienceFieldArray} />
                            )}

                            {/* Step 6: Social Links */}
                            {currentStep === 6 && (
                                <SocialLinksStep
                                    form={form}
                                    fieldArray={socialLinksFieldArray}
                                    usedPlatforms={usedPlatforms}
                                />
                            )}

                            {/* Navigation */}
                            <FormNavigation
                                currentStep={currentStep}
                                onPrevious={prevStep}
                                onNext={nextStep}
                                onPreview={handlePreview}
                                isGeneratingPreview={isGeneratingPreview}
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
