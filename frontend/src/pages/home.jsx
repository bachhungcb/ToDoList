import { Crown, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate();

  const gotToNotes = () =>{
    navigate("/note");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-8 h-8 text-yellow-800" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">TO DO LIST</CardTitle>
          <p className="text-gray-600 mt-2">React / Node.js</p>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6 text-gray-700">
            Organize your tasks efficiently with our powerful and easy-to-use To-Do List application.
          </p>
          <div className="flex flex-col space-y-4">
            <Button className="w-full" size="lg" onClick={() => gotToNotes()}>
              Get Started
              <Link to="/login"></Link>
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage