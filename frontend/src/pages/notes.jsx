import React, { useContext, useState, useEffect } from "react"
import { AuthContext } from "../components/context/auth.context"
import axios from '../util/axios.customize'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { CalendarIcon, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.date(),
})

const NotesPage = () => {
  const { auth } = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      date: new Date(),
    },
  })

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/notes/${auth.user._id}`)
        setNotes(response)
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch notes. Please try again.",
          variant: "destructive",
        })
      }
    }
    fetchNotes()
  }, [auth.user._id])

  const onSubmit = async (values) => {
    try {
      if (selectedNote) {
        const response = await axios.put(`/notes/${selectedNote._id}`, {
          ...values,
          id: auth.user._id,
        })
        setNotes(prevNotes => prevNotes.map(note => 
          note._id === selectedNote._id ? response : note
        ))
        toast({
          title: "Success",
          description: "Note updated successfully.",
        })
      } else {
        const response = await axios.post("/notes", {
          ...values,
          id: auth.user._id,
        })
        setNotes([response, ...notes])
        toast({
          title: "Success",
          description: "Note created successfully.",
        })
      }
      form.reset()
      setSelectedNote(null)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    form.reset({
      title: note.title,
      content: note.content,
      date: new Date(note.date),
    })
  }

  const handleCancel = () => {
    form.reset()
    setSelectedNote(null)
  }

  const deleteNote = async (event, noteId) => {
    event.stopPropagation()
    try {
      await axios.delete(`/notes/${noteId}`)
      setNotes(notes.filter(note => note._id !== noteId))
      toast({
        title: "Success",
        description: "Note deleted successfully.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{selectedNote ? "Edit Note" : "Add Note"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Note title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Note content" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  {selectedNote && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit">
                    {selectedNote ? "Update Note" : "Add Note"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note._id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleNoteClick(note)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {note.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(event) => deleteNote(event, note._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(note.date), "PPP")}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotesPage