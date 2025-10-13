import React, { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import { ChevronDown } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

const CountrySelectField = ({
  name,
  label,
  control,
  placeholder,
  error,
  required,
}: CountrySelectFieldProps) => {
  const countries = useMemo(() => countryList().getData(), []);
  const countriesWithFlags = useMemo(
    () =>
      countries.map((country) => ({
        label: country.label,
        value: country.value,
        flag: (
          <CircleFlag
            countryCode={country.value.toLowerCase()}
            className="h-5 w-5"
          />
        ),
      })),
    [countries],
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field: { value, onChange } }) => (
          <>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="country-select-trigger"
                >
                  {value ? (
                    <div className="flex items-center space-x-2">
                      <span>
                        {
                          <CircleFlag
                            countryCode={value.toLowerCase()}
                            className="h-5 w-5"
                          />
                        }
                      </span>{" "}
                      <span>
                        {
                          countries.find((country) => country.value === value)
                            ?.label
                        }
                      </span>
                    </div>
                  ) : (
                    label
                  )}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="border-gray-600 bg-gray-800 text-white">
                <Command className="border-0 bg-gray-800">
                  <CommandInput
                    placeholder={placeholder}
                    className="country-select-input"
                  />
                  <CommandList className="bg-gray-800">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {countriesWithFlags.map((country) => (
                        <CommandItem
                          key={country.value}
                          onSelect={() => {
                            onChange(country.value);
                            setOpen(false);
                          }}
                          value={country.value}
                          className="country-select-item focus:bg-gray-600 focus:text-white"
                        >
                          <span>{country.flag}</span>
                          {country.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {error && (
              <p className="text-sm font-medium text-red-500">
                {error.message}
              </p>
            )}
            <p className="text-sm font-medium">
              Helps us show market data and news relevant to you.
            </p>
          </>
        )}
      />
    </div>
  );
};

export default CountrySelectField;
