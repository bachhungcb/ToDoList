import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react"; // Import icon for edit button
import axios from '../util/axios.customize';
import { getUserApi } from "@/util/api";

export default function ProfilePage() {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAccount = async () => {
      if (auth.isAuthenticated) return;
      
      try {
        setAppLoading(true);
        const res = await axios.get('/users/account');
        
        if (isMounted && res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              name: res.data.name,
              _id: res.data._id,
              role: res.data.role
            }
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('Profile fetch error:', err);
          setError('Failed to load profile. Please try again.');
          setAuth({ isAuthenticated: false, user: null });
        }
      } finally {
        if (isMounted) {
          setAppLoading(false);
        }
      }
    };

    fetchAccount();

    return () => {
      isMounted = false;
    };
  }, [auth.isAuthenticated, setAuth, setAppLoading]);

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  if (appLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">{error}</p>
          <Button 
            variant="secondary"
            className="w-full mt-4"
            onClick={() => {
              setError(null);
              fetchAccount();
            }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center">Please log in to view your profile.</p>
          <Button 
            variant="outline"
            className="w-full mt-4"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage 
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${auth.user.name}`} 
              alt={auth.user.name} 
            />
            <AvatarFallback>{auth.user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="font-medium">{auth.user.name}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="font-medium">{auth.user.email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Role</p>
          <p className="font-medium capitalize">{auth.user.role}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">User ID</p>
          <p className="font-medium">{auth.user._id}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={handleEditProfile}
          >
            <Pencil className="mr-2" />
            Edit Profile
          </Button>
          <Button 
            variant="destructive"
            onClick={() => {
              setAuth({ isAuthenticated: false, user: null });
              window.location.href = '/login';
            }}
          >
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-40 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-24 w-24 rounded-full mx-auto" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </CardContent>
    </Card>
  );
}