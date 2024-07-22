"use client"

import { useState } from 'react'
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast'
import { ArrowLeft, ArrowRight} from 'lucide-react'

import UserDetails from './steps/UserDetails'
import DateTimeSelection from './steps/DateTimeSelection'
import DocumentUpload from './steps/DocumentUpload'
import formSchema, { FormValues } from './steps/formSchema'

export default function MultiStep() {
    const [step, setStep] = useState(1);
    const { toast } = useToast()
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => {
        setStep(prev => Math.min(prev + 1, 3))
        setIsSubmitted(false)  // Reset submission state when moving to next step
    }
    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1))
        setIsSubmitted(false)  // Reset submission state when moving to previous step
    }

        // 1. Define your form.
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: undefined,
            email: "",
            date: undefined,
            time: "",
            document: undefined,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!isSubmitted) {
            console.log("Form submitted", values)
            toast({
                title: `${values.subject} Review set for ${values.name}`,
                description: `Date: ${values.date.toDateString() || 'Not set'}, Time: ${values.time || 'Not set'}`,
                action: <ToastAction altText="okay">Okay</ToastAction>
            })
            setIsSubmitted(true)
        }
    }

  return (
    <motion.div className='m-4 flex flex-col items-center'>
        <Card className='p-4 sm:min-w-fit'>
            <CardTitle>Book a Review</CardTitle>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Form errors", errors))} className="p-4 flex flex-col m-2">
                    {step === 1 && <UserDetails form={form} />}
                    {step === 2 && <DateTimeSelection form={form} />}
                    {step === 3 && <DocumentUpload form={form} />}

                    <div className='pt-2 mt-4 flex flex-row justify-around items-center'>
                        <Button type="button" onClick={prevStep} disabled={step === 1}><ArrowLeft/>Back</Button>
                        {step < 3 ? (
                            <Button type="button" onClick={nextStep}>Next<ArrowRight/></Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitted}>{isSubmitted ? 'Submitted' : 'Submit'}</Button>
                        )}
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </motion.div>
  )
}