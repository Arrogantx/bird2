"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "sonner";

interface ContentOutputProps {
  content: string;
}

export function ContentOutput({ content }: ContentOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Content copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadContent = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-content.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content downloaded");
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur border-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Generated Content</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadContent}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="whitespace-pre-wrap bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-gray-200">
          {content}
        </div>
      </motion.div>
    </Card>
  );
}