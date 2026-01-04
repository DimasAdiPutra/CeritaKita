import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";

// Story Editor
import StoryEditor from "../../components/features/story/StoryEditor";

const DraftEditor = () => {
  const { storyId } = useParams();

  return (
    <>
      <Helmet>
        <title>Buat Cerita | CeritaKita</title>
      </Helmet>
      <div className="container mt-20 py-10">
        <StoryEditor storyId={storyId || null} />
      </div>
    </>
  );
};

export default DraftEditor;