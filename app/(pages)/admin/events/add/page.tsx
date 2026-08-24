"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "@/components/ui/time-picker";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingQR, setUploadingQR] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    image_url: "",
    max_participants: "",
    is_team_event: false,
    max_team_size: "",
    min_team_size: "",
    is_paid: false,
    fee: "",
    qr_code: "",
    whatsapp_url: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleToggle = (field: "is_team_event" | "is_paid") => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingQR(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFormData((prev) => ({ ...prev, qr_code: data.url }));
    } catch (error) {
      console.error("QR upload error:", error);
      alert("Failed to upload QR code. Please try again.");
    } finally {
      setUploadingQR(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // The existing route expects 'file' in formData
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      // The API returns { url, secure_url, transformed_url, public_id }
      // We'll use 'url' or 'secure_url'
      setFormData((prev) => ({ ...prev, image_url: data.url }));
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.venue.trim()) newErrors.venue = "Venue is required";

    if (formData.is_paid && !formData.fee) {
      newErrors.fee = "Fee is required for paid events";
    }

    if (formData.is_team_event) {
      if (!formData.max_team_size) {
        newErrors.max_team_size = "Max team size is required for team events";
      }
      if (!formData.min_team_size) {
        newErrors.min_team_size = "Min team size is required for team events";
      }

      // if both provided, validate numeric relationship
      if (formData.min_team_size && formData.max_team_size) {
        const min = parseInt(formData.min_team_size, 10);
        const max = parseInt(formData.max_team_size, 10);
        if (isNaN(min) || min <= 0) {
          newErrors.min_team_size = "Min team size must be a positive number";
        }
        if (isNaN(max) || max <= 0) {
          newErrors.max_team_size = "Max team size must be a positive number";
        }
        if (!newErrors.min_team_size && !newErrors.max_team_size && min > max) {
          newErrors.min_team_size =
            "Min team size cannot be greater than max team size";
          newErrors.max_team_size =
            "Max team size cannot be less than min team size";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time || undefined,
        venue: formData.venue,
        category: formData.category || undefined,
        image_url: formData.image_url || undefined,
        max_participants: formData.max_participants
          ? parseInt(formData.max_participants)
          : undefined,
        is_team_event: formData.is_team_event,
        max_team_size:
          formData.is_team_event && formData.max_team_size
            ? parseInt(formData.max_team_size)
            : undefined,
        min_team_size:
          formData.is_team_event && formData.min_team_size
            ? parseInt(formData.min_team_size)
            : undefined,
        is_paid: formData.is_paid,
        fee:
          formData.is_paid && formData.fee
            ? parseFloat(formData.fee)
            : undefined,
        qr_code: formData.is_paid ? formData.qr_code || undefined : undefined,
        whatsapp_url: formData.whatsapp_url || undefined,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }

      alert("Event created successfully!");
      router.push("/admin/events");
    } catch (error: any) {
      console.error("Error creating event:", error);
      alert(error.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
        <p className="text-gray-600 mt-2">
          Create a new event for your community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            General Information
          </h2>

          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your event"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>
                Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!selectedDate}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                      errors.date && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        setFormData((prev) => ({
                          ...prev,
                          date: format(date, "yyyy-MM-dd"),
                        }));
                        if (errors.date) {
                          setErrors((prev) => ({ ...prev, date: "" }));
                        }
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <TimePicker
                value={formData.time}
                onChange={(time) => {
                  setFormData((prev) => ({ ...prev, time }));
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue">
              Venue <span className="text-red-500">*</span>
            </Label>
            <Input
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              placeholder="Event location"
              className={errors.venue ? "border-red-500" : ""}
            />
            {errors.venue && (
              <p className="text-sm text-red-500">{errors.venue}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Workshop, Hackathon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Event Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image_url_file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="cursor-pointer"
                />
                {uploadingImage && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                )}
              </div>

              {/* Hidden input to store the URL string if needed manually or just to keep the form data structure consistent */}
              <Input
                type="hidden"
                name="image_url"
                value={formData.image_url}
              />

              {formData.image_url && (
                <div className="mt-2 relative group">
                  <Image
                    src={formData.image_url}
                    height={200}
                    width={400} // Larger preview for event image
                    alt="Event Image Preview"
                    className="h-48 w-full object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image_url: "" }))
                    }
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_url">WhatsApp Group / Contact URL</Label>
            <Input
              id="whatsapp_url"
              name="whatsapp_url"
              value={formData.whatsapp_url}
              onChange={handleInputChange}
              placeholder="https://chat.whatsapp.com/xxxx or https://wa.me/..."
            />
          </div>
        </div>

        {/* Participation */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Participation</h2>

          <div className="space-y-2">
            <Label htmlFor="max_participants">Max Participants</Label>
            <Input
              id="max_participants"
              name="max_participants"
              type="number"
              value={formData.max_participants}
              onChange={handleInputChange}
              placeholder="Leave empty for unlimited"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="is_team_event" className="font-medium">
                Team Event
              </Label>
              <p className="text-sm text-gray-600">
                Allow participants to register as teams
              </p>
            </div>
            <Switch
              id="is_team_event"
              checked={formData.is_team_event}
              onCheckedChange={() => handleToggle("is_team_event")}
            />
          </div>

          {formData.is_team_event && (
            <div className="space-y-2 pl-4 border-l-2 border-blue-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_team_size">
                    Min Team Size <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="min_team_size"
                    name="min_team_size"
                    type="number"
                    value={formData.min_team_size}
                    onChange={handleInputChange}
                    placeholder="e.g., 2"
                    className={errors.min_team_size ? "border-red-500" : ""}
                  />
                  {errors.min_team_size && (
                    <p className="text-sm text-red-500">
                      {errors.min_team_size}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="max_team_size">
                    Max Team Size <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="max_team_size"
                    name="max_team_size"
                    type="number"
                    value={formData.max_team_size}
                    onChange={handleInputChange}
                    placeholder="e.g., 4"
                    className={errors.max_team_size ? "border-red-500" : ""}
                  />
                  {errors.max_team_size && (
                    <p className="text-sm text-red-500">
                      {errors.max_team_size}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Payment</h2>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <Label htmlFor="is_paid" className="font-medium">
                Paid Event
              </Label>
              <p className="text-sm text-gray-600">
                Charge a fee for registration
              </p>
            </div>
            <Switch
              id="is_paid"
              checked={formData.is_paid}
              onCheckedChange={() => handleToggle("is_paid")}
            />
          </div>

          {formData.is_paid && (
            <div className="space-y-6 pl-4 border-l-2 border-green-500">
              <div className="space-y-2">
                <Label htmlFor="fee">
                  Registration Fee (₹) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  step="0.01"
                  value={formData.fee}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  className={errors.fee ? "border-red-500" : ""}
                />
                {errors.fee && (
                  <p className="text-sm text-red-500">{errors.fee}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr_code">Payment QR Code</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="qr_code"
                    type="file"
                    accept="image/*"
                    onChange={handleQRUpload}
                    disabled={uploadingQR}
                    className="cursor-pointer"
                  />
                  {uploadingQR && (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  )}
                </div>
                {formData.qr_code && (
                  <div className="mt-2">
                    <Image
                      src={formData.qr_code}
                      height={128}
                      width={128}
                      alt="QR Code Preview"
                      className="h-32 w-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} className=" text-white px-8">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Event"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
