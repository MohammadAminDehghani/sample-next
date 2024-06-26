"use client"

import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import React, { useState, useRef } from "react";


// import { Editor } from '@tinymce/tinymce-react';


//import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

const Home = () => {
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];



  //ckeditor
  // const editorRef = useRef(null);
  // const log = () => {
  // if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  // }


  return (
    <>
      <div>
        Hello World!
        <Button>test</Button>
      </div>
      <div className="container">
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedCities}
            onChange={(e) => setSelectedCities(e.value)}
            options={cities}
            optionLabel="name"
            filter
            placeholder="Select Cities"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
      </div>

        {/* <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
            height: 500,
            menubar: false,
            plugins: [
               'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
               'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
               'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
            ],
            toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
               'alignleft aligncenter alignright alignjustify | ' +
               'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help'
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
        <button onClick={log}>Log editor content</button> */}
        </>
  );
};

export default Home;
