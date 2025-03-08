"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "../components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"

// Define the item type
type Item = {
  id: string;
  label: string;
}

// Define props for the component
interface CheckboxMatchingProps {
  title: string;
  description: string;
  items: readonly Item[];
}

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function CheckboxMatching({ title, description, items }: CheckboxMatchingProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

return (
    <div className="space-y-8 w-full border-2 border-black p-4 relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="items"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">{title}</FormLabel>
                            <FormDescription>
                                {description}
                            </FormDescription>
                        </div>
                        {items.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="items"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                    }}
                                                    className="border-2 border-black outline-offset-2"
                                                />
                                            </FormControl>
                                            <FormLabel 
                                                className={`text-sm font-normal ${
                                                    field.value?.includes(item.id) ? "line-through" : ""
                                                }`}
                                            >
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* <div className="flex justify-start">
              <Button type="submit" className="mt-4">Submit</Button>
            </div> */}
        </form>
      </Form>
    </div>
)
}