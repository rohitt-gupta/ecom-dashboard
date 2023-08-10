'use client'

import * as z from 'zod'
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
})

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {


  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferances"
        />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => { }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  )
}

export default SettingsForm