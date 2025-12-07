"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useEffect,
  memo,
  type ReactNode,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { FieldValues, Path, ControllerRenderProps } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field as ShadField,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Upload, ChevronDownIcon, Pencil, X } from "lucide-react";
import Link from "next/link";
import { Calendar as Cal } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/helpers/utils";

/**
 * Compound Form component
 * - `Form.Root` wires react-hook-form + optional zod schema
 * - `Form.Field` renders a labeled field using Controller; children is a render fn
 * - `Form.PasswordField` provides an input group with a show/hide toggle
 * - `Form.Submit` is a submit button that uses the form context
 *
 * This pattern makes it easy to create consistent forms across the app while
 * keeping the same shadcn UI primitives you already use in `RegisterForm`.
 */

type ZodSchema = z.ZodTypeAny;

type FormContextValue<T extends FieldValues> = ReturnType<typeof useForm<T>> & {
  schema?: ZodSchema | undefined;
  isPending?: boolean;
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
};

const FormContext = createContext<FormContextValue<any> | null>(null);

const DEFAULT_FORM_KEY = "__default_form__";
const formRegistry = new Map<string, (editing: boolean) => void>();

function useFormCtx<T extends FieldValues>() {
  const ctx = useContext<FormContextValue<T> | null>(FormContext);
  if (!ctx) throw new Error("Form components must be used inside Form.Root");
  return ctx;
}

type RootProps<T extends FieldValues> = {
  schema?: ZodSchema;
  defaultValues?: Partial<T>;
  onSubmit: (values: any) => void | Promise<void>;
  children: React.ReactNode;
  enableOptimistic?: boolean;
  title?: string;
  description?: string;
  enableEditMode?: boolean;
  formId?: string;
};

function Root<T extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  enableOptimistic = false,
  title,
  description,
  enableEditMode = false,
  formId,
}: RootProps<T>) {
  const resolver: any = schema ? zodResolver(schema as any) : undefined;
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(!enableEditMode);

  const methods = useForm<T>({
    resolver,
    defaultValues: defaultValues as any,
  });

  const handleFormSubmit = methods.handleSubmit((data) => {
    if (enableOptimistic) {
      startTransition(() => {
        void onSubmit(data);
      });
      return;
    }
    return onSubmit(data);
  });

  useEffect(() => {
    const key = formId ?? DEFAULT_FORM_KEY;
    formRegistry.set(key, setIsEditing);
    return () => {
      formRegistry.delete(key);
    };
  }, [formId, setIsEditing]);

  return (
    <FormContext.Provider value={{ ...methods, schema, isPending, isEditing, setIsEditing } as any}>
      <form
        onSubmit={handleFormSubmit}
        className="bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-6"
      >
        {(title || description) && (
          <div className="space-y-2">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </form>
    </FormContext.Provider>
  );
}

/** Field: renders label + controlled input area via render prop. */
type FieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  children: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => React.ReactNode;
};

function Field<TFieldValues extends FieldValues>({
  name,
  label,
  children,
}: FieldProps<TFieldValues>) {
  const form = useFormCtx<TFieldValues>();

  return (
    <ShadField>
      {label ? <FieldLabel htmlFor={String(name)}>{label}</FieldLabel> : null}
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => <>{children(field)}</>}
      />
      <FieldError>
        {(form.formState.errors as any)[name]?.message as React.ReactNode}
      </FieldError>
    </ShadField>
  );
}

/** PasswordField: convenience field with show/hide toggle using InputGroup */
type PasswordFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
};

const PasswordField = memo(function PasswordField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
}: PasswordFieldProps<TFieldValues>) {
  const [show, setShow] = useState(false);
  return (
    <Field name={name} label={label}>
      {(field) => (
        <InputGroup>
          <InputGroupInput
            id={String(name)}
            type={show ? "text" : "password"}
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
            className="h-10"
          />
          <InputGroupAddon align="inline-start">
            <Lock className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShow((s) => !s)}
            >
              {show ? (
                <EyeOff className="text-muted-foreground" />
              ) : (
                <Eye className="text-muted-foreground" />
              )}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      )}
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: PasswordFieldProps<TFieldValues>
) => ReactNode;

/** InputField: general-purpose input field with optional icon */
type InputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  iconAlign?: "inline-start" | "inline-end" | "block-start" | "block-end";
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  useGroup?: boolean;
};

