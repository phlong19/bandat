import { useCallback, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "quill-paste-smart";
import { newsForm } from "../../constants/message";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code-block",
  "script",
  "align",
];

const Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Lexend"];
Quill.register(Font, true);

function QuillEditor({ onChange, allowImage = true, value }) {
  const quill = useRef(null);

  // image handler
  const imageHandler = useCallback(() => {
    const quillEditor = quill.current.getEditor();
    const range = quillEditor.getSelection();
    let url = prompt(newsForm.imgUrl);

    if (url && range) {
      quillEditor.insertEmbed(range.index, "image", url);
      quillEditor.setSelection(range.index + 1);
    }
  }, []);

  const imageModule = allowImage ? "image" : "";

  // modules
  const modules = {
    toolbar: {
      container: [
        [{ header: 1 }, { header: 2 }, { font: Font.whitelist }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", imageModule],
        ["code-block", { script: "super" }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      allowed: {
        tags: [
          "a",
          "b",
          "strong",
          "u",
          "s",
          "i",
          "p",
          "br",
          "ul",
          "ol",
          "li",
          "span",
        ],
        attributes: ["href", "rel", "target", "class"],
      },
    },
  };

  return (
    <ReactQuill
      className="relative z-50"
      ref={quill}
      onChange={onChange}
      formats={formats}
      modules={modules}
      defaultValue={value}
    />
  );
}

export default QuillEditor;
