const Home = () => {
  return (
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
  );
};

export default Home;