const InputField = memo(function InputField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  icon,
  iconAlign = "inline-start",
  startAddon,
  endAddon,
  useGroup,
}: InputFieldProps<TFieldValues>) {
  const hasGroup = useGroup ?? (icon || startAddon || endAddon);
  const { isEditing } = useFormCtx<TFieldValues>();

  return (
    <Field name={name} label={label}>
      {(field) =>
        !isEditing ? (
          <Input
            id={String(name)}
            type={type}
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
            disabled
            className=""
          />
        ) : hasGroup ? (
          <InputGroup>
            <InputGroupInput
              id={String(name)}
              type={type}
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              className=""
            />
            {(startAddon || (icon && iconAlign === "inline-start")) && (
              <InputGroupAddon align="inline-start">
                {startAddon || icon}
              </InputGroupAddon>
            )}
            {(endAddon || (icon && iconAlign === "inline-end")) && (
              <InputGroupAddon align="inline-end">
                {endAddon || icon}
              </InputGroupAddon>
            )}
            {icon && iconAlign === "block-start" && (
              <InputGroupAddon align="block-start">{icon}</InputGroupAddon>
            )}
            {icon && iconAlign === "block-end" && (
              <InputGroupAddon align="block-end">{icon}</InputGroupAddon>
            )}
          </InputGroup>
        ) : (
          <Input
            id={String(name)}
            type={type}
            {...field}
            value={field.value ?? ""}
            placeholder={placeholder}
          />
        )
      }
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
) => ReactNode;

/** LinkField: simple link */
type LinkFieldProps = {
  label?: string;
  link: string;
};

function LinkField({ label, link }: LinkFieldProps) {
  return (
    <Link href={link} className="text-sm text-primary hover:underline">
      {label}
    </Link>
  );
}

/** TextareaField: multiline text input */
type TextareaFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  rows?: number;
};

const TextareaField = memo(function TextareaField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 4,
}: TextareaFieldProps<TFieldValues>) {
  const { isEditing } = useFormCtx<TFieldValues>();

  return (
    <Field name={name} label={label}>
      {(field) => (
        <Textarea
          id={String(name)}
          {...field}
          value={field.value ?? ""}
          placeholder={placeholder}
          rows={rows}
          disabled={!isEditing}
          className={!isEditing ? "bg-background/50 opacity-80" : ""}
        />
      )}
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: TextareaFieldProps<TFieldValues>
) => ReactNode;

/** SelectField: dropdown select field */
type SelectFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
};

