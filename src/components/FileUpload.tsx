import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";

export interface FileUploadProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
  sizeLabel: string;
}

export function FileUpload({
  accept,
  maxSize = 500 * 1024,
  value,
  onChange,
  className,
  sizeLabel,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Check if the file type is image and apply size limit
        if (accept && accept["image/*"] && file.size > maxSize) {
          setError(
            `File size must be less than ${Math.round(
              maxSize / 1024 / 1024
            )} MB`
          );
          return;
        }

        if (accept && accept["application/pdf"] && file.size > 0) {
          setError(null);
        } else {
          setError(null);
        }

        // If no error, pass the file
        onChange(file);
      }
    },
    [maxSize, accept, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setError(null);
  };

  return (
    <div
      className={`${className} flex-col border bg-gray h-[300px] overflow-hidden rounded-lg flex justify-center items-center border-dashed border-dark/30 p-5 max-w-full`}
    >
      <div
        {...getRootProps()}
        className={cn(
          "dropzone",
          isDragActive && "active",
          error && "border-destructive/50 bg-destructive/5"
        )}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content gap-2 flex-col items-center flex justify-center">
          {value ? (
            <div className="relative w-full h-full">
              <img
                src={URL.createObjectURL(value)}
                className=" rounded-lg"
                alt={value.name}
              />
              <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className=" flex gap-3 justify-center">
                  <Button
                    type="button"
                    onClick={removeFile}
                    className=" my-2 h-auto px-8 !py-2 border-blue-800"
                    size={"lg"}
                    variant={"outline"}
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    className=" my-2 h-auto px-8 !py-2 border-blue-800"
                    size={"lg"}
                    variant={"outline"}
                  >
                    Change Photo
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Icon icon={"uil:image-upload"} width={"32"} height={"32"} />
              {isDragActive ? (
                <p className="text text-muted-foreground">Drop the file here</p>
              ) : (
                <div className=" text-center">
                  <Button
                    type="button"
                    className=" my-2 h-auto px-8 !py-2 border-blue-800"
                    size={"lg"}
                    variant={"outline"}
                  >
                    Upload
                  </Button>
                  <p className="text text-muted-foreground">
                    Drag & drop a file here, or click to select
                  </p>
                  <p className=" mt-4 text-dark/80">
                    {sizeLabel}px is our suggested size.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
