const Home = () => {
  return (
    <div>
      <h1 className="white">This is the H1</h1>
      <h2 className="white">This is the H2</h2>
      <h3 className="white">This is the H3</h3>
      <p className="white">This is an paragraph text</p>
      <small className="white">Those are smaller footnotes</small>
      <br />
      <button className="btn-primary-light">Primary LIGHT</button>
      <button className="btn-secondary-light">Secondary LIGHT</button>
      <div className="bg-white p-8 m-4">
        <button className="btn-primary-dark">Primary DARK</button>
        <button className="btn-secondary-dark">Secondary DARK</button>
      </div>
    </div>
  );
};

export default Home;