const SelectField = memo(function SelectField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = "Select an option",
  options,
}: SelectFieldProps<TFieldValues>) {
  const { isEditing } = useFormCtx<TFieldValues>();

  return (
    <Field name={name} label={label}>
      {(field) =>
        !isEditing ? (
          <Input
            id={String(name)}
            value={options.find((opt) => opt.value === field.value)?.label ?? ""}
            placeholder={placeholder}
            disabled
            className="bg-background/50 opacity-80"
          />
        ) : (
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
            <SelectTrigger id={String(name)} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: SelectFieldProps<TFieldValues>
) => ReactNode;

/** CheckboxField: checkbox with label */
type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
};

const CheckboxField = memo(function CheckboxField<TFieldValues extends FieldValues>({
  name,
  label,
  description,
}: CheckboxFieldProps<TFieldValues>) {
  const form = useFormCtx<TFieldValues>();

  return (
    <ShadField>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <div className="flex items-start gap-2">
            <Checkbox
              id={String(name)}
              checked={!!field.value}
              onCheckedChange={form.isEditing ? field.onChange : undefined}
              disabled={!form.isEditing}
            />
            <div className="grid gap-1.5 leading-none">
              {label && (
                <label
                  htmlFor={String(name)}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}
      />
      <FieldError>
        {(form.formState.errors as any)[name]?.message as React.ReactNode}
      </FieldError>
    </ShadField>
  );
}) as <TFieldValues extends FieldValues>(
  props: CheckboxFieldProps<TFieldValues>
) => ReactNode;

/** DateField: date input field with calendar popover */
type DateFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
};

const DateField = memo(function DateField<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = "Select date",
}: DateFieldProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const { isEditing } = useFormCtx<TFieldValues>();

  return (
    <Field name={name} label={label}>
      {(field) =>
        !isEditing ? (
          <Button
            type="button"
            variant="outline"
            id={String(name)}
            className="w-full justify-between font-normal h-11 bg-background/50 border-border/50"
            disabled
          >
            {field.value ? new Date(field.value).toLocaleDateString() : placeholder}
            <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
          </Button>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                id={String(name)}
                className="w-full justify-between font-normal h-11 bg-background/50 border-border/50"
              >
                {field.value
                  ? new Date(field.value).toLocaleDateString()
                  : placeholder}
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Cal
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        )
      }
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: DateFieldProps<TFieldValues>
) => ReactNode;

/** FileField: file upload input with icon */
type FileFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  accept?: string;
  multiple?: boolean;
};

const FileField = memo(function FileField<TFieldValues extends FieldValues>({
  name,
  label,
  accept,
  multiple,
}: FileFieldProps<TFieldValues>) {
  const { isEditing } = useFormCtx<TFieldValues>();

  return (
    <Field name={name} label={label}>
      {(field) => {
        const files = field.value as FileList | null | undefined;
        const filename = files && files.length ? files[0].name : "";

        if (!isEditing) {
          return (
            <InputGroup>
              <Input
                id={`${String(name)}_display`}
                type="text"
                value={filename}
                placeholder={accept ? `Accepts ${accept}` : "No file selected"}
                disabled
                className="bg-background/50 opacity-80"
              />
              <InputGroupAddon align="inline-start">
                <Upload className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          );
        }

        return (
          <InputGroup>
            <InputGroupInput
              id={String(name)}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => field.onChange(e.target.files)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
            <InputGroupAddon align="inline-start">
              <Upload className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        );
      }}
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: FileFieldProps<TFieldValues>
) => ReactNode;

function Submit({ children, ...props }: React.ComponentProps<typeof Button>) {
  const form = useFormCtx();
  const isPending = form.isPending || form.formState.isSubmitting;
  const { isEditing } = form;

  if (!isEditing) return null;

  return (
    <Button type="submit" disabled={isPending || props.disabled} {...props}>
      {isPending ? "Submitting..." : children}
    </Button>
  );
}

type EditButtonProps = React.ComponentProps<typeof Button> & { formId?: string };

function EditButton({ children, formId, ...props }: EditButtonProps) {
  const ctx = useContext(FormContext) as FormContextValue<any> | null;

  // If inside a Form, prefer using the form context
  if (ctx) {
    const { isEditing, setIsEditing } = ctx;
    if (isEditing) return null;
    return (
      <Button type="button" onClick={() => setIsEditing?.(true)} {...props}>
        {children || (
          <>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </>
        )}
      </Button>
    );
  }

  // Not inside a Form: render a button even if the form hasn't registered yet.
  // Resolve the registry at click time so transient registration/unregistration
  // doesn't make the button disappear. If no setter exists yet, render the
  // button disabled to avoid a broken UX.
  // Always render the button enabled so the user can click it immediately.
  // If the form hasn't registered yet, retry the registry lookup for a short
  // period (2 seconds) and call the setter once it appears. This handles
  // cases where the Edit button is rendered before the client form mounts.
  const handleClick = () => {
    const key = formId ?? DEFAULT_FORM_KEY;

    // Try immediate call first
    const immediate = formRegistry.get(key);
    if (immediate) return immediate(true);

    // Otherwise, poll for a short time
    let attempts = 0;
    const maxAttempts = 20; // ~2s at 100ms intervals
    const interval = setInterval(() => {
      attempts += 1;
      const setter = formRegistry.get(key);
      if (setter) {
        setter(true);
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        // If desired, we could surface a UI notification here. For now,
        // silently fail so we don't introduce a dependency on the toast lib.
        // console.warn(`Form with id ${key} did not register in time.`);
      }
    }, 100);
  };

  return (
    <Button type="button" onClick={handleClick} {...props}>
      {children || (
        <>
          <Pencil className="h-4 w-4 mr-2" />
          Edit Profile
        </>
      )}
    </Button>
  );
}

function CancelButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  const { isEditing, setIsEditing, reset } = useFormCtx();

  if (!isEditing) return null;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        reset();
        setIsEditing?.(false);
      }}
      {...props}
    >
      {children || (
        <>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </>
      )}
    </Button>
  );
}

/** ProfilePictureField: profile picture upload with preview */
type ProfilePictureFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  className?: string;
  avatarClassName?: string;
  fallback?: string;
};

const ProfilePictureField = memo(function ProfilePictureField<TFieldValues extends FieldValues>({
  name,
  label,
  className,
  avatarClassName,
  fallback = "User",
}: ProfilePictureFieldProps<TFieldValues>) {
  const { isEditing } = useFormCtx<TFieldValues>();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Field name={name} label={label}>
      {(field) => {
        const currentValue = field.value;
        const displayUrl = preview || (typeof currentValue === "string" ? currentValue : null);

        return (
          <div className={cn("flex flex-col items-center gap-4", className)}>
            <Avatar className={cn("h-24 w-24", avatarClassName)}>
              <AvatarImage src={displayUrl || ""} alt="Profile picture" />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="flex flex-col items-center gap-2">
                <Label
                  htmlFor={String(name)}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Upload className="h-4 w-4" />
                  Upload Picture
                </Label>
                <Input
                  id={String(name)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
                {displayUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      field.onChange(null);
                      setPreview(null);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      }}
    </Field>
  );
}) as <TFieldValues extends FieldValues>(
  props: ProfilePictureFieldProps<TFieldValues>
) => ReactNode;

const Form = Object.assign(Root, {
  Field,
  InputField,
  PasswordField,
  TextareaField,
  SelectField,
  CheckboxField,
  DateField,
  FileField,
  ProfilePictureField,
  Submit,
  EditButton,
  CancelButton,
  Group: FieldGroup,
  LinkField,
});

export default Form;
