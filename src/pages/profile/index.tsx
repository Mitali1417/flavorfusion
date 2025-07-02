import type React from "react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useSavedRecipes } from "../../hooks/useSavedRecipes";
import { useFavorites } from "../../hooks/useFavorites";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  User,
  Calendar,
  Heart,
  Camera,
  Edit3,
  Save,
  Bookmark,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const EMOJI_OPTIONS = [
  "😀",
  "🍳",
  "👩‍🍳",
  "🧑‍🍳",
  "🥑",
  "🍕",
  "🍔",
  "🍣",
  "🍰",
  "🌮",
  "🍜",
  "🥗",
  "🍩",
  "🍟",
  "🍦",
];

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { savedRecipes } = useSavedRecipes();
  const { favoriteMeals } = useFavorites();
  const [displayName, setDisplayName] = useState(
    () => localStorage.getItem("displayName") || ""
  );
  const [avatar, setAvatar] = useState(
    () => localStorage.getItem("avatar") || EMOJI_OPTIONS[0]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [joinDate, setJoinDate] = useState(() => {
    let date = localStorage.getItem("joinDate");
    if (!date) {
      date = new Date().toISOString();
      localStorage.setItem("joinDate", date);
    }
    return date;
  });

  const [bio, setBio] = useState(() => localStorage.getItem("bio") || "");

  useEffect(() => {
    if (!localStorage.getItem("joinDate")) {
      const now = new Date().toISOString();
      localStorage.setItem("joinDate", now);
      setJoinDate(now);
    }
  }, []);

  const handleEmojiSelect = (emoji: string) => {
    setAvatar(emoji);
    localStorage.setItem("avatar", emoji);
    setShowEmojiPicker(false);
    toast.success("Avatar updated!");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("displayName", displayName);
    localStorage.setItem("bio", bio);
    setIsEditing(false);
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="mt-1">Manage your account and preferences</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto">
                <Dialog>
                  <DialogTrigger>
                    <div className="relative group cursor-pointer">
                      <div className="w-32 h-32 mb-3 mx-auto rounded-full bg-gradient-to-r from-orange-600 to-amber-400 flex items-center justify-center text-4xl border-4 ">
                        <span
                          role="img"
                          aria-label="avatar"
                          className="text-7xl group-hover:scale-110 transition-all duration-500 ease-in-out"
                        >
                          {avatar}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="flex items-center gap-1"
                    >
                      <Camera className="w-4 h-4" />
                      Change Avatar
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <h4>Pick an Emoji for Your Avatar</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {EMOJI_OPTIONS.map((emoji, index) => (
                        <button
                          key={index}
                          onClick={() => handleEmojiSelect(emoji)}
                          className="text-3xl rounded p-1 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">
                  {displayName || "Your Name"}
                </h2>
                <p className="text-sm">{user}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-primary-foreground rounded-lg">
                  <Calendar className="w-5 h-5 fill-primary" />
                  <div>
                    <p className="text-sm">Member since</p>
                    <p>
                      {joinDate ? new Date(joinDate).toLocaleDateString() : "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3">
                  <div className="flex items-center gap-3 bg-primary-foreground rounded-lg">
                    <Bookmark className="w-5 h-5 fill-primary text-primary" />
                    <div>
                      <p>{savedRecipes.length}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-primary-foreground rounded-lg">
                    <Heart className="w-5 h-5 fill-primary text-primary" />
                    <div>
                      <p>{favoriteMeals.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h3>Profile Information</h3>
                <p className="text-sm">
                  Update your personal details and preferences
                </p>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Display Name
                  </label>
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    disabled={!isEditing}
                    className="transition-all duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <label>Bio</label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    disabled={!isEditing}
                    className="transition-all duration-500"
                  />
                </div>

                {isEditing && (
                  <Button
                    type="submit"
                    className="mx-auto flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
