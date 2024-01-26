"use client"
import Menu from '@/components/menu/Menu'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <main id='main'>
      <section className='main_header'>
        <h2>#LOGIN</h2>
        <Menu />
      </section>
      <section className='main_conts'>
        <h3>로그인</h3>
        <div className='join_inner'>
          <div className="join_form">
            <form action="/" method="post">
              <fieldset>
                <legend className="blind">회원가입 영역</legend>
                <div>
                  <label htmlFor="youEmail">이메일</label>
                  <input type="text" id="youEmail" name="youEmail" placeholder="이메일을 입력해주세요!" />
                </div>
                <div>
                  <label htmlFor="youPass">비밀번호</label>
                  <input type="text" id="youPass" name="youPass" placeholder="비밀번호를 입력해주세요!" />
                </div>
                <div className="join_btn">
                  <button>로그인</button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="join__add">
            <ul>
              <li className="google" onClick={() => signIn("google")}><span className='ir'>google</span> </li>
              <li className="github" onClick={() => signIn("github")}><span className='ir'>Github</span></li>
              <li className="naver" onClick={() => signIn("naver")}><span className='ir'>naver</span></li>
              <li className="kakao" onClick={() => signIn("kakao")}><span className='ir'>kakao</span></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
