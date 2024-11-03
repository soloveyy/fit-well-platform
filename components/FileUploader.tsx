'use client'

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from "next/image";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
    files: File[],
    onChange: (file: File[]) => void,
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="text-white file-upload" {...getRootProps()}>
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image
                    src={convertFileToUrl(files[0])}
                    width={1000}
                    height={1000}
                    alt="uploaded image"
                    className="max-h-[400px] overflow-hidden object-cover"
                />
            ) : (
                <>
                    <Image
                        src="/assets/icons/cloud-upload-outline.svg"
                        width={40}
                        height={40}
                        alt="upload"
                    />
                    <div className="file-upload_label">
                        <p className="text-14-regular ">
                            <span className="text-red-400">Click to upload </span>
                            or drag and drop
                        </p>
                        <p className="text-12-regular">
                            SVG, PNG, JPG or GIF (max. 100 GB)
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default FileUploader