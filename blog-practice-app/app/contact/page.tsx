import ContactForm from "@/components/contact/contact-form";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Contact me"></meta>
      </Head>
      <ContactForm />
    </>
  )
}