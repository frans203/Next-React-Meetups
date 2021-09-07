import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
const MeetupDetails = (props) => {
  console.log(props);
  return (
    <MeetupDetail
      image={props.meetupData.image}
      address={props.meetupData.address}
      title={props.meetupData.title}
      description={props.meetupData.description}
    />
  );
};
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://frans203:shelby123@cluster0.qjfec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const getCollections = db.collection("meetups");
  const collections = await getCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: collections.map((item) => ({
      params: { meetupId: item._id.toString() },
    })),
  };
};
export const getStaticProps = async (context) => {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://frans203:shelby123@cluster0.qjfec.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const getCollections = db.collection("meetups");
  const selectedMeetup = await getCollections.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};
export default MeetupDetails;
