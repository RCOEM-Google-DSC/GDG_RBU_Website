"use client";
import { BiLinkExternal } from "react-icons/bi";
import { BiEnvelope } from "react-icons/bi";
import {
  SiDiscord,
  SiLinkedin,
  SiInstagram,
  SiX,
  SiYoutube,
} from "react-icons/si";
import React from "react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
  ItemMedia,
} from "@/components/ui/item";

interface LinkItemProps {
  id: string;
  title: string;
  url: string;
  logo: string;
  description?: string;
}

const LinkItem = ({ id, title, url, logo, description }: LinkItemProps) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    email: <BiEnvelope size={28} aria-hidden />,
    discord: <SiDiscord size={28} aria-hidden />,
    linkedin: <SiLinkedin size={28} aria-hidden />,
    instagram: <SiInstagram size={28} aria-hidden />,
    twitter: <SiX size={28} aria-hidden />,
    youtube: <SiYoutube size={28} aria-hidden />,
  };

  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    const emailValue =
      typeof url === "string" && url.startsWith("mailto:")
        ? url.replace(/^mailto:/i, "")
        : url;

    try {
      await navigator.clipboard.writeText(emailValue);
      setCopied(true);
      setOpen(true);

      window.setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 2000);
      return;
    } catch {
      console.error("copy failed");
    }
  };

  //? copy whitelist 
  const copyIds = ["email"];
  const isEmail = copyIds.includes(String(id));

  return isEmail ? (
    //? contains popover logic for copying
    <Item
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="relative cursor-pointer hover:shadow-lg transition-all duration-200 p-5 flex items-center text-start hover:bg-accent/50 rounded-lg hover:border-border border-b-muted-foreground/30 bg-accent/30"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <ItemMedia className="mr-4 self-start">
            {logo && (
              <div className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                {iconMap[logo] ? iconMap[logo] : "🔗"}
              </div>
            )}
          </ItemMedia>
        </PopoverTrigger>

        <PopoverContent className="w-auto! p-2">
          <div className="text-sm">{copied ? "Copied" : ""}</div>
        </PopoverContent>
      </Popover>

      <div className="flex-1 flex flex-col gap-3 mt-1">
        <ItemHeader>
          <ItemTitle className="text-lg/2">{title}</ItemTitle>
        </ItemHeader>

        <ItemContent>
          {description && (
            <ItemDescription className="text-muted-foreground text-[1rem]">
              {description}
            </ItemDescription>
          )}
        </ItemContent>
      </div>

      <ItemActions className="absolute top-5 right-5 text-muted-foreground/80">
        <BiLinkExternal size={20} />
      </ItemActions>
    </Item>
  ) : (
    // other links
    <Item
      asChild
      className="relative cursor-pointer hover:shadow-lg transition-all duration-200 p-5 flex items-center text-start hover:bg-accent/50 rounded-lg hover:border-border border-b-muted-foreground/30 bg-accent/30"
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
      >
        <ItemMedia className="mr-4 self-start">
          {logo && (
            <div className="w-10 h-10 flex items-center justify-center text-muted-foreground">
              {iconMap[logo] ? iconMap[logo] : "🔗"}
            </div>
          )}
        </ItemMedia>

        <div className="flex-1 flex flex-col gap-3 mt-1">
          <ItemHeader>
            <ItemTitle className="text-lg/2">{title}</ItemTitle>
          </ItemHeader>

          <ItemContent>
            {description && (
              <ItemDescription className="text-muted-foreground text-[1rem]">
                {description}
              </ItemDescription>
            )}
          </ItemContent>
        </div>

        <ItemActions className="absolute top-5 right-5 text-muted-foreground/80">
          <BiLinkExternal size={20} />
        </ItemActions>
      </Link>
    </Item>
  );
};

export default LinkItem;

