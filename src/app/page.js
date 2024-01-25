import CardList from '@/components/cardlist/CardList'
import Category from '@/components/category/Category'
import Menu from '@/components/menu/Menu'
import React from 'react'

export default function Home() {
  return (
    <main id='main'>
      <section className='main_header'>
        <h2>#main</h2>
        <Menu />
      </section>
      <section className='main_conts'>
        <Category />
        <CardList />
      </section>
    </main>
  )
}
