import { ScrollView, StyleSheet, View } from "react-native";
import { MovieCommentComponent } from "./moviecommentcomponent";
import { CommentFormInput } from "@/components/input";
import { useForm } from "react-hook-form";

export const MovieCommentSection = () => {

  const default_values = {
    comment: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: default_values,
  });

  const comments = [
    {
      id: 1,
      username: "James Gouse",
      comment: "Wow, world is full of different movies",
      timestamp: "8 hours ago",
      likes: 3,
      replies: 0,
    },
    {
      id: 2,
      username: "Alan Cooper",
      comment: "Best movie ever",
      timestamp: "4 days ago",
      likes: 9,
      replies: 0,
    },
    // Add more comments as needed
  ];

  return (
    <>
      <View>
        <CommentFormInput
          label="Email"
          placeholder="Add a public comment..."
          name="comment"
          control={control}
          editable={true}
          input_width={"100%"}
        />
      </View>
      <ScrollView style={styles.container}>
        {comments.map((comment) => (
          <MovieCommentComponent
            key={comment.id}
            username={comment.username}
            comment={comment.comment}
            timestamp={comment.timestamp}
            likes={comment.likes}
            replies={comment.replies}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    padding: 16,
  },
  commentContainer: {
    backgroundColor: "#171717",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  timestamp: {
    fontSize: 14,
    color: "#aaa",
  },
  comment: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 12,
  },
  interactions: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  interactionText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 4,
  },
});
