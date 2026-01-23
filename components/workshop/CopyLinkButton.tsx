"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface CopyLinkButtonProps {
  workshopId: string;
}

export function CopyLinkButton({ workshopId }: CopyLinkButtonProps) {
  const handleCopy = () => {
    const url = `${window.location.origin}/workshop/${workshopId}`;
    navigator.clipboard.writeText(url);
    toast.success("คัดลอกลิงค์แล้ว");
  };

  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
      variant="default"
      onClick={handleCopy}
    >
      <Copy className="w-4 h-4 mr-2" />
      คัดลอกลิงค์
    </Button>
  );
}
