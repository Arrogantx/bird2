"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { StepContent } from "./step-content";
import { StepIndicator } from "./step-indicator";

interface WizardFormProps {
  onGenerate: (data: any) => void;
  isGenerating: boolean;
}

const steps = [
  {
    id: "audience",
    title: "Select Your Target Audience",
    description: "Who are you trying to reach with your content?",
    options: [
      { value: "grassroots", label: "Grassroots Advocates" },
      { value: "policymakers", label: "Policymakers" },
      { value: "businesses", label: "Small Businesses" },
      { value: "general", label: "General Public" },
    ],
  },
  {
    id: "goal",
    title: "Define Your Content Goal",
    description: "What do you want to achieve with this content?",
    options: [
      { value: "mobilize", label: "Mobilize Action" },
      { value: "inform", label: "Inform & Educate" },
      { value: "persuade", label: "Persuade & Convince" },
      { value: "inspire", label: "Inspire & Motivate" },
    ],
  },
  {
    id: "tone",
    title: "Choose Your Content Tone",
    description: "What tone best fits your message?",
    options: [
      { value: "professional", label: "Professional" },
      { value: "casual", label: "Casual & Friendly" },
      { value: "urgent", label: "Urgent & Compelling" },
      { value: "inspirational", label: "Inspirational" },
    ],
  },
  {
    id: "contentType",
    title: "Select Content Type",
    description: "What format should your content take?",
    options: [
      { value: "social", label: "Social Media Post" },
      { value: "email", label: "Email Campaign" },
      { value: "press", label: "Press Release" },
      { value: "blog", label: "Blog Post" },
    ],
  },
  {
    id: "context",
    title: "Additional Context",
    description: "Add any specific details or requirements (optional)",
    type: "textarea",
  },
];

export function WizardForm({ onGenerate, isGenerating }: WizardFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onGenerate({
        ...formData,
        additionalContext: formData.context || "",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSelect = (value: string) => {
    setFormData({ ...formData, [steps[currentStep].id]: value });
  };

  const handleCustomInput = (value: string) => {
    if (value) {
      setFormData({ ...formData, [steps[currentStep].id]: `custom:${value}` });
    }
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = formData[currentStepData.id] || currentStepData.type === "textarea";

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        labels={steps.map(s => s.title)}
      />

      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
        <AnimatePresence mode="wait">
          {currentStepData.type === "textarea" ? (
            <motion.div
              key="textarea"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-gray-400">{currentStepData.description}</p>
              <Textarea
                value={formData.context || ""}
                onChange={(e) => handleSelect(e.target.value)}
                placeholder="Add any specific requirements or context..."
                className="h-32 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </motion.div>
          ) : (
            <StepContent
              step={currentStepData}
              value={formData[currentStepData.id] || ""}
              onSelect={handleSelect}
              onCustomInput={handleCustomInput}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed || isGenerating}
          className="bg-blue-500 hover:bg-blue-600 text-white min-w-[120px]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : isLastStep ? (
            "Generate Content"
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}