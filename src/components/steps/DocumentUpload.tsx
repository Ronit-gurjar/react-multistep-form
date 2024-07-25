import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from '../ui/form';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "../ui/separator";

interface DocumentUploadProps {
    form: UseFormReturn<FormValues>;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ form }) => {
    const [fileName, setFileName] = useState<string>("");

    return (
        <>
        <FormField
            control={form.control}
            name="document"
            render={({ field: { onChange, value, ...rest } }) => (
                <FormItem className="flex flex-col items-start">
                    <FormLabel>Upload Document</FormLabel>
                    <FormControl>
                        <Input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    onChange(file);
                                    setFileName(file.name);
                                }
                            }}
                            {...rest}
                        />
                    </FormControl>
                    {fileName && <p>Selected file: {fileName}</p>}
                    <FormMessage />
                </FormItem>
            )}
        />
        <Separator/>
        </>
    );
}

export default DocumentUpload;