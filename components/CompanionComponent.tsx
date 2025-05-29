"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie, { LottieComponentProps } from "lottie-react";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";

import soundwave from "@/constants/soundwave.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";


enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice  }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const [isMuted, setIsMuted] = useState(false);

    // Lottie reference for animation
    const lottieRef = useRef<LottieComponentProps>(null);

    useEffect(() => {
        if (lottieRef.current) {
            if(lottieRef){
                if(isSpeaking){
                    // @ts-ignore
                    lottieRef.current?.play();
                }else{
                    // @ts-ignore
                    lottieRef.current?.stop();
                }
            }
        }
    },[isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) =>[newMessage, ...prev]);
            }
        };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        
        const onError = (error: Error) => console.error("Call error:", error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        };


    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleConnect = async () => {
        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides);
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject) }}>
                        <div className={cn("absolute transition-opacity duration-1000", callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? "opacity-100" : "opacity-0", callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse")}>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit" />
                        </div>
                        <div className={cn("absolute transition-opacity duration-1000", callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity:0")}>
                            {/* @ts-ignore */}
                            <Lottie lottieRef={lottieRef} animationData={soundwave} autoPlay={false} className="companion-lottie"/>
                        </div>
                    </div>
                    <p className="font-bold text-xl">{name}</p>
                </div>
                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName} width={120} height={120} className="rounded-full" />
                        <p className="font-semibold font-xl">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={`/icons/${isMuted ? "mic-off.svg" : "mic-on.svg"}`} alt="mic" width={36} height={36} />
                        <p className="max-sm-hidden">
                            {isMuted ? "Ouvrer le micro" : "Fermer le micro"}
                        </p>
                    </button>
                    <button className={cn("border rounded-md py-2 cursor-pointer w-full", callStatus === CallStatus.ACTIVE ? "bg-red-500 text-white" : "bg-primary", callStatus === CallStatus.CONNECTING && "animate-pulse" )} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}>
                        { callStatus === CallStatus.ACTIVE ? "Mettre fin à la session" : callStatus === CallStatus.CONNECTING ? "Connexion en cours..." : "Démarrer la session "}
                    </button>
                </div>
            </section>
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if(message.role === "assistant") {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {name.split(' ')[0].replace('/[.,]/g, ', '')} : {message.content}
                                </p>
                            )
                        }else{
                            <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>
                <div className="transcript-fade" />
            </section>
        </section>
    )
}

export default CompanionComponent;