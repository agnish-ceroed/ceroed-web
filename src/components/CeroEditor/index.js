import React from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { Container } from "@mui/material";

import useStyles from "./styles";

Quill.register("modules/imageResize", ImageResize);

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", "medium", "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image"],
      ["clean"],
    ],
  },
  clipboard: { matchVisual: false },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const CeroEditor = (props) => {
  const classes = useStyles();
  const { readOnly, value, setValue } = props;

  return (
    <Container className={classes.container}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        formats={formats}
        modules={modules}
        className={classes.quillContainer}
        readOnly={readOnly}
      />
    </Container>
  );
};

export default CeroEditor;
