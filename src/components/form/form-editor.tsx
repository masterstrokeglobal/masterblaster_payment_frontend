"use client"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Control, FieldPath, FieldValues } from "react-hook-form"
import Toolbar from "../ui/tooltip-toolbar"

function FormTiptap<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  description, children,
  label,
  toolbarPosition,
}: {
  label?: string
  control: Control<TFieldValues>
  name: TName
  toolbarPosition?: 'top' | 'bottom'
  description?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        // Directly use the value passed to the render function
        return (
          <FormItem className="bg-gray-100 relative border  mt-4 rounded-xl border-black-stroke">
            {label && <FormLabel>{label}</FormLabel>}
            {children}
            <FormControl>
              <EditorWrapper
                value={value}
                onChange={onChange}
                toolbarPosition={toolbarPosition}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

// Separate component to use hooks correctly
const EditorWrapper = React.memo(({
  value,
  onChange,
  toolbarPosition = 'top',
  ...props
}: {
  value: string,
  onChange: (value: string) => void
  toolbarPosition?: 'top' | 'bottom'
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      // You can add more extensions here as needed
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div>
      {toolbarPosition === 'top' && editor && <Toolbar editor={editor} />}

      <EditorContent
        className="py-2"
        editor={editor}
        {...props}
      />

      {toolbarPosition === 'bottom' && editor && <Toolbar editor={editor} />}

    </div>
  )
})

EditorWrapper.displayName = 'EditorWrapper'

export default FormTiptap