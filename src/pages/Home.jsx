const Home = () => {
  return (
    <>
      <div className="bg-gray-600">
        <h1 className="text-pnp-white">This is the H1</h1>
        <h2 className="text-pnp-white">This is the H2</h2>
        <h3 className="text-pnp-white">This is the H3</h3>
        <p className="text-pnp-white">This is an paragraph text</p>
        <small className="text-pnp-white">Those are smaller footnotes</small>
        <div className="w-[3vw] h-[3vh] bg-pnp-black"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-green"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-purple"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-blue"></div>
        <div className="w-[3vw] h-[3vh] bg-pnp-white"></div>
        <br />
        <button className="btn-primary-light">Primary LIGHT</button>
        <button className="btn-secondary-light">Secondary LIGHT</button>
        <button className="btn-primary-dark">Primary DARK</button>
        <button className="btn-secondary-dark">Secondary DARK</button>
      </div>
      <div>
        <h1 className="text-pnp-white">
          A very long text to test navbar & scroll
        </h1>
        <p className="text-pnp-white">
          Asterix (French: Astérix or Astérix le Gaulois [asteʁiks lə ɡolwa],
          "Asterix the Gaul"; also known as Asterix and Obelix in some
          adaptations or The Adventures of Asterix) is a French comic album
          series about a Gaulish village which, thanks to a magic potion that
          enhances strength, resists the forces of Julius Caesar's Roman
          Republic Army in a nonhistorical telling of the time after the Gallic
          Wars. Many adventures take the titular hero Asterix and his friend
          Obelix to Rome and beyond. The series first appeared in the
          Franco-Belgian comic magazine Pilote on 29 October 1959. It was
          written by René Goscinny and illustrated by Albert Uderzo until
          Goscinny's death in 1977. Uderzo then took over the writing until
          2009, when he sold the rights to publishing company Hachette; he died
          in 2020. In 2013, a new team consisting of Jean-Yves Ferri (script)
          and Didier Conrad (artwork) took over. As of 2023, 40 volumes have
          been released; the most recent was penned by new writer Fabcaro and
          released on 26 October 2023. By that year, the volumes in total had
          sold 393 million copies,[1] making them the best-selling European
          comic book series, and the second best-selling comic book series in
          history after One Piece.
        </p>
      </div>
    </>
  );
};

export default Home;
