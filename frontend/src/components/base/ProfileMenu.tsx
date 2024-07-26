"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";
import myAxios from "@/lib/axios.config";
import { LOGOUT_URL, UPDATE_PROFILE } from "@/lib/apiEndPoints";
import {
  CustomSession,
  CustomUser,
} from "@/app/api/auth/[...nextauth]/authOptions";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

export default function ProfileMenu() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    profile_image: [],
  });
  const { data, update } = useSession();
  const user = data?.user as CustomUser;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const logoutUser = async () => {
    myAxios
      .post(
        LOGOUT_URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        signOut({
          callbackUrl: "/login",
          redirect: true,
        });
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again!");
      });
  };

  const updateProfile = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formDate = new FormData();
    formDate.append("profile_image", image ?? "");

    myAxios
      .post(UPDATE_PROFILE, formDate, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        update({ profile_image: response.image });
        toast.success("Profile updated successfully");
        setLoading(false);
        setProfileOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 422) {
          setErrors(err.response?.data.errors);
        } else {
          toast.error("Something went wrong, please try again!");
        }
      });
  };

  return (
    <div>
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action expire your current session and to access home page
              you have to login again!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <Button variant="destructive" onClick={logoutUser}>
              Yes, Logout
            </Button>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={updateProfile}>
            <div className="mb-2">
              <Label htmlFor="profile">Profile Image</Label>
              <Input
                type="file"
                className="file:text-white"
                accept="image/png,image/svg,image/jpg,image/jpeg,image/gif,image/webp"
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-2">
              <Button className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Update Profile"}
              </Button>
            </div>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar image={user?.profile_image ?? undefined} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
