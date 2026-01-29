import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

type InfoCardProps = {
  title: string;
  data: string | number;
  icon: React.ReactNode;
  description?: string;
};

const InfoCard = ({ title, data, icon, description }: InfoCardProps) => {
  return (
    <Card className="border-border/50 hover:border-primary/20 ">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{data}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
