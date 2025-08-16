export async function getGithubStars({ format = true } = {}) {
  const response = await fetch("https://api.github.com/repos/confident-ai/deepeval");
  const data = await response.json();
  if( format === true) {
    return formatStars(data.stargazers_count);
  }else{
    return data.stargazers_count;
  }
}

const formatStars = (n) => {
  return n >= 1000000
  ? `${Math.floor(n / 1000000)}M+`
  : n >= 1000
  ? `${Math.floor(n / 1000)}k+`
    : n.toString();
}