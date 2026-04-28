export type TagInputProps = {
  // Placeholder text for the input.
  placeholder?: string; // default: ""

  // Array of tags displayed as pre-selected.
  tags: Array<{ id: string; text: string }>; // default: []

  // Function to set the state of tags.
  setTags: React.Dispatch<React.SetStateAction<{ id: string; text: string }[]>>;

  // Enable or disable the autocomplete feature.
  enableAutocomplete?: boolean; // default: false

  // List of autocomplete options.
  autocompleteOptions?: Array<{ id: string; text: string }>; // default: []

  // Maximum number of tags allowed.
  maxTags?: number; // default: null

  // Minimum number of tags required.
  minTags?: number; // default: null

  // Make the input read-only.
  readOnly?: boolean; // default: false

  // Disable the input.
  disabled?: boolean; // default: false

  // Callback function when a tag is added.
  onTagAdd?: (tag: string) => void; // default: null

  // Callback function when a tag is removed.
  onTagRemove?: (tag: string) => void; // default: null

  // Allow duplicate tags.
  allowDuplicates?: boolean; // default: false

  // Maximum length of a tag.
  maxLength?: number; // default: null

  // Minimum length of a tag.
  minLength?: number; // default: null

  // Function to validate a tag.
  validateTag?: (tag: string) => boolean; // default: null

  // Character used to separate tags.
  delimiter?: Delimiter; // default: null

  // Show the count of tags.
  showCount?: boolean; // default: false

  // Placeholder text when tag limit is reached.
  placeholderWhenFull?: string; // default: ""

  styleClasses?: {
    // Class name styles for the tag input container (use when inlineTags is set to true).
    inlineTagsContainer?: string;

    // Class name styles for the tag popover sub components
    tagPopover?: {
      popoverTrigger?: string;
      popoverContent?: string;
    };

    // Class name styles for the tag list sub components (the tag list renders the tags as a list)
    tagList?: {
      container?: string;
      sortableList?: string;
    };

    // Class name styles for the autocomplete component sub components
    autoComplete?: {
      command?: string;
      popoverTrigger?: string;
      popoverContent?: string;
      commandList?: string;
      commandGroup?: string;
      commandItem?: string;
    };

    // Class name styles for the tag
    tag?: {
      body?: string;
      closeButton?: string;
    };

    // Class name styles for the main input field
    input?: string;
  }; // default: {}

  // Sort tags alphabetically.
  sortTags?: boolean; // default: false

  // List of characters that can be used as delimiters.
  delimiterList?: string[]; // default: []

  // Truncate tag text to a certain length.
  truncate?: number; // default: null

  // Function to filter autocomplete options.
  autocompleteFilter?: (option: string) => boolean; // default: null

  // Layout direction of the tag inputs.
  direction?: "row" | "column"; // default: 'row'

  // A callback function that is called whenever the input value changes.
  onInputChange?: (value: string) => void; // default: null

  // A callback function that is used to render custom tag elements.
  customTagRenderer?: (tag: { id: string; text: string }) => React.ReactElement; // default: null

  // Function to be called when the input field gains focus.
  onFocus?: React.FocusEventHandler<HTMLInputElement>; // default: null

  // Function to be called when the input field loses focus.
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // default: null

  // Only allow tags that are present in the autocomplete options.
  restrictTagsToAutocompleteOptions?: boolean; // default: false

  // A callback function to be called when a tag is clicked.
  onTagClick?: (tag: { id: string; text: string }) => void; // default: null

  // Enable drag and drop functionality.
  draggable?: boolean; // default: false

  // Position of the input field in relation to the tags.
  inputFieldPosition?: "bottom" | "top" | "inline"; // default: 'bottom'

  // Show a button to clear all tags.
  clearAll?: boolean; // default: false

  // A callback function to be called when the clear all button is clicked.
  onClearAll?: () => void; // default: null

  // Additional props to be passed to the input field.
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // default: {}

  // Use a popover to display tags instead of inline.
  usePopoverForTags?: boolean; // default: false

  // A callback function that generates an id for a newly created tag.
  generateTagId?: () => string; // default: crypto.getRandomValues(new Uint32Array(1))[0].toString
};

enum Delimiter {
  Comma = ",",
  Enter = "Enter",
}
