"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage } from './ui/form';
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight } from 'lucide-react'

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })


export default function MultiStep() {
    const [step, setStep] = useState(1);

        // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
  return (
    <motion.div className='p-2 m-4'>
        <Card className='p-4'>
            <CardTitle>Book a Review</CardTitle>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 p-4 flex flex-col items-start m-2">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className='flex flex-col items-start m-2'>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button variant="outline" type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
            <div className='flex flex-row justify-around items-center'>
                <Button><ArrowLeft/>Back</Button>
                <Button>Next<ArrowRight/></Button>
            </div>
        </Card>
    </motion.div>
  )
}