import React from "react";
import Comment from "./Comment";
import { Box } from "@chakra-ui/react";

const Comments = ({ postId, comments, setComments }) => {
  return (
    <Box>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          authorName={comment.authorName}
          body={comment.body}
          date={comment.date}
        />
      ))}
    </Box>
  );
};

export default Comments;
