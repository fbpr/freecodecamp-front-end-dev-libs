import { useState, useEffect } from 'react';
import './App.css';
import { marked } from 'marked';

function App() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(marked(defaultMarkdown));
  }, []);

  const defaultMarkdown =
    "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n ![ReactJS Logo](https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png)";

  marked.setOptions({
    breaks: true,
  });

  return (
    <>
      <div>
        <div className="editorWrap">
          <div className="toolbar">
            <i className="fa fa-edit"></i>
            Editor
            <i className="fa fa-arrows-alt"></i>
          </div>
          <textarea
            id="editor"
            type="text"
            onChange={(e) => setMarkdown(e.target.value)}
          >
            {defaultMarkdown}
          </textarea>
        </div>
        <div className="converter"></div>
        <div className="previewWrap">
          <div className="toolbar">
            <i className="fa fa-code"></i>
            Previewer
            <i className="fa fa-arrows-alt"></i>
          </div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default App;
