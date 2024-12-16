"use client"
import { Button } from "@/components/ui/button";
import 'regenerator-runtime/runtime'
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaMicrophoneLinesSlash } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";

import { jsPDF } from "jspdf";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";


export default function Home() {
  const cookies = useCookies()
  const token = cookies.get("token")

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [toggleMic, setToggleMic] = useState<boolean>(false)
  const [generatingPdf, setGeneratingPdf] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const [fileName, setFileName] = useState<string>("smart-notes")

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const generatePdf = (fileName: string) => {
    if (transcript && transcript !== "") {
      setGeneratingPdf(true);
      const doc = new jsPDF('p', 'pt', 'a4');
      doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
      doc.setFont('ComicSansMS');
      const splitTitle = doc.splitTextToSize(transcript, 490);
      doc.text(splitTitle, 50, 50);
      doc.save(`${fileName || "smart-notes"}.pdf`);
      setGeneratingPdf(false);
    } else {
      alert("Please type something before download");
    }

  }
  if (token === undefined) {
    return router.push("/sign-in")
  }

  return (
    <div className="w-full flex justify-center text-black flex-col gap-y-3 items-center p-5 ">
      <Textarea className="bg-white border w-full border-none focus:border-none focus:outline-none rounded-md lg:w-[60%]" readOnly rows={18} value={transcript || "Your speech will transcript here start speaking"} />
      <div className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
        {transcript ? (<Button size={"sm"} onClick={() => {
          setToggleMic(prev => !prev)
          stopListening()
        }
        } disabled={toggleMic === false} className="flex gap-2 justify-center items-center"><FaMicrophoneLinesSlash /> Stop Speech</Button>) : (<Button size={"sm"} onClick={() => {
          setToggleMic(prev => !prev)
          startListening()
        }
        } disabled={toggleMic === true} className="flex gap-2 justify-center items-center"><FaMicrophoneLines /> Start Speech</Button>)}

        <Button size={"sm"} disabled={transcript === ""} onClick={() => setOpen(true)} className="flex justify-center items-center gap-2 border-none shadow-md"><FaFilePdf /> Generate PDF</Button>
      </div>
      <AlertDialog open={open}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your download your file will be download as {fileName || "smart-notes"}.pdf</AlertDialogTitle>
            <AlertDialogDescription>
              <Input className="shadow-md" onChange={(e) => setFileName(e.target.value)} placeholder="Enter a name for file otherwise it will be prefixed by smart-notes" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button size={"sm"} variant={"secondary"} onClick={() => setOpen(false)}>Cancel</Button>

            <Button size={"sm"} variant={"primary"} disabled={generatingPdf === true} onClick={() => {
              generatePdf(fileName);
              setOpen(true)
            }}><LuDownload /> Download PDF</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}




