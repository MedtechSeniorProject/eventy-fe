import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
  interface AlertConfirmationProps {
    name: string,
    disabled?: boolean
    cta: () => void
    className?: string,
    title?:string,
    description?:string
  }

  export function AlertConfirmation({name, disabled, cta, className, title, description} : AlertConfirmationProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={disabled} className={className}>{name}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title ? title : "Are you absolutely sure?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {description ? description : "This action cannot be undone. This will permanently delete the data."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild onClick={() => cta()}>
                  <Button className=" text-white bg-black hover:bg-white hover:text-black hover:border hover:border-black ">Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  