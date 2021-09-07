import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>New meetup</title>
        <meta name="description" content="Add a new meetup!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
