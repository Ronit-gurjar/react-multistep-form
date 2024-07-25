import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from '../ui/form';
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";

interface DateTimeSelectionProps {
    form: UseFormReturn<FormValues>;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ form }) => {
    return (
        <>
            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <FormLabel>Date</FormLabel>
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                            }
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator/>

            <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem className='flex flex-col items-start m-2'>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                            <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator/>
        </>
    );
}

export default DateTimeSelection;