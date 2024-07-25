import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./formSchema";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from '../ui/form';
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "../ui/separator";

interface UserDetailsProps {
    form: UseFormReturn<FormValues>;
}

const UserDetails: React.FC<UserDetailsProps> = ({ form }) => {
    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className='flex flex-col items-start m-2'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator/>

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='flex flex-col items-start m-2'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator/>

            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                    <FormItem className="flex flex-col m-2 items-start space-y-3">
                        <FormLabel>Subject</FormLabel>
                        <FormDescription>
                            what type of review you want.
                        </FormDescription>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Resume" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Resume
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Portfolio" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Portfolio
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Project" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Project
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Separator/>
        </>
    );
}

export default UserDetails;