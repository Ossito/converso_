import Image from "next/image";

import Link from "next/link";

const CTA = () => {
  return (
    <section className="cta-section">
        <div className="cta-badge text-white">
            Apprenez à votre rythme 😎
        </div>
        <h2 className="font-bold text-xl">
            Créer et Personnaliser votre compagnon d'apprentissage
        </h2>
        <p className="font-normal">
            Choisissez un nom, un sujet, une voix et une personnalité et commencez à apprendre grâce à des conversations vocales naturelles et amusantes.
        </p>
        <Image src="/images/cta.svg" alt="cta" width={363} height={240} />
        <button className="btn-primary">
            <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
            <Link href="/companion/new">
                <p>
                    Créer un nouveau compagnon
                </p>
            </Link>
        </button>
    </section>
  )
}

export default CTA;