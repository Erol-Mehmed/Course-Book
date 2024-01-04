const home = async (req, res) => {
  res.render('Index', { test: 'some text' });
}

export default home;
