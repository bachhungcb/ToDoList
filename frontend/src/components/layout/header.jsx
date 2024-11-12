import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Users, FileText, User, Settings, LogOut, LogIn, UserPlus } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const { auth, setAuth } = useContext(AuthContext)
  const [current, setCurrent] = useState('home')

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
        _id: "",
        role: ""
      }
    })
    setCurrent("home")
    navigate("/")
  }

  const menuItems = [
    { label: "Home", key: "home", icon: <Home className="mr-2 h-4 w-4" />, to: "/" },
    ...(auth.isAuthenticated
      ? [
          ...(auth.user.role === "admin"
            ? [{ label: "Users", key: "user", icon: <Users className="mr-2 h-4 w-4" />, to: "/user" }]
            : []),
          { label: "Notes", key: "note", icon: <FileText className="mr-2 h-4 w-4" />, to: "/note" },
        ]
      : []),
    { label: "Profile", key: "profile", icon: <User className="mr-2 h-4 w-4" />, to: "/profile" },
  ]

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-4">
            {menuItems.map((item) => (
              <Button
                key={item.key}
                variant={current === item.key ? "default" : "ghost"}
                asChild
                onClick={() => setCurrent(item.key)}
              >
                <Link to={item.to}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                {auth.isAuthenticated ? `Welcome ${auth.user.name}` : "Menu"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {auth.isAuthenticated ? (
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Log in</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header