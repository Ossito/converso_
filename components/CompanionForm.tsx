"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";



const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom de votre companion est requis !" }),
  subject: z.string().min(1, { message: "Le sujet de votre companion est requis !" }),
  topic: z.string().min(1, { message: "Le thème de votre companion est requis !" }),
  voice: z.string().min(1, { message: "Le voix de votre companion est requis !" }),
  style: z.string().min(1, { message: "Le style de votre companion est requis !" }),
  duration: z.coerce.number().min(1, { message: "La durée de votre companion est requis !" }),
})


const CompanionForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })
    
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if(companion) {
            redirect(`/companion/${companion.id}`);
        }else{
            console.log("Échec lors de la création du companion");
            redirect("/");
        }
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Name Companion */}
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom de votre companion</FormLabel>
                            <FormControl>
                                <Input placeholder="Saisissez le nom de votre companion ..." className="my-input" {...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                
                {/* Subject Companion */}
                <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sujet de votre companion</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="my-input">
                                        <SelectValue placeholder="Sélectionner le sujet ..."/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-sm">
                                        {subjects.map((subject) => (
                                            <SelectItem value={subject} key={subject} className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                )}
                />

                {/* Topic Companion */}
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Qu'est-ce que le companion devrait aider à faire ?</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Ex. Algèbres" className="my-input" {...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                )}
                />

                {/* Voice Companion */}
                <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voix de votre companion</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="my-input">
                                        <SelectValue placeholder="Sélectionner la voix ..."/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-sm">
                                        <SelectItem value="male" className="capitalize">
                                            Masculin
                                        </SelectItem>
                                        <SelectItem value="female" className="capitalize">
                                            Féminin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                )}
                />

                {/* Voice Companion */}
                <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quelle doit être le style de votre companion ?</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <SelectTrigger className="my-input">
                                        <SelectValue placeholder="Sélectionner le style ..." />
                                    </SelectTrigger>
                                    
                                    <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-sm">
                                        <SelectItem value="formal" className="capitalize hover:bg-gray-100 cursor-pointer">
                                        Formel
                                        </SelectItem>
                                        <SelectItem value="casual" className="capitalize hover:bg-gray-100 cursor-pointer">
                                        Décontracté
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />

                {/* Duration Companion */}
                <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Une estimation de votre durée de session ? </FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="30" className="my-input" {...field} />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                    
                )}
                />

                <Button type="submit" className="bg-black text-white hover:bg-yellow-600 hover:text-white w-full cursor-pointer">
                    Mon companion
                </Button>
            </form>
        </Form>
    )
}

export default CompanionForm;