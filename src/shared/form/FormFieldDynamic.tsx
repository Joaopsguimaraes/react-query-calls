/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FormFields } from "@/@types/form-field";
import { inputMask } from "@/utils/input-mask";
import { ChevronDown } from "lucide-react";

import { FieldValues, type ControllerRenderProps } from "react-hook-form";

import { zipCodeMask } from "@/lib/masker";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Props<TFieldValues extends FieldValues = FieldValues> {
  field: ControllerRenderProps<any>;
  slot: FormFields<TFieldValues>;
}

export function FormFieldDynamic<TFieldValues extends FieldValues>({
  field,
  slot,
}: Props<TFieldValues>) {
  switch (slot.type) {
    case "tel":
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="tel"
          onChange={(e) => field.onChange(inputMask.phone(e.target.value))}
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="tel"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      );
    case "cnpj_cpf":
      return (
        <Input
          className="h-10 dark:bg-black"
          inputMode="numeric"
          onChange={(e) => field.onChange(inputMask.cpfCnpj(e.target.value))}
          placeholder={slot.placeholderKey}
          type="text"
          disabled={slot.disabled}
          value={field.value}
          width="full"
        />
      );
    case "checkbox":
      return (
        <div
          className={cn(
            "w-full justify-start rounded-xl px-1 py-3",
            field.value ? "bg-primary-s-lighter/40" : ""
          )}
        >
          <div className="flex w-full items-center justify-start gap-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={(value): void => {
                field.onChange(value);
              }}
              disabled={slot.disabled}
              className={cn("border-blue rounded", slot.className)}
            />
            {slot.label && (
              <p
                aria-label={slot.label}
                className="w-full min-w-60 text-sm font-medium"
              >
                {slot.label}
              </p>
            )}
            {slot.labelComp && slot.labelComp}
          </div>
        </div>
      );

    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={field.value}
            defaultChecked={field.value}
            onCheckedChange={field.onChange}
            disabled={slot.disabled}
          />
          <span className="text-sm font-medium">{slot.label}</span>
        </div>
      );
    case "date":
      return <DatePicker field={field} slot={slot} />;
    case "radio":
      return (
        <RadioGroup
          className={cn(
            slot.options.length > 2
              ? "space-y-2"
              : "flex w-full items-center gap-10 space-y-2"
          )}
          onValueChange={field.onChange}
          value={field.value}
        >
          {slot.options?.map((option) => (
            <FormItem
              className="flex w-auto items-center space-x-2"
              key={option.value.toString()}
            >
              <FormControl>
                <RadioGroupItem
                  aria-label={option.label}
                  title={option.label}
                  value={option.value as unknown as string}
                />
              </FormControl>
              <FormLabel
                className="cursor-pointer font-normal"
                title={option.label}
              >
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );
    case "combobox-single-value":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              disabled={slot.disabled}
              aria-controls=""
              aria-expanded
              className={cn(
                "bg-muted ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex  min-h-10 w-full items-center justify-between rounded-md border-0 px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                slot.className
              )}
              role="combobox"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div>
                  <div className={cn("flex items-center")} key={field.value}>
                    <span
                      className={cn(!field.value && "text-muted-foreground")}
                    >
                      {slot.options.find((opt) => opt.value === field.value)
                        ?.label ??
                        (field.value || slot.placeholderKey)}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="size-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className={cn("min-w-[350px]", slot.contentSize)}>
            <Command>
              <CommandInput
                className="dark:bg-gray900 bg-white"
                onValueChange={(search: string) =>
                  "onInputChange" in slot && slot.onInputChange
                    ? slot.onInputChange(search)
                    : null
                }
                placeholder={slot.placeholderKey}
              />
              <CommandList>
                <CommandEmpty>
                  {slot.loading ? (
                    <Skeleton className="h-8" />
                  ) : (
                    <span>Não encontrado</span>
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {slot.options.map((option, index) => (
                    <CommandItem
                      className="flex w-full gap-2"
                      key={index}
                      onSelect={() => {
                        field.onChange(option.value);
                        slot.postChangeCall?.(option.value.toString());
                      }}
                      value={String(option.label)}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    case "select":
      return slot?.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <Select
          disabled={slot.disabled}
          onValueChange={field.onChange}
          value={field.value}
          defaultValue={field.value}
        >
          <SelectTrigger className="h-10">
            <SelectValue
              placeholder={
                slot.options.find(
                  (s) => String(s.value) === String(field.value)
                )?.label ||
                field.value ||
                slot.placeHolder
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="max-h-52">
              {slot.options.map((item, index) => {
                return (
                  <SelectItem key={index} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    case "textarea":
      return (
        <Textarea
          {...field}
          className="disabled:bg-background bg-muted border-0 disabled:opacity-100"
          disabled={slot.disabled}
          placeholder={slot.placeholderKey}
          title={slot.label}
        />
      );
    case "number":
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={field.onChange}
          onBlur={slot.onBlur}
          type="number"
          value={field.value}
          width="full"
        />
      );
    case "zipcode":
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) => field.onChange(zipCodeMask.onChange(e))}
          onBlur={slot.onBlur}
          placeholder={slot.placeholderKey}
          type="zipcode"
          value={field.value}
          width="full"
        />
      );
    case "currency":
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          inputMode="numeric"
          onChange={(e) =>
            field.onChange(inputMask.currency(e.target.value, slot.prefix))
          }
          onBlur={(e) => {
            if (e.target.value.replace(/\D/g, "")) {
              field.onChange(
                inputMask.currency(e.target.value, slot.prefix, {
                  forceDecimalPlaces: true,
                })
              );
            }

            slot.onBlur?.(e);
          }}
          placeholder={slot.placeholderKey}
          type="text"
          value={field.value}
          width="full"
        />
      );
    case "hidden":
      return <Input {...field} type="hidden" />;
    case "text":
      <Input
        className="h-10 dark:bg-black"
        disabled={slot.disabled}
        onChange={field.onChange}
        onBlur={slot.onBlur}
        placeholder={slot.placeholderKey}
        value={field.value}
        width="full"
      />;
    default:
      return (
        <Input
          className="h-10 dark:bg-black"
          disabled={slot.disabled}
          onChange={field.onChange}
          placeholder={slot.placeholderKey}
          value={field.value}
          width="full"
        />
      );
  }
}
