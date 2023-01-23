import Image from "next/image"

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  )
  const res = await data.json()

  return res.results.map((movie) => ({
    movie: toString(movie.id),
  }))
}

export default async function MovieDetail({ params }) {
  const { movie } = params
  const imagePath = "https://image.tmdb.org/t/p/original"
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  )
  const res = await data.json()

  return (
    <div>
      <div className="">
        <h2 className="text-4xl">{res.title}</h2>
        <h1 className="text-lg ">{res.release_date}</h1>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className="bg-green-600 inline-block my-2 py-2 px-4 rounded-lg text-sm">
          {res.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          alt={res.title}
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="my-4">
        <p className="text-lg">{res.overview}</p>
      </div>
    </div>
  )
}
