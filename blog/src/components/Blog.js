import React, { lazy, Suspense, useState, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
const Comment = lazy(() => import("./comment"));

export default function Blog() {
  const [comments, setComments] = useState([]);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const commentRef = useRef(null);

  const enterHandler = (e, field) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "name":
          commentRef.current.focus();
          break;
        case "title":
          nameRef.current.focus();
          break;
        default:
          console.log("Not found");
          break;
      }
    }
  };

  const submitHandler = (e) => {
    
    if (
      titleRef.current.value &&
      nameRef.current.value &&
      commentRef.current.value
    ) {
      const newComment = {
        title: titleRef.current.value,
        name: nameRef.current.value,
        body: commentRef.current.value,
      };
      setComments([...comments, newComment]);
      titleRef.current.value = "";
      nameRef.current.value = "";
      commentRef.current.value = "";
    } else {
      alert("please fill all required sections");
    }
  };

  return (
    <div className='blog-wrapper'>
      <h1>Best blog</h1>
      <div className='blog-body'>
        <h2>This is the best blog you will ever see!</h2>
        <p className='title'>
          <br/>
          This blog is the best blog you will ever see, so sit on a comfy chair and get ready to be amazed <br/>
          If you have any comments (which you probably wont) fell free to leave a comment down below.
        </p>
      </div>
      <br />
      <Suspense fallback={<h1>Loading..</h1>}>
        <div
          className='comment-section'
          style={{
            display: "flex",
            flexDirection: "column",
            height: "400px",
            overflowY: "scroll",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          {comments[0] ? (
            comments.map((comment) => (
              <Comment
                title={comment.title}
                body={comment.body}
                name={comment.name}
              />
            ))
          ) : (
            <h1>no comments yet!</h1>
          )}
        </div>
        <ErrorBoundary>
          <div
            className='form-wrapper'
            style={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <input
              ref={titleRef}
              placeholder='Title'
              onKeyUp={(e) => enterHandler(e, "title")}
              style={{
                width: "50%",
                marginBottom: "10px",
                padding: "3px",
              }}
            />
            <input
              ref={nameRef}
              placeholder='Name'
              onKeyUp={(e) => enterHandler(e, "name")}
              style={{
                width: "50%",
                marginBottom: "10px",
                padding: "3px",
              }}
            />
            <textarea ref={commentRef} placeholder='Comment Here' />
            <button
              onClick={submitHandler}
              style={{ marginTop: "10px", width: "20%" }}>
              submit
            </button>
          </div>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}