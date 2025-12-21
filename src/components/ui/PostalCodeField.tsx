/**
 * PostalCodeField - Auto-complete component for French postal codes
 * Uses the French government API (api.gouv.fr/adresse)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader2, MapPin } from "lucide-react";

interface CommuneResult {
  code: string;
  nom: string;
  codesPostaux: string[];
  departement: {
    code: string;
    nom: string;
  };
}

interface PostalCodeSuggestion {
  postalCode: string;
  city: string;
  departement: string;
}

interface PostalCodeFieldProps {
  postalCodeValue: string;
  cityValue: string;
  onPostalCodeChange: (value: string) => void;
  onCityChange: (value: string) => void;
  postalCodeError?: string;
  cityError?: string;
  required?: boolean;
}

const PostalCodeField = ({
  postalCodeValue,
  cityValue,
  onPostalCodeChange,
  onCityChange,
  postalCodeError,
  cityError,
  required = false,
}: PostalCodeFieldProps) => {
  const [suggestions, setSuggestions] = useState<PostalCodeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isCityEditable, setIsCityEditable] = useState(true);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions from API
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // Use the French geo API to search communes by postal code
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${encodeURIComponent(query)}&fields=nom,codesPostaux,departement&limit=10`
      );

      if (!response.ok) {
        throw new Error("API error");
      }

      const communes: CommuneResult[] = await response.json();

      // Transform results into suggestions
      const newSuggestions: PostalCodeSuggestion[] = [];
      
      communes.forEach((commune) => {
        // Handle communes with multiple postal codes
        commune.codesPostaux
          .filter((cp) => cp.startsWith(query))
          .forEach((cp) => {
            newSuggestions.push({
              postalCode: cp,
              city: commune.nom,
              departement: commune.departement?.nom || "",
            });
          });
      });

      // Sort by postal code
      newSuggestions.sort((a, b) => a.postalCode.localeCompare(b.postalCode));

      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } catch (error) {
      console.error("Error fetching postal code suggestions:", error);
      setSuggestions([]);
      // Enable manual city input on API error
      setIsCityEditable(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const handlePostalCodeChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "").slice(0, 5);
    onPostalCodeChange(numericValue);
    setIsCityEditable(true); // Allow editing until selection is made
    setSelectedIndex(-1);

    // Debounce API calls
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(numericValue);
    }, 300);
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion: PostalCodeSuggestion) => {
    onPostalCodeChange(suggestion.postalCode);
    onCityChange(suggestion.city);
    setIsCityEditable(false);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const items = suggestionsRef.current.querySelectorAll("li");
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Postal Code Field */}
      <div className="space-y-2 relative">
        <label
          htmlFor="postal-code"
          className="block text-sm font-medium text-foreground"
        >
          Code postal
          {required && <span className="text-destructive ml-1" aria-label="requis">*</span>}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            id="postal-code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={postalCodeValue}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full h-11 px-4 pr-10 text-base border rounded-lg bg-background",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "transition-all duration-200",
              "placeholder:text-muted-foreground",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              postalCodeError
                ? "border-destructive focus:ring-destructive"
                : "border-border hover:border-foreground/20"
            )}
            placeholder="75001"
            autoComplete="postal-code"
            aria-invalid={postalCodeError ? "true" : "false"}
            aria-describedby={postalCodeError ? "postal-code-error" : "postal-code-helper"}
            aria-autocomplete="list"
            aria-controls="postal-suggestions"
            aria-expanded={showSuggestions}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            id="postal-suggestions"
            role="listbox"
            className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-background border border-border rounded-lg shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion.postalCode}-${suggestion.city}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={cn(
                  "px-4 py-3 cursor-pointer flex items-start gap-3 transition-colors",
                  index === selectedIndex
                    ? "bg-primary/10 text-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => selectSuggestion(suggestion)}
              >
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium">
                    {suggestion.postalCode} - {suggestion.city}
                  </div>
                  {suggestion.departement && (
                    <div className="text-sm text-muted-foreground">
                      {suggestion.departement}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {postalCodeError && (
          <p
            id="postal-code-error"
            className="text-sm text-destructive flex items-center gap-1.5 mt-1"
            role="alert"
          >
            <AlertCircle size={14} className="flex-shrink-0" aria-hidden="true" />
            {postalCodeError}
          </p>
        )}
        <p id="postal-code-helper" className="text-sm text-muted-foreground mt-1">
          Saisissez le code postal, la ville sera auto-complétée
        </p>
      </div>

      {/* City Field */}
      <div className="space-y-2">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-foreground"
        >
          Ville
          {required && <span className="text-destructive ml-1" aria-label="requis">*</span>}
        </label>
        <input
          id="city"
          type="text"
          value={cityValue}
          onChange={(e) => {
            onCityChange(e.target.value);
            setIsCityEditable(true);
          }}
          readOnly={!isCityEditable && cityValue.length > 0}
          className={cn(
            "w-full h-11 px-4 text-base border rounded-lg bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
            "placeholder:text-muted-foreground",
            !isCityEditable && cityValue.length > 0
              ? "bg-muted/30 cursor-default"
              : "",
            cityError
              ? "border-destructive focus:ring-destructive"
              : "border-border hover:border-foreground/20"
          )}
          placeholder="Paris"
          autoComplete="address-level2"
          aria-invalid={cityError ? "true" : "false"}
          aria-describedby={cityError ? "city-error" : undefined}
        />
        {cityError && (
          <p
            id="city-error"
            className="text-sm text-destructive flex items-center gap-1.5 mt-1"
            role="alert"
          >
            <AlertCircle size={14} className="flex-shrink-0" aria-hidden="true" />
            {cityError}
          </p>
        )}
        {!isCityEditable && cityValue.length > 0 && (
          <button
            type="button"
            onClick={() => setIsCityEditable(true)}
            className="text-sm text-primary hover:underline mt-1"
          >
            Modifier la ville manuellement
          </button>
        )}
      </div>
    </div>
  );
};

export default PostalCodeField;

