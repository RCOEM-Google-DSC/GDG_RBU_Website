"use client";

import { Form } from "@/components/ui/form";

import { FormStepper } from "./FormStepper";
import { FormHeader } from "./FormHeader";
import { FormNavigation } from "./FormNavigation";
import { usePortfolioForm } from "./hooks/usePortfolioForm";
import { STEPS } from "./helpers/constants";
import {
    TemplateStep,
    BasicInfoStep,
    SkillsStep,
    ProjectsStep,
    ExperienceStep,
    SocialLinksStep,
} from "./steps";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
        checkPublishedAndSave,
        showPublishDialog,
        setShowPublishDialog,
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
                onPublish={checkPublishedAndSave}
                onPreview={handlePreview}
                isGeneratingPreview={isGeneratingPreview}
            />

            {/* Main Content: Stepper (left) + Form (right) */}
            {/* ... same as before ... */}
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

            {/* Publish Confirmation Dialog */}
            <AlertDialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
                <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold font-retron">
                            Replace Existing Portfolio?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-600 font-medium">
                            You already have a portfolio published. Publishing this new one
                            will unpublish your current one. Do you want to proceed?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="border-2 border-black font-bold hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            Keep Old One
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleSave(true)}
                            className="bg-green-400 text-black border-2 border-black font-bold hover:bg-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Accept New
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
