"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SignInDialogProps {
  onSignIn: () => void
}

export default function SignInDialog({ onSignIn }: SignInDialogProps) {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] bg-white/60 dark:bg-black/60 backdrop-blur-lg border-gray-200/50 dark:border-gray-800/50">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Sign In or Sign Up</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" placeholder="you@example.com" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">Sign Up</Button>
          <Button type="submit" onClick={onSignIn}>Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
