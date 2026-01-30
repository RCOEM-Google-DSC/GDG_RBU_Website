import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { Event } from "@/lib";

const PastEvents = ({ id, title, image_url, date }: Event) => {
  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      {/* image */}
      <div className="relative h-40">
        <Image src={image_url} alt={title} fill className="object-cover" />
      </div>

      {/* text */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-1">{title}</CardTitle>
        <CardDescription className="text-sm">{date}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default PastEvents;
