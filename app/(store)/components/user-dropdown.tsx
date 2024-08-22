import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut } from "lucide-react";

interface UserDropdownProps {
    email: string;
    firstName: string;
    lastName: string;
    userImage: string;
}

export function UserDropdown({ email, firstName, lastName, userImage }: UserDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative h-10 w-10 rounded-full" variant="ghost">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src={userImage} alt="User Image" />
                        <AvatarFallback>{firstName[0].toUpperCase() + lastName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent forceMount align="end">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{firstName + " " + lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <LogoutLink>
                        <div className="cursor-pointer flex items-center justify-between w-full">
                            Log Out <LogOut size={20} />
                        </div>
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}