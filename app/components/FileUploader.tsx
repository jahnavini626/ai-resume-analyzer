import { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
    }, [onFileSelect]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        noClick: true,        // ✅ we handle click manually
        noKeyboard: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 20 * 1024 * 1024,
    });

    const handleClick = () => {
        inputRef.current?.click();  // ✅ directly trigger input click
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setFile(null);
        onFileSelect?.(null);
    };

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()} onClick={handleClick} className="cursor-pointer">
                <input {...getInputProps()} ref={inputRef} />

                <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center">
                        <img src="/icons/info.svg" alt="upload" className="size-20" />
                    </div>

                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-3">
                                <img src="/images/pdf.png" alt="pdf" className="size-10" />
                                <div>
                                    <p className="text-sm font-medium text-grey-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer" onClick={handleRemove}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">click to upload</span> or drag and drop
                            </p>
                            <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;