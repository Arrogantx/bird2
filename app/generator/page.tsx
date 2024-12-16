"use client";

import { WizardForm } from "@/components/content-generator/wizard-form";
import { ContentOutput } from "@/components/content-generator/output";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { useContentGeneration } from "@/hooks/use-content-generation";
import { motion } from "framer-motion";

export default function GeneratorPage() {
  const { generatedContent, isGenerating, handleGenerate } = useContentGeneration();

  return (
    <div className="min-h-screen relative">
      <AnimatedGrid />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
            Content Generator
          </h1>
          <p className="text-gray-400">
            Create compelling content tailored to your advocacy goals and audience.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <WizardForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          
          {generatedContent && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <ContentOutput content={generatedContent} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}