"use client"
import Menu from '@/components/menu/Menu'
import React, { useEffect, useMemo, useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';







export default function page() {
  const [title, setTitle] = useState("");
  const [cateSlug, setCateSlug] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState();


  const handleSubmit = async () => {
    const res = await fetch("/api/blogWrite", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        slug: title,
        cateSlug: cateSlug || "easy" //all과 동일
      })
    })

    console.log(res)
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  return (
    <main id='main'>
      <section className='main_header'>
        <h2>#BLOG WRITE</h2>
        <Menu />
      </section>
      <section className='main_conts'>
        <div className='blog_write container'>
          <div className='write_top'>
            <input className="title" type='text' placeholder='제목' onChange={(e) => setTitle(e.target.value)} />
            <select type="" onChange={(e) => setCateSlug(e.target.value)}>
              <option value="easy">easy</option>
              <option value="nomal">nomal</option>
              <option value="difficult">difficult</option>
              <option value="very_difficult">very difficult</option>
              <option value="skills">skills</option>
            </select>
            <input type='file' onChange={(e) => setFile(e.target.files[0])}></input>
          </div>

          <ReactQuill
            value={desc}
            onChange={setDesc}
            theme="snow"
            modules={modules}
            placeholder="글을 작성해주세요"
          />
          <div className='write_bot'>
            <button onClick={() => handleSubmit()}><img src='/img/heart.png' style={{ width: "1rem" }} />SUBMIT</button>
          </div>
        </div>
      </section>
    </main>
  )
}

