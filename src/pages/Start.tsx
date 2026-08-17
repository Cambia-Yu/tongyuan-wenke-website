import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import PageIntro from '@/components/site/PageIntro'
import Contact from '@/components/site/Contact'

export default function Start() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <Nav />
      <main>
        <PageIntro eyebrow="开始交流" title="商务咨询" desc="留下联系方式和想讨论的问题，我们会通过你提供的方式回复。" />
        <section className="mx-auto max-w-4xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_22px_65px_rgba(29,38,33,0.06)] sm:p-9 lg:p-12">
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
