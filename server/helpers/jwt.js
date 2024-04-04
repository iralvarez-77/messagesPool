const createAccessToken = async (paylod) => {
  try {
    await jwt.sign(paylod, process.env.PRIVATE_KEY);
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
  }

}

