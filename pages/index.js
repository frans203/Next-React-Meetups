import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" description="Find and Create new Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://frans203:shelby123@cluster0.qjfec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
        address: meetup.address,
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
