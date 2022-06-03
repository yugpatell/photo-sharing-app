import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { Box } from "@chakra-ui/react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    axios.get(`http://localhost:8080/comments/${postId}`).then(
      (res) => {
        setComments(res.data);
      },
      (err) => {
        console.warn(err);
      }
    );
  }
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Box>
    {comments.map((comment) => (
        <Comment key={comment._id} authorName={comment.authorName} body={comment.body} date={comment.date}/>
        ))}
    </Box>
  );
};

export default Comments;
