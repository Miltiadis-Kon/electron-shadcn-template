import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/renderer/components/ui/button'
import { CardWithForm } from "@/renderer/components/schedule-card"
import { XMLInput } from '@/renderer/components/xml-input'
import { CalendarForm } from '@/renderer/components/date-selector'



export default function HomePage() {
  const [selectedFile, setSelectedFile] = React.useState<string>("")

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-8">
          <h1 className="text-2xl font-semibold">Deal Scheduling</h1>
          <h2 className="text-2xl font-semibold">1. Select date and xml file</h2>
            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
            <CalendarForm />
            <XMLInput onFileSelect={setSelectedFile}/>
              {/* RUN PYTHON SCRIPT TO GET MATCHING RESULTS FROM OUTLOOK */}
              </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-8">
          <h2 className="text-2xl font-semibold">2. Schedule</h2>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <CardWithForm 
              title="ESO Scheduling" 
              description="" 
              button_text="Schedule" 
              code = "BG"
              file = {selectedFile}
            />
            <CardWithForm 
              title="MEPSO Scheduling" 
              description="" 
              button_text="Schedule"
              file =  {selectedFile}
              code = "MK"
            />
              <CardWithForm 
              title="Mavir Scheduling" 
              description="" 
              button_text="Schedule"
              file =  {selectedFile}
              code = "HU"
            />
                        <CardWithForm 
              title="CGES Scheduling" 
              description="" 
              button_text="Schedule"
              file =  {selectedFile}
              code = "ME"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-8">
          <h2 className="text-2xl font-semibold">3. Draft & Send Emails</h2>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">

          </div>
        </div>
    </React.Fragment>
  )
}
