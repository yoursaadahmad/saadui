"use client";

import { SellProduct, type State } from "@/app/actions";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type JSONContent } from "@tiptap/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { SelectCategory } from "../SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { SubmitButton } from "../SubmitButtons";


export function SellForm(){
    const initialState: State = {message:'', status: undefined};
    const [state, formAction] = useFormState(SellProduct, initialState);
    const [json, setJson] = useState<null | JSONContent>(null);
    const[images, setImages] = useState<null | string[]>(null);
    const[productFile, setProductFile] = useState<null | string>(null);

    useEffect(() => {
        if(state.status === "success"){
            toast.success(state.message);
        } else if (state.status === 'error'){
            toast.error(state.message);
        }
    }, [state])
    return(
        <>
         <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Sell Your Product with Ease</CardTitle>
                        <CardDescription>Please describe Your product here in detail so that it can be sold</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Name</Label>
                            <Input name="name" type="text" placeholder="Name of Product" required minLength={3} />
                            {state?.errors?.["name"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Category</Label>
                            <SelectCategory />
                            {state?.errors?.["category"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["category"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input placeholder="Rs. 1000" type="number" name="price" required min={1} />
                            {state?.errors?.["price"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Summary</Label>
                            <Textarea name="smallDescription" placeholder="Please Describe your product shortly here..." required minLength={10} />
                            {state?.errors?.["smallDescription"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["smallDescription"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="description" value={JSON.stringify(json)} />
                            <Label>Description</Label>
                            <TipTapEditor json={json} setJson={setJson} />
                            {state?.errors?.["description"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="images" value={JSON.stringify(images)} />
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                                setImages(res.map((item) => item.url));
                                toast.success('Images Uploaded Successfully');
                            }}
                            onUploadError={(error: Error)=> {
                                
                                toast.error('Something Went Wrong, Try again.');
                            }} />
                            {state?.errors?.["images"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="productFile" value={productFile ?? ""} />
                            <Label>Product File</Label>
                            <UploadDropzone onClientUploadComplete={(res) => {
                                setProductFile(res[0].url);
                                toast.success('File Uploaded Successfully')
                            }} endpoint="productFileUpload"
                            onUploadError={(error: Error) => {
                                toast.error("Something Went Wrong, Try Again")
                            }} />
                            {state?.errors?.["productFile"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["productFile"]?.[0]}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="mt-5 ">
                        <SubmitButton title="Create Product" />
                    </CardFooter>
                </form>
        </>
    )
}